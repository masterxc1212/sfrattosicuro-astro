# SEO sitemap/robots governance (Astro statico)

## Obiettivo
- Sitemap e robots sempre aggiornati quando aggiungi pagine Astro.
- Blog completamente statico: URL blog incluse nella sitemap.xml radice.
- Controllo rapido di blocchi/captcha (SiteGround) che possono impedire il crawling.

## Come funziona ora

### Sitemap unica (architettura corrente)
- Dopo ogni `npm run build`, parte `postbuild`:
  - `scripts/generate-sitemaps.mjs`
  - genera `dist/sitemap.xml` come **urlset unico** con tutte le URL (pagine Astro + articoli blog)
  - genera `dist/sitemap-pages.xml` — alias retrocompatibilità per le sole pagine core
  - genera `dist/blog/post-sitemap.xml` — alias retrocompatibilità per i soli articoli blog
  - genera `dist/blog/sitemap_index.xml` — alias retrocompatibilità che punta a `/sitemap.xml`

### Sitemap principale
- `https://www.sfrattosicuro.it/sitemap.xml` — urlset con tutte le URL del sito
- I file alias (`sitemap-pages.xml`, `blog/post-sitemap.xml`, `blog/sitemap_index.xml`) esistono
  solo per non creare 404 su URL già noti a Google Search Console.

## Robots
- `public/robots.txt` rimane permissivo (inclusi AI crawler) e punta a:
  - `Sitemap: https://sfrattosicuro.it/sitemap.xml`
- `dist/blog/robots.txt` generato dal postbuild punta anch'esso a `/sitemap.xml`.

## Verifica automatica endpoint SEO
- Comando:
  - `npm run seo:check:endpoints`
- Controlla status/content-type e rileva challenge/captcha (es. `/.well-known/sgcaptcha/`).

## SiteGround
Se endpoint SEO rispondono 202/403/challenge:
- escludi da protezioni/captcha almeno:
  - `/robots.txt`
  - `/sitemap*.xml`
  - `/blog/sitemap*.xml`
- svuota cache SG dopo modifiche.
