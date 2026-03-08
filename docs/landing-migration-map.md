# SfrattoSicuro — Mapping migrazione landing

## Scope step
Migrare la landing attuale (`ftp/public_html/index.html`) in Astro su URL dedicato:
- **from**: `/`
- **to**: `/landing-nazionale.html`

Obiettivo: preservare SEO, performance pattern e funzionalità (form, reviews, video, provvedimenti).

---

## 1) Mapping URL e routing

- **Nuova route landing**: `src/pages/landing-nazionale.html.astro`
  - output: `/landing-nazionale.html`
- **Nuova Home istituzionale**: resta su `src/pages/index.astro` -> `/`
- **Link interni della landing**: ancore `#...` invariabili (stesso documento)
- **Canonical landing**: aggiornare da `https://www.sfrattosicuro.it/` a `https://www.sfrattosicuro.it/landing-nazionale.html`

### Redirect consigliati (fase deploy)
- Nessun redirect 301 immediato da `/` a landing (il nuovo sito istituzionale deve vivere su `/`).
- Mantenere accessibile la landing dedicata come pagina campagne/ads.

---

## 2) Mapping file statici (riuso)

Sorgente mirror:
- `ftp/sfrattosicuro.it/public_html/assets/**`
- `ftp/sfrattosicuro.it/public_html/.well-known/**`
- `ftp/sfrattosicuro.it/public_html/{privacy.html,cookie-policy.html,termini-condizioni.html,grazie.html,errore.html,robots.txt,sitemap.xml}`

Target Astro (public):
- `public/assets/**` ✅ già presenti
- `public/.well-known/**` ✅ già presenti
- `public/{privacy.html,cookie-policy.html,termini-condizioni.html,grazie.html,errore.html,robots.txt,sitemap.xml}` ✅ già presenti

Nota: in landing esistono link footer a `/privacy-policy`, `/cookie-policy`, `/termini` che non matchano i file attuali (`*.html`). Da riallineare.

---

## 3) Mapping CSS/JS critici

### CSS
- `index.html` usa:
  - CSS inline critico in `<style>`
  - `assets/css/style.css` deferred (`media=print` + onload)
- In Astro landing mantenere stesso pattern per parity PageSpeed.

### JS
Dipendenze landing:
- `/assets/js/calculator.js`
- `/assets/js/reviews.js`
- `/assets/js/videos.js`
- `/assets/js/main.js`
- opzionali/legacy: `/assets/js/form-validation.js`, `/assets/js/provvedimenti-loader.js`

Strategia:
- Prima migrazione: riuso 1:1 script esistenti.
- Fase successiva: consolidamento in isole Astro con progressive enhancement.

---

## 4) Mapping backend PHP richiesto

Endpoint necessari alla landing:
- `POST /php/invia-email.php` (form lead + redirect)
- `GET /php/get-reviews.php` (Google reviews + cache)
- `GET /php/provvedimenti.php` (gallery dinamica)

Opzioni deploy:
1. **Short term**: mantenere endpoint PHP in ambiente server (subfolder o reverse proxy).
2. **Mid term**: porting verso API/serverless, rimuovendo dipendenza PHP runtime.

Requisito minimo per non bloccare landing: endpoint disponibili con stessi path.

---

## 5) Mapping SEO (must preserve)

Elementi da portare in landing dedicata:
- Title, meta description, robots
- OpenGraph + Twitter
- JSON-LD:
  - `LegalService`
  - `Organization` (x2, da valutare dedup)
  - `WebSite`
  - `FAQPage`
- `hreflang` non necessario per singola lingua, ma canonical corretto sì.

Aggiornamenti richiesti:
- Canonical -> `/landing-nazionale.html`
- `og:url` -> `/landing-nazionale.html`
- eventuale cleanup di schema duplicati Organization

---

## 6) Mapping performance/PageSpeed (must preserve)

Da mantenere:
- Critical CSS inline above-the-fold
- Deferred stylesheet principale
- Immagini WEBP con dimensioni esplicite
- `fetchpriority="high"` su asset LCP
- script `defer` e lazy loading media
- preconnect/dns-prefetch selettivi

Da migliorare:
- API key YouTube e Places non in client/plain PHP hardcoded
- ridurre CSS duplicato (critical + style enorme)

---

## 7) Delta funzionali già individuati

- Header/Footer componenti Astro usano URL assoluti (`https://www.sfrattosicuro.it/...`) -> convertire a path locali `/assets/...`.
- Link policy incoerenti (`/privacy-policy` vs `privacy.html`).
- Home Astro attuale è placeholder e non replica ancora pienamente i contenuti landing.

---

## 8) Piano operativo immediato (prossimo step)

1. Creare `src/pages/landing-nazionale.html.astro` con head SEO + markup landing.
2. Collegare CSS/JS esistenti in parity mode.
3. Verificare funzionamento form/reviews/video/provvedimenti su URL dedicato.
4. Settare canonical/og:url landing dedicata.
5. Smoke test: Lighthouse mobile/desktop + validazione schema + check link rotti.

---

## Done criteria (step mapping)

- Mapping completo source->target definito per route, asset, SEO, JS/PHP, performance.
- Rischi principali e dipendenze bloccanti esplicitati.
- Pronto per implementazione della pagina `landing-nazionale.html` in Astro.
