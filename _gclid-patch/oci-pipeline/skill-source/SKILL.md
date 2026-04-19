---
name: sfratto-ads-gclid-ansalone
description: >
  Skill operativa dello Studio Avv. Danilo Ansalone per l'Offline Conversion Import (OCI)
  dei lead Sfratto Sicuro verso Google Ads tramite GCLID. Usare SEMPRE questa skill quando
  l'utente richiede: upload conversioni offline, OCI, GCLID, import conversioni Google Ads,
  batch conversioni, attribuzione Google Ads, valorizzazione lead, invio conversioni,
  sincronizzazione Airtable a Ads, "pipeline GCLID", "carica le conversioni", "manda i lead
  a Google Ads", "aggiorna le conversioni", "fai girare l'OCI", "batch di oggi". Attivare
  anche quando l'utente menziona "Sfratto Sicuro" insieme a "Ads", "conversioni", "lead",
  "bidding", oppure chiede di ricalcolare lo stato/ranking di un lead nel Cruscotto. La
  skill orchestra Airtable -> Google Ads API e aggiorna i campi OCI nella tabella Pratiche.
---

# sfratto-ads-gclid-ansalone — OCI Pipeline

Skill per orchestrare l'**Offline Conversion Import** (OCI) dei lead acquisiti tramite
landing Sfratto Sicuro verso Google Ads, usando il GCLID persistito in Airtable.

Il flusso end-to-end:

1. **Upstream (automatico, fuori da questa skill)**: il form della landing scrive una riga
   in `gclid_staging.jsonl` sul server FTP. Lo script `gclid_matcher.py` (repo `google-ads/`)
   la collega al record **Anagrafica** in Airtable e popola il campo `GCLID` del contatto.
2. Questa skill legge i record candidati dalla tabella **Pratiche** del Cruscotto Operativo;
   il GCLID arriva dal lookup `GCLID (from Cliente)` (o dal campo diretto se presente).
3. Decide quale Conversion Action (CA) caricare in base a **Stato Lead** e al rank corrente
   (dedotto da `CA Inviata`).
4. Uploada la conversione via Google Ads API v20 (`upload_click_conversions`).
5. Scrive sui campi OCI di Pratiche: `OCI Sync Status`, `OCI Sync Last Try`, `CA Inviata`,
   `Valore Inviato`, `OCI_Error`.
6. Produce un report sintetico per l'utente.

Vedere `references/mapping.md` per nomi campo esatti, ID CA, formula filtro, esempi payload.

---

## 1. Setup sessione

### 1.1 Credenziali Airtable
Se il PAT non e' gia' in ambiente, chiedere all'utente **una sola volta**:

> "Per procedere serve il **Personal Access Token Airtable** (con scope `data.records:read/write`).
> Lo esporto come variabile d'ambiente `AIRTABLE_PAT` e lo uso solo in questa sessione."

Base ID: `appXqSXlxeLUcR25p`.

### 1.2 Credenziali Google Ads
Le credenziali Google Ads sono gia' configurate in:
```
C:\Users\danil\google-ads-mcp\env\google-ads.yaml
```
con `login_customer_id: "8657895088"` e refresh token gia' attivo. La skill riusa quel file
**senza mai stamparne il contenuto** ne' loggare developer_token/client_secret.

### 1.3 Python deps
Prima esecuzione, installare (in venv dedicato consigliato):
```powershell
py -m venv "C:\Users\danil\.venvs\sfratto-ads-gclid"
& "C:\Users\danil\.venvs\sfratto-ads-gclid\Scripts\Activate.ps1"
python -m pip install --upgrade pip
python -m pip install -r scripts\requirements.txt
```

> Su Python 3.14, `google-ads` richiede >= 28.2.0 (pin gia' rilassato in requirements).

---

## 2. Riferimenti fissi

- **Customer ID Ads**: `8657895088`
- **Base Airtable**: `appXqSXlxeLUcR25p`
- **Tabella Pratiche**: `tblFT0nl2Tnm4prgN` (tabella Anagrafica: fuori scope per l'upload).
- **Timezone**: `Europe/Rome`
- **Currency**: `EUR`
- Mappatura completa Stato Lead -> CA -> Value -> Lookback: vedi `references/mapping.md`.

---

## 3. Taxonomy dei lead e decisione

Ogni stato ha un **rank** crescente. Regola d'oro: **uploadiamo solo se il rank cresce**
(mai regressioni). Il rank corrente e' derivato dal campo `CA Inviata` tramite la mappa
inversa `CA_TO_RANK` in `scripts/run_oci_batch.py`.

| Stato Lead | Rank | CA | Valore (EUR) |
|---|---|---|---|
| Nuovo Lead | 1 | CA_Form_Submit | 0 |
| Lead Sporco | 2 | CA_Lead_Sporco | 0 |
| In Trattativa | 3 | CA_Lead_Trattativa | 390 |
| Cliente Firmato | 4 | CA_Cliente_Firmato | 1300 |

**Decision matrix** (implementata in `scripts/run_oci_batch.py::decide`):

- record senza GCLID risolto (ne' diretto, ne' lookup) -> `OCI Sync Status = "Skipped"` (reason: `no-gclid`)
- `Data Submit` piu' vecchio del lookback della CA -> `Skipped` (reason: `gclid-expired`)
- `target_rank <= current_rank` (dedotto da `CA Inviata`) -> `Skipped` (reason: `regression-or-same`)
- altrimenti -> **Upload** con value/currency della tabella sopra

### GCLID: ordine di priorita'
`resolve_gclid(fields)` prova in ordine:
1. campo diretto `GCLID` su Pratiche (se mai popolato manualmente)
2. primo valore del lookup `GCLID (from Cliente)` (risalendo al contatto Anagrafica)

Se il lookup non esiste ancora sulla tabella Pratiche (setup manuale richiesto in UI
Airtable), la skill lavora solo con il campo diretto e logga il warning.

---

## 4. Flusso operativo

### 4.1 Modalita'
Lo script `scripts/run_oci_batch.py` supporta:

- `--check` : valida credenziali, stampa conteggio candidati, **non uploada nulla**
- `--dry-run` : costruisce i payload e simula l'upload (logga cosa farebbe), non scrive su Airtable
- `--record-id <recXXXX>` : uploada un singolo record (utile per debug/test)
- `--since-days <N>` : limita ai record aggiornati negli ultimi N giorni (default 14)
- `--verbose` : log dettagliato
- `--yaml <PATH>` : override path `google-ads.yaml`

### 4.2 Esecuzione standard
L'utente tipicamente dice "fai girare l'OCI" oppure "carica le conversioni di oggi". Protocollo:

1. Eseguire **sempre prima** `--check` e mostrare i numeri all'utente
2. Se l'utente conferma, lanciare `--dry-run` e mostrare il piano (N upload, N skip)
3. Solo se l'utente dice "procedi"/"conferma"/"si" -> esecuzione reale senza `--dry-run`
4. Al termine: report compatto con counters (upload OK, upload fallite, skippati, reconcile)

### 4.3 Trigger manuale
La skill **non** si schedula da sola. Parte solo quando l'utente la invoca esplicitamente.
Se in futuro si vorra' schedulare, usare la skill `schedule` separatamente.

---

## 5. Gestione errori

### 5.1 Partial failure lato Google Ads
`upload_click_conversions` supporta `partial_failure=True`: alcune conversioni possono fallire
mentre altre vanno a buon fine. Lo script deserializza `GoogleAdsFailure` da
`partial_failure_error` e associa ogni errore al record corrispondente per indice.

Per ogni record fallito:
- `OCI Sync Status = "Error"`
- `OCI_Error` = descrizione compatta dell'errore (troncata a 500 char)
- `CA Inviata` **NON** viene modificata (al giro successivo si ritenta)

### 5.2 Reconcile queue
Se l'upload Google Ads va OK ma la scrittura Airtable fallisce (rete, rate limit, ecc.),
il record finisce in `logs/reconcile_queue.jsonl`. Al giro successivo la skill **non** lo
riuploada (sarebbe doppia conversione): legge la queue, riprova solo la write su Airtable,
poi rimuove la riga dalla queue.

### 5.3 Regressioni di stato
Se in Airtable lo `Stato Lead` torna indietro (es. "Cliente Firmato" -> "In Trattativa"
per errore umano), la skill **non uploada** e **non modifica** `CA Inviata`. Logga un
warning (`regression-or-same`) e passa oltre. Per annullare una conversione gia' caricata
su Google Ads serve un flusso dedicato (adjust conversion) non coperto qui.

### 5.4 GCLID scaduti
Se `Data Submit` e' piu' vecchio del `click_through_lookback_window_days` della CA target:
- `OCI Sync Status = "Skipped"`, `OCI_Error = "gclid-expired"`
- nessun upload (l'API rifiuterebbe con `CLICK_NOT_FOUND`)

Estendere la lookback di `CA_Lead_Sporco` e `CA_Cliente_Firmato` da 30 a 60 giorni via UI
Google Ads quando possibile (l'API wrapper MCP non espone quel campo in update).

---

## 6. Regole generali

1. **Non stampare mai credenziali** — ne' in log ne' nei messaggi all'utente (developer_token, client_secret, refresh_token, AIRTABLE_PAT).
2. **Dry-run first** — in caso di dubbio, sempre passare per `--dry-run` prima di scrivere.
3. **Idempotenza** — lo stesso record allo stesso rank non deve produrre due upload. Il guardrail e' `CA Inviata` (tramite `CA_TO_RANK`).
4. **Observability** — ogni esecuzione produce riga riassuntiva in `logs/oci-batch.log`.
5. **No silent failures** — se la write su Airtable fallisce, finisce in `logs/reconcile_queue.jsonl`.
6. **Lingua** — comunicare con l'utente sempre in italiano.

---

## 7. Dipendenze upstream (chi scrive il GCLID)

- Form Sfratto Sicuro -> `public/php/invia-email.php` -> append su `gclid_staging.jsonl` (FTP).
- `scripts/gclid_matcher.py` (repo `C:\Users\danil\.claude\projects\google-ads\`) scarica la
  jsonl via FTP, matcha il contatto per email/telefono e scrive `GCLID` nella tabella
  **Anagrafica** (campo `GCLID`), piu' Keyword/UTM in Note.
- Pratiche vede il GCLID tramite il lookup `GCLID (from Cliente)` sul linked field Cliente.

Se il lookup non e' ancora stato creato in Airtable UI, questa skill funziona solo per i
record con `GCLID` valorizzato direttamente su Pratiche (uso raro, solo debug/manuale).
