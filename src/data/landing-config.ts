import { landingOriginal } from './landing-original';
import { formatBusinessEuro, pricing } from '../lib/business';

export type LandingVersion = 'v2' | 'v3' | 'v4';
export type LandingKeywordSlug = 'sfratto-per-morosita';
export type LandingTerritorySlug = 'nazionale' | 'milano' | 'roma' | 'napoli';

export type LandingFaqItem = {
  icon?: string;
  q: string;
  a: string;
};

export type LandingSeoConfig = {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  robots: string;
};

export type LandingTerritoryConfig = {
  slug: LandingTerritorySlug;
  label: string;
  tribunalsLabel: string;
  keywordSuffix?: string;
  dynamicReplacement?: {
    city?: string;
    area?: string;
  };
};

export type LandingKeywordConfig = {
  slug: LandingKeywordSlug;
  primary: string;
  secondary: string[];
  titleStem: string;
  metaKeywordList: string[];
};

export type LandingQuickFactsConfig = {
  eyebrow: string;
  title: string;
  items: { label: string; value: string; note?: string }[];
};

export type LandingPageConfig = {
  version: LandingVersion;
  territory: LandingTerritoryConfig;
  keyword: LandingKeywordConfig;
  seo: LandingSeoConfig;
  hero: typeof landingOriginal.hero;
  trustBar: typeof landingOriginal.trustBar;
  quickFacts: LandingQuickFactsConfig;
  problems: typeof landingOriginal.problems;
  calculator: typeof landingOriginal.calculator;
  legalCost: typeof landingOriginal.legalCost;
  procedure: typeof landingOriginal.procedure;
  services: typeof landingOriginal.services;
  costTransparency: typeof landingOriginal.costTransparency;
  whoWeAre: typeof landingOriginal.whoWeAre;
  whyChooseUs: typeof landingOriginal.whyChooseUs;
  faq: typeof landingOriginal.faq & { items: LandingFaqItem[] };
  contactForm: typeof landingOriginal.contactForm;
  jsonLd: {
    legalService: Record<string, unknown>;
    organization: Record<string, unknown>;
    website: Record<string, unknown>;
    faq: Record<string, unknown>;
  };
};

const territories: Record<LandingTerritorySlug, LandingTerritoryConfig> = {
  nazionale: {
    slug: 'nazionale',
    label: 'nazionale',
    tribunalsLabel: 'tutti i Tribunali d\'Italia',
  },
  milano: {
    slug: 'milano',
    label: 'Milano',
    tribunalsLabel: 'il Tribunale di Milano e la rete nazionale dei domiciliatari',
    keywordSuffix: 'a Milano',
    dynamicReplacement: { city: 'Milano', area: 'nell’area di Milano' },
  },
  roma: {
    slug: 'roma',
    label: 'Roma',
    tribunalsLabel: 'il Tribunale di Roma e la rete nazionale dei domiciliatari',
    keywordSuffix: 'a Roma',
    dynamicReplacement: { city: 'Roma', area: 'nell’area di Roma' },
  },
  napoli: {
    slug: 'napoli',
    label: 'Napoli',
    tribunalsLabel: 'il Tribunale di Napoli e la rete nazionale dei domiciliatari',
    keywordSuffix: 'a Napoli',
    dynamicReplacement: { city: 'Napoli', area: 'nell’area di Napoli' },
  },
};

const keywords: Record<LandingKeywordSlug, LandingKeywordConfig> = {
  'sfratto-per-morosita': {
    slug: 'sfratto-per-morosita',
    primary: 'avvocato per sfratto per morosità',
    secondary: ['avvocato per sfratto', 'sfratto per morosità', 'avvocato sfratto', 'inquilino moroso'],
    titleStem: 'Avvocato per Sfratto',
    metaKeywordList: [
      'avvocato per sfratto',
      'sfratto per morosità',
      'avvocato sfratto',
      'convalida sfratto',
      'inquilino moroso',
      'rilascio immobile',
      'sfratto veloce',
    ],
  },
};

const isConversionVersion = (version: LandingVersion) => version === 'v3' || version === 'v4';

function withTerritoryCopy(text: string, territory: LandingTerritoryConfig) {
  if (territory.slug === 'nazionale') return text;
  return text
    .replace(/su tutto il territorio nazionale/g, territory.dynamicReplacement?.area || 'sul territorio locale')
    .replace(/tutti i Tribunali d'Italia/g, territory.tribunalsLabel);
}

function buildHero(version: LandingVersion, territory: LandingTerritoryConfig, keyword: LandingKeywordConfig) {
  const suffix = territory.keywordSuffix ? ` ${territory.keywordSuffix}` : '';
  const defaultBullets = landingOriginal.hero.bullets.map((item, index) => {
    if (index !== 2 || territory.slug === 'nazionale') return item;
    return item.replace('dal Giudice', `dal Giudice${territory.keywordSuffix ? ` ${territory.keywordSuffix}` : ''}`);
  });

  if (isConversionVersion(version)) {
    const isV4 = version === 'v4';
    return {
      ...landingOriginal.hero,
      title: `Avvocato per Sfratto per Morosità${suffix}`,
      subtitle:
        territory.slug === 'nazionale'
          ? (isV4
              ? `Scegli la formula completa <strong class="text-white">fino alla riconsegna delle chiavi</strong>, oppure procedi per fasi. Prezzi chiari, solo per proprietari e locatori.`
              : `Non solo la convalida: ti assistiamo <strong class="text-white">fino alla riconsegna delle chiavi</strong>, con un solo prezzo. Solo per proprietari e locatori, in tutta Italia.`)
          : `Non solo la convalida: ti assistiamo <strong class="text-white">fino alla riconsegna delle chiavi</strong>, con un solo prezzo. Solo per proprietari e locatori${territory.dynamicReplacement?.area ? `, ${territory.dynamicReplacement.area}` : ''}.`,
      prequalificationNote: undefined,
      ownerField: true,
      bullets: isV4
        ? [
            `<strong>${formatBusinessEuro(pricing.testV4.faseConvalida)}</strong> per la fase di convalida`,
            `<strong>${formatBusinessEuro(pricing.testV4.faseEsecutiva)}</strong> per l’eventuale fase esecutiva`,
            `<strong>${formatBusinessEuro(pricing.compensoComplessivo)} formula completa</strong>: risparmi ${formatBusinessEuro(pricing.testV4.faseConvalida + pricing.testV4.faseEsecutiva - pricing.compensoComplessivo)}`,
            '<strong>Nessun acconto</strong> per avviare la convalida',
            '<strong>Convalida in ~60 giorni</strong> in media',
          ]
        : [
            '<strong>€1.300 IVA e cassa incluse</strong>: un solo prezzo, tutto il percorso',
            '<strong>Convalida + fase esecutiva</strong>, fino alle chiavi',
            '<strong>Zero anticipi</strong>: paghi solo dopo l’udienza',
            '<strong>Convalida in ~60 giorni</strong> in media',
            '<strong>Vale anche per finita locazione</strong> e locali commerciali: stesse condizioni',
          ],
      formTitle: 'Verifica se puoi partire',
      formSubtitle: 'Prima valutazione <strong>gratuita e senza impegno</strong>: ti richiamiamo noi.<br><span style="font-size: 0.75rem;">(Lun–Ven 9–19 • Sab 9–13)</span>',
      formSubmitLabel: 'Invia la richiesta',
      formNamePlaceholder: 'Nome e cognome del proprietario',
      formPhonePlaceholder: 'Numero di telefono diretto',
      formMorositaOptions: landingOriginal.contactForm.fields.morosita.options,
      formSource: isV4 ? 'hero_form_v4' : 'hero_form_v3',
      formTrustLine: true,
    };
  }

  return {
    ...landingOriginal.hero,
    title: `Avvocato per\nSfratto per Morosità${suffix}`,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.hero.subtitle
        : `Non lasciare che un inquilino ti tolga la serenità${territory.dynamicReplacement?.area ? ` ${territory.dynamicReplacement.area}` : ''}. Riottieni il tuo immobile in tempi rapidi, <strong class="text-white">senza anticipi.</strong>`,
    bullets: defaultBullets,
    formSubtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.hero.formSubtitle
        : `Inserisci i tuoi dati: prima consulenza gratuita e senza impegno per il tuo immobile ${territory.dynamicReplacement?.area || ''}.\n    <br><span style="font-size: 0.75rem;">(Lun–Ven 9–19 • Sab 9–13)</span>`,
  };
}

function buildQuickFacts(version: LandingVersion, territory: LandingTerritoryConfig): LandingQuickFactsConfig {
  if (version === 'v3') {
    return {
      eyebrow: 'Informazioni essenziali prima di partire',
      title: 'Avvocato per sfratto: costo, tempi e procedura subito chiari',
      items: [
        {
          label: 'Costo',
          value: '€1.300, pagati dopo la convalida',
          note: 'Nessun acconto. Dopo la convalida, assistenza gratuita fino al rilascio',
        },
        {
          label: 'Tempi',
          value: 'Convalida mediamente in circa 60 giorni',
          note: territory.slug === 'nazionale' ? 'Dato medio operativo, non promessa assoluta: i tempi dipendono anche dal Tribunale competente' : `Dato medio operativo, con assistenza anche presso ${territory.tribunalsLabel}`,
        },
        {
          label: 'Procedura',
          value: 'Analisi del caso → intimazione → deposito → udienza di convalida',
          note: 'Percorso guidato con avvocato dedicato e prosecuzione, se necessaria, fino al rilascio dell’immobile',
        },
      ],
    };
  }

  return {
    eyebrow: 'Punti chiave del servizio',
    title: 'Perché i proprietari ci contattano subito',
    items: [
      { label: 'Costo', value: '€1.300 fino al rilascio dell’immobile', note: 'Nessun acconto, pagamento dopo la convalida' },
      { label: 'Tempi', value: '60 giorni medi per la convalida', note: 'Dato operativo variabile in base al Tribunale' },
      { label: 'Copertura', value: 'Tutta Italia', note: 'Rete di domiciliatari su scala nazionale' },
    ],
  };
}

function buildTrustBar(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.trustBar,
    text: withTerritoryCopy(landingOriginal.trustBar.text, territory),
    text2:
      territory.slug === 'nazionale'
        ? landingOriginal.trustBar.text2
        : `Operiamo presso ${territory.tribunalsLabel}`,
  };
}

function buildProblems(version: LandingVersion, territory: LandingTerritoryConfig) {
  if (version === 'v3') {
    return {
      ...landingOriginal.problems,
      badge: 'SEI NELLA SITUAZIONE GIUSTA?',
      title: 'Avvocato per sfratto: per proprietari con un problema concreto di morosità',
      subtitle: territory.slug === 'nazionale'
        ? 'Se l’inquilino non paga e vuoi capire costi, tempi e passaggi della procedura, qui trovi una spiegazione operativa. La pagina è pensata per proprietari o locatori che cercano un avvocato per sfratto e devono valutare una procedura concreta di sfratto per morosità.'
        : `Se l’inquilino non paga ${territory.dynamicReplacement?.area || ''}, qui trovi solo le risposte operative che servono a un proprietario per partire davvero.`,
      items: landingOriginal.problems.items.slice(0, 4),
    };
  }

  return {
    ...landingOriginal.problems,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.problems.subtitle
        : `Ogni giorno aiutiamo proprietari ${territory.dynamicReplacement?.area || ''} che si trovano esattamente nella tua stessa condizione. Questi sono i problemi più comuni che affrontiamo.`,
  };
}

function buildCalculator(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.calculator,
    intro:
      territory.slug === 'nazionale'
        ? landingOriginal.calculator.intro
        : `${landingOriginal.calculator.intro} Anche ${territory.dynamicReplacement?.area || 'nel tuo territorio'} il costo vero è il tempo perso.`,
  };
}

function buildLegalCost(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.legalCost,
    title: 'Le spese legali possono essere poste a carico dell’inquilino moroso',
    body:
      territory.slug === 'nazionale'
        ? 'Nella pronuncia di convalida, il Giudice può condannare l’inquilino moroso anche al rimborso delle spese legali. È un elemento importante, ma va sempre valutato nel contesto concreto della procedura e dell’eventuale fase di recupero.'
        : `Nella pronuncia di convalida, il Giudice può condannare l’inquilino moroso anche al rimborso delle spese legali. Gestiamo la pratica anche presso ${territory.tribunalsLabel}.`,
  };
}

function buildProcedure(version: LandingVersion, territory: LandingTerritoryConfig) {
  if (isConversionVersion(version)) {
    return {
      ...landingOriginal.procedure,
      title: 'Come funziona lo sfratto per morosità',
      subtitle: territory.slug === 'nazionale'
        ? 'Quattro fasi, un avvocato dedicato. In media 60 giorni alla convalida.'
        : `Quattro fasi, un avvocato dedicato, anche presso ${territory.tribunalsLabel}.`,
      steps: [
        {
          num: '1',
          title: 'Oggi: valutazione gratuita del caso',
          body: 'Ci racconti la situazione. Ti diciamo subito se puoi partire, senza anticipare nulla.',
          badge: 'Avvocato dedicato da subito',
          badgeEmoji: '',
        },
        {
          num: '2',
          title: 'Giorni 1-7: intimazione di sfratto',
          body: 'Prepariamo l’atto e lo notifichiamo all’inquilino moroso.',
          badge: 'Atto notificato in tempi rapidi',
          badgeEmoji: '',
        },
        {
          num: '3',
          title: 'Giorni 8-30: deposito in Tribunale',
          body: 'Iscriviamo la causa e otteniamo la data d’udienza.',
          badge: 'Iter dedicato in Tribunale',
          badgeEmoji: '',
        },
        {
          num: '✓',
          title: 'Giorni 31-60: convalida dello sfratto',
          body: version === 'v4'
            ? 'Il Giudice decide sulla convalida. Se serve proseguire, la fase esecutiva è già inclusa nella formula completa oppure può essere attivata separatamente. <strong>Il compenso della convalida si paga solo dopo l’udienza.</strong>'
            : 'Il Giudice convalida lo sfratto e, se serve, ti assistiamo fino al rilascio dell’immobile. <strong>Il compenso si paga solo dopo l’udienza di convalida.</strong>',
          badge: version === 'v4' ? 'Formula completa o percorso per fasi' : 'Assistenza inclusa fino al rilascio',
          badgeEmoji: '',
          isGold: true,
        },
      ],
      bottomTitle: 'Un metodo collaudato',
      bottomBody: 'Solo sfratti dal 2018: circa 200 procedure seguite ogni anno, in tutti i Tribunali d’Italia.',
      bottomCtaLabel: 'Verifica se puoi partire',
    };
  }

  const baseSteps = landingOriginal.procedure.steps.map((step, index) => {
    if (index === 3) {
      return {
        ...step,
        title: 'FASE 4 (Giorni 31-60): Udienza e convalida dello sfratto',
        body: 'In udienza, il nostro avvocato richiede il provvedimento di convalida dello sfratto per morosità. <strong>Solo dopo la convalida viene richiesto il pagamento del compenso concordato</strong>. Se necessario, la procedura prosegue successivamente fino al rilascio dell’immobile.',
        badge: 'Convalida ottenuta - da qui, se serve, si prosegue fino al rilascio',
      };
    }

    if (territory.slug !== 'nazionale' && index === 2) {
      return {
        ...step,
        body: step.body.replace('Tribunale competente', territory.tribunalsLabel),
      };
    }

    return step;
  });

  return {
    ...landingOriginal.procedure,
    subtitle:
      territory.slug === 'nazionale'
        ? 'Un percorso operativo collaudato per arrivare alla convalida dello sfratto e, se necessario, proseguire fino al rilascio dell’immobile. I tempi possono variare in base al Tribunale e alla presenza di opposizione.'
        : `Un percorso operativo collaudato per arrivare alla convalida dello sfratto e, se necessario, proseguire fino al rilascio dell’immobile. Operiamo anche presso ${territory.tribunalsLabel}.`,
    steps: baseSteps,
  };
}

function buildServices(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.services,
    subtitle:
      territory.slug === 'nazionale'
        ? 'Compenso complessivo di 1.300€ fino al rilascio dell’immobile, senza acconti. Il pagamento viene richiesto solo dopo la convalida dello sfratto.'
        : `Compenso complessivo di 1.300€ fino al rilascio dell’immobile, senza acconti. Servizio attivo anche ${territory.dynamicReplacement?.area || ''}.`,
    mainService: {
      ...landingOriginal.services.mainService,
      title: 'SERVIZIO LEGALE FINO AL RILASCIO DELL’IMMOBILE',
      items: [
        {
          icon: 'fa-file-contract',
          title: 'Analisi del caso',
          body: 'Valutazione iniziale della pratica di sfratto per morosità e definizione della strategia più adatta.',
          note: '✓ Attività compresa nel compenso complessivo',
          isGold: false,
        },
        {
          icon: 'fa-pen-nib',
          title: 'Predisposizione degli atti',
          body: 'Intimazione di sfratto e citazione per convalida predisposte dall’avvocato incaricato.',
          note: '✓ Atti e contributi compresi',
          isGold: false,
        },
        {
          icon: 'fa-bell',
          title: 'Notifiche e deposito',
          body: 'Gestione delle notifiche e del deposito della procedura presso il Tribunale competente.',
          note: '✓ Procedura seguita fino all’udienza',
          isGold: false,
        },
        {
          icon: 'fa-balance-scale',
          title: 'Udienza di convalida',
          body: 'Assistenza in udienza per ottenere il provvedimento di convalida dello sfratto.',
          note: '✓ Il pagamento viene richiesto solo dopo questa fase',
          isGold: false,
        },
        {
          icon: 'fa-gavel',
          title: 'Prosecuzione fino al rilascio',
          body: '<strong>La pratica prosegue, se necessario, fino al rilascio dell’immobile.</strong>',
          note: '★ Il compenso complessivo resta quello concordato: 1.300€ fino al rilascio',
          isGold: true,
        },
      ],
    },
    bonuses: {
      ...landingOriginal.services.bonuses,
      title: 'COSA SUCCEDE DOPO LA CONVALIDA',
      howItWorksTitle: 'Dopo la convalida',
      howItWorksBody: 'La convalida non coincide sempre con il rilascio immediato dell’immobile. Se necessario, la procedura prosegue con la fase esecutiva.',
      howItWorksItems: [
        'la convalida è il provvedimento del Giudice che conferma lo sfratto;',
        'se l’immobile non viene rilasciato spontaneamente, si passa alla fase esecutiva;',
        'nella nostra formula v3 il riferimento economico resta il compenso complessivo fino al rilascio dell’immobile.',
      ],
      items: [
        {
          badge: 'FASE 1',
          title: 'Convalida dello sfratto',
          body: 'È il primo risultato decisivo della procedura, e il momento in cui viene richiesto il pagamento concordato.',
          note: '✓ Nessun acconto prima della convalida',
        },
        {
          badge: 'FASE 2',
          title: 'Eventuale fase esecutiva',
          body: 'Se l’immobile non viene rilasciato spontaneamente, si prosegue per ottenere il rilascio effettivo.',
          note: '✓ Distinzione chiara tra convalida e rilascio',
        },
        {
          badge: 'FOCUS',
          title: 'Obiettivo finale',
          body: 'Riottenere materialmente il possesso dell’immobile, non solo il provvedimento di convalida.',
          note: '★ Copy e struttura allineati a questo concetto',
          isGold: true,
        },
      ],
    },
    pricingBox: {
      ...landingOriginal.services.pricingBox,
      title: 'Valore reale vs prezzo',
      items: [
        { value: '€3.200', label: 'Valore dei servizi professionali' },
        { value: '€1.300', label: 'Prezzo fisso (paghi dopo la convalida)' },
        { value: '€1.900', label: 'Il tuo risparmio' },
      ],
      ctaLabel: 'RICHIEDI UNA VALUTAZIONE RAPIDA',
    },
  };
}

function buildCostTransparency(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.costTransparency,
    title: 'Compenso chiaro e struttura del pagamento',
    subtitle:
      territory.slug === 'nazionale'
        ? 'Ti spieghiamo in modo semplice ma corretto cosa comprende il compenso, quando viene richiesto e come si distingue il momento della convalida dal risultato finale del rilascio dell’immobile.'
        : `${landingOriginal.costTransparency.subtitle} Formula valida anche per pratiche ${territory.dynamicReplacement?.area || ''}.`,
    priceTitle: 'Compenso €1.300: lo paghi solo dopo la convalida',
    priceBody: 'Il compenso concordato è di <strong>€1.300</strong> e <strong>non chiediamo acconti</strong>: lo paghi <strong>solo dopo la convalida</strong> dello sfratto. Da quel momento <strong>continuiamo ad assisterti gratuitamente fino al rilascio</strong> dell’immobile; restano a tuo carico solo le eventuali spese vive della fase esecutiva (es. ufficiale giudiziario), sempre indicate prima.',
  };
}

function buildWhoWeAre(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.whoWeAre,
    paragraphs: territory.slug === 'nazionale'
      ? landingOriginal.whoWeAre.paragraphs
      : landingOriginal.whoWeAre.paragraphs.map((p, index) => index === 2 ? `${p} Interveniamo anche ${territory.dynamicReplacement?.area || ''}.` : p),
  };
}

function buildWhyChooseUs(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.whyChooseUs,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.whyChooseUs.subtitle
        : `${landingOriginal.whyChooseUs.subtitle} Con operatività anche ${territory.dynamicReplacement?.area || ''}.`,
  };
}

function buildFaq(version: LandingVersion, territory: LandingTerritoryConfig, keyword: LandingKeywordConfig) {
  const suffix = territory.keywordSuffix ? ` ${territory.keywordSuffix}` : '';
  const items = landingOriginal.faq.items.map((item, index) => {
    if (territory.slug === 'nazionale') return item;
    if (index === 0) {
      return {
        ...item,
        q: `Quali sono i tempi reali per uno sfratto per morosità${suffix}?`,
        a: `${item.a} Operiamo anche presso ${territory.tribunalsLabel}.`,
      };
    }
    if (index === 2) {
      return {
        ...item,
        q: `Quanto costa un ${keyword.primary}${suffix}?`,
      };
    }
    return item;
  });

  return {
    ...landingOriginal.faq,
    title: version === 'v3' ? 'Le domande decisive prima di partire' : landingOriginal.faq.title,
    subtitle:
      territory.slug === 'nazionale'
        ? (version === 'v3' ? 'Le risposte essenziali per decidere.' : landingOriginal.faq.subtitle)
        : `Le risposte alle domande più frequenti dei proprietari che cercano ${keyword.primary}${suffix}.`,
    subtitle2: version === 'v3' ? '' : landingOriginal.faq.subtitle2,
    items: version === 'v3' ? [
      {
        icon: 'fa-euro-sign',
        q: 'Quando si pagano i 1.300€ e cosa comprendono?',
        a: 'Solo <strong>dopo l’udienza per la convalida</strong>: avvii la procedura senza anticipare nulla. Il compenso è di €1.300 <strong>IVA e cassa incluse</strong> e comprende tutta l’assistenza legale, dalla convalida alla fase esecutiva, <strong>fino alla riconsegna delle chiavi</strong>. Restano escluse le spese vive di legge: indicativamente <strong>€100–150</strong> per la convalida e circa <strong>€300 in totale</strong> se serve la fase esecutiva, sempre indicate per iscritto prima e mai richieste in anticipo.',
      },
      {
        icon: 'fa-clock',
        q: 'In quanto tempo si ottiene la convalida dello sfratto?',
        a: 'In media in circa 60 giorni. I tempi effettivi dipendono dal Tribunale competente e dall’eventuale opposizione dell’inquilino.',
      },
      {
        icon: 'fa-file-contract',
        q: 'Cosa vi serve per dirmi se posso partire?',
        a: 'Città dell’immobile, la situazione (mesi di morosità, oppure contratto scaduto o disdettato) e un contatto diretto. Se hai già il contratto di locazione, la valutazione è ancora più precisa.',
      },
      {
        icon: 'fa-store',
        q: 'Vale anche per negozi, uffici o per la finita locazione?',
        a: 'Sì. Trattiamo anche lo sfratto di immobili commerciali (negozi, uffici, capannoni) e lo sfratto per finita locazione, alle stesse condizioni: <strong>€1.300 IVA e cassa incluse, zero anticipi</strong>.',
      },
      {
        icon: 'fa-user-shield',
        q: 'Devo essere presente all’udienza?',
        a: 'No. Segue tutto il nostro avvocato: non devi recarti in Tribunale.',
      },
      {
        icon: 'fa-exclamation-circle',
        q: 'Cosa succede se l’inquilino si oppone?',
        a: 'L’opposizione apre un giudizio ordinario con tempi più lunghi. Il compenso di €1.300 copre la fase di convalida e resta dovuto <strong>dopo l’udienza, qualunque ne sia l’esito</strong>; per l’eventuale giudizio di merito ricevi un <strong>preventivo scritto separato</strong> e nulla prosegue senza il tuo consenso.',
      },
      {
        icon: 'fa-key',
        q: 'E se dopo la convalida l’inquilino non se ne va?',
        a: 'Si passa alla fase esecutiva, <strong>già inclusa nei €1.300</strong>: notifichiamo il precetto (l’intimazione formale a lasciare l’immobile), poi il preavviso di rilascio e, se serve, interviene l’ufficiale giudiziario fino alla riconsegna delle chiavi. Tu non devi fare nulla: ti aggiorniamo a ogni passaggio.',
      },
      {
        icon: 'fa-coins',
        q: 'Recupero anche i canoni arretrati?',
        a: 'Sì. Chiediamo al Giudice la condanna dell’inquilino al pagamento dei canoni non versati, degli oneri e delle spese legali, valutando poi la concreta recuperabilità.',
      }
    ] : items,
  };
}

function buildContactForm(version: LandingVersion, territory: LandingTerritoryConfig) {
  const isConversion = isConversionVersion(version);
  return {
    ...landingOriginal.contactForm,
    title: isConversion ? 'Parliamo del tuo caso' : landingOriginal.contactForm.title,
    subtitle:
      isConversion
        ? `Inviaci i dati essenziali: ti richiamiamo con una valutazione gratuita e ti diciamo costi, tempi e passaggi.`
        : territory.slug === 'nazionale'
          ? landingOriginal.contactForm.subtitle
          : `In meno di 24 ore puoi avere il nostro avvocato al lavoro sul tuo caso ${territory.dynamicReplacement?.area || ''}. Ti spieghiamo costi, tempi medi e percorso fino al rilascio dell'immobile.`,
    formTitle: isConversion ? 'Richiesta rapida proprietario' : landingOriginal.contactForm.formTitle,
    formNote: isConversion ? 'Prima consulenza gratuita su casi già attivabili\nSolo proprietari / locatori' : landingOriginal.contactForm.formNote,
    urgencyBox: isConversion
      ? {
          title: 'Prima di inviare la richiesta',
          body: 'Preparati ad indicare <strong>città dell’immobile</strong>, <strong>mesi di morosità</strong> e un <strong>contatto diretto</strong>. Se hai già contratto di locazione o prova dei mancati pagamenti, la valutazione sarà ancora più precisa.'
        }
      : landingOriginal.contactForm.urgencyBox,
    fields: {
      ...landingOriginal.contactForm.fields,
      citta: {
        ...landingOriginal.contactForm.fields.citta,
        placeholder:
          territory.slug === 'nazionale'
            ? landingOriginal.contactForm.fields.citta.placeholder
            : `In che città${territory.dynamicReplacement?.city ? ` vicino a ${territory.dynamicReplacement.city}` : ''} si trova l'immobile?`,
      },
    },
  };
}

function buildSeo(version: LandingVersion, territory: LandingTerritoryConfig, keyword: LandingKeywordConfig): LandingSeoConfig {
  const territorySuffix = territory.keywordSuffix ? ` ${territory.keywordSuffix}` : '';
  const title = `${keyword.titleStem}${territorySuffix} | 1.300€ fino al rilascio dell'immobile`;
  const description = isConversionVersion(version)
    ? (territory.slug === 'nazionale'
        ? (version === 'v4'
            ? `Sfratto per morosità: scegli la fase di convalida a ${formatBusinessEuro(pricing.testV4.faseConvalida)}, l'eventuale fase esecutiva a ${formatBusinessEuro(pricing.testV4.faseEsecutiva)} oppure la formula completa a ${formatBusinessEuro(pricing.compensoComplessivo)}. Solo proprietari e locatori.`
            : `Sfratto per morosità: €1.300 IVA e cassa incluse, tutta l'assistenza fino al rilascio. Zero anticipi: paghi solo dopo l'udienza di convalida. Solo proprietari e locatori.`)
        : `Sfratto per morosità${territorySuffix}: €1.300 IVA e cassa incluse, tutta l'assistenza fino al rilascio. Zero anticipi: paghi solo dopo l'udienza di convalida. Solo proprietari e locatori.`)
    : territory.slug === 'nazionale'
      ? `Avvocato specializzato in sfratto per morosità. Procedura ottimizzata con convalida mediamente in 60 giorni e compenso complessivo di 1.300€ fino al rilascio dell’immobile. Nessun anticipo. Consulenza senza impegno.`
      : `Avvocato specializzato in sfratto per morosità${territorySuffix}. Procedura ottimizzata, convalida mediamente in 60 giorni e compenso complessivo di 1.300€ fino al rilascio dell’immobile.`;
  const landingPath = version === 'v4' ? '/landing-v4/' : version === 'v3' ? '/landing-v3/' : '/landing-v2/';
  const conversionTitle = version === 'v4'
    ? `${keyword.titleStem}${territorySuffix} | Da ${formatBusinessEuro(pricing.testV4.faseConvalida)} o formula completa ${formatBusinessEuro(pricing.compensoComplessivo)}`
    : `${keyword.titleStem}${territorySuffix} | 1.300€ fino al rilascio dell'immobile`;

  return {
    title: isConversionVersion(version)
      ? conversionTitle
      : title,
    description,
    keywords: [...keyword.metaKeywordList, territory.label !== 'nazionale' ? `sfratto ${territory.label.toLowerCase()}` : ''].filter(Boolean).join(', '),
    canonicalUrl: `https://www.sfrattosicuro.it${landingPath}`,
    ogTitle: isConversionVersion(version) ? conversionTitle : title,
    ogDescription: description,
    ogUrl: `https://www.sfrattosicuro.it${landingPath}`,
    twitterTitle: isConversionVersion(version) ? conversionTitle : title,
    twitterDescription: description,
    robots: 'noindex,nofollow',
  };
}

function buildJsonLd(seo: LandingSeoConfig, territory: LandingTerritoryConfig, faqItems: LandingFaqItem[]) {
  const legalService = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: territory.slug === 'nazionale' ? 'Sfratto Sicuro - Sfratto per Morosità' : `Sfratto Sicuro ${territory.label} - Sfratto per Morosità`,
    legalName: 'D1 S.R.L.S.',
    description: seo.description,
    url: seo.canonicalUrl,
    image: 'https://www.sfrattosicuro.it/assets/img/hero.webp',
    priceRange: '€1.300',
    founder: { '@type': 'Person', name: 'Avv. Danilo Ansalone' },
    telephone: '+39 02 80898395',
    email: 'consulenza@sfrattosicuro.it',
    vatID: 'IT06177400659',
    areaServed: territory.slug === 'nazionale' ? 'IT' : [{ '@type': 'Country', name: 'IT' }, { '@type': 'City', name: territory.label }],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Francesco Paolo Volpe 2',
      addressLocality: 'Salerno',
      addressRegion: 'SA',
      postalCode: '84122',
      addressCountry: 'IT',
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SfrattoSicuro.it',
    legalName: 'D1 S.R.L.S.',
    vatID: 'IT06177400659',
    url: seo.canonicalUrl,
    logo: 'https://www.sfrattosicuro.it/assets/img/logo-sfratto-sicuro.webp',
    image: 'https://www.sfrattosicuro.it/assets/img/logo-sfratto-sicuro.webp',
    email: 'consulenza@sfrattosicuro.it',
    telephone: '+39 02 80898395',
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sfratto Sicuro',
    url: seo.canonicalUrl,
    inLanguage: 'it-IT',
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.replace(/<[^>]+>/g, ''),
      },
    })),
  };

  return { legalService, organization, website, faq };
}

export function buildLandingPageConfig(options?: {
  version?: LandingVersion;
  territory?: LandingTerritorySlug;
  keyword?: LandingKeywordSlug;
}): LandingPageConfig {
  const version = options?.version || 'v2';
  const territory = territories[options?.territory || 'nazionale'];
  const keyword = keywords[options?.keyword || 'sfratto-per-morosita'];

  const hero = buildHero(version, territory, keyword);
  const trustBar = buildTrustBar(territory);
  const quickFacts = buildQuickFacts(version, territory);
  const problems = buildProblems(version, territory);
  const calculator = buildCalculator(territory);
  const legalCost = buildLegalCost(territory);
  const procedure = buildProcedure(version, territory);
  const services = buildServices(territory);
  const costTransparency = buildCostTransparency(territory);
  const whoWeAre = buildWhoWeAre(territory);
  const whyChooseUs = buildWhyChooseUs(territory);
  const faq = buildFaq(version, territory, keyword);
  const contactForm = buildContactForm(version, territory);
  const seo = buildSeo(version, territory, keyword);
  const jsonLd = buildJsonLd(seo, territory, faq.items);

  return {
    version,
    territory,
    keyword,
    seo,
    hero,
    trustBar,
    quickFacts,
    problems,
    calculator,
    legalCost,
    procedure,
    services,
    costTransparency,
    whoWeAre,
    whyChooseUs,
    faq,
    contactForm,
    jsonLd,
  };
}
