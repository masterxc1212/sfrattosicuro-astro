/**
 * Interruttore unico del banner cookie del sito.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  STATO ATTUALE: BANNER IN PAUSA dall'11 agosto 2026                      │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * PERCHE'. Non riusciamo a misurare il traffico. In GA4, negli ultimi 7 giorni,
 * risultavano 239 sessioni ma solo 11 visualizzazioni di pagina, e ZERO sessioni
 * da ricerca organica — su un sito con 137 pagine sede e 73 articoli. Con il
 * banner attivo non e' possibile distinguere due cause molto diverse:
 *
 *   (a) il tracciamento e' rotto per un difetto tecnico (la page_view mancante,
 *       ancora senza causa accertata: vedi docs/promo-v3-agosto-2026.md §11);
 *   (b) il tracciamento funziona, ma quasi nessuno accetta il banner.
 *
 * Mettendo il banner in pausa si toglie la variabile (b) e si vede se i numeri
 * tornano. E' una misura DIAGNOSTICA E TEMPORANEA decisa dall'utente.
 *
 * COSA COMPORTA. Con `consentBannerEnabled = false` il banner non viene
 * renderizzato e gli script di tracciamento del sito partono in modalita' `eager`,
 * cioe' senza attendere un consenso — lo stesso regime che le landing pubblicitarie
 * hanno gia' dal 16 luglio 2026. Finche' resta cosi', il sito raccoglie dati
 * analitici e di marketing senza raccogliere il consenso: e' un'esposizione
 * privacy nota e accettata dall'utente, non una svista.
 *
 * ⚠️ DA RIACCENDERE. Rimettere `true` appena la diagnosi e' chiusa. Due motivi per
 * non dimenticarsene:
 *   1. l'11 agosto 2026 abbiamo attivato Google Signals sulla proprieta' GA4,
 *      dichiarando a Google di avere le informative e i consensi necessari dagli
 *      utenti finali. Con il banner spento quella dichiarazione non ha una base;
 *   2. /cookie-policy/ continua a descrivere un banner che al momento non c'e'.
 *
 * COME SI RIACCENDE: basta rimettere `true` qui sotto. Nessun altro file va
 * toccato — nessun codice del banner e' stato cancellato, e' solo inerte.
 */
export const consentBannerEnabled = false;

/** Data in cui il banner e' stato messo in pausa (per non perderne memoria). */
export const consentBannerPausedSince = '2026-08-11';

/**
 * Quando il banner e' in pausa gli script di tracciamento del sito devono partire
 * senza gate del consenso, altrimenti non partirebbero mai (nessuno puo' piu'
 * accettare) e la diagnosi sarebbe impossibile.
 */
export const trackingEager = !consentBannerEnabled;

/**
 * ID del TikTok Pixel - UNICO punto in cui va scritto.
 *
 * Installato il 12 agosto 2026 per iniziare ad accumulare il pubblico di
 * retargeting prima di un'eventuale campagna TikTok Ads: senza storico, una
 * campagna partirebbe cieca.
 *
 * FINCHE' QUESTA STRINGA E' VUOTA IL PIXEL NON VIENE EMESSO: il componente
 * TikTokPixelTracking.astro non produce alcuno script in pagina e non fa
 * nessuna richiesta di rete. Per attivarlo:
 *   1. ads.tiktok.com -> Strumenti -> Eventi -> Eventi web -> Configura evento web
 *   2. scegliere "Pixel TikTok" + "Installa manualmente il codice"
 *   3. copiare l'ID (stringa alfanumerica, es. "CQXXXXXXXXXXXXXXXXXX")
 *   4. incollarlo qui sotto e fare il deploy
 */
export const tiktokPixelId = 'D9U9S8RC77UE01JNU150';

/**
 * ID progetto Microsoft Clarity - UNICO punto in cui va scritto.
 *
 * Clarity da' registrazioni delle sessioni e mappe di calore: risponde al PERCHE'
 * la gente non compila, dove gli eventi GA4 rispondono solo al DOVE si ferma.
 * E' gratuito e senza limiti di traffico.
 *
 * FINCHE' QUESTA STRINGA E' VUOTA CLARITY NON VIENE CARICATO: il componente
 * ClarityTracking.astro non produce alcuno script in pagina e non fa nessuna
 * richiesta di rete. Per attivarlo:
 *   1. clarity.microsoft.com -> accedi con account Microsoft o Google
 *   2. "New project": nome "Sfratto Sicuro", sito www.sfrattosicuro.it
 *   3. scegliere "Install manually" e copiare l'ID dallo snippet:
 *      e' la stringa dentro clarity.ms/tag/XXXXXXXXXX (10 caratteri circa)
 *   4. incollarlo qui sotto e fare il deploy
 *
 * NOTA PRIVACY: Clarity maschera per impostazione predefinita il contenuto dei
 * campi di input, ma la registrazione della sessione resta un trattamento piu'
 * invasivo dell'analitica. Quando il banner tornera' attivo, va citato nella
 * cookie policy.
 */
export const clarityProjectId = 'y2mljrqg7c';
