import site from './site.json';

export interface LandingStat {
  value: string;
  label: string;
}

export interface LandingProblem {
  title: string;
  body: string;
}

export interface LandingStep {
  eyebrow: string;
  title: string;
  body: string;
}

export interface LandingServiceItem {
  title: string;
  body: string;
  note?: string;
}

export interface LandingFaqItem {
  q: string;
  a: string;
}

export interface LandingConfig {
  slug: string;
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    audienceLabel: string;
    ctaLabel: string;
    note: string;
    bullets: string[];
    stats: LandingStat[];
  };
  qualifierQuestion: string;
  qualifierOptions: string[];
  proof: {
    ratingLabel: string;
    reviewCountLabel: string;
    documentsTitle: string;
    documentsBody: string;
  };
  problems: LandingProblem[];
  calculator: {
    title: string;
    intro: string;
    monthlyLossLabel: string;
    compareTitle: string;
    compareBody: string;
  };
  steps: LandingStep[];
  offer: {
    title: string;
    price: string;
    intro: string;
    included: LandingServiceItem[];
    bonuses: LandingServiceItem[];
  };
  faq: LandingFaqItem[];
}

const baseFaq: LandingFaqItem[] = [
  {
    q: 'Quanto tempo serve per ottenere la convalida di sfratto?',
    a: 'Con il protocollo operativo Sfratto Sicuro puntiamo, in molti casi, ad arrivare all’udienza di convalida in circa 60 giorni.'
  },
  {
    q: 'Quando pago il compenso?',
    a: 'Il compenso di 1.300€ viene corrisposto solo dopo il provvedimento di convalida del giudice, non all’avvio della pratica.'
  },
  {
    q: 'Assistete anche in presenza di opposizione dell’inquilino?',
    a: 'Sì. Se l’inquilino si oppone, impostiamo subito la strategia processuale più adatta per tutelare il proprietario e accorciare i tempi quanto possibile.'
  },
  {
    q: 'Il servizio è riservato ai proprietari?',
    a: 'Sì. Questa landing è pensata esclusivamente per proprietari e locatori che vogliono riottenere l’immobile e recuperare i canoni non pagati.'
  }
];

export const landingConfigs: Record<string, LandingConfig> = {
  nazionale: {
    slug: 'nazionale',
    title: 'Avvocato Sfratto per Morosità | Costo fisso 1.300€ fino alla convalida',
    description: 'Landing Astro modulare per sfratto per morosità: riservata ai proprietari, con prezzo fisso, nessun anticipo e protocollo operativo orientato alla convalida in circa 60 giorni.',
    canonicalPath: '/nuova-landing/',
    noindex: true,
    hero: {
      kicker: 'Landing preview Astro',
      headline: 'Riottieni il tuo immobile senza anticipi e con un protocollo orientato alla convalida.',
      subheadline: 'Landing pensata per proprietari e locatori che vogliono agire subito contro un inquilino moroso, con prezzo fisso e percorso chiaro fin dal primo contatto.',
      audienceLabel: 'Servizio riservato a proprietari e locatori · non assistiamo inquilini',
      ctaLabel: 'Richiedi una consulenza gratuita',
      note: 'Ti richiamiamo in giornata (Lun–Ven 9–19 · Sab 9–13)',
      bullets: [
        '1.300€ tutto incluso fino alla convalida',
        'Nessun anticipo: pagamento solo alla convalida',
        'Protocollo orientato alla convalida in circa 60 giorni',
        'Un referente dedicato per tutta la pratica',
        'Operativi in tutta Italia tramite rete di domiciliatari'
      ],
      stats: [
        { value: '1.300€', label: 'prezzo fisso fino alla convalida' },
        { value: '60 gg', label: 'target medio per l’udienza di convalida' },
        { value: 'Italia', label: 'copertura nazionale' }
      ]
    },
    qualifierQuestion: 'Tu sei il proprietario / locatore dell’immobile?',
    qualifierOptions: ['Sì, sono il proprietario', 'Sì, agisco per il proprietario', 'No'],
    proof: {
      ratingLabel: '5.0 recensioni Google',
      reviewCountLabel: 'Recensioni verificate e risultati documentati',
      documentsTitle: 'Documentazione ufficiale e casi concreti',
      documentsBody: 'La nuova struttura prevede blocchi riusabili per recensioni, provvedimenti, trust e FAQ, così la landing può adattarsi a keyword e geografie diverse senza riscriverla ogni volta.'
    },
    problems: [
      {
        title: 'Morosità crescente',
        body: 'I canoni non pagati si accumulano mentre continui a sostenere tutte le spese dell’immobile.'
      },
      {
        title: 'Immobile bloccato',
        body: 'La casa resta occupata, non puoi rilocarla e perdi altro tempo ogni mese che passa.'
      },
      {
        title: 'Costi imprevedibili',
        body: 'Molti proprietari temono parcelle, anticipi e iter poco chiari fin dall’inizio.'
      },
      {
        title: 'Stress e incertezza',
        body: 'La situazione pesa psicologicamente e rende difficile decidere con lucidità cosa fare.'
      }
    ],
    calculator: {
      title: 'Il vero costo non è l’avvocato: è l’attesa',
      intro: 'La nuova landing mantiene un blocco variabile per quantificare rapidamente quanto costa rimandare lo sfratto. Questo schema potrà essere adattato per città, canoni medi e keyword diverse.',
      monthlyLossLabel: 'Perdita mensile stimata',
      compareTitle: 'Con il protocollo Sfratto Sicuro',
      compareBody: 'Invece di continuare a perdere denaro ogni mese, il proprietario attiva una procedura con prezzo fisso e pagamento differito alla convalida.'
    },
    steps: [
      {
        eyebrow: 'Fase 1 · Giorno 0',
        title: 'Analisi del caso e attivazione pratica',
        body: 'Ricontatto rapido, verifica documenti e impostazione della strategia processuale più adatta.'
      },
      {
        eyebrow: 'Fase 2 · Giorni 1–7',
        title: 'Redazione e notifica dell’intimazione',
        body: 'Predisposizione atti, notifiche e avvio coordinato della procedura.'
      },
      {
        eyebrow: 'Fase 3 · Giorni 8–30',
        title: 'Deposito in tribunale e iscrizione a ruolo',
        body: 'Gestione operativa tramite rete di domiciliatari e presidio della pratica presso il tribunale competente.'
      },
      {
        eyebrow: 'Fase 4 · Giorni 31–60',
        title: 'Udienza e convalida',
        body: 'Obiettivo della landing: rendere chiaro che il pagamento avviene solo dopo il provvedimento del giudice.'
      }
    ],
    offer: {
      title: 'Cosa comprende la nuova proposta landing',
      price: '€1.300 fisso',
      intro: 'La struttura Astro separa il servizio principale dai bonus post-convalida, così possiamo adattare il pacchetto a keyword più transazionali o territoriali senza rompere il layout.',
      included: [
        { title: 'Analisi completa del caso', body: 'Valutazione preliminare e definizione strategica della pratica.' },
        { title: 'Atti legali e notifiche', body: 'Predisposizione dell’intimazione, marche, contributi e spese fino alla convalida.', note: 'Incluso nel prezzo fisso' },
        { title: 'Rappresentanza in udienza', body: 'Assistenza dell’avvocato fino al provvedimento di convalida.', note: 'Pagamento solo dopo il risultato' }
      ],
      bonuses: [
        { title: 'Gestione esecutiva', body: 'Modulo adattabile per il post-convalida fino al rilascio effettivo dell’immobile.' },
        { title: 'Recupero canoni arretrati', body: 'Blocco variabile attivabile sulle landing dove il focus keyword è recupero crediti / morosità.' }
      ]
    },
    faq: baseFaq
  }
};

export function getLandingConfig(slug = 'nazionale') {
  return landingConfigs[slug] ?? landingConfigs.nazionale;
}

export const landingOrg = site.organization;
