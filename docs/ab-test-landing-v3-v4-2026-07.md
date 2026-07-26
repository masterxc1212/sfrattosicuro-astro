# A/B test landing V3 vs V4 — luglio 2026

## Ipotesi

Mostrare una scelta economica più flessibile (`€800` convalida, `€700` eventuale
esecuzione, `€1.300` formula completa) aumenta i contatti qualificati rispetto
alla sola formula completa da `€1.300`, senza ridurre la qualità dei casi.

## Varianti

- **Controllo V3:** `https://www.sfrattosicuro.it/landing-v3/`
- **Trattamento V4:** `https://www.sfrattosicuro.it/landing-v4/`
- **Experiment ID:** `pricing_v3_v4_2026_07`

Le pagine condividono struttura, prove, form e tracking. Cambiano esclusivamente
la presentazione dell'offerta e le FAQ economiche.

## Configurazione in Google Ads

1. Aprire **Campagne → Esperimenti → Esperimento personalizzato**.
2. Selezionare come base la campagna Search attuale.
3. Impostare uno split `50/50`, preferibilmente per cookie se disponibile.
4. Mantenere identici annunci, keyword, corrispondenze, offerta, pubblico,
   località, calendario e azioni di conversione.
5. Nella variante modificare soltanto l'URL finale da `/landing-v3/` a
   `/landing-v4/`.
6. Disattivare l'applicazione automatica del vincitore.
7. Non modificare la campagna base durante il test; se disponibile, attivare la
   sincronizzazione delle modifiche non sperimentali.

## Misurazione

**Metrica primaria:** contatti qualificati da proprietari/locatori.

**Metriche diagnostiche:**

- invii dei form;
- chiamate;
- avvii del form;
- tentativi di invio bloccati dalla validazione;
- rapporto tra lead e incarichi effettivi.

I form inviano anche `experiment_id`, `experiment_variant`, `form_source`,
`gclid` e parametri UTM. In GA4 viene inviato l'evento
`landing_experiment_view`.

## Regole per interpretare il risultato

- Non cambiare contemporaneamente prezzi, traffico, annunci e remarketing.
- Non dichiarare un vincitore soltanto in base agli avvii form.
- Se il volume di conversioni resta troppo basso, usare gli eventi intermedi
  per diagnosticare il funnel, ma prolungare il test prima di scegliere.
- Valutare separatamente quantità e qualità: una variante vince solo se produce
  più contatti utili e non soltanto più richieste non pertinenti.
- L'offerta temporanea di agosto e il remarketing vanno testati dopo questo
  confronto, non durante.
