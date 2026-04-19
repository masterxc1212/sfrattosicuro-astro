"""
run_oci_batch.py
================

Offline Conversion Import (OCI) orchestrator per Sfratto Sicuro.

Legge i lead candidati dal Cruscotto Airtable (tabella Pratiche), decide cosa
uploadare verso Google Ads via `ConversionUploadService.upload_click_conversions`,
e scrive lo stato di ritorno nei campi OCI di Airtable.

Modi:
    --check           Valida credenziali, stampa il conteggio candidati. Non uploada.
    --dry-run         Costruisce i payload, logga cosa farebbe. Non scrive nulla.
    --record-id REC   Esegue solo quel record (debug/test).
    --since-days N    Limita ai record modificati negli ultimi N giorni (default 14).
    --verbose         Log esteso.
    --yaml PATH       Override path google-ads.yaml.

Variabili d'ambiente:
    AIRTABLE_PAT      Personal Access Token Airtable (obbligatorio).
    GOOGLE_ADS_YAML   Path alternativo al google-ads.yaml (default: MCP).

Credenziali Google Ads lette da:
    C:\\Users\\danil\\google-ads-mcp\\env\\google-ads.yaml

Schema Airtable Pratiche (riferimento - vedi references/mapping.md):
    - GCLID (singleLineText, manuale)
    - GCLID (from Cliente)  (lookup opzionale da Anagrafica)
    - Stato Lead  (singleSelect: Nuovo Lead | Lead Sporco | In Trattativa | Cliente Firmato)
    - Data Submit  (dateTime)
    - Data Ultimo Update Stato  (dateTime)
    - OCI Sync Status  (singleSelect: Pending | Sent | Error | Skipped)
    - OCI Sync Last Try  (dateTime)
    - CA Inviata  (singleSelect, ultima CA caricata; e' il nostro rank corrente)
    - Valore Inviato  (currency EUR)
    - OCI_Error  (multilineText)
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from dateutil import parser as dtparser
from dateutil import tz
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from pyairtable import Api as AirtableApi

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

CUSTOMER_ID = "8657895088"
BASE_ID = "appXqSXlxeLUcR25p"
TABLE_PRATICHE = "tblFT0nl2Tnm4prgN"

DEFAULT_YAML_PATH = Path(r"C:\Users\danil\google-ads-mcp\env\google-ads.yaml")
ROME_TZ = tz.gettz("Europe/Rome")

# Stato Lead -> (rank, CA name, CA id, value, lookback_gg)
STATE_MAP: dict[str, tuple[int, str, str, float, int]] = {
    "Nuovo Lead":      (1, "CA_Form_Submit",     "7580880424",   0.0, 60),
    "Lead Sporco":     (2, "CA_Lead_Sporco",     "7547326771",   0.0, 30),
    "In Trattativa":   (3, "CA_Lead_Trattativa", "7554153063", 390.0, 90),
    "Cliente Firmato": (4, "CA_Cliente_Firmato", "7547326768", 1300.0, 30),
}

# Mappa inversa CA name -> rank (per derivare lo stato corrente da CA Inviata).
CA_TO_RANK: dict[str, int] = {v[1]: v[0] for v in STATE_MAP.values()}

# Nomi campo Airtable (rispettare spazi).
F_GCLID_DIRECT    = "GCLID"
F_GCLID_LOOKUP    = "GCLID (from Cliente)"
F_STATO           = "Stato Lead"
F_DATA_SUBMIT     = "Data Submit"
F_CA_INVIATA      = "CA Inviata"
F_VALORE_INVIATO  = "Valore Inviato"
F_OCI_STATUS      = "OCI Sync Status"
F_OCI_LAST_TRY    = "OCI Sync Last Try"
F_OCI_ERROR       = "OCI_Error"

# Enum OCI Sync Status
OCI_STATUS_PENDING  = "Pending"
OCI_STATUS_SENT     = "Sent"
OCI_STATUS_ERROR    = "Error"
OCI_STATUS_SKIPPED  = "Skipped"

RECONCILE_QUEUE = Path("logs") / "reconcile_queue.jsonl"
LOG_FILE        = Path("logs") / "oci-batch.log"

logger = logging.getLogger("oci")


# ---------------------------------------------------------------------------
# Helpers di estrazione campi
# ---------------------------------------------------------------------------

def resolve_gclid(fields: dict[str, Any]) -> str:
    """
    Ritorna il GCLID risolto in ordine di priorita':
    1. campo diretto `GCLID` (singleLineText)
    2. primo valore del lookup `GCLID (from Cliente)` (list di str)
    """
    direct = (fields.get(F_GCLID_DIRECT) or "").strip()
    if direct:
        return direct
    lookup = fields.get(F_GCLID_LOOKUP)
    if isinstance(lookup, list) and lookup:
        val = (str(lookup[0]) or "").strip()
        if val:
            return val
    return ""


def resolve_current_rank(fields: dict[str, Any]) -> int:
    """
    Il rank corrente della Pratica e' dedotto da `CA Inviata`.
    Se la Pratica non e' mai stata uploadata -> 0.
    """
    ca = fields.get(F_CA_INVIATA) or ""
    if isinstance(ca, list):
        ca = ca[0] if ca else ""
    return CA_TO_RANK.get(str(ca), 0)


# ---------------------------------------------------------------------------
# Decision model
# ---------------------------------------------------------------------------

@dataclass
class Decision:
    record_id: str
    action: str
    reason: str = ""
    ca_name: str = ""
    ca_id: str = ""
    rank: int = 0
    value: float = 0.0
    gclid: str = ""
    event_time: datetime | None = None
    stato: str = ""

    def __str__(self) -> str:
        base = f"[{self.record_id}] {self.action.upper()} stato={self.stato!r}"
        if self.action == "upload":
            return f"{base} -> {self.ca_name} rank={self.rank} value={self.value}"
        return f"{base} reason={self.reason}"


def decide(record: dict[str, Any], *, now: datetime | None = None) -> Decision:
    now = now or datetime.now(tz=ROME_TZ)
    rid = record["id"]
    f = record.get("fields", {})

    stato = f.get(F_STATO, "") or ""
    gclid = resolve_gclid(f)
    current_rank = resolve_current_rank(f)

    d = Decision(record_id=rid, stato=stato, gclid=gclid, action="skip")

    if not gclid:
        d.reason = "no-gclid"
        return d
    if stato not in STATE_MAP:
        d.reason = f"stato-non-mappato:{stato!r}"
        return d

    target_rank, ca_name, ca_id, value, lookback_gg = STATE_MAP[stato]

    if target_rank <= current_rank:
        d.reason = f"regression-or-same:target={target_rank}<=current={current_rank}"
        return d

    # Uso Data Submit come proxy temporale del GCLID (momento del form).
    data_submit_raw = f.get(F_DATA_SUBMIT)
    event_time = now
    if data_submit_raw:
        try:
            et = dtparser.isoparse(data_submit_raw)
            if et.tzinfo is None:
                et = et.replace(tzinfo=timezone.utc)
            event_time = et
            age_days = (now - et).days
            if age_days > lookback_gg:
                d.reason = f"gclid-expired:age={age_days}gg>lookback={lookback_gg}"
                return d
        except Exception as e:
            d.reason = f"data-submit-parse-error:{e}"
            return d

    d.action = "upload"
    d.ca_name = ca_name
    d.ca_id = ca_id
    d.rank = target_rank
    d.value = value
    d.event_time = event_time
    return d


# ---------------------------------------------------------------------------
# Google Ads helpers
# ---------------------------------------------------------------------------

def load_ads_client(yaml_path: Path) -> GoogleAdsClient:
    if not yaml_path.exists():
        raise FileNotFoundError(f"google-ads.yaml non trovato: {yaml_path}")
    return GoogleAdsClient.load_from_storage(str(yaml_path), version="v20")


def _fmt_conversion_time(dt: datetime) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=ROME_TZ)
    else:
        dt = dt.astimezone(ROME_TZ)
    s = dt.strftime("%Y-%m-%d %H:%M:%S%z")
    # Google Ads vuole il ':' nel tz offset.
    if len(s) >= 5 and (s[-5] in "+-") and ":" not in s[-5:]:
        s = s[:-2] + ":" + s[-2:]
    return s


def build_click_conversion(client: GoogleAdsClient, decision: Decision) -> Any:
    conv = client.get_type("ClickConversion")
    conv.conversion_action = (
        f"customers/{CUSTOMER_ID}/conversionActions/{decision.ca_id}"
    )
    conv.gclid = decision.gclid
    event_time = decision.event_time or datetime.now(tz=ROME_TZ)
    conv.conversion_date_time = _fmt_conversion_time(event_time)
    conv.conversion_value = float(decision.value)
    conv.currency_code = "EUR"
    return conv


def upload_batch(
    client: GoogleAdsClient,
    decisions: list[Decision],
    *,
    dry_run: bool,
) -> dict[str, tuple[bool, str]]:
    uploads = [d for d in decisions if d.action == "upload"]
    result: dict[str, tuple[bool, str]] = {}
    if not uploads:
        return result

    conversions = [build_click_conversion(client, d) for d in uploads]

    if dry_run:
        for d, c in zip(uploads, conversions):
            result[d.record_id] = (
                True,
                f"DRY-RUN {c.conversion_action} gclid={c.gclid[:10]}... value={c.conversion_value}",
            )
        return result

    service = client.get_service("ConversionUploadService")
    try:
        response = service.upload_click_conversions(
            customer_id=CUSTOMER_ID,
            conversions=conversions,
            partial_failure=True,
        )
    except GoogleAdsException as e:
        msg = f"GoogleAdsException: {e.error.code().name} {e.failure}"
        for d in uploads:
            result[d.record_id] = (False, msg)
        return result

    failure_indices: dict[int, str] = {}
    if response.partial_failure_error and response.partial_failure_error.code != 0:
        try:
            from google.ads.googleads.v20.errors.types.errors import GoogleAdsFailure
            ads_failure = GoogleAdsFailure.deserialize(
                response.partial_failure_error.details[0].value
            )
            for err in ads_failure.errors:
                idx = None
                for fe in err.location.field_path_elements:
                    if fe.field_name == "conversions":
                        idx = fe.index
                        break
                if idx is not None:
                    failure_indices[idx] = f"{err.error_code} {err.message}"
        except Exception as e:
            logger.warning("Failed to parse partial_failure_error: %s", e)

    for i, d in enumerate(uploads):
        if i in failure_indices:
            result[d.record_id] = (False, failure_indices[i])
        else:
            try:
                r = response.results[i]
                if getattr(r, "gclid", "") or getattr(r, "conversion_action", ""):
                    result[d.record_id] = (True, "OK")
                else:
                    result[d.record_id] = (False, "empty result entry")
            except IndexError:
                result[d.record_id] = (False, "no result entry")
    return result


# ---------------------------------------------------------------------------
# Airtable helpers
# ---------------------------------------------------------------------------

def get_airtable() -> Any:
    pat = os.environ.get("AIRTABLE_PAT")
    if not pat:
        raise RuntimeError("AIRTABLE_PAT non definito in ambiente.")
    return AirtableApi(pat).table(BASE_ID, TABLE_PRATICHE)


def fetch_candidates(table: Any, since_days: int, record_id: str | None) -> list[dict[str, Any]]:
    if record_id:
        rec = table.get(record_id)
        return [rec] if rec else []
    stato_clause = " , ".join(f"{{{F_STATO}}} = '{k}'" for k in STATE_MAP.keys())
    # Nota: il filtro GCLID non viene fatto qui (potrebbe arrivare dal lookup).
    # La decision si occupa di escludere i record senza GCLID risolto.
    formula = (
        "AND("
        f" OR({stato_clause}), "
        f" OR({{{F_OCI_STATUS}}} = '', "
        f"    {{{F_OCI_STATUS}}} = '{OCI_STATUS_PENDING}', "
        f"    {{{F_OCI_STATUS}}} = '{OCI_STATUS_ERROR}', "
        f"    {{{F_OCI_STATUS}}} = '{OCI_STATUS_SENT}'), "
        f" IS_AFTER(LAST_MODIFIED_TIME(), DATEADD(NOW(), -{since_days}, 'days'))"
        ")"
    )
    return list(table.iterate(formula=formula, page_size=100))


def update_record(table: Any, record_id: str, fields: dict[str, Any]) -> bool:
    try:
        table.update(record_id, fields, typecast=True)
        return True
    except Exception as e:
        logger.error("Airtable update failed for %s: %s", record_id, e)
        return False


def write_reconcile_entry(entry: dict[str, Any]) -> None:
    RECONCILE_QUEUE.parent.mkdir(parents=True, exist_ok=True)
    with RECONCILE_QUEUE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, default=str) + "\n")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def setup_logging(verbose: bool) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    level = logging.DEBUG if verbose else logging.INFO
    fmt = "%(asctime)s [%(levelname)s] %(message)s"
    logging.basicConfig(level=level, format=fmt, handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
    ])


def main() -> int:
    p = argparse.ArgumentParser(description="OCI batch uploader (Sfratto Sicuro)")
    p.add_argument("--check", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--record-id", default=None)
    p.add_argument("--since-days", type=int, default=14)
    p.add_argument("--verbose", action="store_true")
    p.add_argument("--yaml", default=str(DEFAULT_YAML_PATH))
    args = p.parse_args()

    setup_logging(args.verbose)

    yaml_path = Path(os.environ.get("GOOGLE_ADS_YAML", args.yaml))

    try:
        ads_client = load_ads_client(yaml_path)
        logger.info("Google Ads client OK (yaml=%s)", yaml_path)
    except Exception as e:
        logger.error("Google Ads init failed: %s", e)
        return 2

    try:
        table = get_airtable()
        logger.info("Airtable client OK")
    except Exception as e:
        logger.error("Airtable init failed: %s", e)
        return 2

    try:
        records = fetch_candidates(table, args.since_days, args.record_id)
    except Exception as e:
        logger.error("fetch_candidates failed: %s", e)
        return 2

    logger.info("Candidati: %d", len(records))

    if args.check:
        for r in records[:20]:
            d = decide(r)
            logger.info("  %s", d)
        if len(records) > 20:
            logger.info("  ... (%d totali)", len(records))
        return 0

    decisions = [decide(r) for r in records]
    uploads = [d for d in decisions if d.action == "upload"]
    skips   = [d for d in decisions if d.action == "skip"]

    logger.info("Piano: upload=%d skip=%d", len(uploads), len(skips))
    if args.verbose:
        for d in decisions:
            logger.debug("  %s", d)

    if not uploads and not args.dry_run:
        logger.info("Nessun upload necessario. Uscita.")
        return 0

    results = upload_batch(ads_client, decisions, dry_run=args.dry_run)

    ok_count = 0
    err_count = 0
    recon_count = 0

    now_iso = datetime.now(tz=ROME_TZ).isoformat()

    for d in uploads:
        ok, msg = results.get(d.record_id, (False, "no-result"))
        if args.dry_run:
            logger.info("DRY %s -> %s", d.record_id, msg)
            continue

        if ok:
            fields = {
                F_OCI_STATUS: OCI_STATUS_SENT,
                F_OCI_LAST_TRY: now_iso,
                F_CA_INVIATA: d.ca_name,
                F_VALORE_INVIATO: d.value,
                F_OCI_ERROR: "",
            }
            if update_record(table, d.record_id, fields):
                ok_count += 1
                logger.info("OK %s rank=%d ca=%s", d.record_id, d.rank, d.ca_name)
            else:
                recon_count += 1
                write_reconcile_entry({
                    "record_id": d.record_id,
                    "fields": fields,
                    "ts": now_iso,
                    "reason": "airtable-update-failed-after-ads-ok",
                })
                logger.warning("RECONCILE %s (Ads OK, Airtable KO)", d.record_id)
        else:
            err_count += 1
            fields = {
                F_OCI_STATUS: OCI_STATUS_ERROR,
                F_OCI_LAST_TRY: now_iso,
                F_OCI_ERROR: str(msg)[:500],
            }
            update_record(table, d.record_id, fields)
            logger.error("KO %s %s", d.record_id, msg)

    for d in skips:
        if args.dry_run:
            continue
        fields = {
            F_OCI_STATUS: OCI_STATUS_SKIPPED,
            F_OCI_LAST_TRY: now_iso,
            F_OCI_ERROR: d.reason[:500],
        }
        update_record(table, d.record_id, fields)

    logger.info(
        "Riepilogo: ok=%d err=%d skip=%d reconcile=%d dry_run=%s",
        ok_count, err_count, len(skips), recon_count, args.dry_run,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
