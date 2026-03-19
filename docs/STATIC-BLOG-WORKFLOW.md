# Static blog workflow — Sfratto Sicuro

## Obiettivo

Gestire il blog direttamente nell'Astro build, senza dipendere da WordPress o da fetch runtime verso `/blog/wp-json/...`.

## Fonte contenuti

I post pubblicati vivono in:

- `src/data/blog-posts.ts`

Ogni voce deve contenere almeno:

- `slug`
- `title`
- `description`
- `excerpt`
- `lead`
- `publishedAt`
- `category`
- `html`

## Regola SEO più importante

**Non cambiare mai `slug` di un articolo già pubblicato e indicizzato.**

Prima di aggiungere o modificare un post già live, controllare sempre anche:

- `C:\Users\danil\.openclaw\workspace\topics\sfratto_blog_published.md`

## Come pubblicare un nuovo articolo statico

1. Aggiungi il nuovo post in `src/data/blog-posts.ts`
2. Mantieni lo slug definitivo già approvato/pubblicato
3. Aggiorna il registro locale `topics/sfratto_blog_published.md`
4. Esegui:
   - `npm run build`
5. Verifica in `dist/`:
   - `blog/index.html`
   - `blog/<slug>/index.html`
   - `blog/sitemap_index.xml`
   - `blog/post-sitemap.xml`
   - `blog/robots.txt`
6. Deploy su SiteGround caricando almeno i file aggiornati sotto `public_html/`

## Sitemaps blog

La build genera:

- `dist/sitemap.xml` → indice sitemap root
- `dist/sitemap-pages.xml` → pagine Astro core
- `dist/blog/sitemap_index.xml` → indice sitemap blog
- `dist/blog/post-sitemap.xml` → URL articoli blog

## Stato del vecchio flusso WordPress

Il vecchio documento `docs/WORDPRESS-API-PUBLISH.md` è da considerare storico/deprecato.
Il blog attivo ora è statico e deve restare tale salvo decisione esplicita diversa.
