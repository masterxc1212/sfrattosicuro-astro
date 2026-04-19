# Mapping completo — sfratto-ads-gclid-ansalone

Tutti gli ID/nomi campo usati dallo script orchestratore sono qui, in un posto solo.
Se Google Ads o Airtable cambiano ID/nomi, aggiornare questo file + `scripts/run_oci_batch.py`.

---

## 1. Taxonomy Stato Lead -> Conversion Action

| Stato Lead (Airtable) | Rank | CA name (Ads) | CA ID | Valore (EUR) | Lookback (gg) |
|---|---|---|---|---|---|
| Nuovo Lead | 1 | CA_Form_Submit | `7580880424` | 0 | 60 |
| Lead Sporco | 2 | CA_Lead_Sporco | `7547326771` | 0 | 30 !! |
| In Trattativa | 3 | CA_Lead_Trattativa | `7554153063` | 390 | 90 |
| Cliente Firmato | 4 | CA_Cliente_Firmato | `7547326768` | 1300 | 30 !! |

!! = da estendere manualmente a 60gg via UI Google Ads (l'MCP wrapper non espone
`click_through_lookback_window_days` in update). Finche' non esteso, alcuni GCLID tra
30 e 60 giorni vengono saltati con `gclid-expired`.

Resource name formato atteso: `customers/8657895088/conversionActions/<ID>`.

### Smart Bidding bootstrap
- Fase 1 (history < ~30 conversioni/mese): portfolio **Max Conversions**, target solo su `CA_Form_Submit` + `CA_Lead_Trattativa`.
- Fase 2 (history stabile): switchare a **Max Conversion Value** con tROAS.

---

## 2. Airtable — Pratiche (`tblFT0nl2Tnm4prgN`)

Base: `appXqSXlxeLUcR25p`.

### Campi GCLID sorgente (Pratiche)

| Campo (nome) | Field ID | Tipo | Note |
|---|---|---|---|
| `GCLID` | (diretto) | singleLineText | popolabile manualmente; normalmente vuoto |
| `GCLID (from Cliente)` | (lookup) | multipleLookupValues | lookup sul linked `Cliente` -> `Anagrafica.GCLID` |
| `Data Submit` | — | dateTime | proxy temporale del click (usato come `event_time`) |

> **Setup manuale richiesto**: il lookup `GCLID (from Cliente)` va creato da UI Airtable
> (l'API `create_field` non supporta `multipleLookupValues`). Una volta creato, lo script
> lo legge automaticamente. Finche' assente, la skill opera solo su `GCLID` diretto.

### Campi OCI di writeback (Pratiche)

| Campo (nome) | Field ID | Tipo | Valori ammessi |
|---|---|---|---|
| `OCI Sync Status` | `fldKkA0nMb87SRzkS` | singleSelect | `Pending`, `Sent`, `Error`, `Skipped` |
| `OCI Sync Last Try` | — | dateTime | ISO del tentativo (successo o errore) |
| `CA Inviata` | — | singleSelect | `CA_Form_Submit`, `CA_Lead_Sporco`, `CA_Lead_Trattativa`, `CA_Cliente_Firmato` |
| `Valore Inviato` | — | currency EUR | valore effettivamente caricato |
| `OCI_Error` | `fldw0XGA899AvB1Uj` | multilineText | messaggio errore (max 500 char) |

**Rank corrente** = `CA_TO_RANK.get(CA Inviata, 0)`. Non esiste piu' il campo
`OCI_Last_CA_Rank`: il rank e' derivato on-the-fly dal nome della CA salvata.

### Campo decisionale

| Campo (nome) | Field ID | Tipo | Valori rilevanti |
|---|---|---|---|
| `Stato Lead` | `fldb1NhNUgoZhtrgK` | singleSelect | `Nuovo Lead`, `Lead Sporco`, `In Trattativa`, `Cliente Firmato` |

---

## 3. Anagrafica — upstream GCLID

Base: `appXqSXlxeLUcR25p` (stessa base, tabella diversa).

Il GCLID arriva qui via `scripts/gclid_matcher.py` nel repo `google-ads/`. Flusso:

1. Form landing Sfratto Sicuro -> `public/php/invia-email.php` appende una riga a `gclid_staging.jsonl` su FTP.
2. `gclid_matcher.py` scarica la jsonl, normalizza telefono, matcha il contatto in **Anagrafica** per email o cellulare.
3. Se trovato e `GCLID` ancora vuoto, PATCH di `GCLID`, `Keyword`, `Note` (UTM).

Il lookup `GCLID (from Cliente)` su Pratiche ribalta quel GCLID quando la Pratica e'
collegata al contatto Anagrafica tramite il linked field `Cliente`.

---

## 4. Filtro candidati (formula Airtable)

```
AND(
  OR({Stato Lead} = 'Nuovo Lead',
     {Stato Lead} = 'Lead Sporco',
     {Stato Lead} = 'In Trattativa',
     {Stato Lead} = 'Cliente Firmato'),
  OR({OCI Sync Status} = '',
     {OCI Sync Status} = 'Pending',
     {OCI Sync Status} = 'Error',
     {OCI Sync Status} = 'Sent'),
  IS_AFTER(LAST_MODIFIED_TIME(), DATEADD(NOW(), -{SINCE_DAYS}, 'days'))
)
```

Il filtro GCLID (direct || lookup) **non** e' nella formula: lo fa `decide()` lato script,
per supportare il fallback diretto -> lookup. I record `Sent` vengono rigirati solo se lo
`Stato Lead` e' avanzato (`target_rank > current_rank` dedotto da `CA Inviata`).

---

## 5. Esempio payload ClickConversion

```python
conversion = client.get_type("ClickConversion")
conversion.conversion_action = "customers/8657895088/conversionActions/7554153063"
conversion.gclid = "EAIaIQobChMI..."
conversion.conversion_date_time = "2026-04-18 15:42:03+02:00"   # obbligatorio ':' nel tz
conversion.conversion_value = 390.0
conversion.currency_code = "EUR"
```

Upload batch con `partial_failure=True`:

```python
response = conv_upload_service.upload_click_conversions(
    customer_id="8657895088",
    conversions=[conv1, conv2, ...],
    partial_failure=True,
)
```

---

## 6. Credenziali e path

- Google Ads YAML: `C:\Users\danil\google-ads-mcp\env\google-ads.yaml`
- Airtable PAT: env var `AIRTABLE_PAT` (mai in file)
- Log: `logs/oci-batch.log` nella cwd di esecuzione
- Reconcile queue: `logs/reconcile_queue.jsonl`
