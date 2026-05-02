# Handoff sessione redesign UI/UX — 2 maggio 2026

**Scopo del documento:** ripartire in una nuova chat con tutto il contesto della sessione di redesign legal premium. Da incollare/linkare in apertura della prossima conversazione.

## 1. TL;DR

Ho redesignato il sito Astro `sfrattosicuro.it` in chiave **legal premium** (palette avorio + blu navy + bronzo, tipografia serif/sans con Source Serif 4 + Inter, sticky CTA mobile, accordion FAQ editorial). **Copy invariato al 100%.** Build verde (180 pagine in 2.17s). Manca solo: vedere preview localhost, eventuale polish puntuale, commit + push del branch.

## 2. Stato attuale

### Modifiche applicate (working tree non committato)
- `M src/styles/global.css` — design system completo riscritto (tokens, reset, utility, polish per ~25 sezioni)
- `M src/layouts/SiteLayout.astro` — preconnect Google Fonts (+ Source Serif 4), skip-link a11y, integrazione StickyMobileCTA, prop `hideStickyMobileCta`
- `A src/components/StickyMobileCTA.astro` — nuovo componente mobile bottom-bar (Chiama/WhatsApp/Scrivi)
- `A docs/REDESIGN-UIUX-2026-05.md` — report dettagliato del redesign
- `A docs/SESSION-HANDOFF-2026-05-02.md` — questo file
- `M node_modules/astro/dist/core/logger/vite.js` — patch chirurgica per bug Node.js v24 (vedi §5)

### Branch git
**Branch da creare** (ancora non fatto): `redesign/uiux-astro-sfrattosicuro`

```powershell
git pull --rebase --autostash origin main
git checkout -b redesign/uiux-astro-sfrattosicuro
```

### Build
**Verde.** Output:
```
23:42:41 [build] 180 page(s) built in 2.17s
23:42:41 [build] Complete!
```
Path dist: `C:\Users\danil\.astro-local-builds\retrograde-ring\dist\` (configurato in `astro.config.mjs` per stare fuori da Dropbox).

### Preview
**Da lanciare** quando si riprende:
```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
npx astro preview
```
Apparirà `Preview server running on http://localhost:4321/`.

## 3. Direzione visiva applicata

**Vibe:** Editorial Luxury / Premium Utilitarian Minimalism, su misura per studio legale.

**Palette nuova** (in `:root` di `src/styles/global.css`):
- Canvas: `#fbfbfa` (avorio caldo)
- Blu navy: `#1b2951` (titoli/CTA)
- Bronzo accent: `#b08537` (eyebrow, hairline, dot trust)
- Verde sobrio: `#2f7d4a` (era `#3bae5d` acido)
- Footer scuro: `#131c3a`

**Tipografia:**
- Body / UI: Inter (già caricata)
- Display titles: **Source Serif 4** (Google Fonts, weight 500/600/700, `display=swap`)
- Stack fallback serif: `Charter, Iowan Old Style, Apple Garamond, Baskerville, Georgia, Times`
- Tracking: `-0.02em` su display, `-0.012em` su h2

**Spaziatura:** `--section-py: clamp(48px, 7vw, 96px)` responsive.

**Border-radius:** disciplinato (4/8/12/16/pill) — niente più 10/14/18 random.

**Box-shadow:** 3 livelli (`--shadow-soft / elevated / deep`).

## 4. Problemi tecnici risolti durante la sessione

### A. Workspace bash isolato non disponibile
La sessione Claude non ha potuto eseguire git/npm/bash. Tutte le operazioni shell vanno fatte da PowerShell sull'host. **Impatto sulla nuova chat:** stessa cosa, prepara già di lanciare i comandi tu.

### B. Dropbox blocca i file handle su `node_modules/.vite`
Errore: `EBUSY: resource busy or locked, rename ... node_modules\.vite\deps_temp_* -> deps`.

**Fix permanente** (eseguito):
```powershell
Get-Process Dropbox | Stop-Process -Force   # liberare gli handle
```
Poi marcare le cartelle come ignorate da Dropbox (NB: usare `New-Item` PRIMA di `Set-Content` se la cartella non esiste, altrimenti Set-Content crea un FILE con quel nome):
```powershell
Set-Content -Path ".astro" -Stream com.dropbox.ignored -Value 1 -ErrorAction SilentlyContinue
Set-Content -Path "node_modules" -Stream com.dropbox.ignored -Value 1 -ErrorAction SilentlyContinue
```
Questo è già stato fatto. Per le prossime build, basta tenere Dropbox spento o accettare il piccolo rischio EBUSY occasionale.

### C. Bug Node.js v24 + Astro 5.17.1 (`msg.includes is not a function`)
Errore in `node_modules/astro/dist/core/logger/vite.js:59` durante `cleanupDepsCacheStaleDirs`. Vite passa un Error object al logger di Astro che si aspetta una string.

**Fix applicato manualmente** (riga 53–64 di `vite.js`):
```js
error(msg, opts) {
  if (!isLogLevelEnabled(viteLogLevel, "error")) return;
  logger.hasWarned = true;
  const err = opts?.error;
  if (err) loggedErrors.add(err);
  if (err && isAstroError(err)) return;
  const msgStr = typeof msg === "string" ? msg : (msg && (msg.message || String(msg))) || "";
  if (msgStr.includes("Error when evaluating SSR module") || msgStr.includes("Pre-transform error:")) {
    astroLogger.debug("vite", msgStr);
    return;
  }
  astroLogger.error("vite", msgStr);
},
```

**ATTENZIONE:** questa patch va in `node_modules/` quindi viene **persa al primo `npm install`**. Soluzioni a lungo termine:
1. Aggiornare Astro a versione successiva (verificare se hanno fixato il bug — probabile).
2. Downgradare Node.js a v22 LTS (la versione raccomandata per Astro 5).
3. Usare [`patch-package`](https://github.com/ds300/patch-package) per persistere la patch — `npx patch-package astro` la cattura come diff e la riapplica automaticamente dopo `npm install`.

### D. PowerShell output bufferato (Mark Mode)
Su PowerShell legacy a volte cliccare nella console attiva Mark Mode e congela l'output. Soluzioni: aprire una nuova finestra pulita, oppure passare a Windows Terminal moderno.

### E. Permessi MCP browser su localhost
Claude in Chrome non riesce a navigare/screenshot localhost senza un consenso esplicito che apparentemente non si vede. Workaround: tu fai screenshot manuale (Win+Shift+S) e lo incolli in chat.

## 5. Cosa fare nella nuova chat (in ordine)

### Step 1 — Riapri la conversazione
Carica/menziona questo file (`docs/SESSION-HANDOFF-2026-05-02.md`) e il report `docs/REDESIGN-UIUX-2026-05.md`. Indica al nuovo Claude:

> "Riprendo una sessione di redesign UI/UX di sfrattosicuro.it. Leggi `docs/SESSION-HANDOFF-2026-05-02.md` per il contesto e `docs/REDESIGN-UIUX-2026-05.md` per il report dettagliato. La build è verde, devo solo vedere il preview ed eventualmente fare polish prima del commit."

### Step 2 — Lancia il preview
```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
npx astro preview
```

### Step 3 — Apri http://localhost:4321/
Cammina per le pagine chiave:
- `/` (home)
- `/sedi/salerno/` (sede tipica)
- `/servizi/sfratto-per-morosita/` (servizio detail con check-list, step-list, case-card, pricing-box scuro)
- `/blog/` + un articolo (long-form editorial)
- `/chi-siamo/`, `/privacy-policy/`
- DevTools mobile 375×667 → verifica sticky CTA bar dopo 360px scroll

### Step 4 — Polish iterativo (opzionale)
Se qualcosa non convince visivamente, segnalalo al nuovo Claude. Lui può modificare puntualmente `src/styles/global.css`. Hot-reload del preview è OK.

### Step 5 — Commit + push
Quando sei soddisfatto:

```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"

# Allinea con remote
git pull --rebase --autostash origin main

# Crea branch dedicato
git checkout -b redesign/uiux-astro-sfrattosicuro

# Normalizza CRLF (Windows + Astro/Edit tools mismatch)
git diff --name-only | ForEach-Object {
  if ($_ -match '\.(js|ts|css|html|md|json|yml|yaml|astro|mjs|cjs|jsx|tsx)$' -and (Test-Path $_)) {
    $t = Get-Content -Raw $_
    [System.IO.File]::WriteAllText("$PWD\$_", (($t -replace "`r`n","`n") -replace "`n","`r`n"))
  }
}

# Verifica copy invariato (atteso: solo i 4 file elencati nel report)
git status -sb
git diff --stat -- src/components src/pages src/data
# atteso: zero modifiche al copy

# Stage selezionato (NON aggiungere node_modules)
git add src/styles/global.css
git add src/layouts/SiteLayout.astro
git add src/components/StickyMobileCTA.astro
git add docs/REDESIGN-UIUX-2026-05.md
git add docs/SESSION-HANDOFF-2026-05-02.md

# Commit semantico
git commit -m "feat(ui): redesign legal-premium con design system tokens, hero editorial, sticky mobile CTA, accordion FAQ pulito, copy invariato"

# Push
git push -u origin redesign/uiux-astro-sfrattosicuro

# Apri il diff su GitHub
start "https://github.com/masterxc1212/sfrattosicuro-astro/compare/main...redesign/uiux-astro-sfrattosicuro"
```

Una volta mergiato su `main`, GitHub Actions deploya automaticamente su SiteGround via FTPS.

## 6. Note importanti per la nuova chat

- **Vincolo assoluto da ribadire:** il copy del sito è bloccato. Niente modifiche a titoli, paragrafi, FAQ, CTA, microcopy, alt, label, footer, header, SEO, slug, blog, città, servizi, legali. L'unico copy NUOVO introdotto in questa sessione è additivo: skip-link "Vai al contenuto", e i 3 label sticky CTA "Chiama"/"WhatsApp"/"Scrivi". Tutto documentato nel report §6.
- **Landing `/landing-v2` e `/landing-v3` NON toccate.** Sono target Google Ads attivi (customer 865-789-5088), il copy/colore CTA è probabilmente tarato dal funnel di conversione. Se in futuro vorrai uniformarle al sito, fai prima un A/B test (50/50 split per 14 giorni).
- **Componenti core riutilizzabili = effetto cascade:** ho aggiornato CSS centrali (Header, Footer, Hero, FAQ, ContactForm, ProcedureSection, ServicesGrid, BlogCard, sticky CTA). Le 137 sedi e gli articoli blog ereditano il nuovo design senza tocchi puntuali.
- **File grossi e fragili:** `src/styles/global.css` è ~2944 righe, organizzato in Layer 1 (tokens), Layer 2 (reset+element), Layer 2.5 (utility), Layer 3 (per-component legacy), Layer 4 (sticky mobile CTA). Quando il nuovo Claude tocca questo file, prediligere `Edit` mirate piuttosto che riscritture.

## 7. Path canonici (memo)

| Cosa | Path |
|---|---|
| Repo | `C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro` |
| GitHub | `https://github.com/masterxc1212/sfrattosicuro-astro` (branch `main`) |
| dist locale | `C:\Users\danil\.astro-local-builds\retrograde-ring\dist\` |
| GitHub Actions | `https://github.com/masterxc1212/sfrattosicuro-astro/actions` |
| Sito live | `https://www.sfrattosicuro.it/` |
| Report redesign | `docs/REDESIGN-UIUX-2026-05.md` |
| Handoff (questo file) | `docs/SESSION-HANDOFF-2026-05-02.md` |

## 8. Quick reference comandi

```powershell
# Lavorare sul progetto
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"

# Build pulito (se Dropbox blocca)
Get-Process Dropbox -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .astro -ErrorAction SilentlyContinue
npx astro build 2>&1 | Tee-Object -FilePath build.log

# Preview locale
npx astro preview

# Dev (hot reload, può essere instabile su Dropbox)
npm run dev

# Verificare copy invariato
git diff --stat -- src/components src/pages src/data

# Quante righe ha global.css
(Get-Content src\styles\global.css).Count
```

## 9. Cose ancora da fare (prossimi step)

Da §12 del report:

**Priorità alta**
1. Test visivo locale completo (home + 1 sede + 1 servizio + 1 articolo + contatti).
2. Audit Lighthouse (Performance, A11Y, SEO, Best Practices) su 3 pagine campione.

**Priorità media**
3. Patch persistente per il bug Vite logger via `npx patch-package astro` (oppure aggiornare Astro / downgrade Node 22 LTS).
4. Microinterazioni `IntersectionObserver` per fade-up gentile su sezioni in viewport.
5. Pagina 404 (probabilmente manca).
6. `@font-face` self-hosted di Source Serif 4 (eliminare dipendenza Google Fonts).

**Priorità bassa**
7. A/B test landing v3 con design system applicato.
8. Refactor `src/styles/landing.css` con design tokens condivisi.
9. Componenti reusable per le card legali in `BaseCard.astro`.

---

**Pronto per il restart.** In caso di dubbi: il report `docs/REDESIGN-UIUX-2026-05.md` ha tutti i dettagli (problemi UX trovati, modifiche applicate, file toccati, copy da valutare).
