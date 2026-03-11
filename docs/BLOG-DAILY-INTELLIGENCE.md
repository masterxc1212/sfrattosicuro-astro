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
- CTA naturale + form contatto in chiusura.

## Regole SEO esplicite (must-have)
- Keyword principale in: title SEO, H1, primo paragrafo, almeno un H2, slug.
- Title SEO: 50-60 caratteri.
- Meta description: 140-160 caratteri.
- Un solo H1, gerarchia H2/H3 pulita.
- Keyword density naturale (~0.8%-1.5%), no stuffing.
- Minimo 3 link interni pertinenti.
- 4-6 FAQ utili con intento reale.
- Schema consigliato: Article + FAQPage.
- Minimo 1 immagine con alt descrittivo coerente.
- Controllo anti-cannibalizzazione prima della pubblicazione.

## Approvazione umana
- Il batch 30 titoli va approvato prima della fase di pubblicazione giornaliera.
- In assenza di approvazione, nessuna pubblicazione automatica.

## KPI
- Titoli approvati / mese
- Articoli pubblicati / mese
- Impression e click organici (Search Console)
- Query nuove in top 20
- Lead da articoli
