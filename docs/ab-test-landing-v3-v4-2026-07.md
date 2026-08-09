# A/B test landing V3 vs V4 — luglio 2026

> **Aggiornamento 9 agosto 2026 — il test è chiuso.** L'utente ha dichiarato concluso
> l'esperimento V3/V4. Attenzione: alla data di questo aggiornamento la campagna
> `Avvocato per Sfratto [V4] Tripla offerta` (ID `24063657507`) risultava ancora
> **ENABLED e in spesa** (per esempio €35,76 il 7 agosto, ≈ metà del budget condiviso
> da €50/giorno). **Da spegnere**, altrimenti continua a sottrarre budget alla
> promozione di agosto.
>
> Nel frattempo è entrata in produzione la promozione **«V3 Agosto»**
> (`/landing-v3-agosto/`, €1.000 entro il 31 agosto 2026): vedi
> `docs/promo-v3-agosto-2026.md`. La regola qui sotto — «l'offerta temporanea di
> agosto va testata dopo questo confronto, non durante» — è quindi soddisfatta:
> il confronto V3/V4 è terminato prima dell'avvio della promozione.
>
> Quanto segue resta valido come registro di come il test è stato impostato.

## Stato operativo

- Implementazione V3/V4 completata e build locale verificata il 26 luglio
  2026: 213 pagine.
- Hero mobile condiviso: promessa e spiegazione dell'offerta prima del form.
- Recensioni Google aggiornate a 22 tramite fallback centralizzato e cache
  locale; il dato live resta aggiornabile da `/php/get-reviews.php`.
- Tracking variante e campi hidden dei form verificati.
- Deploy autorizzato su `main` tramite GitHub Actions/SiteGround.
- Configurazione dell'esperimento Google Ads da completare dopo il deploy.

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

### Identificativi operativi

- Account Google Ads: `865-789-5088`
- Campagna: `Avvocato per Sfratto`
- Campaign ID: `22849022328`
- Variante controllo: `/landing-v3/`
- Variante trattamento: `/landing-v4/`
- Ripartizione prevista: `50/50`

Prima di avviare il test, aprire entrambe le URL di produzione e verificare
risposta HTTP 200, valore recensioni 22, form e tracking. Annotare nel presente
documento data di avvio e durata iniziale scelta in Google Ads.

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
