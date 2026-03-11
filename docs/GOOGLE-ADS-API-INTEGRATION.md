# Google Ads API Integration — Blog Intelligence

## Stato
- Config individuata: `C:\Users\danil\google-ads.yaml`
- Script agente: `C:\Users\danil\.openclaw\agents\blog-intel\workspace\keyword_planner_fetch.py`
- Test tecnico: script eseguito
- Esito autenticazione: **KO** (`invalid_client: Unauthorized`)

## Cosa significa
Le credenziali OAuth presenti nel file config non sono attualmente valide lato Google (client id/secret o refresh token non autorizzati).

## Cosa fare per completare
1. Rigenerare OAuth credentials Google Ads (client id + client secret) o verificare quelle esistenti.
2. Rigenerare refresh token associato allo stesso OAuth client.
3. Aggiornare `C:\Users\danil\google-ads.yaml` con i nuovi valori.
4. Rieseguire test script:
   - `python keyword_planner_fetch.py --seed "sfratto per morosità" --limit 5`

## Integrazione con cron
Il cron `sfratto-blog-daily-06` è già configurato per:
- usare prima Google Ads API,
- dichiarare stato API (OK/KO) nel report,
- fallback a ricerca alternativa se API non disponibile.
