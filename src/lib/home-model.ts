import { pricing, tempi } from './business';

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

// =============================================================================
// Piano 80% — 7 campi territoriali aggiuntivi (tutti optional, zero-impact su
// sedi.json esistenti). Vedi `docs/seo/vincoli-territorializzazione-sedi.md`
// sez. 3 e i 7 componenti Astro corrispondenti in `src/components/sede/`.
// =============================================================================

/** Dati sul mercato delle locazioni nella zona del Tribunale. */
export type MercatoLocale = {
  /** Canone medio mensile per appartamento standard (zona centrale), in EUR. */
  canoneMedioEur?: number;
  /** Range tipico canone (es. "EUR 700-1.200"). */
  canoneRange?: string;
  /** Note discorsive sul mercato locale (2-4 frasi). */
  note?: string;
  /** Stima del tasso di morosita' o pressione locale (qualitativo). */
  pressioneMorosita?: string;
  /** Quartieri/zone con dinamiche specifiche citate nel paragrafo. */
  zoneRilevanti?: string[];
};

/** Dettagli operativi estesi della cancelleria della sezione locazioni. */
export type CancelleriaEstesa = {
  /** Orario di sportello (es. "Lun-Ven 09:00-12:30"). */
  orariSportello?: string;
  /** Telefono cancelleria. */
  telefono?: string;
  /** Email PEC della cancelleria. */
  pec?: string;
  /** URL del sito ufficiale del Tribunale. */
  sitoUfficiale?: string;
  /** Note operative aggiuntive (es. "deposito tramite PCT obbligatorio dal 2025"). */
  note?: string;
};

/** Orientamento giurisprudenziale locale e prassi ricorrenti del Tribunale. */
export type GiurisprudenzaLocale = {
  /** Prassi sul termine di grazia (art. 55 L. 392/1978) presso il Tribunale. */
  terminieDiGrazia?: string;
  /** Orientamento su opposizioni dell'inquilino e tempi medi di trattazione. */
  prassiOpposizioni?: string;
  /** Note su provvedimenti tipici del tribunale (es. ordinanze ex art. 665 c.p.c.). */
  noteProvvedimenti?: string;
};

/** Partner operativi sul territorio (domiciliatari, ufficiali giudiziari di riferimento). */
export type PartnerLocali = {
  /** Domiciliatari di riferimento per la sede. Solo nomi commerciali/categorie generiche. */
  domiciliatari?: string;
  /** Ufficio Notificazioni Esecuzioni Protesti (UNEP) di riferimento. */
  unep?: string;
  /** Note generiche sulla rete operativa. */
  note?: string;
};

/** Tempi medi reali per le 4 fasi della procedura presso il Tribunale specifico. */
export type TempiReali = {
  /** Tempo tipico per la fase di analisi del caso. */
  faseAnalisi?: string;
  /** Tempo tipico per la predisposizione degli atti. */
  fasePredisposizione?: string;
  /** Tempo tipico per le notifiche e il deposito. */
  faseNotifiche?: string;
  /** Tempo tipico per fissazione e celebrazione dell'udienza di convalida. */
  faseUdienza?: string;
  /** Note discorsive sui tempi locali (es. periodi di chiusura estiva, ferie). */
  note?: string;
};

/** Zone, quartieri o comuni serviti dalla sede (per Schema.org areaServed e copy locale). */
export type ZoneServite = {
  /** Lista quartieri/zone della citta' principale. */
  quartieriCitta?: string[];
  /** Lista comuni della provincia/circondario serviti dalla sede. */
  comuniServiti?: string[];
  /** Note discorsive (es. "tribunale circondariale che copre l'area metropolitana"). */
  note?: string;
};

/** Cenni storici/contestuali sul Tribunale (per copy distintivo, no boilerplate). */
export type StoriaTribunale = {
  /** Anno di istituzione o riferimento storico chiave. */
  annoIstituzione?: number;
  /** Sede storica/architettonica (es. "Palazzo di Giustizia di Corso di Porta Vittoria, 1932"). */
  sedeStorica?: string;
  /** Peculiarita' organizzative (es. "uno dei tribunali con piu' alto carico nel distretto"). */
  peculiarita?: string;
  /** Testo discorsivo libero (1-3 frasi). */
  testoLibero?: string;
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
  // === Piano 80% — 7 campi territoriali (optional) ===
  /** Mercato locale delle locazioni (canone medio, zone, note). */
  mercatoLocale?: MercatoLocale;
  /** Dati estesi cancelleria (orari, telefono, PEC, sito ufficiale). */
  cancelleriaEstesa?: CancelleriaEstesa;
  /** Orientamento giurisprudenziale locale (termine di grazia, opposizioni). */
  giurisprudenzaLocale?: GiurisprudenzaLocale;
  /** Partner operativi sul territorio (domiciliatari, UNEP). */
  partnerLocali?: PartnerLocali;
  /** Tempi reali medi delle 4 fasi presso questo Tribunale. */
  tempiReali?: TempiReali;
  /** Zone, quartieri e comuni serviti dalla sede. */
  zoneServite?: ZoneServite;
  /** Cenni storici/contestuali sul Tribunale. */
  storiaTribunale?: StoriaTribunale;
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

/**
 * getTerritorialFaq — refactor piano 80% (Step 7).
 *
 * Genera FAQ territoriali leggendo le promesse landing inviolabili da
 * `business-config.json` (via `lib/business`) e i dati territoriali dalla
 * sede stessa (`tribunaleInfo`, `tempiReali`, `cancelleriaEstesa`,
 * `giurisprudenzaLocale`). In assenza di dati territoriali specifici, il
 * fallback genera FAQ generiche ma sempre coerenti con le promesse landing.
 *
 * Override manuale: se la sede ha `faqStrategic` o `faqLocal` valorizzati,
 * questi prevalgono sulla generazione automatica.
 */
export function getTerritorialFaq(sede: SedeItem): LocalFaqItem[] {
  // Override manuale ha priorita' assoluta.
  if (sede.faqStrategic && sede.faqStrategic.length) {
    return sede.faqStrategic.slice(0, 4);
  }
  if (sede.faqLocal && sede.faqLocal.length) {
    return sede.faqLocal.slice(0, 4);
  }

  // Riferimenti dinamici dalle promesse landing (centralizzate).
  const tempiMedi = tempi.convalidaMedia;
  const compenso = pricing.compensoFormatted;
  const compensoLong = pricing.compensoFormattedLong;
  const modalitaPagamento = pricing.modalita;
  const disclaimerTempi = tempi.disclaimerStandard;

  // Dati territoriali (puo' essere undefined per sedi non ancora popolate).
  const udienzeLocali = sede.tribunaleInfo?.udienze;
  const sezioneLocale = sede.tribunaleInfo?.sezione;
  const tempiUdienzaLocali = sede.tempiReali?.faseUdienza;
  const terminieDiGraziaLocale = sede.giurisprudenzaLocale?.terminieDiGrazia;
  const prassiOpposizioniLocale = sede.giurisprudenzaLocale?.prassiOpposizioni;

  const tempiAnswer = tempiUdienzaLocali
    ? `Al ${sede.tribunale} osserviamo concretamente questa distribuzione: ${tempiUdienzaLocali}. Il dato medio operativo nazionale e' ${tempiMedi}. ${disclaimerTempi}`
    : udienzeLocali
      ? `Al ${sede.tribunale}: ${udienzeLocali} Il dato medio operativo nazionale e' ${tempiMedi}. ${disclaimerTempi}`
      : `In molti casi puntiamo ad arrivare all'udienza per la convalida di sfratto in ${tempiMedi}, grazie a una gestione rigorosa della pratica e dei tempi di notifica. ${disclaimerTempi}`;

  const opposizioneAnswer = prassiOpposizioniLocale
    ? `${prassiOpposizioniLocale} Anche in caso di opposizione, il compenso complessivo a tuo carico resta ${compenso}: nessun costo aggiuntivo per la trasformazione del rito.`
    : `Se l'inquilino propone opposizione, la procedura puo' trasformarsi in giudizio ordinario di cognizione e richiedere tempi piu' lunghi. Anche in questo scenario, il Giudice puo' emettere ordinanza provvisoria di rilascio ex art. 665 c.p.c. tutelando il proprietario. Il compenso complessivo resta ${compenso}, senza costi aggiuntivi.`;

  const terminieGraziaAnswer = terminieDiGraziaLocale
    ? terminieDiGraziaLocale
    : `Nel procedimento per sfratto per morosita' il giudice puo', in presenza dei presupposti di legge (art. 55 L. 392/1978), concedere un termine per sanare la morosita'. La concessione e' discrezionale e puo' allungare la procedura di 60-90 giorni. La nostra strategia tiene conto di questa variabile fin dalla preparazione dell'atto.`;

  const costoAnswer = `Il nostro compenso complessivo e' ${compensoLong}. ${modalitaPagamento} ${pricing.compensoFormatted} comprende l'intero iter dalla prima diffida fino alla convalida di sfratto, incluse spese, contributi unificati, marche e rappresentanza in udienza.`;

  const sezioneInfo = sezioneLocale ? ` (${sezioneLocale})` : '';
  const competenzaAnswer = `La procedura va avviata davanti al ${sede.tribunale}${sezioneInfo}, competente per la zona di ${sede.nome} e provincia. Lo sfratto puo' essere avviato quando il conduttore non paga i canoni o gli oneri dovuti nei termini contrattuali. Il nostro compenso ${compenso} copre l'intero iter, senza acconti.`;

  const generated: LocalFaqItem[] = [
    {
      q: `Quanto tempo serve per ottenere la convalida di sfratto a ${sede.nome}?`,
      a: tempiAnswer
    },
    {
      q: `Quanto costa l'assistenza legale per uno sfratto a ${sede.nome}?`,
      a: costoAnswer
    },
    {
      q: `Cosa succede se l'inquilino si oppone allo sfratto a ${sede.nome}?`,
      a: opposizioneAnswer
    },
    {
      q: `Che cos'e' il termine di grazia nello sfratto per morosita' a ${sede.nome}?`,
      a: terminieGraziaAnswer
    },
    {
      q: `Quando si puo' avviare lo sfratto per morosita' a ${sede.nome}?`,
      a: competenzaAnswer
    }
  ];

  return generated.slice(0, 4);
}
