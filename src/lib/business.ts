/**
 * business.ts — Helper tipato per leggere i valori di business da
 * `src/data/business-config.json`.
 *
 * Perche' esiste: i valori di business (prezzo EUR 1.300, tempi ~60 giorni,
 * orari, telefoni, WhatsApp, ecc.) sono **vincoli inviolabili** dichiarati
 * nelle promesse landing (vedi `docs/seo/vincoli-territorializzazione-sedi.md`
 * sez. 1). Devono essere centralizzati in un solo punto per evitare drift
 * tra componenti, sedi e blog.
 *
 * Uso in un file .astro:
 *   ---
 *   import { pricing, tempi, contatti } from '../../lib/business';
 *   ---
 *   <p>Compenso: {pricing.compensoFormattedLong}</p>
 *   <p>Tempi: {tempi.convalidaMedia}</p>
 *   <a href={contatti.whatsappPrincipale.url}>WhatsApp</a>
 *
 * Uso in un .ts/.mjs (es. script):
 *   import { businessConfig, getCompensoFormatted } from '../lib/business';
 *
 * Convenzione: MAI hardcodare un valore di business in un componente/sede/
 * blog/landing. Sempre import da qui. Cambi globali = una sola modifica
 * a `business-config.json`.
 */

import rawConfig from '../data/business-config.json';

// =============================================================================
// Tipi
// =============================================================================

export type Pricing = {
  /** Importo numerico del compenso complessivo, in EUR. */
  compensoComplessivo: number;
  /** "EUR 1.300" — usabile inline, senza disclaimer. */
  compensoFormatted: string;
  /** "EUR 1.300 fino al rilascio dell'immobile" — usabile come promessa primaria. */
  compensoFormattedLong: string;
  /** Disclaimer "Nessun acconto. Pagamento solo dopo la convalida dello sfratto." */
  modalita: string;
};

export type Tempi = {
  /** "circa 60 giorni" — usabile inline. */
  convalidaMedia: string;
  /** "~60 gg" — usabile in label compatti / icone. */
  convalidaMediaShort: string;
  /** "entro 2 ore" — promessa callback. */
  rispostaCallback: string;
  /** Disclaimer obbligatorio quando si cita il dato 60 giorni. */
  disclaimerStandard: string;
};

export type Garanzie = {
  /** "gratuita" — la prima consulenza non e' fatturata. */
  consulenzaIniziale: string;
  /** True: il servizio e' rivolto solo a proprietari/locatori, non a inquilini. */
  soloProprietariLocatori: boolean;
  /** Microcopy promessa callback. */
  rispostaCallback: string;
  /** Disclaimer modale sul recupero spese legali. */
  speseInquilino: string;
};

export type Orari = {
  /** "Lun-Ven 9:00-19:00" */
  settimanaLabel: string;
  /** "Sabato 9:00-13:00" */
  sabatoLabel: string;
  /** "Lun-Ven 9-19 - Sab 9-13" — versione compatta one-line. */
  labelCompatto: string;
};

export type FaseProcedura = {
  /** Numero fase (1-4). */
  n: number;
  /** Range giorni indicativo, es. "1-7", "31-60". */
  giorni: string;
  /** Titolo breve della fase. */
  titolo: string;
  /** Descrizione operativa. */
  descrizione: string;
};

export type Procedura = {
  /** Le 4 fasi standard del nostro percorso operativo. */
  fasi: FaseProcedura[];
};

export type WhatsappContatto = {
  /** Numero formattato per display, "+39 329 117 5957". */
  numero: string;
  /** URL wa.me canonico per click-to-chat. */
  url: string;
  /** Note d'uso interne (in quale contesto usarlo). */
  uso: string;
};

export type Contatti = {
  /** Telefono formattato per display, "+39 02 8089 8395". */
  telefonoFormatted: string;
  /** Link tel: completo, "tel:+390280898395". */
  telefonoTelLink: string;
  /** Forma E.164 senza prefisso tel:, "+390280898395". */
  telefonoCanonical: string;
  /** Email primaria di contatto cliente. */
  email: string;
  /** WhatsApp principale (default per home, sedi, landing). */
  whatsappPrincipale: WhatsappContatto;
};

export type BusinessConfig = {
  pricing: Pricing;
  tempi: Tempi;
  garanzie: Garanzie;
  orari: Orari;
  procedura: Procedura;
  contatti: Contatti;
};

// =============================================================================
// Config + named exports
// =============================================================================

/**
 * Config completa, oggetto immutabile letto da `business-config.json` a build time.
 * Usare quando si vogliono passare piu' campi insieme (es. a un componente che
 * accetta `BusinessConfig` come prop).
 */
export const businessConfig: BusinessConfig = rawConfig as unknown as BusinessConfig;

// Re-export delle sezioni per import comodo nei componenti.
export const pricing = businessConfig.pricing;
export const tempi = businessConfig.tempi;
export const garanzie = businessConfig.garanzie;
export const orari = businessConfig.orari;
export const procedura = businessConfig.procedura;
export const contatti = businessConfig.contatti;

// =============================================================================
// Convenience helpers
// =============================================================================

/**
 * "EUR 1.300 fino al rilascio dell'immobile" — promessa primaria.
 * Usare quando si comunica il prezzo come hero/CTA.
 */
export function getCompensoFormatted(): string {
  return pricing.compensoFormattedLong;
}

/**
 * "circa 60 giorni" — promessa tempi convalida.
 * Sempre da affiancare a `tempi.disclaimerStandard` quando il dato e' citato
 * in un'area visibile (hero, FAQ, sede).
 */
export function getTempiConvalida(): string {
  return tempi.convalidaMedia;
}

/**
 * Frase pronta da inserire in calce a un blocco copy che cita i 60 giorni.
 * Esempio output: "circa 60 giorni. Dato medio operativo, non promessa
 * assoluta. I tempi dipendono dal Tribunale competente e dall'eventuale
 * opposizione dell'inquilino."
 */
export function getTempiConvalidaConDisclaimer(): string {
  return `${tempi.convalidaMedia}. ${tempi.disclaimerStandard}`;
}

/**
 * Snippet pattern per pagine sede: incorpora 4 promesse vincolanti
 * (procedura 4 fasi, tempi 60gg, compenso 1.300, nessun acconto) in un
 * paragrafo coerente con le promesse landing.
 *
 * Vedi `docs/seo/vincoli-territorializzazione-sedi.md` sez. 3.2.
 *
 * @param citta nome citta' (es. "Milano")
 * @param tribunale nome tribunale (es. "Tribunale di Milano")
 * @param sezioneCancelleria opzionale, es. "XIII Sezione Civile - Locazioni"
 * @param tempiLocali opzionale, es. "30-45 giorni" da `tribunaleInfo.udienze`
 */
export function getPatternPromessaSede(opts: {
  citta: string;
  tribunale: string;
  sezioneCancelleria?: string;
  tempiLocali?: string;
}): string {
  const { citta, tribunale, sezioneCancelleria, tempiLocali } = opts;
  const cancelleria = sezioneCancelleria
    ? `presso la cancelleria di ${sezioneCancelleria}`
    : `presso il ${tribunale}`;
  const tempiFrase = tempiLocali
    ? `La prima udienza e' generalmente fissata in ${tempiLocali} — un tempo coerente con il nostro dato medio operativo di ${tempi.convalidaMedia}.`
    : `Tempi di convalida: ${tempi.convalidaMedia}.`;
  return (
    `Al ${tribunale}, la procedura di sfratto per morosita' segue il nostro `
    + `percorso operativo standard: ${procedura.fasi.map(f => f.titolo.toLowerCase()).join(', ')}. `
    + `Il deposito avviene ${cancelleria}. `
    + tempiFrase
    + ` Il compenso complessivo di ${pricing.compensoFormatted} copre l'intero iter `
    + `fino al rilascio dell'immobile, senza acconti.`
  );
}

/**
 * Default export: l'intera config. Comodo per `import config from '.../business'`.
 */
export default businessConfig;
