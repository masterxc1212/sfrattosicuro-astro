/**
 * landing-original.ts
 * Full text content for the original landing page (1:1 clone source).
 * Grouped by section. Used by src/pages/landing-v2/index.astro
 *
 * MIGRATION (2026-05-05) — Step 2 piano 80%:
 * I valori di business (1.300 EUR, ~60 giorni, orari) del blocco `hero`
 * sono ora interpolati da `business-config.json` via `lib/business.ts`.
 * NON sostituire le interpolazioni con stringhe letterali: cambiare il
 * valore in `business-config.json` propaga automaticamente al landing.
 *
 * TODO follow-up Step 2-bis: migrare anche calculator/pricing/full-faq blocks
 * che contengono ancora "1.300" e "60 giorni" letterali.
 */

import { pricing, tempi, orari } from '../lib/business';

const compensoIt = pricing.compensoComplessivo.toLocaleString('it-IT', { minimumFractionDigits: 0 });

export const landingOriginal = {

  meta: {
    title: `Avvocato Sfratto per Morosità | Costo Fisso ${compensoIt}€ fino alla Convalida`,
    description: `Avvocato specializzato in sfratto per morosità. Procedura ottimizzata con convalida mediamente in 60 giorni e costo fisso di ${compensoIt}€ fino alla convalida. Nessun anticipo. Consulenza senza impegno.`,
    keywords: 'sfratto per morosità, avvocato sfratto, convalida sfratto, inquilino moroso, rilascio immobile, sfratto veloce',
    canonicalUrl: 'https://www.sfrattosicuro.it/landing/',
  },

  trustBar: {
    text: 'Assistenza legale per sfratti su tutto il territorio nazionale',
    separator: '•',
    text2: 'Operiamo presso tutti i Tribunali d\'Italia',
  },

  hero: {
    kicker: '',
    title: 'Avvocato per\nSfratto per Morosità',
    subtitle: 'Non lasciare che un inquilino ti tolga la serenità. Riottieni il tuo immobile in tempi rapidi, <strong class="text-white">senza anticipi.</strong>',
    bullets: [
      `<strong>${compensoIt} € tutto incluso</strong> – assistenza legale garantita fino al rilascio dell\'immobile`,
      '<strong>Nessun anticipo</strong> – paghi solo al momento della convalida dello sfratto',
      `<strong>${tempi.convalidaMedia}</strong> – per ottenere, dal Giudice, l\'ordinanza di rilascio dell\'immobile`,
      '<strong>Avvocato dedicato</strong> – un solo referente, sempre aggiornato sulla tua pratica',
      '<strong>Trasparenza totale</strong> – nessuna sorpresa o costo imprevisto',
    ],
    formTitle: 'Ti richiamiamo in giornata',
    formSubtitle: `Inserisci i tuoi dati: prima consulenza gratuita e senza impegno.\n    <br><span style="font-size: 0.75rem;">(${orari.labelCompatto.replace(/-/g, '–')})</span>`,
    formNamePlaceholder: 'Il tuo nome e cognome',
    formPhonePlaceholder: 'Es: 333 123 4567',
    formSubmitLabel: 'Richiedi una consulenza gratuita',
    formSource: 'hero_form',
  },

  problems: {
    badge: 'SITUAZIONE CRITICA',
    title: 'Ti riconosci in questa situazione?',
    subtitle: 'Ogni giorno aiutiamo proprietari che si trovano esattamente nella tua stessa condizione. Questi sono i problemi più comuni che affrontiamo.',
    items: [
      {
        title: 'Morosità Crescente',
        body: 'Mesi di affitti non pagati che si accumulano mentre continui a sostenere tutte le spese dell\'immobile.',
        color: 'red',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      },
      {
        title: 'Immobile Danneggiato',
        body: 'La tua proprietà si deteriora progressivamente e tu non hai alcun modo di intervenire o tutelare il tuo bene.',
        color: 'orange',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
      {
        title: 'Tempi Interminabili',
        body: 'Procedure che si trascinano per anni con avvocati non specializzati nello sfratto per morosità.',
        color: 'yellow',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        title: 'Costi Imprevedibili',
        body: 'Parcelle che lievitano, anticipi continui e spese impreviste senza alcuna certezza sul totale finale.',
        color: 'purple',
        icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      },
      {
        title: 'Pressione Psicologica',
        body: 'Stress costante, notti insonni e la sensazione di impotenza di fronte a una situazione senza via d\'uscita.',
        color: 'blue',
        icon: 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        title: 'Difficoltà di Scelta',
        body: 'Impossibile trovare professionisti con esperienza documentata e specializzazione esclusiva negli sfratti.',
        color: 'gray',
        icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      },
    ],
  },

  calculator: {
    title: 'Il Vero Costo di uno Sfratto è l\'Attesa',
    intro: 'Invece di chiederti "quanto costa un avvocato per lo sfratto", calcola quanto stai perdendo. I tempi di uno sfratto per morosità gestito senza un metodo possono costarti decine di migliaia di euro.',
    sectionId: 'calcolatore-perdite',
    inputs: {
      canone: { label: 'Canone Mensile (€)', value: 900, min: 0, step: 50 },
      oneri: { label: 'Oneri Condominiali (€/mese)', value: 150, min: 0, step: 10 },
      tasse: { label: 'Tasse Locali (€/mese)', value: 180, min: 0, step: 10 },
      usura: { label: 'Deprezzamento (€/mese)', value: 200, min: 0, step: 10 },
      mesi: { label: 'Da Quanti Mesi l\'Inquilino Non Paga?', value: 3, min: 1, max: 60, step: 1 },
    },
    lossTitle: 'Le Tue Perdite Attuali',
    lossItems: [
      { label: 'Canoni Non Percepiti', id: 'perdita-canoni' },
      { label: 'Oneri Pagati', id: 'perdita-oneri' },
      { label: 'Tasse Pagate', id: 'perdita-tasse' },
      { label: 'Deprezzamento', id: 'perdita-usura' },
    ],
    totalLabel: 'PERDITA TOTALE ATTUALE',
    monthlyLabel: 'al mese di perdite continue',
    sfrattoSicuroTitle: 'Con Sfratto Sicuro: Convalida in 60 Giorni',
    sfrattoSicuroBody: 'Invece di continuare a perdere <span class="font-bold text-red-700 text-base sm:text-xl md:text-2xl whitespace-nowrap"><span id="perdita-mensile-2">1.680</span>€</span> ogni mese, risolvi pagando solo <span class="font-bold text-green-security text-base sm:text-xl md:text-2xl whitespace-nowrap">€1.300</span> alla convalida.',
    comparison: {
      current: {
        title: 'Situazione Attuale',
        items: ['Perdite continue ogni mese', 'Tempi incerti (12-24 mesi)', 'Stress costante', 'Casa che si deteriora', 'Costi imprevedibili'],
      },
      protocol: {
        title: 'Con il Protocollo',
        items: ['Convalida in 60 giorni', '€1.300 tutto incluso', 'Pagamento a risultato', 'Procedura ottimizzata', 'Specializzazione nello sfratto per morosità'],
      },
    },
    ctaLabel: 'RICHIEDI UNA CONSULENZA',
    ctaCaption: 'Gratuita, sicura e senza impegno',
  },

  reviews: {
    title: 'Cosa Dicono i Proprietari che Abbiamo Aiutato',
    subtitle: 'Recensioni autentiche e verificate dai nostri clienti',
    ratingNumber: '5.0',
    ratingLabel: 'Eccellente',
    totalReviews: '8',
    googleLink: 'https://www.google.com/search?kgmid=/g/11xzr2cjfr&hl=it-IT&q=Sfratto+Sicuro',
  },

  videos: {
    title: 'Video Recensioni dei Nostri Clienti',
    body: 'Guarda cosa dicono i proprietari che hanno scelto il "Protocollo Riprendi Casa" per riottenere il proprio immobile in tempi rapidi e con serenità.',
  },

  provvedimenti: {
    badge: 'DOCUMENTAZIONE UFFICIALE',
    title: 'I Nostri Risultati Concreti',
    body: 'Ogni giorno otteniamo provvedimenti di convalida per i nostri clienti.',
    images: [
      { src: '/assets/img/provvedimenti/01.webp', alt: 'Provvedimento di Convalida di Sfratto - Tribunale Italiano' },
      { src: '/assets/img/provvedimenti/02.webp', alt: 'Provvedimento di Convalida di Sfratto - Tribunale Italiano' },
      { src: '/assets/img/provvedimenti/03.webp', alt: 'Provvedimento di Convalida di Sfratto - Tribunale Italiano' },
      { src: '/assets/img/provvedimenti/04.webp', alt: 'Provvedimento di Convalida di Sfratto - Tribunale Italiano' },
    ],
  },

  urgency: {
    sectionId: 'posti-limitati',
    emoji: '⚠️',
    title: 'Posti Limitati Ogni Mese',
    body: [
      'Per garantire assistenza tempestiva e un\'esecuzione rapida del "Protocollo Sfratto Sicuro", gestiamo <strong>non più di 50 pratiche attive contemporaneamente</strong>.',
      '<strong>Acquisiamo nuovi clienti solo nei primi 10 giorni del mese.</strong>',
      'Ogni cliente è seguito da un consulente dedicato, che rimane il punto di riferimento esclusivo per tutta la procedura.',
    ],
    boxTitle: 'Non Aspettare il Mese Prossimo',
    boxSubtitle: 'I posti disponibili si esauriscono rapidamente',
    ctaLabel: 'PRENOTA IL TUO POSTO',
  },

  legalCost: {
    sectionId: 'rimborso-spese',
    emoji: '💰',
    title: 'Le Spese Legali? Le Paga l\'Inquilino.',
    body: 'Questo è un punto fondamentale che molti proprietari non conoscono. Al termine della procedura, il Giudice condanna l\'inquilino moroso a rimborsarti tutte le spese legali che hai sostenuto, incluso il nostro compenso. In pratica, rientri completamente dell\'investimento fatto per riavere la tua casa.',
  },

  procedure: {
    sectionId: 'come-funziona',
    title: 'La Procedura di Sfratto per Morosità: Le Fasi del Nostro Protocollo',
    subtitle: 'Un processo collaudato che ha già permesso di liberare oltre 1.500 immobili. La nostra procedura per lo sfratto per morosità è ottimizzata per ottenere, mediamente, la convalida in circa 60 giorni.',
    steps: [
      {
        num: '1',
        title: 'FASE 1 (Giorno 0): Analisi e Attivazione della Pratica di Sfratto',
        body: 'Ti ricontattiamo entro <strong>24 ore</strong>, analizziamo il tuo caso di sfratto per morosità e attiviamo immediatamente la pratica. Nessun tempo perso.',
        badge: 'Partenza immediata con avvocato dedicato',
        badgeEmoji: '🚀',
      },
      {
        num: '2',
        title: 'FASE 2 (Giorni 1-7): Redazione e Notifica dell\'Intimazione di Sfratto',
        body: 'Prepariamo l\'atto di intimazione per sfratto per morosità e lo notifichiamo in proprio. Procedura velocizzata.',
        badge: 'Atto redatto e notificato con tempestività',
        badgeEmoji: '📄',
      },
      {
        num: '3',
        title: 'FASE 3 (Giorni 8-30): Iscrizione a Ruolo e Deposito in Tribunale',
        body: 'Depositiamo l\'intimazione presso il Tribunale competente. Il nostro avvocato, specializzato nello sfratto per morosità, assicura l\'ottenimento di date d\'udienza rapide grazie all\'esperienza maturata sul campo.',
        badge: 'Tribunale: attivazione immediata con iter dedicato',
        badgeEmoji: '⚖️',
      },
      {
        num: '✓',
        title: 'FASE 4 (Giorni 31-60): Udienza e Convalida Giudiziale dello Sfratto',
        body: 'In udienza, il nostro avvocato ottiene l\'ordinanza di convalida dello sfratto per morosità. <strong>Solo a questo punto, con il provvedimento del Giudice, verserai il compenso pattuito di 1.300€</strong>. Questa è la nostra garanzia: prima il risultato, poi il pagamento.',
        badge: 'Convalida ottenuta – Il pagamento avviene solo dopo il provvedimento del Giudice',
        badgeEmoji: '🔨',
        isGold: true,
      },
    ],
    bottomTitle: 'Un Metodo Che Funziona Davvero',
    bottomBody: 'Con il nostro protocollo ottimizzato per lo sfratto per morosità, trasformiamo mesi di incertezza in una procedura tracciabile e prevedibile. Procedura applicata in oltre 1.500 casi documentati.',
    bottomCtaLabel: 'ATTIVA IL PROTOCOLLO',
  },

  services: {
    sectionId: 'servizi-offerti',
    title: 'Cosa Ottieni con il Nostro Servizio',
    subtitle: '€1.300 prezzo fisso tutto incluso fino alla convalida + bonus opzionali post-convalida',
    mainService: {
      title: 'SERVIZIO PRINCIPALE - €1.300 FISSO',
      items: [
        {
          icon: 'fa-file-contract',
          title: 'Analisi Caso Completa',
          body: 'Valutazione della pratica di sfratto per morosità con definizione della strategia ottimale',
          note: 'Tutte le spese incluse nel prezzo fisso',
          isGold: false,
        },
        {
          icon: 'fa-pen-nib',
          title: 'Predisposizione Atti Legali',
          body: 'Intimazione di sfratto e citazione per convalida predisposte dall\'avvocato per sfratto',
          note: 'Contributi unificati e marche da bollo incluse',
          isGold: false,
        },
        {
          icon: 'fa-bell',
          title: 'Notifiche in Proprio',
          body: 'Tutte le notifiche in proprio per velocizzare i tempi',
          note: 'Spese notifica incluse fino a convalida',
          isGold: false,
        },
        {
          icon: 'fa-balance-scale',
          title: 'Rappresentanza in Tribunale',
          body: 'Patrocinio in udienza per ottenere la convalida di sfratto',
          note: 'Compenso domiciliatario incluso',
          isGold: false,
        },
        {
          icon: 'fa-gavel',
          title: 'Convalida di Sfratto',
          body: '<strong>OBIETTIVO RAGGIUNTO: Ordinanza di convalida dello sfratto per morosità ottenuta</strong>',
          note: 'PAGAMENTO: Solo dopo l\'emissione della convalida del Giudice',
          isGold: true,
        },
      ],
    },
    bonuses: {
      title: 'BONUS POST-CONVALIDA',
      howItWorksTitle: 'Come Funzionano i Bonus',
      howItWorksBody: 'Dopo la convalida, per le fasi successive hai piena libertà di scelta:',
      howItWorksItems: [
        'Proseguire con i nostri servizi per completare l\'iter (già inclusi nel compenso di €1.300 versato)',
        'Affidarti ad altri professionisti se preferisci',
        'I bonus rimangono attivi fino alla liberazione dell\'immobile',
      ],
      items: [
        {
          badge: 'BONUS 1',
          title: 'Gestione Esecuzione Forzata',
          body: 'Se scegli noi: gestione completa fino al rilascio fisico',
          note: 'Inclusa nel servizio se prosegui con noi',
        },
        {
          badge: 'BONUS 2',
          title: 'Recupero Crediti da Morosità',
          body: 'Se scegli noi: azione per il recupero delle somme dovute',
          note: 'Incluso nel servizio se prosegui con noi',
        },
        {
          badge: 'BONUS 3',
          title: 'Mini-Guida Rilocazione Sicura',
          body: 'Guida completa per scegliere il nuovo inquilino senza rischi',
          note: 'Sempre inclusa per tutti i clienti',
          isGold: true,
        },
      ],
    },
    pricingBox: {
      title: 'Valore Totale vs Prezzo Richiesto',
      items: [
        { value: '€3.200', label: 'Valore servizi professionali' },
        { value: '€1.300', label: 'Prezzo fisso tutto incluso' },
        { value: '€1.900', label: 'Il tuo risparmio' },
      ],
      ctaLabel: 'RICHIEDI TUTTO INCLUSO',
    },
  },

  costTransparency: {
    sectionId: 'costi-trasparenza',
    anchorId: 'prezzi',
    title: 'Quanto Costa l\'Avvocato per lo Sfratto? La Nostra Formula Sfratto Sicuro',
    subtitle: 'Siamo completamente trasparenti sui costi dello sfratto per morosità. Nessuna sorpresa.',
    priceTitle: 'Il Nostro Compenso: €1.300 Fisso',
    priceBody: 'Paghi €1.300 <strong>solo quando ottieni la convalida del Tribunale</strong> (mediamente entro 60 giorni). Questo prezzo fisso include <strong>TUTTE le spese</strong> necessarie fino alla convalida dello sfratto per morosità.',
    includedTitle: 'COSA È INCLUSO NEI €1.300:',
    includedSubtitle: 'Tutte le spese fino alla convalida del Tribunale sono incluse:',
    includedItemsLeft: [
      'Consulenza e analisi del caso',
      'Predisposizione atti legali',
      'Contributo unificato per l\'iscrizione a ruolo',
      'Marche da bollo',
    ],
    includedItemsRight: [
      'Spese notifica',
      'Rappresentanza processuale in udienza',
      'Gestione completa fino alla convalida',
      'Assistenza e aggiornamenti costanti',
    ],
  },

  whoWeAre: {
    sectionId: 'chi-siamo',
    title: 'Chi Siamo',
    paragraphs: [
      'Siamo <strong>avvocati specializzati esclusivamente in sfratti per morosità</strong>, con centrali operative a <strong>Milano e Salerno</strong>, dove vengono predisposti tutti gli atti.',
      'Ci avvaliamo di una <strong>fitta rete di domiciliatari che operano in ogni Tribunale d\'Italia</strong>, occupandosi degli adempimenti presso le Cancellerie e gli Ufficiali Giudiziari.',
      'Questa organizzazione ci permette di <strong>ottimizzare i tempi</strong> e garantire <strong>una copertura completa su tutto il territorio nazionale</strong>, mantenendo la massima specializzazione nel settore dello sfratto per morosità.',
    ],
    pillars: [
      {
        icon: 'fa-building',
        title: 'Centrali Operative',
        line1: 'Milano, Salerno',
        line2: 'Avvocato per sfratto dedicato',
      },
      {
        icon: 'fa-network-wired',
        title: 'Rete Nazionale',
        line1: 'Avvocati in ogni Tribunale',
        line2: 'Copertura Italia completa',
      },
      {
        icon: 'fa-gavel',
        title: 'Solo Sfratti',
        line1: 'Specializzazione esclusiva',
        line2: 'Dal 2018',
      },
    ],
  },

  whyChooseUs: {
    sectionId: 'perche-sceglierci',
    title: 'Perché Scegliere il Nostro Servizio',
    subtitle: 'Non siamo uno studio legale generico. Ci occupiamo esclusivamente delle procedure di sfratto per morosità con un metodo collaudato e risultati documentati.',
    pillars: [
      {
        icon: 'fa-network-wired',
        title: 'Rete Nazionale',
        body: 'Avvocati domiciliatari in ogni Tribunale d\'Italia per velocizzare ogni fase.',
      },
      {
        icon: 'fa-laptop',
        title: 'Sistema Digitale',
        body: 'Gestione completamente online con aggiornamenti automatici.',
      },
      {
        icon: 'fa-chart-line',
        title: 'Metodo Collaudato',
        body: 'Oltre 1.500 sfratti per morosità completati con successo. Ogni fase è stata ottimizzata.',
      },
      {
        icon: 'fa-headset',
        title: 'Supporto Dedicato',
        body: 'Un avvocato ti segue passo passo fino alla convalida.',
      },
    ],
    bottomTitle: 'La Differenza È Nella Specializzazione',
    bottomBody: 'Mentre altri avvocati trattano sfratti occasionalmente, noi lavoriamo SOLO sullo sfratto per morosità. Il risultato? Tempi dimezzati, costi certi, risultati documentati.',
    ctaLabel: 'RICHIEDI UNA CONSULENZA GRATUITA',
    ctaCaption: 'Gratuita, sicura e senza impegno',
  },

  faq: {
    sectionId: 'faq',
    title: 'Le Risposte a Ogni Tuo Dubbio sullo Sfratto',
    subtitle: 'Le risposte alle domande che ci fanno più spesso i proprietari che cercano un avvocato per sfratto.',
    subtitle2: 'Qui rispondiamo alle domande più comuni sulla procedura di sfratto, basandoci sulla nostra esperienza diretta come avvocati specializzati.',
    items: [
      {
        icon: 'fa-clock',
        q: 'Quali sono i tempi reali per uno sfratto per morosità?',
        a: 'I tempi di uno sfratto per morosità possono superare l\'anno con procedure non ottimizzate. Con il nostro Protocollo otteniamo la <strong>convalida dello sfratto mediamente in 60 giorni</strong>.',
      },
      {
        icon: 'fa-calendar',
        q: 'Quanti mesi di affitto non pagati servono per avviare lo sfratto?',
        a: 'Per legge si può avviare la procedura già dopo <strong>20 giorni</strong> di ritardo nel pagamento di una sola mensilità.',
      },
      {
        icon: 'fa-euro-sign',
        q: 'Quanto costa un avvocato per lo sfratto?',
        a: 'Offriamo una formula a prezzo fisso di <strong>1.300€ tutto incluso</strong> fino alla convalida. Copre spese legali, notifiche, contributi e rappresentanza senza costi aggiuntivi.',
      },
      {
        icon: 'fa-money-bill',
        q: 'Cosa succede se l\'inquilino paga dopo la notifica?',
        a: 'Se l\'inquilino paga prima della convalida, la procedura si interrompe.',
      },
      {
        icon: 'fa-child',
        q: 'È possibile sfrattare un inquilino con figli minorenni?',
        a: 'Sì, lo sfratto per morosità è possibile anche in presenza di minori. Seguiamo la procedura con particolare attenzione agli aspetti sensibili.',
      },
      {
        icon: 'fa-store',
        q: 'Come funziona lo sfratto per un locale commerciale?',
        a: 'Le regole sono simili allo sfratto abitativo, ma spesso i tempi sono più rapidi. Gestiamo anche contratti commerciali con la stessa efficacia.',
      },
      {
        icon: 'fa-gavel',
        q: 'Alla fine della procedura, chi paga l\'avvocato per lo sfratto?',
        a: 'Il Giudice condanna l\'inquilino moroso a rimborsare al proprietario <strong>tutte le spese legali</strong>, incluso il nostro compenso di 1.300€.',
      },
      {
        icon: 'fa-receipt',
        q: 'Cosa comprende la vostra parcella Sfratto Sicuro?',
        a: 'I nostri 1.300€ includono: consulenza, atti legali, contributi unificati, marche, notifiche, e rappresentanza in Tribunale. <strong>Nessun costo aggiuntivo fino alla convalida.</strong>',
      },
      {
        icon: 'fa-balance-scale',
        q: 'Cosa succede se l\'inquilino non lascia l\'immobile dopo la convalida?',
        a: 'Si passa all\'esecuzione forzata tramite Ufficiale Giudiziario, con accessi programmati e, se necessario, forza pubblica. I nostri compensi per questa fase sono già inclusi nei 1.300€.',
      },
      {
        icon: 'fa-hourglass-half',
        q: 'Posso avviare lo sfratto se l\'inquino paga in ritardo o solo una parte dell\'affitto?',
        a: 'Sì. La morosità esiste anche con pagamenti in <strong>ritardo</strong>, a <strong>singhiozzo</strong> o solo <strong>parziali</strong>. Basta un inadempimento oltre 20 giorni per procedere.',
      },
      {
        icon: 'fa-user-shield',
        q: 'Devo essere presente all\'udienza di sfratto?',
        a: 'No. Seguiamo noi l\'intera udienza: il proprietario <strong>non deve andare in Tribunale</strong>.',
      },
      {
        icon: 'fa-coins',
        q: 'Oltre allo sfratto, posso recuperare i canoni arretrati?',
        a: 'Sì. Chiediamo al Giudice la condanna dell\'inquilino al pagamento di <strong>tutti gli affitti non versati</strong>, degli oneri condominiali e delle spese legali.',
      },
      {
        icon: 'fa-exclamation-circle',
        q: 'Cosa succede se l\'inquilino si oppone allo sfratto?',
        a: 'L\'opposizione rende il procedimento ordinario, ma predisponiamo una strategia dedicata per ottenere comunque il rilascio nel minor tempo possibile.',
      },
      {
        icon: 'fa-hand-holding-heart',
        q: 'Cos\'è il "termine di grazia" e quando può essere concesso?',
        a: 'È un periodo (30–90 giorni) che il Giudice può concedere all\'inquilino per sanare la morosità. Se paga tutto, lo sfratto non viene convalidato. Non è automatico.',
      },
      {
        icon: 'fa-file-signature',
        q: 'Posso sfrattare un inquilino se il contratto non è perfettamente regolare?',
        a: 'Puoi procedere solo con contratto <strong>regolarmente registrato</strong>. Irregolarità minori non impediscono lo sfratto, ma un contratto non registrato va prima sanato.',
      },
      {
        icon: 'fa-ban',
        q: 'Posso staccare le utenze o cambiare la serratura per farlo andare via?',
        a: 'No. Sono azioni <strong>illegali</strong> che possono comportare responsabilità penali. Lo sgombero può essere eseguito solo dall\'Ufficiale Giudiziario.',
      },
      {
        icon: 'fa-piggy-bank',
        q: 'Posso trattenere la cauzione per coprire i canoni non pagati?',
        a: 'Solo alla <strong>fine della locazione</strong> e solo per compensare canoni non saldati o danni. Non sostituisce il pagamento del canone mensile.',
      },
      {
        icon: 'fa-box-open',
        q: 'Cosa succede ai beni dell\'inquilino se non è presente durante lo sgombero?',
        a: 'L\'Ufficiale Giudiziario decide se rimuovere, custodire o dichiarare abbandonati i beni. Il proprietario non può toccarli autonomamente.',
      },
      {
        icon: 'fa-user-times',
        q: 'È possibile sfrattare un inquilino nullatenente?',
        a: 'Sì. Lo sfratto riguarda il <strong>rilascio dell\'immobile</strong>, non la capacità economica del conduttore. Il recupero dei canoni sarà più complesso, ma l\'immobile viene liberato.',
      },
    ],
    bottomTitle: 'Hai Altre Domande?',
    bottomBody: 'Parla direttamente con noi. Consulenza telefonica gratuita e senza impegno sullo sfratto per morosità.',
    ctaLabel: 'CONSIGLIERA GRATUITA',
    ctaCaption: 'Gratuita, sicura e senza impegno',
  },

  miniWidget: {
    rating: '5.0',
    stars: '★★★★★',
    total: '8',
    line1: 'Oltre 1.500 proprietari soddisfatti',
    line2: 'si sono già affidati a noi con successo',
  },

  contactForm: {
    sectionId: 'contatti',
    title: 'Richiedi una Consulenza Gratuita',
    subtitle: 'In meno di 24 ore puoi avere il nostro avvocato al lavoro sul tuo caso di sfratto per morosità. Convalida in 60 giorni, €1.300 tutto incluso.',
    formTitle: 'Scrivici Ora',
    fields: {
      nome: { label: 'Nome *', placeholder: 'Il tuo nome', required: true },
      cognome: { label: 'Cognome *', placeholder: 'Il tuo cognome', required: true },
      telefono: { label: 'Telefono *', placeholder: 'Il tuo numero di telefono', required: true },
      email: { label: 'Email *', placeholder: 'La tua email', required: true },
      citta: { label: 'Città immobile *', placeholder: 'In che città si trova l\'immobile?', required: true },
      morosita: {
        label: 'Da quanto l\'inquilino non paga? *',
        required: true,
        options: [
          { value: '', label: 'Seleziona periodo' },
          { value: '1-2 mesi', label: '1-2 mesi' },
          { value: '3-6 mesi', label: '3-6 mesi' },
          { value: '6-12 mesi', label: '6-12 mesi' },
          { value: 'Oltre 12 mesi', label: 'Oltre 12 mesi' },
        ],
      },
      note: { label: 'Note aggiuntive', placeholder: 'Raccontaci brevemente la tua situazione...' },
    },
    submitLabel: 'RICHIEDI UNA CONSULENZA GRATUITA',
    privacyNote: 'I tuoi dati sono protetti e non verranno condivisi.',
    formNote: 'Ti ricontattamo entro 24 ore\nConsulenza gratuita e senza impegno',
    contacts: {
      phoneLabel: 'Telefono',
      phoneValue: '+39 02 80898395',
      phoneHours: 'Lun-Ven 9:00-19:00 | Sab 9:00-13:00',
      whatsappLabel: 'WhatsApp',
      whatsappValue: '+39 329 117 5957',
      whatsappNote: 'Risposte rapide',
      emailLabel: 'Email',
      emailValue: 'consulenza@sfrattosicuro.it',
      emailNote: 'Ti ricontatteremo entro 24 ore',
    },
    urgencyBox: {
      title: 'Non Aspettare Oltre',
      body: 'Ogni giorno che aspetti per attivare lo sfratto per morosità è denaro che perdi. In oltre 1.500 casi completati, abbiamo visto che chi agisce subito ottiene sempre risultati migliori. <strong>La consulenza è gratuita, non hai nulla da perdere.</strong>',
    },
  },

  footer: {
    brandName: 'Sfratto Sicuro',
    brandSubtitle: 'Avvocati Specializzati',
    brandDesc: 'Il primo servizio legale in Italia specializzato esclusivamente nel recupero immobili per morosità.',
    services: {
      title: 'Servizi',
      links: [
        { label: 'Sfratto Abitativo', href: '#' },
        { label: 'Sfratto Commerciale', href: '#' },
        { label: 'Recupero Canoni', href: '#' },
        { label: 'Esecuzione Forzata', href: '#' },
      ],
      faqLink: { label: 'Domande Frequenti', href: '#faq' },
    },
    where: {
      title: 'Dove Operiamo',
      hq: { label: 'Sede Centrale', value: 'Salerno, Via F. P. Volpe 2' },
      network: { label: 'Domiciliatari in tutta Italia', value: 'Grazie alla nostra rete, operiamo fisicamente presso <strong>tutti i Tribunali</strong>.' },
    },
    legal: {
      title: 'Dati Societari',
      copyright: '© 2024 Sfratto Sicuro',
      company: 'D1 S.R.L.S.',
      vat: 'P. IVA 06177400659',
      capital: 'Capitale Sociale Interamente Versato',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Termini e Condizioni', href: '/termini' },
      ],
    },
  },
};
