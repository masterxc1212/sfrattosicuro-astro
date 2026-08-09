# Vincoli operativi territorializzazione sedi — sfrattosicuro.it

**Data ultima revisione:** 2 maggio 2026
**Validita':** permanente, vincolante per ogni sessione di lavoro su sedi/landing/blog
**Letture obbligatorie correlate:**
- `CLAUDE.md` (paths, deploy, line endings)
- `docs/seo/piano-territorializzazione-sedi-2026-05.md` (piano 38%)
- `docs/seo/piano-territorializzazione-sedi-80pct-2026-05.md` (piano 80%, se presente)

> **Per la skill `linkbuilding-sfrattosicuro-ansalone`:** all'avvio di ogni sessione che tocca contenuti delle sedi (`/sedi/{slug}/`), della home (`/`), delle landing (`/landing-v2/`, `/landing-v3/`) o del blog, leggere prima questo file. Le promesse landing qui dichiarate sono vincoli inviolabili: nessun nuovo contenuto puo' contraddirle.

## 1. Promesse landing inviolabili

I contenuti delle landing-v2 / landing-v3 sono il riferimento commerciale di Sfratto Sicuro. Ogni pagina sede o blog DEVE essere coerente con queste promesse. NON si possono scrivere copy che le contraddicano.

| Promessa | Valore | Disclaimer obbligatorio |
|----------|--------|-------------------------|
| Compenso complessivo | **EUR 1.300 fino al rilascio dell'immobile** | Nessun acconto. Pagamento solo dopo la convalida. |
| Tempi convalida | **Mediamente in circa 60 giorni** | "Dato medio operativo, non promessa assoluta. I tempi dipendono dal Tribunale competente e dall'eventuale opposizione dell'inquilino." Sempre presente quando si cita il dato. |
| Prima consulenza | **Gratuita e senza impegno** | — |
| Risposta callback | **Entro 2 ore** | Solo in orario d'ufficio (Lun-Ven 9-19, Sab 9-13) |
| Pubblico | **Solo proprietari/locatori** | "Nessuna assistenza per inquilini o richieste puramente informative." |
| Spese legali | **Possono essere poste a carico dell'inquilino moroso** | Modale, non garantito ("...nella pronuncia di convalida, il Giudice puo'...") |
| Procedura standard | **4 fasi: analisi, predisposizione atti, notifiche e deposito, udienza e convalida** | Se necessario, prosecuzione fino al rilascio inclusa nel compenso |
| Operativita' | **Tutta Italia tramite rete di domiciliatari** | 137 sedi/tribunali coperti |
| Orari studio | **Lun-Ven 9:00-19:00, Sabato 9:00-13:00** | Source of truth: `site.json:openingHoursSpecification` |

### Eccezione temporanea approvata: V3 Agosto 2026

Solo per la landing `/landing-v3-agosto/`, il compenso promozionale e' **EUR 1.000 IVA e cassa incluse** invece di EUR 1.300, a condizione che il mandato professionale venga sottoscritto entro il 31 agosto 2026. Restano invariati il perimetro del servizio, l'assenza di acconti, il pagamento dopo l'udienza di convalida, l'esclusione delle spese vive e l'eventuale preventivo separato per il giudizio di merito in caso di opposizione. La promozione e' centralizzata in `business-config.json:pricing.promozioni.agosto2026` e non modifica il prezzo ordinario delle altre pagine.

**Esempi di copy compatibile / non compatibile:**

OK Compatibile: *"Al Tribunale di Milano la prima udienza arriva mediamente in 30-45 giorni — un tempo coerente con il dato medio operativo di circa 60 giorni dichiarato nella nostra formula a compenso complessivo di EUR 1.300."*

KO Non compatibile: *"A Milano gestiamo la pratica con tariffe agevolate per i nostri clienti."* (prezzo non specificato, contraddice il EUR 1.300 fisso)

KO Non compatibile: *"Garantiamo la convalida in 60 giorni."* (manca il disclaimer "dato medio, non promessa")

KO Non compatibile: *"Anticipiamo il 30% al deposito."* (contraddice "nessun acconto")

## 2. Variabili globali — stato attuale e gap

### 2.1 Mappatura punti hardcoded (snapshot 02/05/2026)

| Variabile | Centralizzata? | Punti hardcoded da migrate |
|-----------|----------------|------------------------------|
| `email` (consulenza@sfrattosicuro.it) | OK in `site.json:organization.email` | OK |
| `telephone` | Parziale: `site.json` ha "+39 02 8089 8395" (con spazi) ma altri file usano "+39 02 80898395" (senza spazi) → **INCOERENZA** da risolvere | 8+ componenti landing, `public/errore.html`, `public/grazie.html`, `landing-original.ts`, `landing-v2.ts` |
| `whatsappUrl` | **CANONICO confermato 02/05/2026: `393291175957` (+39 329 117 5957)**. Il secondo numero `393519179179` in `social.whatsapp`/`errore.html`/`grazie.html` va sostituito col canonico in occasione della migration. | `public/errore.html`, `public/grazie.html`, `site.json:social.whatsapp` da allineare al canonico |
| Prezzo EUR 1.300 | NO, hardcoded | 16 punti: `landing-original.ts`, `landing-configs.json`, `blog-posts.ts`, 5+ componenti `landing/*` |
| Tempi 60 giorni | NO, hardcoded | 18+ punti: `HeroInstitutionalIsland`, `TimelineSection`, `FaqIsland`, `blog-posts.ts`, `landing-*` |
| Orari studio | OK in `site.json:openingHoursSpecification` (struttura) | Stringa "Lun-Ven 9-19, Sab 9-13" hardcoded in `landing-v2.ts` |
| Procedura 4 fasi | NO (definita in `landing-original.ts`) | Replica in `TimelineSection`, `ProcedureSection` |

### 2.2 Struttura proposta `src/data/business-config.json`

```json
{
  "pricing": {
    "compensoComplessivo": 1300,
    "compensoFormatted": "EUR 1.300",
    "compensoFormattedLong": "EUR 1.300 fino al rilascio dell'immobile",
    "modalita": "Nessun acconto. Pagamento solo dopo la convalida dello sfratto."
  },
  "tempi": {
    "convalidaMedia": "circa 60 giorni",
    "convalidaMediaShort": "~60 gg",
    "rispostaCallback": "entro 2 ore",
    "disclaimerStandard": "Dato medio operativo, non promessa assoluta. I tempi dipendono dal Tribunale competente e dall'eventuale opposizione dell'inquilino."
  },
  "garanzie": {
    "consulenzaIniziale": "gratuita",
    "soloProprietariLocatori": true,
    "rispostaCallback": "Ti richiamiamo entro 2 ore",
    "speseInquilino": "Le spese legali possono essere poste a carico dell'inquilino moroso (a discrezione del Giudice)."
  },
  "orari": {
    "settimanaLabel": "Lun-Ven 9:00-19:00",
    "sabatoLabel": "Sabato 9:00-13:00",
    "labelCompatto": "Lun-Ven 9-19 - Sab 9-13"
  },
  "procedura": {
    "fasi": [
      { "n": 1, "giorni": "1-7",  "titolo": "Analisi del caso", "descrizione": "Valutazione iniziale della pratica e definizione della strategia." },
      { "n": 2, "giorni": "8-15", "titolo": "Predisposizione atti", "descrizione": "Intimazione di sfratto e citazione per convalida." },
      { "n": 3, "giorni": "16-30","titolo": "Notifiche e deposito", "descrizione": "Gestione delle notifiche e del deposito presso il Tribunale competente." },
      { "n": 4, "giorni": "31-60","titolo": "Udienza e convalida", "descrizione": "Assistenza in udienza per ottenere il provvedimento di convalida. Solo dopo questa fase viene richiesto il pagamento." }
    ]
  },
  "contatti": {
    "telefonoFormatted": "+39 02 8089 8395",
    "telefonoTelLink": "tel:+390280898395",
    "telefonoCanonical": "+390280898395",
    "email": "consulenza@sfrattosicuro.it",
    "whatsappPrincipale": {
      "numero": "+39 329 117 5957",
      "url": "https://wa.me/393291175957",
      "uso": "default canonico per pagine sede, home, landing"
    }
  }
}
```

### 2.3 Workflow operativo permanente

1. **MAI hardcodare** un valore di business in nuovi componenti, sedi, blog. Sempre `import` da `business-config.json` (o helper `lib/business.ts`).
2. **Quando si modifica** un valore (es. prezzo o numero telefono): cambiare SOLO `business-config.json` → push → propagazione automatica a tutte le pagine al build successivo.
3. **Migration progressiva**: ogni volta che si tocca un componente per altri motivi, sostituire eventuali hardcoded con import dal config.
4. **Eccezione**: file in `public/php/`, `public/errore.html`, `public/grazie.html` sono statici e non passano per il build Astro → vanno aggiornati a mano. Documentare nel commit quando si modificano.
5. **Audit periodico**: ogni 3 mesi, fare grep su numeri/prezzi/email nei file componenti per scoprire nuovi hardcoded introdotti per errore.

## 3. Pilot Lombardia — prima esecuzione del piano 80%

13 sedi nell'ordine di esecuzione raccomandato (per dimensione mercato + appartenenza al cluster Crawled-not-indexed da risolvere prioritariamente):

1. **milano** — capoluogo, gia' indicizzata, banco di prova qualita'
2. **monza** — provincia gia' attiva, alto volume sfratti
3. **bergamo** — capoluogo, alta domanda
4. **brescia** — capoluogo, alta domanda
5. **como** — capoluogo, mercato medio
6. **varese** — capoluogo, mercato medio
7. **pavia** — IN "Crawled-not-indexed" → priorita' di recupero
8. **mantova** — capoluogo, mercato medio
9. **cremona** — capoluogo, mercato basso-medio
10. **lecco** — capoluogo, mercato basso
11. **lodi** — capoluogo, mercato basso
12. **sondrio** — capoluogo, mercato basso
13. **busto-arsizio** — sezione distaccata storica, mercato medio

Tutte e 13 hanno `tribunaleInfo` gia' popolato. Nessuna ha FAQ personalizzate o `officeAddress` reale.

### 3.1 Sequenza esecuzione raccomandata

| # | Cosa | Effort | Output |
|---|------|--------|--------|
| 1 | Creare `src/data/business-config.json` con la struttura di sez. 2.2 | 1h | File centrale + helper `lib/business.ts` |
| 2 | Migrate `LandingOriginalHeroSection`, `FaqSection`, `TimelineSection` per leggere da business-config | 2h | Sostituzione di ~30 hardcoded |
| 3 | Estendere `SedeItem` (in `lib/home-model.ts`) con i 7 campi del piano 80% (mercatoLocale, cancelleriaEstesa, giurisprudenzaLocale, partnerLocali, tempiReali, zoneServite, storiaTribunale) tutti optional | 1h | Schema esteso, sedi.json migration zero-impact |
| 4 | Sviluppare i 7 componenti Astro (`MercatoLocaleSection`, `CancelleriaOperativaSection`, `GiurisprudenzaLocaleSection`, `PartnerLocaliSection`, `TempiRealiSection`, `ZoneServiteSection`, `StoriaTribunaleSection`) leggendo da business-config + sede.* | 12h | Componenti pronti, testati su Milano |
| 5 | Raccolta dati territoriali per le 13 sedi Lombardia | 18h | sedi.json popolato per le 13 sedi LOM con i 7 nuovi blocchi |
| 6 | Riscrittura `localAngles` Lombardia con varianti reali e promesse coerenti | 4h | sedi.json riscritto per 13 sedi |
| 7 | Refactor `getTerritorialFaq()` per generare FAQ da `tribunaleInfo` + `business-config` | 2h | FAQ uniche per ogni sede LOM |
| 8 | Demolizione boilerplate: rimuovere 6-9 Section dalle pagine sede (flag `isNazionale` in `HomeModel.astro`) | 1h | Pagine sede ~5500 char piu' leggere |
| 9 | Build locale + test su `/sedi/milano/`, `/sedi/pavia/`, `/sedi/sondrio/` | 2h | `verify-site-surface` OK |
| 10 | Commit + push -> deploy SiteGround | 0.5h | Deploy live |
| 11 | URL Inspection in GSC su 5 sedi LOM + Request indexing | 0.5h | GSC notificato |
| 12 | Monitor settimanale GSC Pages report | continuo | Verifica recupero indicizzazione |

**Totale effort pilot Lombardia: ~44 ore** (proiezione conservativa). Distribuibile su 2-3 settimane part-time.

### 3.2 Vincolo coerenza promesse per ogni sede LOM

Ogni paragrafo scritto per le sedi Lombardia DEVE incorporare almeno una delle promesse della sezione 1 in forma coerente.

**Esempio pattern di scrittura sede:**

> *"Al Tribunale di [CITTA'], la procedura di sfratto per morosita' segue il nostro percorso operativo standard: analisi del caso, predisposizione degli atti, deposito presso la cancelleria di [SEZIONE COMPETENTE] e udienza di convalida. La prima udienza e' generalmente fissata in [TEMPI LOCALI da tribunaleInfo.udienze] — un tempo coerente con il nostro dato medio operativo di circa 60 giorni. Il compenso complessivo di EUR 1.300 copre l'intero iter fino al rilascio dell'immobile, senza acconti."*

Questo pattern incorpora 4 promesse (procedura 4 fasi, tempi 60gg, compenso 1.300, nessun acconto) + dato unico territoriale (sezione, tempi locali).

## 4. Estensione alle altre 124 sedi (post-pilot)

Solo se il pilot Lombardia mostra miglioramento concreto in GSC (es. da 1-2 sedi indicizzate del cluster Lombardia a 10+ entro 4 settimane), si estende il piano alle altre 124 sedi. Effort proiettato 80-100 ore aggiuntive (la maggior parte componenti gia' sviluppati, resta raccolta dati territoriali).

Ordine di rollout post-pilot: Lazio (10 sedi) → Campania (12 sedi) → Veneto (10 sedi) → Piemonte (8 sedi) → Sicilia (12 sedi) → Puglia (8 sedi) → Toscana (7 sedi) → poi le minori.

## 5. Reportistica e tracciamento

Ogni intervento territoriale che si fa in una sessione deve produrre:
1. Un commit con messaggio prefisso `[seo-sedi]` per essere filtrabile.
2. Una nota in `docs/seo/log-territorializzazione.md` (file da creare, ogni sessione aggiunge una entry datata).
3. Eventuale aggiornamento di GSC URL Inspection per le sedi modificate.
