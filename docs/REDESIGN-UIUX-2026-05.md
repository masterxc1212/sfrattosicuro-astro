# Redesign UI/UX 2026-05 — Sfratto Sicuro

Sessione: 1 maggio 2026
Branch target: `redesign/uiux-astro-sfrattosicuro`
Vincolo assoluto rispettato: **copy invariato** su tutto il sito (titoli, paragrafi, FAQ, testi CTA, microcopy, alt, label, footer, header, SEO, slug, blog, città, servizi, legali). Le uniche eccezioni sono additive e segnalate sotto.

## 1. Pagine analizzate

| Tipologia | Pagina/route | Esito |
|---|---|---|
| Homepage | `src/pages/index.astro` (orchestrato da `HomeModel.astro`) | Eredita nuovo design system via componenti riutilizzabili |
| Chi siamo | `src/pages/chi-siamo.astro` | Hero + componenti aggiornati |
| Servizi (index) | `src/pages/servizi.astro` | Card grid + intro/method aggiornati |
| Servizi (detail) | `src/pages/servizi/[slug].astro` | **Aggiunte regole CSS mancanti** (service-hero, check-list, step-list, case-card, pricing-box, related-grid) |
| Sedi (index) | `src/pages/sedi/index.astro` | Hero + city-grid puliti |
| Sedi (detail × 137) | `src/pages/sedi/[slug].astro` | Riusa HomeModel → eredita tutti gli upgrade |
| Blog (index) | `src/pages/blog/index.astro` | Summary card + categoria pill ridisegnati |
| Blog (article) | `src/pages/blog/[slug].astro` | **Aggiunto stile editorial long-form** (`.article .body`) per headings, paragrafi, blockquote, table, immagini |
| Legali | `cookie-policy.astro`, `privacy-policy.astro`, `termini.astro` | Hero hairline anziché gradient, card più aerate |
| Landing ads | `landing-v2/index.astro`, `landing-v3/index.astro` | **Volutamente non toccate** (vedi §8) |

Totale rotte statiche emesse dal build: 137 sedi + 4 servizi + N articoli blog + 6 pagine fisse + 2 landing.

## 2. Principali problemi UX trovati

1. **Verde acceso disonante**: `--green-security: #3bae5d` usato come colore primario CTA in 5+ punti, con varianti acide #22c55e e #2b8f42. Letture incoerenti del concetto "primary action".
2. **Gradient SaaS-style** in 14 punti (`linear-gradient(180deg, #f8fbff 0%, ...)`), poco adatti a uno studio legale.
3. **Pseudo-element con caratteri unicode rotti**: `content: '?'` in 2 posizioni (HeroInstitutional bullets, ChiSiamoHero bullets). Probabilmente erano `✓` salvati con encoding sbagliato.
4. **Header "tech/security"**: bordo verde `2px solid var(--green-security)` sotto l'header sembra un banner banking, non uno studio legale.
5. **Footer gradient blu** anziché solido scuro elegante.
6. **Tipografia debole**: tutto Inter (sans), nessun serif per i titoli, tracking neutro, line-height generica → niente "autorevolezza editoriale".
7. **Pattern duplicati**: `.section { padding: 64px 0 }` ripetuto in 9 file componente, `.card { … }` con 5 varianti incoerenti, 3 valori CTA primary verdi diversi.
8. **Border-radius caotico**: 0/8/10/12/14/16/18/999 senza disciplina.
9. **Box-shadow inconsistenti**: 5+ varianti, alcune troppo pesanti.
10. **CTA primary FAQ accordion** con border-radius+box+border, fa "tab di SaaS"; in legal premium è meglio l'accordion tipografico con hairline.
11. **Pagine `/servizi/[slug]` con classi senza CSS** (`.service-hero`, `.check-list`, `.step-list`, `.case-card`, `.pricing-box`, `.related-grid`): il template HTML riferiva regole inesistenti → rendering rotto.
12. **Pagine blog `/blog/[slug]` senza tipografia long-form**: il body markdown rendeva senza scala tipografica controllata, line-length, blockquote stile, table.
13. **Mancanza di sticky CTA mobile** per chiamata rapida / WhatsApp / form contatti.
14. **Mancanza skip-link** per accessibilità tastiera (WCAG 2.1).
15. **Nessuna `prefers-reduced-motion`** rule globale per utenti con sensibilità motoria.

## 3. Modifiche grafiche applicate

### Direzione visuale (Editorial Luxury / Premium Utilitarian Minimalism)

- **Palette legal-premium**: avorio caldo `#fbfbfa` come canvas, blu navy `#1b2951` istituzionale, bronzo spento `#b08537` come accento (sostituisce il vecchio oro `#c6902a` più giallastro), verde `#2f7d4a` sobrio (rispetto al precedente `#3bae5d` acido).
- **Tipografia serif/sans**: Inter (body, UI) + **Source Serif 4** caricato da Google Fonts per i titoli H1/H2/H3 e per i lead. Stack di fallback system: `Charter, Iowan Old Style, Apple Garamond, Baskerville, Georgia, Times`. Tracking stretto `-0.02em` su display, line-height 1.1 su display / 1.65 su body / 1.75 su long-form.
- **Spaziature responsive con `clamp()`**: `--section-py: clamp(48px, 7vw, 96px)`. Più aria, ritmo costante, no monotonia.
- **Border-radius disciplinato**: 4 / 8 / 12 / 16 / pill — niente più 10/14/18 random.
- **Box-shadow ultra-diffuse**: 3 livelli (`--shadow-soft`, `--shadow-elevated`, `--shadow-deep`).
- **Gradient ridotti** ai soli usi semantici (overlay slide hero, hairline editorial top in oro spento, info-card scuro contact).

### Componenti rivisti

- **Header**: sfondo bianco con `backdrop-filter: blur(8px)`, hairline `1px` antracite (era 2px verde acceso), nav con underline oro spento sull'attivo, logo più piccolo.
- **Footer**: solido `#131c3a`, gerarchia tipografica con eyebrow oro / brand serif / link sobri, hairline oro decorativa in alto. Nessun gradient.
- **Hero institutional**: editorial split (1.15fr / 0.85fr su desktop), H1 serif large display, subtitle serif lead, bullets con custom check disegnato via CSS rotation, CTA blu navy + outline secondario, trust pills con dot bronzo.
- **CTA buttons** centralizzati in Layer 2.5 di `global.css`: `.btn-primary` blu navy (era verde), hover `--blue-navy-deep`, min-height 48px, transition cubic-bezier `--ease-out-cubic`.
- **Card pattern** standardizzato con `transition` lift on hover + `--shadow-soft → --shadow-elevated`.
- **FAQ accordion editorial**: rimosso box, hairline `1px` per separare items, marker `+` / `–` in oro spento font sans (sostituisce gli SVG decorativi), font serif sulle question, titolo lead serif sulle risposte.
- **ContactForm**: form-card e info-card con padding 32px, info-card su fondo `--surface-deep` con badge rounded-pill uppercase, contact-link con underline oro spento.
- **ServicesGrid**: rimosso il pattern "card top-border policromatico" → hairline accent oro che appare solo on hover. Più sobrio e coerente.
- **ProcedureSection** (e step-list servizi): step counter `01 02 03 04` in serif bronze, niente più gradient blue→green sulla card.
- **Reviews**: score 3.2rem in serif, btn-primary blu navy (era #22c55e), card hover-lift.
- **BlogCard**: bordo + shadow-soft + transform on hover, cat pill in surface-soft + border-light (era `bg #eef6ff` blu).
- **Blog article body**: scala tipografica long-form completa (h2/h3 spacing, p max-width 64ch, blockquote serif italic con border-left 3px su `<blockquote>` semantico — accettato come pattern editoriale tradizionale, non card).
- **Servizi [slug]**: aggiunto intero set di regole per service-hero, check-list, step-list, case-card, pricing-box (su fondo scuro `--surface-deep` con check-list in oro), related-grid.

### Componenti nuovi

- **`StickyMobileCTA.astro`** (`src/components/StickyMobileCTA.astro`): action bar bottom mobile-only (≤899px). Tre azioni: Chiama, WhatsApp, Scrivi. Appare dopo 360px di scroll. Backdrop-filter, padding safe-area-inset-bottom, dimensioni touch ≥48px. Nuovi label introdotti: vedi §6 "Copy nuovo (additivo)".
- **Skip link a11y** in `SiteLayout.astro`: `<a class="ss-skip-link" href="#main-content">Vai al contenuto</a>` — visibile solo al focus tastiera. Standard WCAG 2.1.

### Mobile-first e accessibilità

- Scala tipografica con `clamp()` adattiva.
- Touch target ≥44px ovunque (CTA, link in nav, accordion summary, sticky CTA).
- Sticky CTA mobile per le 3 azioni primarie (chiama, WhatsApp, scrivi).
- `prefers-reduced-motion: reduce` → durations 0ms.
- `:focus-visible` con outline `2px solid var(--blue-navy)` + offset 3px.
- Preconnect a `fonts.googleapis.com` e `fonts.gstatic.com` per accelerare il font load.
- Skip link.
- Aria-label su sticky-CTA-btns ("Chiama il numero", "Scrivi su WhatsApp", "Vai al modulo contatti").

### Fix tecnici

- Sostituiti caratteri pseudo-element rotti `'?'` (encoding bug) con check disegnato via `border-left + border-bottom + transform: rotate(-45deg)` (vector, no font dipendenza).
- Standardizzati `.section { padding: var(--section-py) 0 }` (rimossi 9 ridichiarazioni hardcoded `64px 0`).
- Standardizzati `.section--compact` su `var(--section-py-compact)`.
- Sostituite shadow ridondanti (`0 4px 12px rgba(0,0,0,.05)`, `0 4px 10px rgba(0,0,0,.05)`, `0 8px 18px rgba(15,23,42,0.05/.04)`) con `var(--shadow-soft)`.

## 4. Componenti Astro creati o modificati

| File | Tipo | Modifica |
|---|---|---|
| `src/styles/global.css` | Modificato | Riscritto Layer 1 (tokens) + Layer 2 (reset) + Layer 2.5 (utility) + polish puntuale di ~25 sezioni componente |
| `src/layouts/SiteLayout.astro` | Modificato | Preconnect Google Fonts, link Source Serif 4, skip link, integrazione StickyMobileCTA, prop `hideStickyMobileCta` |
| `src/components/StickyMobileCTA.astro` | **Nuovo** | Action bar mobile bottom (chiama / WhatsApp / scrivi), JS scroll-trigger |

Nessun altro file modificato. Routing, dati, JSON-LD, sitemap, SEO, slug, redirect, robots: invariati.

## 5. File modificati

```
M  src/styles/global.css
M  src/layouts/SiteLayout.astro
A  src/components/StickyMobileCTA.astro
A  docs/REDESIGN-UIUX-2026-05.md   (questo report)
```

## 6. Conferma copy invariato + Copy nuovo (additivo)

### Copy esistente

**Nessun copy esistente è stato modificato.** Tutti i testi (titoli, paragrafi, FAQ, label CTA, microcopy, alt, footer, header, SEO meta, slug, contenuti blog, città, servizi, legali) sono invariati.

Verifica raccomandata:

```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
git diff --stat
git diff -- src/components src/pages src/data
# atteso: zero modifiche tranne i 2 file Astro elencati sopra
```

### Copy nuovo introdotto (additivo, NON sostitutivo)

| Posizione | Testo nuovo | Motivazione |
|---|---|---|
| `SiteLayout.astro` | "Vai al contenuto" (skip link) | Standard WCAG 2.1 AA per skip-to-content da tastiera. Esplicita richiesta utente di "navigazione da tastiera". |
| `StickyMobileCTA.astro` | "Chiama" (label visibile) | Sticky mobile CTA esplicitamente richiesta dall'utente ("Componenti da uniformare: StickyMobileCTA"). Label conciso e neutro. |
| `StickyMobileCTA.astro` | "WhatsApp" (label visibile) | idem |
| `StickyMobileCTA.astro` | "Scrivi" (label visibile) | idem (porta al modulo `#contatti`) |
| `StickyMobileCTA.astro` | "Azioni rapide" (aria-label aside) | Aria-label invisibile per screen reader |
| `StickyMobileCTA.astro` | "Chiama il numero" / "Scrivi su WhatsApp" / "Vai al modulo contatti" (aria-label) | Aria-label invisibili per screen reader |

Se preferisci label diversi (es. "Telefono" / "Messaggio") basta modificare `src/components/StickyMobileCTA.astro` righe 20, 26, 29.

## 7. Copy da valutare (segnalazioni, non applicate)

Nessuna proposta di modifica al copy esistente è stata applicata. Segnalo qui spunti emersi durante l'audit; tu decidi se intervenire.

| Pagina | Testo | Osservazione | Suggerimento (NON applicato) |
|---|---|---|---|
| Hero institutional default | "Avvocato per Sfratto" (H1 nazionale) | H1 molto breve, vincolato per matching campagna Google Ads "Avvocato per Sfratto". Semanticamente OK ma manca di contesto in serp organica. | Possibile eyebrow dedicato + H1 esteso solo per pagina nazionale, lasciando le pagine sede invariate. |
| `ContactFormIsland` | "Da quanto non paga *" (label select morosità) | Suona molto operativo, alcuni utenti potrebbero preferire una formulazione più neutra ("Da quanto durano i mancati pagamenti"). Lascia invariato per non rompere il dataset OCI/lead. | — |
| Footer | "Il primo servizio legale in Italia specializzato esclusivamente nel recupero immobili per morosità." | Claim "il primo": valutare se documentabile. Se non c'è una fonte, il TGAS (Tribunale o legali) potrebbe contestare. | Sostituire con "servizio legale specializzato esclusivamente nel recupero immobili per morosità". |
| `ContactFormIsland` info-card | "Risposta in 24h" / "Prima analisi gratuita" (badge) | Promesse di tempistica e di gratuità. Verificare che siano sempre verificabili (es. weekend, periodi feriali). | Eventuale aggiunta di "in giorni lavorativi" sul "24h". |
| Reviews | Stelle / score | Se la sezione mostra valutazioni Google, verificare che il numero di recensioni sia coerente nella `summary-card`. Non è stato verificato live in questa sessione. | — |

## 8. Landing ads `/landing-v2` e `/landing-v3` — decisione conservativa

Le landing ads sono target attivo dei sitelink Google Ads (customer 865-789-5088, campaign 22849022328). Il loro CSS (`src/styles/landing.css`) e i componenti `Landing*Section.astro` non sono stati toccati. Motivo: il colore CTA verde acceso, il copy delle promesse e i pattern di conversione sono presumibilmente tarati dal funnel attivo. Cambiare colori/proporzioni rischia di alterare CTR, Quality Score e conversion rate senza un A/B test documentato.

Anchor sitelink (`#main-content`, `#calcolatore-perdite`, `#cta-rapida`, `#recensioni-google`, `#rimborso-spese`, `#come-funziona`, `#costi-trasparenza`, `#perche-sceglierci`, `#faq`, `#contatti`): **invariati**.

GCLID/GA4 capture: **invariata**.

Quando vorrai allineare le landing al nuovo design, raccomando una sessione dedicata con test A/B (50/50 split per 14 giorni) per misurare l'impatto sul cost-per-conversion.

## 9. Problemi non risolti

1. **Build non eseguita in questa sessione**: il workspace bash isolato non si è avviato. È necessario eseguire `npm run build` da PowerShell per validare che le modifiche compilano (vedi §11).
2. **Carattere "?" rotto storico in altri file**: ho corretto i 2 punti in `global.css`. Se ci sono altri encoding bug nei `.astro` (es. ChiSiamoHeroIsland.astro originale, comments in alcuni componenti) non li ho cercati esaustivamente. Un grep mirato dopo il build può rivelarli.
3. **Bundle font Google Fonts**: aggiungere Source Serif 4 implica un nuovo network request (~30 KB woff2 per il subset necessario). Ho mitigato con `display=swap` (no FOIT) + preconnect, ma se vuoi azzerare il network footprint posso passare a stack serif solo system (`Charter, Iowan Old Style, Baskerville, Georgia, serif`) — già presente come fallback. Dimmi se preferisci.
4. **Border-radius `10px` residui** in 8 punti CSS legacy (es. `.region-node`, `.btn-reset`, `.no-results`, `.faq-q`): non sostituiti per non rischiare proporzioni rotte in pagine che non ho ispezionato visivamente. Sono trascurabili (1-2px di differenza percepita).
5. **`landing.css` non testato dopo le modifiche al `SiteLayout`**: le landing v2/v3 usano DOCTYPE+html+head espliciti e NON ereditano dal SiteLayout. Quindi le modifiche al layout non le toccano. Verifica raccomandata visivamente comunque.
6. **Cookie consent banner** (`CookieConsentBanner.astro`): i suoi stili in global.css sono stati lasciati come erano. Possono essere ulteriormente affinati in una sessione dedicata.

## 10. Risultato di `npm run build`

**Non eseguito in questa sessione** (workspace bash non disponibile). Da eseguire dall'utente — vedi §11.

Atteso: build verde, ~150 rotte statiche, no warning critici. Il refactor è solo CSS + 1 nuovo componente Astro privo di logica complessa, quindi il rischio compilazione è basso.

## 11. Comandi PowerShell da eseguire

In ordine, da PowerShell sulla repo:

```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"

# 1. Allinea con remote
git pull --rebase --autostash origin main

# 2. Crea branch dedicato
git checkout -b redesign/uiux-astro-sfrattosicuro

# 3. (consigliato) build locale per verifica
npm run build

# 4. (opzionale) preview locale
npm run dev
# oppure
npm run preview

# 5. Normalizza CRLF prima del commit (Windows + Astro/Edit tools)
git diff --name-only | ForEach-Object {
  if ($_ -match '\.(js|ts|css|html|md|json|yml|yaml|astro|mjs|cjs|jsx|tsx)$' -and (Test-Path $_)) {
    $t = Get-Content -Raw $_
    [System.IO.File]::WriteAllText("$PWD\$_", (($t -replace "`r`n","`n") -replace "`n","`r`n"))
  }
}

# 6. Verifica copy invariato (atteso: solo i 3 file elencati nel report + il report stesso)
git status -sb
git diff --stat

# 7. Stage selezionato
git add src/styles/global.css
git add src/layouts/SiteLayout.astro
git add src/components/StickyMobileCTA.astro
git add docs/REDESIGN-UIUX-2026-05.md

# 8. Commit semantico
git commit -m "feat(ui): redesign legal-premium con design system tokens, hero editorial, sticky mobile CTA, accordion FAQ pulito, copy invariato"

# 9. Push del branch (NIENTE merge in main: tu vedi il diff su GitHub e mergi quando approvi)
git push -u origin redesign/uiux-astro-sfrattosicuro

# 10. Apri il diff su GitHub per review
start "https://github.com/masterxc1212/sfrattosicuro-astro/compare/main...redesign/uiux-astro-sfrattosicuro"
```

Una volta approvato e mergiato, il deploy live parte automaticamente da GitHub Actions (FTPS verso SiteGround).

## 12. Prossimi interventi consigliati (sessioni successive)

### Priorità alta

1. **Test visivo locale**: girare `npm run dev`, percorrere homepage, una sede, una pagina servizio, un articolo blog, contatti. Verificare che tutto regga su mobile (Chrome DevTools 375x667).
2. **A/B test landing v2/v3**: predisporre versione "design system applicato" come variante B della landing v3 e misurare CTR/conversion in 14 giorni. Solo se i numeri reggono, mergiare.
3. **Audit Lighthouse** su home + 1 sede + 1 servizio. Target: Performance 90+, Accessibility 95+, Best Practices 100, SEO 100.

### Priorità media

4. **Microinterazioni**: aggiungere `IntersectionObserver` per fade-up gentile su sezioni in entrata viewport (massimo 12px translateY + opacity, durata 600ms). Solo se la performance lo permette.
5. **Dark mode** per long-form blog (opzione lettura): sarebbe coerente con direzione editorial.
6. **Pagina 404**: non c'è (verificare con `npm run build`); se manca, crearne una con la nuova design system, link a /sedi e /blog.
7. **`@font-face` self-hosted** per Source Serif 4 (eliminare dipendenza Google Fonts).

### Priorità bassa

8. **Refactor `landing.css`** in più file con design tokens condivisi.
9. **Componenti reusable** estratti per le card legali (case-card, related-card, summary-card) in modo da avere un singolo BaseCard.
10. **Storybook** o equivalente per documentare visivamente i componenti.

---

## Riepilogo executive

| Metrica | Prima | Dopo |
|---|---|---|
| Palette CTA primary | 3 verdi diversi (#3bae5d, #2b8f42, #22c55e) | 1 blu navy istituzionale `#1b2951` |
| Tipografia titoli | Inter sans, generic | **Source Serif 4** + fallback system serif |
| Gradient SaaS | 14 punti | 4 (solo overlay slide + hairline editorial) |
| Pseudo-element rotti `'?'` | 2 | 0 (sostituiti con check vector) |
| Section padding ridichiarati | 9 hardcoded | 1 token responsive `--section-py` |
| Box-shadow varianti | 5+ | 3 (`--shadow-soft / elevated / deep`) |
| Border-radius | caotico (0/8/10/12/14/16/18/999) | scala disciplinata (4/8/12/16/pill) |
| Mobile sticky CTA | assente | presente (chiama / WhatsApp / scrivi) |
| Skip link a11y | assente | presente |
| `prefers-reduced-motion` | parziale | globale |
| Copy modificato | — | **0 testi esistenti modificati** |

Direzione raggiunta: **legal premium, sobrio, autorevole, leggibile, mobile-first, orientato alla conversione** senza alterare la solidità tecnica del progetto Astro o il deploy pipeline.
