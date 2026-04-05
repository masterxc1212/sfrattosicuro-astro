import { landingOriginal } from './landing-original';

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
    secondary: ['sfratto per morosità', 'avvocato sfratto', 'inquilino moroso'],
    titleStem: 'Avvocato Sfratto per Morosità',
    metaKeywordList: [
      'sfratto per morosità',
      'avvocato sfratto',
      'convalida sfratto',
      'inquilino moroso',
      'rilascio immobile',
      'sfratto veloce',
    ],
  },
};

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

  if (version === 'v3') {
    return {
      ...landingOriginal.hero,
      title: `Avvocato specializzato in\nSfratto per Morosità${suffix}`,
      subtitle:
        territory.slug === 'nazionale'
          ? `Servizio dedicato ai <strong class="text-white">proprietari e locatori</strong> con inquilino moroso. Ti aiutiamo ad avviare rapidamente la procedura per <strong class="text-white">riottenere il tuo immobile</strong>, con costo chiaro e assistenza legale fino al rilascio.`
          : `Servizio dedicato ai <strong class="text-white">proprietari e locatori</strong>${territory.dynamicReplacement?.area ? ` ${territory.dynamicReplacement.area}` : ''}. Ti aiutiamo ad avviare rapidamente la procedura per <strong class="text-white">riottenere il tuo immobile</strong>, con costo chiaro e assistenza legale fino al rilascio.`,
      prequalificationNote: '<strong>Solo proprietari/locatori.</strong> Nessuna assistenza per inquilini o richieste puramente informative.',
      bullets: [
        '<strong>Compenso complessivo di 1.300€ fino al rilascio dell\'immobile</strong>',
        '<strong>Nessun acconto</strong> – il pagamento viene richiesto solo dopo la convalida dello sfratto',
        '<strong>Convalida mediamente in circa 60 giorni</strong> – dato operativo che può variare in base al Tribunale competente e all\'eventuale opposizione',
      ],
      formTitle: 'Verifica subito se puoi partire',
      formSubtitle: 'Lascia i tuoi dati essenziali e ti richiamiamo con una prima valutazione operativa del caso.<br><span style="font-size: 0.75rem;">(Lun–Ven 9–19 • Sab 9–13)</span>',
      formSubmitLabel: 'Ti richiamiamo entro 2 ore',
      formNamePlaceholder: 'Nome e cognome del proprietario',
      formPhonePlaceholder: 'Numero di telefono diretto',
      formMorositaOptions: landingOriginal.contactForm.fields.morosita.options,
      formSource: 'hero_form_v3',
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
      eyebrow: 'Le 3 risposte che chi arriva da Google vuole subito',
      title: 'Costo, tempi e procedura subito chiari',
      items: [
        {
          label: 'Costo',
          value: '€1.300 fino al rilascio dell’immobile',
          note: 'Nessun acconto: il compenso viene richiesto solo dopo la convalida',
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
      { label: 'Costo', value: '€1.300 tutto incluso', note: 'Pagamento solo alla convalida' },
      { label: 'Tempi', value: '60 giorni medi', note: 'Per ottenere il provvedimento' },
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
      title: 'Questa pagina è per proprietari con un problema concreto di morosità',
      subtitle: territory.slug === 'nazionale'
        ? 'Se l’inquilino non paga e vuoi capire costi, tempi e passaggi della procedura, qui trovi una spiegazione operativa. La pagina è pensata per proprietari o locatori che devono valutare una procedura concreta di sfratto per morosità.'
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

function buildProcedure(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.procedure,
    subtitle:
      territory.slug === 'nazionale'
        ? 'Un percorso operativo collaudato per arrivare alla convalida dello sfratto e, se necessario, proseguire fino al rilascio dell’immobile. I tempi possono variare in base al Tribunale e alla presenza di opposizione.'
        : `Un percorso operativo collaudato per arrivare alla convalida dello sfratto e, se necessario, proseguire fino al rilascio dell’immobile. Operiamo anche presso ${territory.tribunalsLabel}.`,
    steps: landingOriginal.procedure.steps.map((step, index) => {
      if (territory.slug === 'nazionale') return step;
      if (index === 2) {
        return {
          ...step,
          body: step.body.replace('Tribunale competente', territory.tribunalsLabel),
        };
      }
      return step;
    }),
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
      title: 'Formula economica chiara',
      items: [
        { value: '€1.300', label: 'Compenso complessivo fino al rilascio' },
        { value: '0€', label: 'Acconto iniziale' },
        { value: 'Post-convalida', label: 'Momento del pagamento' },
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
    priceTitle: 'Compenso complessivo: 1.300€ fino al rilascio dell’immobile',
    priceBody: 'Il compenso complessivo concordato è di <strong>1.300€ fino al rilascio dell’immobile</strong>. <strong>Non chiediamo acconti</strong>: il pagamento viene richiesto solo dopo la convalida dello sfratto. Da quel momento, la procedura prosegue — se necessario — fino al rilascio dell’immobile.',
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
    title: version === 'v3' ? 'Le 5 domande decisive prima di partire' : landingOriginal.faq.title,
    subtitle:
      territory.slug === 'nazionale'
        ? (version === 'v3' ? 'Solo le risposte essenziali che aiutano un proprietario a decidere se attivare subito la procedura.' : landingOriginal.faq.subtitle)
        : `Le risposte alle domande più frequenti dei proprietari che cercano ${keyword.primary}${suffix}.`,
    subtitle2: version === 'v3' ? 'Abbiamo ridotto la sezione alle obiezioni che incidono davvero sulla conversione da Google Ads: tempi, costi, requisiti, udienza e recupero immobile.' : landingOriginal.faq.subtitle2,
    items: version === 'v3' ? [
      {
        icon: 'fa-clock',
        q: 'In quanto tempo si può ottenere la convalida dello sfratto per morosità?',
        a: 'Non esiste un termine identico per tutti i Tribunali, ma nella nostra operatività il provvedimento di convalida arriva mediamente in circa 60 giorni. I tempi effettivi dipendono anche dal carico del Tribunale competente e dalla presenza o meno di opposizione.',
      },
      {
        icon: 'fa-euro-sign',
        q: 'I 1.300€ coprono la pratica fino al rilascio dell’immobile o solo fino alla convalida?',
        a: 'Il compenso complessivo di 1.300€ copre l’assistenza fino al rilascio dell’immobile. Non chiediamo acconti: il pagamento viene richiesto solo dopo la convalida dello sfratto.',
      },
      {
        icon: 'fa-file-contract',
        q: 'Di cosa avete bisogno per capire se il caso è attivabile?',
        a: 'Per una prima valutazione ci servono almeno città dell’immobile, mesi di morosità, un contatto diretto del proprietario e, quando disponibili, contratto di locazione e prova dei mancati pagamenti.',
      },
      {
        icon: 'fa-gavel',
        q: 'Cosa succede dopo la convalida dello sfratto?',
        a: 'Dopo la convalida, se l’immobile non viene rilasciato spontaneamente, si passa alla fase esecutiva per ottenere il rilascio. Per questo distinguiamo il momento della convalida dal risultato finale di riottenere materialmente il possesso dell’immobile.',
      },
      {
        icon: 'fa-home',
        q: 'Questa pagina vale anche per lo sfratto per finita locazione?',
        a: 'Questa landing è dedicata ai casi di sfratto per morosità. Ci occupiamo anche di sfratto per finita locazione, ma quel servizio richiede pagina e annuncio dedicati, perché presupposti e messaggi della procedura sono diversi.',
      }
    ] : items,
  };
}

function buildContactForm(version: LandingVersion, territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.contactForm,
    title: version === 'v3' ? 'Parliamo solo di casi concreti di morosità' : landingOriginal.contactForm.title,
    subtitle:
      version === 'v3'
        ? `Se sei il proprietario dell'immobile e hai già una morosità in corso, inviaci i dati essenziali: ti richiamiamo con una valutazione pratica del caso, spiegandoti in modo chiaro costi, tempi e passaggi della procedura.`
        : territory.slug === 'nazionale'
          ? landingOriginal.contactForm.subtitle
          : `In meno di 24 ore puoi avere il nostro avvocato al lavoro sul tuo caso ${territory.dynamicReplacement?.area || ''}. Convalida in 60 giorni, €1.300 tutto incluso.`,
    formTitle: version === 'v3' ? 'Richiesta rapida proprietario' : landingOriginal.contactForm.formTitle,
    formNote: version === 'v3' ? 'Richiamo rapido su casi già attivabili\nSolo proprietari / locatori' : landingOriginal.contactForm.formNote,
    urgencyBox: version === 'v3'
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
  const title = `${keyword.titleStem}${territorySuffix} | Costo Fisso 1.300€ fino alla Convalida`;
  const description = version === 'v3'
    ? (territory.slug === 'nazionale'
        ? `Landing dedicata ai proprietari con inquilino moroso: costo chiaro, tempi medi, procedura spiegata e richiesta rapida di richiamo. Versione v3 orientata a Quality Score e conversioni.`
        : `Landing dedicata ai proprietari con inquilino moroso${territorySuffix}: costo chiaro, tempi medi, procedura spiegata e richiesta rapida di richiamo.`)
    : territory.slug === 'nazionale'
      ? `Avvocato specializzato in sfratto per morosità. Procedura ottimizzata con convalida mediamente in 60 giorni e costo fisso di 1.300€ fino alla convalida. Nessun anticipo. Consulenza senza impegno.`
      : `Avvocato specializzato in sfratto per morosità${territorySuffix}. Procedura ottimizzata, convalida mediamente in 60 giorni e costo fisso di 1.300€ fino alla convalida.`;
  const landingPath = version === 'v3' ? '/landing-v3/' : '/landing-v2/';

  return {
    title: version === 'v3'
      ? `${keyword.titleStem}${territorySuffix} | 1.300€ fino al rilascio dell'immobile`
      : title,
    description,
    keywords: [...keyword.metaKeywordList, territory.label !== 'nazionale' ? `sfratto ${territory.label.toLowerCase()}` : ''].filter(Boolean).join(', '),
    canonicalUrl: `https://www.sfrattosicuro.it${landingPath}`,
    ogTitle: version === 'v3' ? `${keyword.titleStem}${territorySuffix} | 1.300€ fino al rilascio dell'immobile` : title,
    ogDescription: description,
    ogUrl: `https://www.sfrattosicuro.it${landingPath}`,
    twitterTitle: version === 'v3' ? `${keyword.titleStem}${territorySuffix} | 1.300€ fino al rilascio dell'immobile` : title,
    twitterDescription: description,
    robots: 'noindex,nofollow',
  };
}

function buildJsonLd(seo: LandingSeoConfig, territory: LandingTerritoryConfig, faqItems: LandingFaqItem[]) {
  const legalService = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: territory.slug === 'nazionale' ? 'Sfratto Sicuro - Protocollo Riprendi Casa' : `Sfratto Sicuro ${territory.label} - Protocollo Riprendi Casa`,
    legalName: 'D1 S.R.L.S.',
    description: seo.description,
    url: seo.canonicalUrl,
    image: 'https://www.sfrattosicuro.it/assets/img/hero.webp',
    priceRange: '€€€',
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
  const procedure = buildProcedure(territory);
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
