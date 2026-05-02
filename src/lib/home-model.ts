export type LocalFaqItem = { q: string; a: string };

export type TribunaleInfo = {
  /** Indirizzo della sezione civile competente per le convalide di sfratto */
  indirizzo: string;
  /** Nome della sezione (es. "XIII Sezione Civile - Locazioni") */
  sezione: string;
  /** Deposito telematico PCT obbligatorio */
  depositoPCT: boolean;
  /** Tempi indicativi per la prima udienza / convalida */
  udienze?: string;
  /** Note operative locali */
  note?: string;
};

export type SedeItem = {
  nome: string;
  slug: string;
  tribunale: string;
  areaServita: string;
  regione: string;
  intro?: string;
  procedureIntro?: string;
  timelineIntro?: string;
  faqLocalIntro?: string;
  faqLocal?: LocalFaqItem[];
  faqStrategic?: LocalFaqItem[];
  seoVars?: {
    keywordPrimary?: string;
    keywordSecondary?: string;
    title?: string;
    description?: string;
  };
  localAngles?: {
    openingAngle?: string;
    protocolAngle?: string;
    courtAngle?: string;
    closingAngle?: string;
  };
  editorialRules?: {
    tone?: string;
    mentionCostsInHomepage?: boolean;
    primaryPromise?: string;
    avoidAbsoluteGuarantees?: boolean;
  };
  officeAddress?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressRegion?: string;
    addressCountry?: string;
  } | null;
  /** Dati verificati del tribunale */
  tribunaleInfo?: TribunaleInfo;
};

export function getNationalHomeSeo() {
  return {
    canonicalPath: '/',
    title: 'Avvocato per sfratto per morosità | Sfratto Sicuro',
    description:
      'Avvocato per sfratto per morosità e finita locazione. Assistenza legale e protocollo operativo orientato alla convalida di sfratto in circa 60 giorni.'
  };
}

export function getTerritorialHomeSeo(sede: SedeItem) {
  return {
    canonicalPath: `/sedi/${sede.slug}/`,
    title:
      sede.seoVars?.title
      || `Avvocato per sfratto a ${sede.nome} | Sfratto Sicuro`,
    description:
      sede.seoVars?.description
      || `Avvocato per sfratto a ${sede.nome}. Assistenza legale per sfratto per morosità e finita locazione presso il ${sede.tribunale}.`
  };
}

export function getTerritorialIntroText(sede: SedeItem) {
  return (
    sede.localAngles?.openingAngle
    || sede.intro
    || `Se devi sfrattare un inquilino a ${sede.nome}, un avvocato per sfratto può assisterti nella procedura di sfratto per morosità o finita locazione presso il ${sede.tribunale}.`
  );
}

export function getTerritorialFaq(sede: SedeItem) {
  const strategicFaq: LocalFaqItem[] = [
    {
      q: `Quanto tempo serve per ottenere la convalida di sfratto a ${sede.nome}?`,
      a: `In molti casi puntiamo ad arrivare all’udienza per la convalida di sfratto in circa 60 giorni, grazie a una gestione rigorosa della pratica e dei tempi di notifica. I tempi effettivi possono comunque variare in base al calendario del ${sede.tribunale} e alle specificità del caso.`
    },
    {
      q: `Cosa succede se l’inquilino si oppone allo sfratto a ${sede.nome}?`,
      a: `Se l’inquilino propone opposizione, la procedura può richiedere attività ulteriori e tempi più lunghi. In questi casi valutiamo subito la strategia processuale più adatta per tutelare il proprietario anche davanti al ${sede.tribunale}.`
    },
    {
      q: `Che cos’è il termine di grazia nello sfratto per morosità a ${sede.nome}?`,
      a: 'Nel procedimento per sfratto per morosità il giudice può, in presenza dei presupposti di legge, concedere un termine per sanare la morosità. Si tratta di una variabile che può incidere sui tempi della procedura e che va valutata caso per caso.'
    },
    {
      q: `Quando si può avviare lo sfratto per morosità a ${sede.nome}?`,
      a: 'La procedura può essere avviata quando il conduttore non paga i canoni o gli oneri dovuti nei termini previsti dal contratto, con assistenza legale nella predisposizione dell’intimazione e nella successiva fase di convalida.'
    }
  ];

  const fallbackFaq: LocalFaqItem[] = [
    {
      q: `Quanto tempo richiede uno sfratto a ${sede.nome}?`,
      a: `I tempi dipendono dal calendario del ${sede.tribunale} e dall’eventuale opposizione dell'inquilino.`
    },
    {
      q: `Quando si può avviare lo sfratto per morosità a ${sede.nome}?`,
      a: 'La procedura può essere avviata quando l’inquilino non paga i canoni nei termini previsti dal contratto.'
    },
    {
      q: `Serve un avvocato per sfrattare un inquilino a ${sede.nome}?`,
      a: 'Sì. L’assistenza legale è necessaria per impostare correttamente la procedura e seguire udienza di convalida ed eventuale fase esecutiva.'
    }
  ];

  return (
    (sede.faqStrategic && sede.faqStrategic.length ? sede.faqStrategic : undefined)
    || (sede.faqLocal && sede.faqLocal.length ? sede.faqLocal : undefined)
    || strategicFaq
    || fallbackFaq
  ).slice(0, 4);
}
