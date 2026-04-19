# GCLID Pipeline Status — Sfratto Sicuro

**Ultimo update:** 2026-04-19
**Owner tecnico:** Studio Avv. Danilo Ansalone
**Scope:** tracciamento end-to-end click Google Ads → form submit → Airtable → OCI (Offline Conversion Import) verso Google Ads

---

## 1. Project location (canonica)

`C:\Users\danil\.claude\projects\sfratto-sicuro`

> Vecchi riferimenti `C:\Users\danil\Dropbox\DESKTOP\sfrattosicuro-astro` sono DEPRECATI.
> Esiste anche una copia lavorativa in `C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring` (usata come scratchpad di backup / diff).

Stack: Astro (SSG) + Astro Islands + PHP backend (`public/php/invia-email.php`).
Layout shell condiviso: `src/layouts/SiteLayout.astro` (include già `GA4TrackingIsland`).

---

## 2. Tassonomia lead (3 stati sostantivi + 1 iniziale)

| Stato Airtable      | Descrizione                                                | Conversion Action OCI inviata             | Valore (€) |
|---------------------|------------------------------------------------------------|-------------------------------------------|------------|
| `Nuovo`             | Form appena ricevuto, non ancora contattato                | `CA_Form_Submit` (count, no value)        | 0          |
| `Sporco`            | Contattato → fuori target (inquilino, edilizia popolare, info-only, ecc.) | `CA_Lead_Sporco` (value 0)         | 0          |
| `In trattativa`     | Contattato → effettivamente locatore con caso valido       | `CA_Lead_Trattativa` (value)              | 390        |
| `Cliente`           | Mandato firmato, fattura emessa                            | `CA_Cliente_Firmato` (value, 1300 lordo)  | 1300       |

**Razionale valori:**
- `1300 €` = prezzo lordo cliente.
- `390 €` = `1300 × 30%` (target conservativo conversione trattativa→cliente; obiettivo successivo 50%, poi 80%).
- `0 €` su `Sporco` = segnale negativo per Smart Bidding (riduce traffico simile).

**Conversion window:** 60 giorni (≈ 2× media click→conversione di 30 gg, primo anno di attività).

---

## 3. Bootstrap Smart Bidding 2-fasi

| Fase   | Trigger                          | Strategia                          | Conversione primaria             |
|--------|----------------------------------|------------------------------------|----------------------------------|
| Fase 1 | Sempre (cold start)              | Manual CPC → Maximize Conversions  | `CA_Form_Submit` (count)         |
| Fase 2 | ≥ 15 conversioni / 30 gg cumulate| Maximize Conversion Value → tROAS  | `CA_Lead_Trattativa` + `CA_Cliente_Firmato` (value) |

`CA_Form_Submit` resta come secondaria in Fase 2, per non perdere segnale durante la transizione.

---

## 4. Inventario form e stato pipeline GCLID

| File                                                                 | Hidden inputs gclid/UTM | JS cattura URL | Note |
|----------------------------------------------------------------------|--------------------------|----------------|------|
| `src/components/landing/LandingV3ContactSection.astro`               | presenti (linee 77-85)   | assente        | Pronto per ricevere valori dall'island |
| `src/components/landing/LandingOriginalHeroSection.astro`            | presenti (linee 103-111) | assente        | `form_source` dinamico da `hero.formSource` |
| `src/components/landing/LandingContactFormIsland.astro`              | ASSENTI                  | assente        | Da estendere |
| `src/components/ContactFormIsland.astro`                             | ASSENTI                  | assente        | Da estendere |
| `public/landing/index.html` — `hero_form` (linee 1182-1189)          | presenti                 | assente        | Statico, non passa per layout Astro |
| `public/landing/index.html` — `bottom_form` (linee 3843-3851)        | presenti                 | assente        | Statico, vedi sopra |

**Backend PHP:** `public/php/invia-email.php` già pronto (linee 82-88: legge `gclid`, `utm_*`, `keyword`; linee 492-514: scrive su `/logs/gclid_staging.jsonl`).

> Da verificare: token Airtable nel PHP (~linea 510) ha pattern sospetto da placeholder, va validato contro `.env` o secret-store reale.

---

## 5. Soluzione architetturale scelta

**Un unico componente `GclidCaptureIsland.astro`** incluso in `SiteLayout.astro`. Comportamento:

1. **Capture** (primo landing): se l'URL ha `?gclid=...` o `?utm_*=...` o `?keyword=...`, salva i valori in un cookie `ss_gclid_v1` (max-age 90 gg, SameSite=Lax).
2. **Restore** (ogni pagina): legge il cookie e popola in DOM tutti gli `input[name="gclid"]`, `input[name="utm_source"]`, ecc. presenti.
3. **Form patch** (defensive): per i form privi di hidden input, li inietta al volo dal cookie prima del submit.

Vantaggi:
- Una sola modifica al layout copre tutte le pagine generate da Astro.
- Le pagine statiche `public/landing/index.html` (non passano dal layout) ricevono lo stesso script via inclusione diretta nell'HTML o via build-hook successivo.
- Cookie 90 gg copre click → form anche se l'utente torna giorni dopo.

---

## 6. Schema cookie `ss_gclid_v1`

JSON serializzato e URL-encoded:

```json
{
  "gclid":        "EAIaIQobChMIxxxxxxx...",
  "utm_source":   "google",
  "utm_medium":   "cpc",
  "utm_campaign": "sfratto-morosita",
  "utm_term":     "avvocato sfratto",
  "utm_content":  "rsa-headline-1",
  "keyword":      "avvocato sfratto morosità",
  "ts":           1745020800000
}
```

`ts` = timestamp prima cattura (utile per audit attribuzione).

---

## 7. Conversion actions Google Ads (IMPLEMENTATE 2026-04-19)

**Customer ID**: `8657895088` (Sfratto Sicuro, EUR, Europe/Rome)
**Tipo**: tutte `UPLOAD_CLICKS` (Offline Conversion Import)

| CA ID       | Nome                  | Categoria        | Counting       | Lookback | Value default | always_use_default | Status  |
|-------------|-----------------------|------------------|----------------|----------|---------------|--------------------|---------|
| `7580880424`| `CA_Form_Submit`      | SUBMIT_LEAD_FORM | ONE_PER_CLICK  | **60 gg** | 0            | true               | ENABLED |
| `7547326771`| `CA_Lead_Sporco`      | DEFAULT (other)  | MANY_PER_CLICK | ⚠️ 30 gg | 0            | true               | ENABLED |
| `7554153063`| `CA_Lead_Trattativa`  | SUBMIT_LEAD_FORM | MANY_PER_CLICK | 90 gg     | 390           | false (dinamico)   | ENABLED |
| `7547326768`| `CA_Cliente_Firmato`  | QUALIFIED_LEAD   | MANY_PER_CLICK | ⚠️ 30 gg | 1300          | true               | ENABLED |

### Aperto ⚠️
`CA_Lead_Sporco` (7547326771) e `CA_Cliente_Firmato` (7547326768) hanno lookback 30gg → da estendere a 60gg manualmente da UI Google Ads (il tool `conversion_update_conversion_action` dell'MCP non espone `click_through_lookback_window_days`). Impostazione: *Strumenti → Conversioni → [CA] → Impostazioni → Finestra di conversione*.

### Naming legacy
Le 3 CA riusate portavano nomi precedenti: `CRM Lead Sporco` → `CA_Lead_Sporco`, `Lead Trattativa` → `CA_Lead_Trattativa`, `CRM Lead Qualificato` → `CA_Cliente_Firmato`. Il valore default di `CA_Lead_Trattativa` era €260 ed è stato portato a €390 per allineamento al value model.

### Categoria vs valore
Google Ads bidding ottimizza sul **valore**, non sulla categoria — quindi `CA_Cliente_Firmato` con categoria QUALIFIED_LEAD (anziché PURCHASE) non impatta lo Smart Bidding. Cambio categoria rimandato (non critico).

### CA non OCI già presente
`7245136726` — "Invio modulo per i lead (www.sfrattosicuro.it/)", type WEBPAGE_CODELESS, SUBMIT_LEAD_FORM, €0, 90gg, ENABLED. È la CA client-side codeless (triggered da gtag sul site). Coesiste con `CA_Form_Submit` OCI: la client-side cattura il segnale immediato, la OCI lo ri-invia con join GCLID dall'Airtable. Da valutare se deduplicare (paused la codeless) una volta che la pipeline OCI sarà in produzione.

---

## 8. Schema Airtable Cruscotto — campi OCI (IMPLEMENTATO 2026-04-19)

**Base**: `appXqSXlxeLUcR25p`
**Tabella Pratiche**: `tblFT0nl2Tnm4prgN`

| Campo                     | Field ID             | Tipo         | Opzioni / Note                                                                        |
|---------------------------|----------------------|--------------|---------------------------------------------------------------------------------------|
| `GCLID`                   | `fldUDnsIOqGJztXdf`  | singleLineText | Join key verso Google Ads OCI                                                       |
| `Stato Lead`              | `fldb1NhNUgoZhtrgK`  | singleSelect | Nuovo Lead / Lead Sporco / In Trattativa / Cliente Firmato                            |
| `Data Submit`             | `fldI10yekFN1NMdnn`  | dateTime     | tz Europe/Rome — timestamp form submit (= `conversion_date_time` OCI)                 |
| `Data Ultimo Update Stato`| `fldHDsDAfeg81FUjo`  | dateTime     | tz Europe/Rome — trigger ricalcolo upload                                             |
| `CA Inviata`              | `fldIL8AD3U6CCqWyR`  | singleSelect | CA_Form_Submit / CA_Lead_Sporco / CA_Lead_Trattativa / CA_Cliente_Firmato             |
| `Valore Inviato`          | `fldOl0Bd8wFeRUl9V`  | currency EUR | precision 2 — target 0 / 0 / 390 / 1300                                               |
| `OCI Sync Status`         | `fldKkA0nMb87SRzkS`  | singleSelect | Pending / Sent / Error / Skipped                                                      |
| `OCI Sync Last Try`       | `fldGyA5HBEp5szdkA`  | dateTime     | tz Europe/Rome — rate-limiting & retry logic                                          |

### Selection IDs (per script diretti senza describe_table)

**Stato Lead** (`fldb1NhNUgoZhtrgK`):
- `sel9DFKSYuAww9EZW` Nuovo Lead
- `self67Y4eI3cIWmjA` Lead Sporco
- `sel87kacblhVzBPDS` In Trattativa
- `sellRhwxkesEa4lbS` Cliente Firmato

**CA Inviata** (`fldIL8AD3U6CCqWyR`):
- `selXlXlK7voY6x1QM` CA_Form_Submit
- `selWLcdebuJEIwWA7` CA_Lead_Sporco
- `sel2FPSK8iX3dO8mU` CA_Lead_Trattativa
- `selDs6XRRLxpyqnm1` CA_Cliente_Firmato

**OCI Sync Status** (`fldKkA0nMb87SRzkS`):
- `sel18yZ4SoPqEDkrv` Pending
- `selbKf39Nz9iJo34W` Sent
- `selWnTQlOmsJlbMOQ` Error
- `selGvKwDobuReCFqf` Skipped

> **Nota UTM**: i campi UTM (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `keyword`) NON sono stati aggiunti alla tabella Pratiche per evitare bloat. Restano nel cookie `ss_gclid_v1` e nel log `/logs/gclid_staging.jsonl` — se servirà filtrare/segmentare lato Airtable si aggiungeranno in un secondo momento.

---

## 9. TODO immediati (questa sessione)

1. ✅ Recreate questo file memoria con percorsi corretti
2. ✅ Creare `src/components/GclidCaptureIsland.astro` (capture + restore + form patch)
3. ✅ Aggiungere hidden inputs in `ContactFormIsland.astro` e `LandingContactFormIsland.astro`
4. ✅ Includere `GclidCaptureIsland` in `SiteLayout.astro`
5. ⏳ Applicare le patch (manuale via `apply-gclid-patch.ps1` o copia manuale)
6. ⏳ Validare con `npm run build` che `dist/` contenga lo script e i campi
7. ⏳ Decidere strategia per `public/landing/index.html` (statico, fuori layout)

## 10. TODO successivi (sessioni future)

- Verificare/sostituire token Airtable hardcoded in `invia-email.php`
- Identificare chi processa `/logs/gclid_staging.jsonl` (Make / cron / n8n?)
- ✅ Configurate le 4 Conversion Action su Google Ads (2026-04-19, vedi §7)
- ✅ Esteso schema Airtable Cruscotto con i campi OCI (2026-04-19, vedi §8)
- Creare skill `sfratto-ads-gclid-ansalone` per orchestrare il batch OCI giornaliero
- Estendere da UI lookback 30→60gg su `CA_Lead_Sporco` e `CA_Cliente_Firmato`
- Ricreare skills `sfratto-ads-*` (keyword / copy / deploy / audit / strategia) andate perse tra sessioni

---

## 11. Vincoli di business (anti-conflitto)

- Solo locatori / proprietari. Click da inquilini = conflitto di interessi → sempre `Sporco`.
- Filtri di qualifica già presenti nei form (`qualifierQuestion` su `LandingContactFormIsland`).
- Pinning RSA H1+D1 con dicitura "solo proprietari" sui copy (skill `sfratto-ads-copy` quando ricostruita).
- Negative keywords: 7 cluster (self-ID inquilino, vittima passiva, intenti difensivi, controparte, info-only, case types errati, edilizia pubblica).

---

*Questo file è la fonte di verità per lo stato della pipeline GCLID. Aggiornarlo a ogni cambio di stato significativo.*
