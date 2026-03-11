# Blog Daily Intelligence — Sfratto Architet (v2)

## Obiettivo
Gestire un ciclo editoriale continuo per il blog su sfratti/locazioni, con:
- prevenzione duplicazioni,
- selezione keyword sostenibili per authority bassa,
- batch titoli pre-approvati,
- pubblicazione giornaliera controllata.

## Logica operativa (queue)
Stato su file `blog_queue.json` (workspace agente `blog-intel`):
- `candidates`: 30 proposte titolo+keyword
- `approved`: titoli approvati dall’umano
- `published`: articoli già pubblicati

## Flusso quotidiano ore 06:00
1. Audit articoli già pubblicati + keyword implicite (anti cannibalizzazione).
2. Se `approved` è vuota:
   - ricerca intenti + Keyword Planner (fallback dichiarato se non accessibile),
   - genera 30 keyword nuove,
   - genera 30 titoli SEO,
   - invia batch su Telegram per approvazione.
3. Se `approved` contiene titoli:
   - seleziona il primo non pubblicato,
   - redige articolo completo,
   - pubblica 1 articolo via WP API (autore: Redazione),
   - aggiorna `published` e invia report Telegram.

## Vincoli editoriali obbligatori
- Linguaggio professionale, fluido, persuasivo, non aggressivo.
- Non citare sentenze.
- Quando richiami norme, verifica online prima.
- SEO on-page completo: title, meta, slug, H1/H2/H3, FAQ, schema, link interni.
- CTA naturale + form contatto in chiusura.

## Approvazione umana
- Il batch 30 titoli va approvato prima della fase di pubblicazione giornaliera.
- In assenza di approvazione, nessuna pubblicazione automatica.

## KPI
- Titoli approvati / mese
- Articoli pubblicati / mese
- Impression e click organici (Search Console)
- Query nuove in top 20
- Lead da articoli
