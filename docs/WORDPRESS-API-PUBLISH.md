# WordPress API Publish — Sfratto Architet

## Obiettivo
Pubblicare articoli sul blog WordPress senza browser, via REST API.

## Stato configurazione
- REST API attiva su: `https://www.sfrattosicuro.it/blog/wp-json/`
- Autore editoriale configurato: **Redazione Sfratto Sicuro** (`author_id=2`)
- Flusso testato: creazione bozza via API con author forzato `2`

## Endpoint principali
- Crea bozza/articolo: `POST /wp-json/wp/v2/posts`
- Carica media: `POST /wp-json/wp/v2/media`
- Aggiorna articolo: `POST /wp-json/wp/v2/posts/{id}`
- Elimina articolo: `DELETE /wp-json/wp/v2/posts/{id}?force=true`

## Payload minimo (bozza)
```json
{
  "title": "Titolo articolo",
  "status": "draft",
  "author": 2,
  "content": "<p>Contenuto HTML</p>"
}
```

## Regole operative
1. L’agente blog-intel prepara report + bozza, ma non pubblica automaticamente.
2. Dopo approvazione umana, crea bozza via API con `author=2`.
3. Solo dopo revisione finale passa a `status=publish`.

## Checklist sicurezza
- usare Application Password dedicata (revocabile)
- non salvare credenziali in repository
- ruotare password applicativa periodicamente
