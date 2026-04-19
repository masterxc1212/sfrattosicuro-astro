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

Variabili d'ambiente:
    AIRTABLE_PAT      Personal Access Token Airtable (obbligatorio).
    GOOGLE_ADS_YAML   Path alternativo al google-ads.yaml (default: MCP).

Credenziali Google Ads lette da:
    C:\\Users\\danil\\google-ads-mcp\\env\\google-ads.yaml
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import sys
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
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

# Stato_Lead -> (rank, CA name, CA id, value, lookback_gg)
STATE_MAP: dict[str, tuple[int, str, str, float, int]] = {
    "Nuovo Lead":      (1, "CA_Form_Submit",     "7580880424",   0.0, 60),
    "Lead Sporco":     (2, "CA_Lead_Sporco",     "7547326771",   0.0, 30),
    "In Trattativa":   (3, "CA_Lead_Trattativa", "7554153063", 390.0, 90),
    "Cliente Firmato": (4, "CA_Cliente_Firmato", "7547326768", 1300.0, 30),
}

# Nomi campi Airtable (usati per nome, robusti a cambi di field ID)
F_GCLID           = "GCLID"
F_GCLID_AT        = "GCLID_Captured_At"
F_STATO           = "Stato_Lead"
F_OCI_STATUS      = "OCI_Status"
F_OCI_SENT_AT     = "OCI_Sent_At"
F_OCI_LAST_RANK   = "OCI_Last_CA_Rank"
F_OCI_ERROR       = "OCI_Error"

RECONCILE_QUEUE = Path("logs") / "reconcile_queue.jsonl"
LOG_FILE        = Path("logs") / "oci-batch.log"

logger = logging.getLogger("oci")


# ---------------------------------------------------------------------------
# Decision model
# ---------------------------------------------------------------------------

@dataclass
class Decision:
    record_id: str
    action: str                       # "upload" | "skip" | "error"
    reason: str = ""
    ca_name: str = ""
    ca_id: str = ""
    rank: int = 0
    value: float = 0.0
    gclid: str = ""
    gclid_at: datetime | None = None
    stato: str = ""

    def __str__(self) -> str:
        base = f"[{self.record_id}] {self.action.upper()} stato={self.stato!r}"
        if self.action == "upload":
            return f"{base} -> {self.ca_name} rank={self.rank} value={self.value}"
        return f"{base} reason={self.reason}"


def decide(record: dict[str, Any], *, now: datetime | None = None) -> Decision:
    """Pura — dato un record Airtable, decide cosa farne."""
    now = now or datetime.now(tz=ROME_TZ)
    rid = record["id"]
    f = record.get("fields", {})
    stato = f.get(F_STATO, "")
    gclid = f.get(F_GCLID, "") or ""
    gclid_at_raw = f.get(F_GCLID_AT)
    last_rank = int(f.get(F_OCI_LAST_RANK) or 0)

    d = Decision(record_id=rid, stato=stato, gclid=gclid, action="skip")

    if not gclid:
        d.reason = "no-gclid"
        return d

    if stato not in STATE_MAP:
        d.reason = f"stato-non-mappato:{stato}"
        return d

    rank, ca_name, ca_id, value, lookback_gg = STATE_MAP[stato]

    if rank <= last_rank:
        d.reason = f"regression-or-same:current={rank}<=last={last_rank}"
        return d

    if gclid_at_raw:
        try:
            gclid_at = dtparser.isoparse(gclid_at_raw)
            if gclid_at.tzinfo is None:
                gclid_at = gclid_at.replace(tzinfo=timezone.utc)
            d.gclid_at = gclid_at
            age_days = (now - gclid_at).days
            if age_days > lookback_gg:
                d.reason = f"gclid-expired:age={age_days}gg>lookback={lookback_gg}"
                return d
        except Exception as e:
            d.reason = f"gclid-at-parse-error:{e}"
            return d
    # se gclid_at assente procediamo lo stesso (API controllera')

    d.action = "upload"
    d.ca_name = ca_name
    d.ca_id = ca_id
    d.rank = rank
    d.value = value
    return d


# ---------------------------------------------------------------------------
# Google Ads helpers
# ---------------------------------------------------------------------------

def load_ads_client(yaml_path: Path) -> GoogleAdsClient:
    if not yaml_path.exists():
        raise FileNotFoundError(f"google-ads.yaml non trovato: {yaml_path}")
    return GoogleAdsClient.load_from_storage(str(yaml_path), version="v20")


def _fmt_conversion_time(dt: datetime) -> str:
    """Google Ads richiede 'YYYY-MM-DD HH:MM:SS+ZZ:ZZ' (con ':' nel tz offset)."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=ROME_TZ)
    else:
        dt = dt.astimezone(ROME_TZ)
    s = dt.strftime("%Y-%m-%d %H:%M:%S%z")
    # '%z' su Windows/Python 3 emette '+0200' -> trasformiamolo in '+02:00'
    if len(s) >= 5 and (s[-5] in "+-") and ":" not in s[-5:]:
        s = s[:-2] + ":" + s[-2:]
    return s


def build_click_conversion(client: GoogleAdsClient, decision: Decision) -> Any:
    conv = client.get_type("ClickConversion")
    conv.conversion_action = (
        f"customers/{CUSTOMER_ID}/conversionActions/{decision.ca_id}"
    )
    conv.gclid = decision.gclid
    # timestamp dell'evento = adesso (in assenza di timestamp di conversione dedicato)
    event_time = datetime.now(tz=ROME_TZ)
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
    """Ritorna record_id -> (ok, message)."""
    uploads = [d for d in decisions if d.action == "upload"]
    result: dict[str, tuple[bool, str]] = {}
    if not uploads:
        return result

    conversions = [build_click_conversion(client, d) for d in uploads]

    if dry_run:
        for d, c in zip(uploads, conversions):
            result[d.record_id] = (True, f"DRY-RUN {c.conversion_action} gclid={c.gclid[:10]}... value={c.conversion_value}")
        return result

    service = client.get_service("ConversionUploadService")
    try:
        response = service.upload_click_conversions(
            customer_id=CUSTOMER_ID,
            conversions=conversions,
            partial_failure=True,
        )
    except GoogleAdsException as e:
        # fallimento totale: segna tutti come errore
        msg = f"GoogleAdsException: {e.error.code().name} {e.failure}"
        for d in uploads:
            result[d.record_id] = (False, msg)
        return result

    # partial_failure_error -> GoogleAdsFailure con indici per conversione
    failure_indices: dict[int, str] = {}
    if response.partial_failure_error and response.partial_failure_error.code != 0:
        try:
            from google.ads.googleads.v20.errors.types.errors import GoogleAdsFailure
            ads_failure = GoogleAdsFailure.deserialize(response.partial_failure_error.details[0].value)
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
            # success se il corrispondente entry nel response.results ha resource_name non vuoto
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
    # Recupero formula-filtered
    stato_clause = " , ".join(f"{{{F_STATO}}} = '{k}'" for k in STATE_MAP.keys())
    formula = (
        "AND("
        f" {{{F_GCLID}}} != '', "
        f" OR({stato_clause}), "
        f" OR({{{F_OCI_STATUS}}} = '', {{{F_OCI_STATUS}}} = 'Pending', {{{F_OCI_STATUS}}} = 'Error', {{{F_OCI_STATUS}}} = 'Uploaded'), "
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

    for d in uploads:
        ok, msg = results.get(d.record_id, (False, "no-result"))
        if args.dry_run:
            logger.info("DRY %s -> %s", d.record_id, msg)
            continue

        if ok:
            fields = {
                F_OCI_STATUS: "Uploaded",
                F_OCI_SENT_AT: datetime.now(tz=ROME_TZ).isoformat(),
                F_OCI_LAST_RANK: d.rank,
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
                    "ts": datetime.now(tz=ROME_TZ).isoformat(),
                    "reason": "airtable-update-failed-after-ads-ok",
                })
                logger.warning("RECONCILE %s (Ads OK, Airtable KO)", d.record_id)
        else:
            err_count += 1
            fields = {
                F_OCI_STATUS: "Error",
                F_OCI_ERROR: str(msg)[:500],
            }
            update_record(table, d.record_id, fields)
            logger.error("KO %s %s", d.record_id, msg)

    # Skippati: aggiorniamo solo se non erano gia' Skipped con la stessa ragione
    for d in skips:
        if args.dry_run:
            continue
        fields = {
            F_OCI_STATUS: "Skipped",
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
