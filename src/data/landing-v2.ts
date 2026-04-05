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

export type LandingPageConfig = {
  version: LandingVersion;
  territory: LandingTerritoryConfig;
  keyword: LandingKeywordConfig;
  seo: LandingSeoConfig;
  hero: typeof landingOriginal.hero;
  trustBar: typeof landingOriginal.trustBar;
  problems: typeof landingOriginal.problems;
  calculator: typeof landingOriginal.calculator;
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

function buildHero(territory: LandingTerritoryConfig, keyword: LandingKeywordConfig) {
  const suffix = territory.keywordSuffix ? ` ${territory.keywordSuffix}` : '';
  return {
    ...landingOriginal.hero,
    title: `Avvocato per\nSfratto per Morosità${suffix}`,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.hero.subtitle
        : `Non lasciare che un inquilino ti tolga la serenità${territory.dynamicReplacement?.area ? ` ${territory.dynamicReplacement.area}` : ''}. Riottieni il tuo immobile in tempi rapidi, <strong class="text-white">senza anticipi.</strong>`,
    bullets: landingOriginal.hero.bullets.map((item, index) => {
      if (index !== 2 || territory.slug === 'nazionale') return item;
      return item.replace('dal Giudice', `dal Giudice${territory.keywordSuffix ? ` ${territory.keywordSuffix}` : ''}`);
    }),
    formSubtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.hero.formSubtitle
        : `Inserisci i tuoi dati: prima consulenza gratuita e senza impegno per il tuo immobile ${territory.dynamicReplacement?.area || ''}.\n    <br><span style="font-size: 0.75rem;">(Lun–Ven 9–19 • Sab 9–13)</span>`,
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

function buildProblems(territory: LandingTerritoryConfig) {
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

function buildFaq(territory: LandingTerritoryConfig, keyword: LandingKeywordConfig) {
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
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.faq.subtitle
        : `Le risposte alle domande più frequenti dei proprietari che cercano ${keyword.primary}${suffix}.`,
    items,
  };
}

function buildContactForm(territory: LandingTerritoryConfig) {
  return {
    ...landingOriginal.contactForm,
    subtitle:
      territory.slug === 'nazionale'
        ? landingOriginal.contactForm.subtitle
        : `In meno di 24 ore puoi avere il nostro avvocato al lavoro sul tuo caso ${territory.dynamicReplacement?.area || ''}. Convalida in 60 giorni, €1.300 tutto incluso.`,
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
  const description = territory.slug === 'nazionale'
    ? `Avvocato specializzato in sfratto per morosità. Procedura ottimizzata con convalida mediamente in 60 giorni e costo fisso di 1.300€ fino alla convalida. Nessun anticipo. Consulenza senza impegno.`
    : `Avvocato specializzato in sfratto per morosità${territorySuffix}. Procedura ottimizzata, convalida mediamente in 60 giorni e costo fisso di 1.300€ fino alla convalida.`;

  return {
    title,
    description,
    keywords: [...keyword.metaKeywordList, territory.label !== 'nazionale' ? `sfratto ${territory.label.toLowerCase()}` : ''].filter(Boolean).join(', '),
    canonicalUrl: 'https://www.sfrattosicuro.it/landing-v2/',
    ogTitle: title,
    ogDescription: description,
    ogUrl: 'https://www.sfrattosicuro.it/landing-v2/',
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

  const hero = buildHero(territory, keyword);
  const trustBar = buildTrustBar(territory);
  const problems = buildProblems(territory);
  const calculator = buildCalculator(territory);
  const faq = buildFaq(territory, keyword);
  const contactForm = buildContactForm(territory);
  const seo = buildSeo(version, territory, keyword);
  const jsonLd = buildJsonLd(seo, territory, faq.items);

  return {
    version,
    territory,
    keyword,
    seo,
    hero,
    trustBar,
    problems,
    calculator,
    faq,
    contactForm,
    jsonLd,
  };
}
