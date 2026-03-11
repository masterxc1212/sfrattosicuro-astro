# Sfratto Architet — Agent Topology

## Agenti

### 1) main
Ruolo: coordinamento generale progetto, deploy, QA finale.

### 2) blog-intel
Ruolo: content intelligence giornaliera per blog SEO.
- audit articoli pubblicati
- analisi intenti + keyword selection
- brief SEO + bozza articolo
- invio report Telegram pre-pubblicazione

## Cron associati

### sfratto-blog-daily-06
- Agent: `blog-intel`
- Schedule: `0 6 * * *`
- TZ: `Europe/Rome`
- Sessione: `isolated`
- Delivery: Telegram (announce) a `150633968`
- Vincolo: nessuna pubblicazione automatica

## Processo
1. `blog-intel` produce report+bozza ogni mattina.
2. Revisione umana.
3. Eventuali modifiche.
4. Pubblicazione manuale.
5. Monitor Search Console.
