# WordPress API Publish — storico / deprecato

Questo file resta solo come promemoria storico del vecchio flusso WordPress.

## Stato attuale

- Il blog di `sfrattosicuro.it` è stato riportato dentro il build Astro come contenuto statico.
- Il sito **non deve più dipendere** da fetch runtime verso `/blog/wp-json/...` per archivio, card homepage o URL articolo.
- Le URL già pubblicate devono essere preservate via pagine statiche Astro sotto `/blog/<slug>/`.

## Nuovo riferimento operativo

Usare invece:

- `docs/STATIC-BLOG-WORKFLOW.md`
- `src/data/blog-posts.ts`
- `C:\Users\danil\.openclaw\workspace\topics\sfratto_blog_published.md`

## Nota

Se in futuro si decidesse davvero di riattivare WordPress, il flusso andrebbe riesaminato da zero: credenziali, REST API, sitemap, deploy e rischio SEO. Fino ad allora questo documento va considerato solo archivio storico.
