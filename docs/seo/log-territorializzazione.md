# Log territorializzazione sedi — sfrattosicuro.it

> Tracciamento sessioni di lavoro sul piano 80% (vedi `docs/seo/vincoli-territorializzazione-sedi.md` sez. 3 e 5).
>
> Ogni sessione che tocca contenuti delle sedi aggiunge una entry datata.

## 2026-05-05 — Pilot Lombardia, Step 1-10 piano 80%

**Operatore:** skill `linkbuilding-sfrattosicuro-ansalone` (sessione Cowork)

**Cosa e' stato fatto in questa sessione (12 step da vincoli sez. 3.1):**

1. **Step 1 — business-config foundation.** Creati `src/data/business-config.json` (single source of truth per prezzo EUR 1.300, tempi ~60gg, orari Lun-Ven 9-19 + Sab 9-13, contatti, procedura 4 fasi) e helper tipato `src/lib/business.ts` con type definitions (`Pricing`, `Tempi`, `Garanzie`, `Orari`, `FaseProcedura`, `Procedura`, `WhatsappContatto`, `Contatti`, `BusinessConfig`) + 3 convenience helpers (`getCompensoFormatted`, `getTempiConvalidaConDisclaimer`, `getPatternPromessaSede`).

2. **Step 2 — Migrazione hardcoded landing.** Migrati i seguenti componenti per leggere da `business-config` invece di string letterali:
   - `src/components/TimelineSection.astro` (2x "60 giorni" -> `tempi.convalidaMedia` + disclaimer)
   - `src/components/HeroInstitutionalIsland.astro` (2x "60 giorni" -> `tempi.convalidaMedia`)
   - `src/components/FaqIsland.astro` ("60 giorni" -> `tempi.convalidaMedia`, "costo fisso" -> `pricing.compensoFormatted` + `pricing.modalita` + disclaimer)
   - `src/data/landing-original.ts` (blocco `meta` + `hero`: 3x "1.300" -> `compensoIt`, 1x "60 giorni" -> `tempi.convalidaMedia`, "Lun-Ven 9-19" -> `orari.labelCompatto`)
   - `LandingOriginalHeroSection.astro` non toccato direttamente (consuma dal data file).
   - `FaqSection.astro` non toccato (FAQ procedurali, no business value diretto; territorial FAQ refactor in Step 7).
   - **TODO Step 2-bis:** rimangono ~16 punti hardcoded in `landing-original.ts` (calculator, pricing, faq, urgencyBox).

3. **Step 3 — SedeItem esteso.** Aggiunti 7 type definitions in `src/lib/home-model.ts` (tutti optional, zero-impact su sedi.json non popolati): `MercatoLocale`, `CancelleriaEstesa`, `GiurisprudenzaLocale`, `PartnerLocali`, `TempiReali`, `ZoneServite`, `StoriaTribunale`. Aggiunti i 7 campi corrispondenti a `SedeItem`.

4. **Step 4 — 7 componenti Astro.** Creata directory `src/components/sede/` con 7 nuovi componenti:
   - `MercatoLocaleSection.astro` (canone medio + zone rilevanti + promesse business)
   - `CancelleriaOperativaSection.astro` (indirizzo + sezione + orari + PCT + sito)
   - `GiurisprudenzaLocaleSection.astro` (termine di grazia + opposizioni + provvedimenti)
   - `PartnerLocaliSection.astro` (domiciliatari + UNEP)
   - `TempiRealiSection.astro` (4 fasi reali + disclaimer)
   - `ZoneServiteSection.astro` (quartieri + comuni)
   - `StoriaTribunaleSection.astro` (anno + sede + peculiarita)
   - Tutti rendono solo se `hasData` (graceful fallback per sedi non popolate).
   - Integrati in `src/components/HomeModel.astro` con lookup `sedeData` da `sedi.json`.

5. **Step 5 — Dati territoriali 13 sedi LOM.** Popolati i 7 nuovi campi per: milano, monza, bergamo, brescia, como, varese, pavia, mantova, cremona, lecco, lodi, sondrio, busto-arsizio. Dati basati su `tribunaleInfo` reale (gia presente per tutte le 137 sedi) + conoscenza dei mercati locali (canoni, quartieri) + giurisprudenza generica art. 55 L. 392/1978. File `sedi.json` da 839K -> 959K (+120K).

6. **Step 6 — Riscrittura localAngles LOM.** Riscritti `openingAngle`, `protocolAngle`, `courtAngle`, `closingAngle` per le 13 sedi LOM, incorporando in ogni paragrafo le promesse landing inviolabili (EUR 1.300, ~60gg, no acconti, procedura 4 fasi) + dato territoriale unico (sezione, prenotazione udienze, peculiarita prassi locale).

7. **Step 7 — Refactor getTerritorialFaq() dinamico.** `src/lib/home-model.ts:getTerritorialFaq()` ora genera 4 FAQ uniche da `tribunaleInfo` + `tempiReali` + `giurisprudenzaLocale` + `business-config`. Override manuale (`faqStrategic`, `faqLocal`) ha priorita assoluta. Per sedi non popolate, fallback a FAQ generiche ma sempre coerenti con le promesse landing.

8. **Step 8 — Demolizione boilerplate.** Aggiunto flag `hasTerritorialContent` in `HomeModel.astro` (true se la sede ha ≥1 campo territoriale popolato). Quando true, demolite 5 sezioni boilerplate generiche dalla pagina sede: `WhenPossibleSection`, `TypesSection`, `TribunaleInfoSection`, `WhyLawyerSection`, `TerritoryCoverageSection`. Mantenute: `ProcedureSection`, `TimelineSection`, i 7 nuovi blocchi territoriali, `StudioSection`, `ProvvedimentiIsland`, `ReviewsIsland`, `SedeBlogLinksIsland`, `FaqSection`, `ContactFormIsland`. Per le 124 sedi non popolate la pagina rimane invariata.

9. **Step 9 — TS check + verify-site-surface preflight.** TypeScript strict project-wide: 0 errori sui file modificati. JSON validity OK. HomeModel struttura corretta. Build Astro reale non eseguibile in sandbox Linux (EPERM su `node_modules` Dropbox/Windows mount): la verifica gira su Windows / GitHub Actions Step 10.

10. **Step 10 — Commit + push.** In corso. File staged (16 totali, 7 NEW components + 1 NEW config + 1 NEW helper + 7 modified). Commit prefisso `[seo-sedi]`.

**Da fare nelle prossime sessioni:**
- **Step 11** — GSC URL Inspection su 5 sedi LOM (Milano, Pavia, Bergamo, Brescia, Monza) + Request indexing manuale.
- **Step 12** — Monitor settimanale GSC Pages report (lunedi mattina) per 4 settimane post-deploy. Trigger rollout: se da 1-2 sedi LOM indicizzate del cluster si passa a 10+ entro 4 settimane, estendere a Lazio/Campania/Veneto.
- **Step 2-bis (parking)** — migrare i ~16 punti hardcoded rimasti in `landing-original.ts` (calculator, pricing, faq, urgencyBox).

**Note tecniche:**
- File `business-config.json` ha discrepanza nota con `site.json:openingHoursSpecification` (Mon-Fri 09-18 vs promessa landing Lun-Ven 9-19 + Sab 9-13). In caso di conflitto vince `business-config`.
- Edit tool ha causato 2 troncamenti durante la sessione (`landing-original.ts`, `home-model.ts`). Risolto con `git show HEAD` -> restore + replacement chirurgico via Python script. Per file >500 righe con CRLF, preferire d'ora in poi script Python con assertion `count == 1` prima di sovrascrivere.
- Build Astro non testato in sandbox per EPERM su Dropbox mount. La verify-site-surface andra' rieseguita post-deploy GitHub Actions.
