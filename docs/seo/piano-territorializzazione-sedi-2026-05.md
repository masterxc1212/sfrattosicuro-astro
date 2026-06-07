# Piano territorializzazione sedi — sfrattosicuro.it

**Data:** 2 maggio 2026
**Owner:** Avv. Danilo Ansalone (Sfratto Sicuro)
**Skill di riferimento:** `linkbuilding-sfrattosicuro-ansalone` (Fasi 5-7: technical SEO, GSC, indicizzazione)
**Stato sessione:** piano approvato, esecuzione rimandata.

## Sintesi esecutiva

Sfrattosicuro.it ha un problema di indicizzazione critico: solo **35 pagine in indice Google su 178** in sitemap. Le restanti 158 pagine sono in stato "Discovered" o "Crawled, currently not indexed". La causa radice e' una combinazione di **autorita di dominio bassa** (DR/DA insufficienti per giustificare 137 pagine sede + 27 blog) e **boilerplate template** (le pagine sede sono al ~90% identiche tra loro e alla home, solo il `tribunaleInfo` rappresenta contenuto davvero unico).

Il piano interviene sull'aspetto template, sfruttando i dati territoriali gia presenti in `sedi.json` (137/137 sedi arricchite) per riequilibrare il rapporto unicita/boilerplate da ~10/90 a ~40/60. Quattro interventi non distruttivi, tutti reversibili via git, effort totale ~6-9 ore.

## Diagnosi GSC (snapshot 2 maggio 2026)

Account GSC: `sfrattosicuro@gmail.com` (property `sc-domain:sfrattosicuro.it`). Verificato che `danilo.ansalone@gmail.com` non ha accesso alla property.

### Numeri chiave

| Metrica | Valore | Lettura |
|---------|--------|---------|
| Pagine indicizzate | 35 | Critico — atteso ~150-180 |
| Pagine non indicizzate | 158 (6 motivi) | 80% del catalogo fuori indice |
| Sitemap | 178 URL, stato "Riuscita", ultima lettura 1 mag 2026 | Sitemap funziona, problema non e' qui |
| Performance 28gg | 20 clic / 381 impressioni / CTR 5.2% / pos 6.6 | Solo brand traffic genera click |
| CWV mobile | 2 URL buoni, 0 scadenti | Pochi dati CrUX (poco traffico), non e' un problema |
| Manual Actions | Nessun problema | OK |
| Security Issues | Nessun problema | OK |

### Composizione delle 158 non indicizzate

| Motivo GSC | Pagine | Composizione effettiva |
|-----------|--------|------------------------|
| Rilevata, ma attualmente non indicizzata (Discovered) | 128 | 28 blog + 89 sedi + 7 servizi + 4 istituzionali |
| Pagina scansionata, ma attualmente non indicizzata (Crawled) | 18 | 17 sedi (Sassari, Pesaro, Agrigento, Matera, Treviso, Perugia, Bolzano, Crotone, Paola, Catania, Campobasso, Avezzano, Pavia, Fermo, Palmi, Pordenone, Genova) + 1 blog |
| Non trovata (404) | 5 | Da indagare |
| Esclusa per "noindex" | 4 | Probabilmente preview-sede/ o blog-astro-backup/ |
| Pagina con reindirizzamento | 2 | Normale |
| Pagina alternativa con canonical appropriato | 1 | Normale |

### Performance 28 giorni — query

| Query | Clic | Impr | CTR | Pos |
|-------|------|------|-----|-----|
| sfratto sicuro (brand) | 7 | 17 | 41.2% | 1.0 |
| avvocato sfratti taranto | 0 | 4 | 0% | 4.2 |
| avvocato sfratti locazioni verona | 0 | 2 | 0% | 10.0 |
| avvocato per inquilino moroso | 0 | 2 | 0% | 26.5 |
| google legal support phone number | 0 | 1 | 0% | 1.0 |
| legal services near me | 0 | 1 | 0% | 1.0 |

8 query totali. Solo brand genera click. Le keyword commerciali non rankano.

### Spike osservato

Tra inizio e meta aprile 2026 c'e' stato uno spike: da ~49 indicizzate a 143 non indicizzate. Probabile pubblicazione massiva di sedi e blog senza autorita sufficiente per assorbirli — Google ha messo tutto in coda Discovered.

## Diagnosi del template

### Struttura condivisa

Home (`/`) e ogni sede (`/sedi/{slug}/`) usano lo stesso componente `src/components/HomeModel.astro` (120 righe). La differenziazione avviene solo nei prop (`sedeSlug`, `breadcrumb`, `introText`, ecc.).

Sezioni renderizzate in ordine fisso:
HeaderIsland → PageJumpNav → HeroInstitutional → SedeIdentity → TerritorialCta → introText → WhenPossibleSection → ProcedureSection → TypesSection → TimelineSection → TribunaleInfoSection → WhyLawyerSection → TerritoryCoverageSection → StudioSection → ProvvedimentiIsland → ReviewsIsland → BlogSection → FaqSection → ContactFormIsland → Footer.

### Cosa e' boilerplate

Componenti `*Section.astro` (WhenPossibleSection, ProcedureSection, TypesSection, TimelineSection, WhyLawyerSection, StudioSection) hanno markup IDENTICO tra home e sede. Variazione minima: 1-2 frasi che includono `{citta}` e `{tribunale}` quando `sedeSlug !== 'nazionale'`.

### Cosa e' davvero unico per sede

Solo:
- `TribunaleInfoSection` (renderizza `tribunaleInfo` reale, ~400-1000 char unici)
- `SedeBlogLinksIsland` (link a blog correlati)
- Schema JSON-LD con `LegalService` territoriale + `BreadcrumbList`

### Cosa e' pseudo-unico

Tutti i campi in `sedi.json` che oggi sono template-string con `[citta]` sostituito:
- `intro` (182 char identici per tutte le sedi)
- `localAngles.openingAngle` (196 char identici)
- `localAngles.protocolAngle` (210 char identici)
- `localAngles.courtAngle` (154 char identici)
- `localAngles.closingAngle` (149 char identici)
- 4 FAQ generate da `getTerritorialFaq()` fallback

Verificato confrontando Genova vs Milano vs Sassari: testi sovrapponibili al char.

### Stato dei dati territoriali

Verificato su tutte le 137 sedi via Node script:
- 137/137 hanno `seoVars` (title/description) personalizzati
- 137/137 hanno `intro` e `localAngles` popolati (ma con boilerplate template-string)
- 137/137 hanno `tribunaleInfo` ricco (indirizzo, sezione, depositoPCT, udienze, note)
- **0/137 hanno FAQ personalizzate** (tutte usano fallback)
- **0/137 hanno `officeAddress` reale** (tutte usano indirizzo nazionale)

## I quattro interventi

### Intervento 1 — FAQ generate da `tribunaleInfo`

Impatto: alto. Effort: 1-2 ore. Rischio: basso.

**File:** `src/lib/home-model.ts` (funzione `getTerritorialFaq`).

**Cosa cambia:** sostituire le 4 FAQ fallback identiche con 5-6 FAQ derivate da `sede.tribunaleInfo`.

**Esempio per Genova** (output del nuovo `getTerritorialFaq`):

> Q: "Dove si trova il Tribunale di Genova competente per gli sfratti?"
> A: "Il Tribunale di Genova ha sede al Palazzo di Giustizia, Piazza Portoria 1, 16121 Genova. La sezione che si occupa di sfratti per morosita e finita locazione e' la III Sezione Civile."
>
> Q: "Quando si tengono le udienze di convalida al Tribunale di Genova?"
> A: "Le udienze di convalida si tengono il venerdi mattina dalle 9:00. Per i procedimenti non contestati la prima udienza e' generalmente fissata entro 30-45 giorni dalla notifica."
>
> Q: "Come si deposita il ricorso per sfratto a Genova?"
> A: "Il deposito e' esclusivamente telematico via PCT. Una prassi locale prevede di contattare la cancelleria al 335.7764277 prima della notifica per coordinare le date."

**Test:** rendering su `/sedi/genova/`, `/sedi/milano/`, `/sedi/sassari/`.
**Rollout:** singolo commit, modifica pure logic, niente data migration.
**Output per sede:** ~1500 char unici.

### Intervento 2 — Riscrittura `localAngles` con fatti concreti

Impatto: alto. Effort: 2-3 ore. Rischio: medio (modifica massiva al data file).

**File:** `src/data/sedi.json` (137 record, campi `localAngles.openingAngle`, `protocolAngle`, `courtAngle`, `closingAngle`).

**Cosa cambia:** i 4 paragrafi attualmente identici diventano paragrafi che incorporano almeno un fact concreto dal `tribunaleInfo` di quella sede.

**Approccio:** script Node `scripts/rewrite-local-angles.mjs` che rigenera in batch, con review manuale di 5-10 sedi prima del rollout.

**Esempio openingAngle riscritto per Genova:**

> Prima: "A Genova assistiamo proprietari e locatori nella procedura di sfratto, con focus su sfratto per morosita, presidio del Tribunale di Genova e gestione completa..."
>
> Dopo: "A Genova lo sfratto per morosita si svolge davanti alla III Sezione Civile del Tribunale, in Piazza Portoria 1. Le udienze di convalida sono fissate il venerdi alle 9:00, con la prima udienza generalmente entro 30-45 giorni dalla notifica. Conoscere il calendario locale ci permette di programmare la pratica con tempi prevedibili."

**Output per sede:** ~700 char trasformati da boilerplate a quasi-unici.

### Intervento 3 — `TribunaleInfoSection` promosso a primo fold

Impatto: medio-alto. Effort: 1-2 ore. Rischio: basso.

**File:** `src/components/HomeModel.astro` (riordino sezioni).
**Opzionale:** nuovo `src/components/TribunaleHeroBlock.astro` arricchito (mappa Google embed via iframe, badge sezione, contatti cancelleria).

**Cosa cambia:** `TribunaleInfoSection` (oggi a meta pagina) viene spostato subito dopo `HeroInstitutionalIsland`, in posizione "above the fold". Il dato unico diventa visibile per primo a Googlebot e all'utente.

**Add-on opzionale:** mappa Google embed gratuita con coordinate del tribunale → +500 char di markup unico per sede.

**Test:** visual check su 3 sedi + Lighthouse (CWV non deve peggiorare).

### Intervento 4 — Territorializzare 3 Section core

Impatto: medio-alto. Effort: 2 ore. Rischio: basso.

**File:** `src/components/TimelineSection.astro`, `WhyLawyerSection.astro`, `TypesSection.astro`.

**Cosa cambia:** ogni Section guadagna 1-2 paragrafi che incorporano `tribunaleInfo` quando `sedeSlug !== 'nazionale'`.

**Esempi:**
- TimelineSection: dopo i 4 step, blocco con orari udienze e modalita deposito specifici della sede.
- WhyLawyerSection: paragrafo che cita la prassi locale o la sezione competente.
- TypesSection: riga sotto le card morosita/finita locazione che indica quale sezione del tribunale tratta questi casi.

**Output per sede:** +600-800 char unici aggiuntivi.

## Stima impatto consolidato

Dopo i 4 interventi, su pagina sede:

| Tipo contenuto | Char prima | Char dopo | Delta |
|----------------|------------|-----------|-------|
| Boilerplate condiviso | ~7000 | ~5500 | -1500 |
| Pseudo-unico | ~2000 | ~1000 | -1000 |
| Davvero unico | ~700 | ~4000 | +3300 |

Risultato: da ~10% a ~38% di contenuto unico per sede, senza scrivere contenuti nuovi a mano (tutto deriva dai dati `tribunaleInfo` gia presenti).

## Ordine di rollout proposto

| Step | Intervento | Quando | Verifica |
|------|-----------|--------|----------|
| 1 | FAQ da tribunaleInfo (intervento 1) | Subito | Deploy + URL Inspection su 5 sedi + Request indexing |
| 2 | Section core territorializzate (intervento 4) | +3 giorni | Deploy + confronto rendering home vs sede |
| 3 | TribunaleInfoSection in primo fold (intervento 3) | +1 settimana | Visual check + CWV invariati |
| 4 | Riscrittura localAngles (intervento 2) | +2 settimane | Diff git review + URL Inspection su 10 sedi |

**Monitor continuo:** check GSC Pages report ogni 7 giorni (lunedi mattina). Target intermedio: passare da 35 a 80+ pagine indicizzate entro 6-8 settimane dal completamento del piano.

**Tempo atteso per effetti su GSC:** 2-6 settimane dopo ogni deploy. Le 17 sedi in "Crawled-not-indexed" sono le prime candidate al recupero (Google le ha gia lette, basta che siano riconosciute come uniche al prossimo crawl).

## Cose escluse volutamente

- Non si tocca il blog (27 articoli ben fatti, non sono il problema).
- Non si rimuovono pagine sede (il problema NON e' "troppe sedi").
- Non si scrivono contenuti a mano per 137 citta (sarebbe il vero best ma e' 50+ ore).
- Non si aggiunge `officeAddress` finto (rischio Google se non e' reale).

## Cose da fare in parallelo (fuori scope di questo piano)

Il piano non risolve da solo il problema dell'autorita del dominio. In parallelo va eseguito:
- Link building dofollow (Fasi 1-3 della skill `linkbuilding-sfrattosicuro-ansalone`).
- Partnership con associazioni proprietari (UPPI, ASPPI, Confedilizia) per backlink + clienti.
- Audit backlink attuali via Ubersuggest MCP per misurare DR baseline.

## Riferimenti tecnici

- File chiave: `src/components/HomeModel.astro`, `src/lib/home-model.ts`, `src/data/sedi.json`, `src/pages/sedi/[slug].astro`.
- Workflow deploy: `git push origin main` → GitHub Actions → SiteGround FTPS (vedi `CLAUDE.md`).
- Build locale: `npm run build` → output in `~/.astro-local-builds/retrograde-ring/dist`.
- QA post-build: `scripts/verify-site-surface.mjs`.

## Prossimo passo

Riprendere da intervento 1 (FAQ da tribunaleInfo). Passi:
1. Aprire `src/lib/home-model.ts` e leggere la funzione attuale `getTerritorialFaq`.
2. Riscriverla generando 5-6 FAQ da `sede.tribunaleInfo` (sezione, indirizzo, udienze, note, depositoPCT).
3. Verificare rendering locale su `/sedi/genova/`, `/sedi/milano/`, `/sedi/sassari/`.
4. Commit + push + monitor GSC dopo 2 settimane.

Documento generato il 2 maggio 2026 al termine della sessione GSC. Per riprendere usare la skill `linkbuilding-sfrattosicuro-ansalone` e fare riferimento a questo file.
