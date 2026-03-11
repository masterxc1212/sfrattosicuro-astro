# Blog Daily Intelligence — Sfratto Architet

## Obiettivo
Creare un ciclo editoriale giornaliero che unisca:
- analisi articoli già pubblicati,
- analisi intenti di ricerca su sfratti/locazioni,
- selezione keyword ad alto potenziale,
- bozza articolo SEO pronta revisione,
- approvazione umana prima della pubblicazione.

## Regola chiave
Il sistema **non pubblica automaticamente**. Invia su Telegram un report completo e una bozza, poi decide il responsabile umano.

## Workflow (ore 06:00 Europe/Rome)
1. Scansione blog (`/blog/`) e analisi contenuti recenti.
2. Verifica sovrapposizioni/cannibalizzazione keyword.
3. Ricerca intenti (informazionale, commerciale, transazionale).
4. Query su Keyword Planner (se disponibile); fallback su fonti alternative se non accessibile.
5. Selezione keyword del giorno con criterio: volume + difficoltà + probabilità posizionamento authority bassa.
6. Produzione brief SEO:
   - keyword principale/secondarie,
   - intento,
   - outline H1/H2/H3,
   - FAQ,
   - entità semantiche,
   - internal links,
   - meta title/description,
   - slug,
   - schema consigliato.
7. Redazione bozza articolo completa pronta revisione umana.
8. Invio report su Telegram.

## Template report Telegram (obbligatorio)
- Keyword principale
- Perché è stata scelta oggi
- Intento di ricerca prevalente
- Gap rispetto ai contenuti già pubblicati
- Outline proposto
- Bozza articolo
- Checklist pre-pubblicazione (fatti/fonti/SEO/on-page)

## KPI (monitor mensile)
- Articoli prodotti / approvati / pubblicati
- Nuove query indicizzate in Search Console
- Impression/click organici pagine blog
- Lead generati da articoli
- Tempo medio da bozza a pubblicazione

## Governance
- Owner: team Sfratto Architet
- Frequenza revisione SOP: ogni 30 giorni
- Condizione di stop: errori giuridici ripetuti o calo qualità bozza
