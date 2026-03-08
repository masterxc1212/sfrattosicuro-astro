# Sfratto Sicuro – Astro

## Local commands

- `npm run dev` → avvio sviluppo locale
- `npm run build` → build produzione in `dist/`
- `npm run preview` → preview locale della build
- `npm run seo:check:endpoints` → check rapido endpoint SEO

## Deploy automatico via GitHub Actions → SiteGround

Workflow configurato:

- `.github/workflows/deploy-siteground.yml`

### Trigger

- push su branch `main`
- esecuzione manuale (`workflow_dispatch`)

### Pipeline

1. checkout repository
2. setup Node 22
3. `npm ci`
4. `npm run build`
5. deploy di `dist/` su `/public_html/` via FTPS

### Secrets GitHub richiesti

Configura questi secrets nel repository GitHub:

- `SG_FTP_HOST` (es. `ftp.sfrattosicuro.it`)
- `SG_FTP_USERNAME`
- `SG_FTP_PASSWORD`

> Nota: usa un account FTP/SFTP valido creato in SiteGround (in passato alcune credenziali hanno restituito `530 Login authentication failed`).

## Primo avvio consigliato

1. Inizializza la repo git locale (se non esiste)
2. Crea repository su GitHub
3. Push su `main`
4. Configura i 3 secrets
5. Esegui il workflow manualmente la prima volta
