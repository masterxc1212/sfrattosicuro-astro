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
          ? `Servizio dedicato ai <strong class="text-white">proprietari e locatori</strong> con inquilino moroso. Ottieni una valutazione rapida del caso, costo chiaro e procedura attivabile senza perdite di tempo.`
          : `Servizio dedicato ai <strong class="text-white">proprietari e locatori</strong>${territory.dynamicReplacement?.area ? ` ${territory.dynamicReplacement.area}` : ''}. Valutazione rapida del caso, costo chiaro e procedura attivabile senza perdite di tempo.`,
      prequalificationNote: '<strong>Solo proprietari/locatori.</strong> Nessuna assistenza per inquilini o richieste puramente informative.',
      bullets: [
        '<strong>Solo proprietari/locatori</strong> – niente assistenza inquilini o traffico informativo',
        '<strong>€1.300 fino alla convalida</strong> – costo chiaro e senza sorprese',
        '<strong>Convalida mediamente in 60 giorni</strong> – procedura strutturata e avvocato dedicato',
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
          value: '€1.300 fino alla convalida',
          note: 'Formula chiara, senza sorprese fino al provvedimento del Giudice',
        },
        {
          label: 'Tempi',
          value: 'Convalida mediamente in 60 giorni',
          note: territory.slug === 'nazionale' ? 'Procedura ottimizzata su tutto il territorio nazionale' : `Operatività anche presso ${territory.tribunalsLabel}`,
        },
        {
          label: 'Procedura',
          value: 'Analisi → intimazione → deposito → udienza',
          note: 'Percorso guidato con avvocato dedicato e aggiornamenti continui',
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
        ? 'Se l’inquilino non paga, vuoi capire costi, tempi e se puoi partire subito. Se stai solo cercando informazioni generiche, questa non è la pagina giusta.'
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
    body:
      territory.slug === 'nazionale'
        ? landingOriginal.legalCost.body
        : `${landingOriginal.legalCost.body} Gestiamo la pratica anche presso ${territory.tribunalsLabel}.`,
  };
}

function buildProcedure(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.procedure,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.procedure.subtitle
        : `${landingOriginal.procedure.subtitle} Operiamo anche presso ${territory.tribunalsLabel}.`,
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
        ? landingOriginal.services.subtitle
        : `${landingOriginal.services.subtitle} Servizio attivo anche ${territory.dynamicReplacement?.area || ''}.`,
  };
}

function buildCostTransparency(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.costTransparency,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.costTransparency.subtitle
        : `${landingOriginal.costTransparency.subtitle} Formula valida anche per pratiche ${territory.dynamicReplacement?.area || ''}.`,
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
    items: version === 'v3' ? items.slice(0, 5) : items,
  };
}

function buildContactForm(version: LandingVersion, territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.contactForm,
    title: version === 'v3' ? 'Parliamo solo di casi già concreti' : landingOriginal.contactForm.title,
    subtitle:
      version === 'v3'
        ? `Se sei il proprietario dell'immobile e hai già una morosità in corso, inviaci i dati essenziali: ti richiamiamo con una valutazione pratica del caso.`
        : territory.slug === 'nazionale'
          ? landingOriginal.contactForm.subtitle
          : `In meno di 24 ore puoi avere il nostro avvocato al lavoro sul tuo caso ${territory.dynamicReplacement?.area || ''}. Convalida in 60 giorni, €1.300 tutto incluso.`,
    formTitle: version === 'v3' ? 'Richiesta rapida proprietario' : landingOriginal.contactForm.formTitle,
    formNote: version === 'v3' ? 'Richiamo rapido su casi già attivabili\nSolo proprietari / locatori' : landingOriginal.contactForm.formNote,
    urgencyBox: version === 'v3'
      ? {
          title: 'Prima di inviare la richiesta',
          body: 'Preparati ad indicare <strong>città dell’immobile</strong>, <strong>mesi di morosità</strong> e un <strong>contatto diretto</strong>. Così possiamo darti subito una risposta concreta.'
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
    title,
    description,
    keywords: [...keyword.metaKeywordList, territory.label !== 'nazionale' ? `sfratto ${territory.label.toLowerCase()}` : ''].filter(Boolean).join(', '),
    canonicalUrl: `https://www.sfrattosicuro.it${landingPath}`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: `https://www.sfrattosicuro.it${landingPath}`,
    twitterTitle: title,
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
