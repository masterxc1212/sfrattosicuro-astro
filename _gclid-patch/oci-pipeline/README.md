# OCI Pipeline — Sfratto Sicuro

Upload lead Airtable → Google Ads (Offline Conversion Import).

## File

- `run_oci_batch.py` — orchestratore principale.
- `requirements.txt` — deps Python (google-ads, pyairtable, dateutil, PyYAML).

## Setup (una tantum)

```powershell
# 1. crea venv dedicato (opzionale ma consigliato)
py -m venv "C:\Users\danil\.venvs\sfratto-ads-gclid"
& "C:\Users\danil\.venvs\sfratto-ads-gclid\Scripts\Activate.ps1"

# 2. installa deps
python -m pip install --upgrade pip
python -m pip install -r "C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring\_gclid-patch\oci-pipeline\requirements.txt"
```

## Ogni esecuzione

```powershell
# attiva il venv (se lo usi)
& "C:\Users\danil\.venvs\sfratto-ads-gclid\Scripts\Activate.ps1"

# esporta il PAT Airtable (scope data.records:read/write)
$env:AIRTABLE_PAT = "patXXXXX..."

cd "C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring\_gclid-patch\oci-pipeline"

# step 1 — smoke test
python run_oci_batch.py --check

# step 2 — simulazione (nessuna scrittura su Ads/Airtable)
python run_oci_batch.py --dry-run --since-days 14 --verbose

# step 3 — batch reale (solo dopo dry-run pulito)
python run_oci_batch.py --since-days 14
```

## Modi

| Flag | Effetto |
|---|---|
| `--check` | Valida credenziali e stampa il piano. Niente upload. |
| `--dry-run` | Costruisce i payload e simula. Niente upload né write Airtable. |
| `--record-id recXXXX` | Esegue solo su un record. Utile per debug. |
| `--since-days N` | Finestra record modificati. Default 14. |
| `--verbose` | Log dettagliato. |
| `--yaml PATH` | Sovrascrive il path del google-ads.yaml. |

## Output

- Console + `logs/oci-batch.log`: esecuzione.
- `logs/reconcile_queue.jsonl`: record con Ads OK ma Airtable KO (da ritentare manualmente).

## Credenziali

- Google Ads: letto da `C:\Users\danil\google-ads-mcp\env\google-ads.yaml` (login_customer_id `8657895088`).
- Airtable: `$env:AIRTABLE_PAT` obbligatoria.

## Stato_Lead → Conversion Action

| Stato | Rank | CA | Valore EUR |
|---|---|---|---|
| Nuovo Lead | 1 | CA_Form_Submit (7580880424) | 0 |
| Lead Sporco | 2 | CA_Lead_Sporco (7547326771) | 0 |
| In Trattativa | 3 | CA_Lead_Trattativa (7554153063) | 390 |
| Cliente Firmato | 4 | CA_Cliente_Firmato (7547326768) | 1300 |

La skill uploada solo se il rank cresce (niente regressioni, niente doppi upload).
GCLID oltre la finestra di lookback → Skipped.

## Noti

- Python 3.14: `grpcio`/`protobuf` potrebbero richiedere wheel che impiegano tempo a uscire. Se l'install fallisce, allentare il pin `google-ads==27.0.0` → `google-ads` (ultima versione) oppure usare Python 3.12.
- Lookback CA_Lead_Sporco e CA_Cliente_Firmato: attualmente 30gg. Estendere a 60gg via UI Google Ads per non perdere GCLID tra 30–60gg.
