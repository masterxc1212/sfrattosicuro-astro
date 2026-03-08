# SEO sitemap/robots governance (Astro + WordPress)

## Obiettivo
- Sitemap e robots sempre aggiornati quando aggiungi pagine Astro.
- Inclusione articoli WordPress nel perimetro SEO senza conflitti.
- Controllo rapido di blocchi/captcha (SiteGround) che possono impedire il crawling.

## Come funziona ora

### Astro (sito principale)
- Dopo ogni `npm run build`, parte `postbuild`:
  - `scripts/generate-sitemaps.mjs`
  - genera `dist/sitemap-pages.xml` (scansione automatica di tutte le pagine buildate)
  - genera `dist/sitemap.xml` come **sitemap index**

### WordPress (blog)
- Il blog continua a servire la sua sitemap WordPress:
  - `https://www.sfrattosicuro.it/blog/sitemap_index.xml`

### Sitemap index unica
- `https://www.sfrattosicuro.it/sitemap.xml` include:
  - sitemap Astro (`/sitemap-pages.xml`)
  - sitemap WordPress (`/blog/sitemap_index.xml`)

## Robots
- `public/robots.txt` rimane permissivo (inclusi AI crawler) e punta a:
  - `Sitemap: https://sfrattosicuro.it/sitemap.xml`

## Verifica automatica endpoint SEO
- Comando:
  - `npm run seo:check:endpoints`
- Controlla status/content-type e rileva challenge/captcha (es. `/.well-known/sgcaptcha/`).

## Plugin WordPress che possono sovrascrivere sitemap
I principali da monitorare:
- Yoast SEO
- Rank Math
- AIOSEO
- SEOPress

Regola pratica:
- **Un solo plugin SEO sitemap attivo sul blog**.
- Se cambia plugin, ricontrolla che `/blog/sitemap_index.xml` risponda 200 XML.

## SiteGround
Se endpoint SEO rispondono 202/403/challenge:
- escludi da protezioni/captcha almeno:
  - `/robots.txt`
  - `/sitemap*.xml`
  - `/blog/sitemap*.xml`
- svuota cache SG dopo modifiche.
