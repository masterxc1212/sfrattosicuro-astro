# Funnel risorse / lead magnet — Sfratto Sicuro (brand `sfs`)

> Salvato 2026-06-07. Parte del **sistema editoriale multi-brand** dello Studio.
> Reference canonica: `claude_projects/libri/.claude/skills/libri/references/distribuzione.md`.

## Architettura (condivisa tra i brand)
Il form "risorse" (lead magnet) del sito posta **direttamente** a un endpoint **pubblico** su Vercel:

```
POST https://dashboard-integrata.vercel.app/api/lead/resource-download
GET  …/resource-download?source=sfs   → contatore { slug: n }
```

- Protetto da Cloudflare **Turnstile** (site key pubblica `0x4AAAAAADWH0zpnU0M-dTN7`) + honeypot. **Nessun secret sul sito.**
- Il campo `source` seleziona il brand → Provenienza/Area + catalogo risorse.
- Scrive in Airtable **`Anagrafica`** (base `appXqSXlxeLUcR25p`) via `upsertLead`: `Tipologia=Lead`, `Provenienza`, `Canale=Form` + **9 campi editoriali** (Risorsa Scaricata, Collana, Privacy Accettata + Data, Versione Informativa, Consenso Marketing + Data, UTM Source, UTM Campaign).
- **GDPR**: privacy obbligatoria (gate del download), marketing opzionale.
- File endpoint: `dashboard-integrata/frontend/app/api/lead/resource-download/route.ts`; preset intake: `frontend/lib/crm/lead-intake.ts`.

## Sfratto Sicuro = brand `sfs`
- IntakeConfig `FORM_INTAKE` → Provenienza **"Sfratto Sicuro"**, Area **"Sfratti_Locazioni"**, Canale "Form".
- **Stato: predisposto ma INERTE** — `BRANDS.sfs.risorse` è VUOTO nell'endpoint → finché non popolato risponde "Risorsa non valida".
- NB: il form **contatti** di sfrattosicuro.it alimenta già la CRM (via intake/Make); questo è il funnel **risorse scaricabili**, separato.

## Per ATTIVARE il funnel su sfrattosicuro.it
1. **Collana + contenuti**: collana Sfratto Sicuro/patrimonio + lead magnet con la skill `libri` (es. cheat sheet "checklist dello sfratto", white paper "guida del locatore", playbook "morosità: cosa fare"), con **tripla verifica**.
2. **Airtable**: opzioni in `Risorsa Scaricata` (una per titolo) + `Collana` (nome collana) nella tabella Anagrafica.
3. **Endpoint**: popolare `BRANDS.sfs.risorse` in `route.ts` + `BRANDS.sfs.collana`.
4. **Sito**: pagina `/risorse/` + form (modello `danilo-ansalone`), `source: "sfs"` + widget Turnstile.
5. **Cloudflare Turnstile**: aggiungere `sfrattosicuro.it` (+ www) ai domini ammessi.
6. **Deploy**: dashboard su Vercel + sito Sfratto Sicuro.

## Promozione
LinkedIn (pagina Sfratto Sicuro) · blog/SEO sfrattosicuro.it (15+ articoli) · Google Ads (campagna Avvocato per Sfratto). CTA → `/risorse/?utm_source=…`.
