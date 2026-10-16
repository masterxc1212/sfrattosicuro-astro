# A/B test landing V3 vs V4 — ottobre 2026

> La `/landing-v4/` di luglio (formula «per fasi» €800 + €700 o completa €1.300, test
> `pricing_v3_v4_2026_07`, chiuso il 9 agosto) è stata **cancellata il 9 ottobre 2026**: lo stesso
> indirizzo ospita ora questa variante. Lo storico resta in `ab-test-landing-v3-v4-2026-07.md`.
> I lead di luglio e di ottobre hanno lo stesso `form_source` (`*_v4`): si distinguono per data.

## Ipotesi

Un prezzo di richiamo più basso e confrontabile con i low-cost (€650 «fino alla convalida»,
vedi `ricerca-prezzi-concorrenza-2026-10.md`) aumenta i contatti qualificati rispetto alla
formula completa da €1.300 «fino alle chiavi», senza peggiorare il tasso di incarico.

## Varianti

| | Controllo V3 | Trattamento V4 |
|---|---|---|
| URL | `/landing-v3/` | `/landing-v4/` |
| Compenso | €1.300 IVA e cassa incluse | **€650 IVA e cassa incluse** |
| Copre | convalida + fase esecutiva fino alle chiavi | **solo la fase di convalida** |
| Pagamento | dopo l'udienza di convalida, nessun acconto | identico |
| Fase esecutiva | inclusa | **preventivo scritto separato**, solo con consenso |
| Opposizione / merito | preventivo separato | identico |
| Spese vive | €100–150 convalida, ~€300 con esecuzione | €100–150 convalida |

- **Experiment ID:** `pricing_v3_v4_2026_10` (in `business-config.json` → `pricing.testV4`).
  Lo inviano entrambe le pagine (`landing_experiment_view` su GA4, campi nascosti
  `experiment_id` / `experiment_variant` nei moduli).
- Stessa pagina (`V3Page.astro` con `variant="v4"`): cambiano solo hero, sezione prezzo,
  passo 4 della procedura, quattro FAQ economiche, SEO/JSON-LD. Il confronto «preventivi
  solo convalida» è nascosto sulla v4.
- Testi della v4: `applyOffertaConvalida()` in `src/data/landing-config.ts`.

## Come riconoscere i lead nella dashboard

Dal 16/10/2026 il PHP aggiunge un segnaposto `[LANDING V3]` / `[LANDING V4]` (preso dal campo
nascosto `experiment_variant`, oppure ricavato dal `form_source`) in tre punti: nella richiesta
iniziale del lead in dashboard (prima di `Form: …`), nell'oggetto dell'email di notifica
(«Nuovo lead dal sito - Sfratto Sicuro [CRM] [LANDING V4]») e come etichetta arancione in testa
all'email. Sotto, il dettaglio del modulo, che il PHP scrive come `Form: <form_source>`:

| Modulo | V3 | V4 |
|---|---|---|
| Hero | `hero_form_v3` | `hero_form_v4` |
| Fondo pagina | `bottom_form_v3` | `bottom_form_v4` |
| Popup richiamata | `popup_telefono` | `popup_telefono_v4` |

## Configurazione in Google Ads (da fare)

Campagna `Avvocato per Sfratto` (customer `865-789-5088`, campaign `22849022328`):
Esperimento personalizzato, split 50/50 per cookie, nella variante cambia solo l'URL finale
da `/landing-v3/` a `/landing-v4/`. Attenzione ai **sitelink e callout**: se citano €1.300 o
«fino alle chiavi», nella variante diventano incoerenti (vedi lezione di agosto in
`promo-v3-agosto-2026.md`); vanno resi neutri sul prezzo per tutta la durata del test.

## Misurazione

- Primaria: contatti qualificati (proprietari/locatori) e **incarichi firmati** per variante.
- Secondarie: invii dei moduli, chiamate, costo per lead, quota di clienti V4 che poi
  chiedono la fase esecutiva (e a che prezzo la accettano).

## Punto aperto

Prezzo della fase esecutiva per i clienti V4: oggi la pagina dice solo «preventivo scritto
separato». Da decidere prima del primo caso (riferimento: €700 nella v4 «per fasi» di luglio).

## Registro

- 2026-10-09: pagine pronte; contestualmente la v3 passa al campo unico «Nome e cognome».
