# Piano "80% unico" — sedi sfrattosicuro.it

**Data:** 2 maggio 2026
**Owner:** Avv. Danilo Ansalone (Sfratto Sicuro)
**Stato:** approvato, esecuzione in pilot da regione Lombardia
**Letture obbligatorie correlate:**
- `docs/seo/vincoli-territorializzazione-sedi.md` (promesse landing + variabili globali)
- `docs/seo/piano-territorializzazione-sedi-2026-05.md` (piano 38% — alternativa low-effort)

## Sintesi esecutiva

L'80% di contenuto davvero unico per pagina territoriale e' soglia da agenzia premium / sito leader di settore. Indicizzazione praticamente garantita anche su dominio debole, ranking di top-3 su keyword "avvocato sfratto {citta}" entro 6-12 mesi.

Effort onesto: **120-180 ore di lavoro totale**, in due trimestri di esecuzione. Il pilot Lombardia (13 sedi) e' la prima fase, ~44 ore, distribuibili su 2-3 settimane part-time.

## Architettura pagina sede ridisegnata

### Cosa SI elimina (boilerplate)

Componenti rimossi dalla pagina sede (restano sulla home):

| Componente | Char eliminati per sede | Motivo |
|------------|--------------------------|--------|
| `WhenPossibleSection` | ~1200 | Definizione generica sfratto, identica ovunque |
| `ProcedureSection` | ~1500 | 4 step identici, sostituibile da link a `/servizi/sfratto-per-morosita/` |
| `TypesSection` | ~600 | 2 card morosita/finita locazione, identiche |
| `TimelineSection` | ~1000 | 4 step timeline, identici |
| `WhyLawyerSection` | ~800 | "Perche un avvocato", boilerplate |
| `StudioSection` | ~600 | Descrizione studio, vive sulla home/chi-siamo |
| `ProvvedimentiIsland` | ~800 | Recensioni stesse per tutte |
| `ReviewsIsland` | ~600 | Idem |
| `TerritoryCoverageSection` | ~700 | "operiamo in Italia" generico |
| **Totale eliminato** | **~7800 char** | Boilerplate scende da ~7000 a ~1500 char per pagina |

### Cosa SI mantiene/territorializza

| Componente | Stato | Char unici per sede |
|------------|-------|---------------------|
| `HeaderIsland` | Invariato | 0 (essenziale) |
| `Breadcrumb` | Invariato | minimo |
| `HeroInstitutionalIsland` -> `HeroLocalIsland` | Riscritto: H1 + sottotitolo specifico tribunale + cita prezzo/tempi da `business-config` | ~300 |
| `JumpNav` | Personalizzato per sede | ~150 |
| `TribunaleInfoSection` | Espanso | ~1200 |
| `ContactFormIsland` | Footer locale con cancelleria | ~200 (numeri locali) |
| `Footer` | Invariato | 0 |

### Cosa SI aggiunge ex-novo (7 nuovi componenti)

#### 1. `MercatoLocaleSection` — dati di mercato della provincia

Dati pubblici raccoglibili da fonti gratuite (Agenzia Entrate, Tecnoborsa, Istat, Confedilizia annual report):
- Canone medio mensile per la citta
- Numero di contratti registrati nella provincia ultimo anno
- Percentuale di morosita stimata nella provincia
- Trend ultimi 3 anni

Char unici per sede: ~600

#### 2. `CancelleriaOperativaSection` — info cancelleria estese

Gia parzialmente in `tribunaleInfo.note`, da esplodere come tabella strutturata:
- PEC e email completa cancelleria
- Telefono diretto e orari ricevimento al pubblico
- Portale prenotazione udienze (URL specifico)
- Modulistica disponibile e link diretti
- Riferimenti del Cancelliere coordinatore se pubblicamente noto

Char unici per sede: ~500

#### 3. `GiurisprudenzaLocaleSection` — orientamenti del foro

Per ogni tribunale, 2-3 riferimenti reali a sentenze pubblicate o orientamenti consolidati della sezione competente in materia di sfratto. Fonti gratuite: De Jure (Giuffré ha alcune sentenze gratuite), portale Justizia.it, blog di altri studi locali.

Char unici per sede: ~700

#### 4. `PartnerLocaliSection` — associazioni e ordini

Per ogni citta:
- UPPI/ASPPI/Confedilizia provinciale
- Camera di Commercio locale
- Ordine degli Avvocati locale
- Federpropietari/Assoinquilini sezione locale

Char unici per sede: ~400

#### 5. `TempiRealiSection` — statistiche giustizia ufficiali

Dati raccolti da `webstat.giustizia.it` (portale ufficiale Ministero):
- Procedimenti civili pendenti nel tribunale
- Tempo medio definizione cause civili nel distretto
- Carico annuale per giudice
- Trend ultimi 3 anni

Char unici per sede: ~400

#### 6. `ZoneServiteSection` — quartieri e comuni del circondario

Lista quartieri della citta principale + comuni del circondario (giurisdizione del tribunale).
Per ogni zona, indicazione tipologia immobiliare prevalente (residenziale, commerciale, ufficio).

Char unici per sede: ~700

#### 7. `StoriaTribunaleSection` — sezione editoriale breve

Paragrafo breve sulla storia del tribunale: anno istituzione, edificio, eventuali ridenominazioni dopo riforme (es. soppressione sezioni distaccate 2013, riforma Cartabia 2022). Aneddoto culturale se rilevante.

Char unici per sede: ~250

### Riscrittura `localAngles`

10-15 varianti narrative diverse calibrate per dimensione citta (grande / media / piccola) e regione (Nord / Centro / Sud / Isole). Ogni variante incorpora 2-3 fatti specifici dal `tribunaleInfo`.

Char unici per sede dopo riscrittura: ~1500 (da ~700 attuali)

### FAQ derivate da `tribunaleInfo`

5-6 FAQ generate da `sezione`, `indirizzo`, `udienze`, `note`, `depositoPCT` + 1 FAQ derivata dai dati di mercato locale + 1 dai partner.

Char unici per sede: ~2000

## Calcolo percentuale finale

| Componente | Char unici | Char boilerplate | Char totali |
|------------|------------|-------------------|-------------|
| Header + Footer + Form essenziale | 0 | 1500 | 1500 |
| Breadcrumb + JumpNav | 200 | 100 | 300 |
| HeroLocal | 300 | 200 | 500 |
| TribunaleInfo (espanso) | 1200 | 200 | 1400 |
| MercatoLocale | 600 | 100 | 700 |
| CancelleriaOperativa | 500 | 100 | 600 |
| GiurisprudenzaLocale | 700 | 100 | 800 |
| PartnerLocali | 400 | 100 | 500 |
| TempiReali | 400 | 100 | 500 |
| ZoneServite | 700 | 100 | 800 |
| StoriaTribunale | 250 | 50 | 300 |
| localAngles (riscritti) | 1500 | 100 | 1600 |
| FAQ derivate | 2000 | 200 | 2200 |
| ContactLocal | 200 | 200 | 400 |
| **Totale** | **8950** | **3150** | **12100** |

Percentuale unico: **8950 / 12100 = 74%**.

Realisticamente con il piano sopra si arriva al **75% medio**, alcune sedi al 80% (Milano, Roma, Napoli con piu dati pubblici disponibili), altre al 70% (piccole citta dove i dati sono meno reperibili).

## Vincolo coerenza con promesse landing

Tutto il contenuto territoriale DEVE rispettare i vincoli di `docs/seo/vincoli-territorializzazione-sedi.md`:
- Compenso EUR 1.300, nessun acconto, pagamento dopo convalida
- Tempi medi 60 giorni con disclaimer
- Solo proprietari/locatori
- Risposta callback entro 2 ore
- Procedura standard 4 fasi

## Pilot Lombardia (prima esecuzione)

13 sedi, ordine di esecuzione: milano, monza, bergamo, brescia, como, varese, pavia, mantova, cremona, lecco, lodi, sondrio, busto-arsizio.

Sequenza step e effort: vedi `docs/seo/vincoli-territorializzazione-sedi.md` sez. 3.1.

**Totale effort pilot Lombardia: ~44 ore** distribuibili su 2-3 settimane part-time.

## Effort totale dettagliato (per estensione completa a 137 sedi)

| Fase | Attivita | Effort |
|------|----------|--------|
| A — Demolizione boilerplate | Rimuovere 9 Section da pagine sede | 4h |
| B — Estensione schema | Allargare `SedeItem` con 7 nuovi campi optional | 6h |
| C1 — Raccolta MercatoLocale | Script Agenzia Entrate + Tecnoborsa per 137 sedi | 12h |
| C2 — Cancelleria estesa | 137 verifiche manuali/scraping portali tribunale | 18h |
| C3 — Giurisprudenza locale | Manuale con AI-assisted, ricerca De Jure / Justizia.it | 25h |
| C4 — Partner locali | UPPI/ASPPI/Confedilizia/CCIAA per 137 citta | 12h |
| C5 — TempiReali | Estrazione webstat.giustizia.it | 8h |
| C6 — Zone servite | Quartieri + circondario, da Wikipedia + ANAC | 15h |
| C7 — Storia tribunale | Paragrafi brevi AI-assisted + review | 8h |
| D — Sviluppo 7 componenti Astro | Componenti riusabili | 28h |
| E — Riscrittura localAngles | 137 x 4 paragrafi, AI-assisted + review | 25h |
| F — FAQ derivate | Refactor `getTerritorialFaq` | 4h |
| G — QA + deploy graduali | Test su sample, build completa, monitoring GSC | 8h |
| H — Hero locale + JumpNav | Riscrittura `HeroInstitutionalIsland` con varianti | 6h |
| **TOTALE** | | **~179 ore** |

## Estensione `SedeItem`

Migration in `src/lib/home-model.ts`:

```typescript
interface SedeItem {
  // campi esistenti...

  mercatoLocale?: {
    canoneMedioMese: number;
    contrattiRegistratiAnno: number;
    moralitaProvincialePct: number;
    trend3Anni: 'crescita' | 'stabile' | 'calo';
    fonteAggiornamento: string;
  };

  cancelleriaEstesa?: {
    pec: string;
    emailDiretta: string;
    telefonoDiretto: string;
    orariRicevimento: string;
    portalePrenotazioni?: string;
    modulisticaUrl?: string;
  };

  giurisprudenzaLocale?: Array<{
    sentenza: string;
    tema: string;
    estratto: string;
    anno: number;
  }>;

  partnerLocali?: {
    uppi?: { nome: string; url: string; tel?: string };
    asppi?: { nome: string; url: string; tel?: string };
    confedilizia?: { nome: string; url: string; tel?: string };
    ordineAvvocati?: { url: string };
    cciaa?: { url: string };
  };

  tempiReali?: {
    procedimentiCiviliPendenti: number;
    tempoMedioDefinizioneMesi: number;
    caricoAnnualePerGiudice: number;
    annoRiferimento: number;
  };

  zoneServite?: {
    quartieri: string[];
    circondario: string[];
    tipologiaImmobiliarePrevalente: string;
  };

  storiaTribunale?: {
    annoIstituzione: number;
    edificio: string;
    note: string;
  };
}
```

Tutti optional → graceful degradation: una sede senza dati avanzati continua a renderizzare come oggi.

## Rischi e contromisure

| Rischio | Probabilita | Contromisura |
|---------|--------------|--------------|
| Dati pubblici non reperibili per piccole citta | Alta su 30+ tribunali periferici | Graceful degradation: se un blocco non ha dati, non viene renderizzato. Sede mantiene 60-70% unico. |
| Dati di mercato cambiano (canoni, % morosita) | Alta (annuali) | Aggiornamento semestrale via script (4-6 ore/anno) |
| Giurisprudenza locale non sempre accessibile gratis | Media | Fallback con orientamenti generali della Cassazione + `tribunaleInfo.note` |
| Componenti Astro nuovi rallentano il build | Bassa | Astro statico, ogni componente e' rendering semplice. CWV invariato. |
| Cliente legge dati di mercato sbagliati | Media | Disclaimer in ogni blocco "Dati indicativi aggiornati a {data}". Nessun consiglio finanziario. |
| Riforma giurisdizione (chiusura tribunale, fusione sezioni) | Media nei prossimi 3 anni | Monitoring Gazzetta Ufficiale + alert automatici. Aggiornamento entro 30 giorni. |

## Decisione necessaria pre-esecuzione

Prima di partire con il pilot Lombardia, l'utente deve confermare:
1. Quale numero whatsapp e' canonico (393291175957 o 393519179179)?
2. Conferma del prezzo EUR 1.300 stabile o c'e' una review prevista?
3. Disponibilita per delegare la raccolta dati territoriali a un assistente/praticante (60+ ore di lavoro delegabile a junior)?

Documento generato il 2 maggio 2026 al termine della sessione GSC e diagnosi template. Per l'esecuzione operativa fare riferimento a `docs/seo/vincoli-territorializzazione-sedi.md`.
