#!/usr/bin/env node
/**
 * apply-batch3.mjs — Aggiorna tribunaleInfo.udienze e tribunaleInfo.note
 * per le 25 città del batch 3, basandosi su dati ricerca verificata
 * (vedi tribunali-batch-progress.json e Sources nella ricerca).
 *
 * Mantiene indirizzo e sezione esistenti, sostituisce solo udienze + note.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEDI_PATH = join(__dirname, '..', 'src', 'data', 'sedi.json');

const updates = {
  aosta: {
    udienze: "Al Tribunale di Aosta non è pubblicato un giorno fisso di udienze di convalida sfratto: la data viene assegnata in base al ruolo del giudice designato. La cancelleria contenzioso civile (3° piano, stanze 304-306, referente Funz. Giud. Orietta Travagliato) riceve dal lunedì al venerdì 9:30-13:30. Prima udienza tipicamente entro 60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.aosta@giustiziacert.it. Tel: 0165/306223. Sportello civile aperto lun-ven 9:30-13:30."
  },
  avellino: {
    udienze: "Il Tribunale di Avellino pubblica periodicamente sul sito istituzionale (sezione \"Fasce orarie udienze\") il calendario aggiornato delle udienze civili, incluso il ruolo locazioni. Prima della notifica della citazione conviene verificare la fascia oraria assegnata al giudice della convalida. Prima udienza entro 50-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email tribunale: tribunale.avellino@giustizia.it. Calendari fasce orarie: tribunale.avellino.giustizia.it (sezione fasce orarie udienze)."
  },
  chieti: {
    udienze: "Al Tribunale di Chieti la cancelleria civile riceve dal lunedì al venerdì 9:00-13:00, con apertura pomeridiana il martedì e il giovedì 15:00-17:00 — fascia utile per il deposito di atti di sfratto urgenti. La data di convalida viene assegnata dal ruolo del giudice. Prima udienza tipica: 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email cancelleria civile: cancelleriacivile.tribunale.chieti@giustizia.it. Tel: 0871/3531. Apertura pomeridiana cancelleria: martedì e giovedì 15:00-17:00."
  },
  civitavecchia: {
    udienze: "Al Tribunale di Civitavecchia la pubblicazione dei calendari udienze sul sito istituzionale è attualmente sospesa: per conoscere data e aula della convalida occorre interpellare direttamente la cancelleria contenzioso civile o consultare il portale dell'Ordine Avvocati di Civitavecchia. Prima udienza orientativamente entro 60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria contenzioso civile: contenziosocivile.tribunale.civitavecchia@giustiziacert.it. Tel: 0766/3601. Calendari udienze non pubblicati online: contattare cancelleria o Ordine Avvocati."
  },
  forli: {
    udienze: "Al Tribunale di Forlì le prime udienze civili — incluse le convalide di sfratto — si tengono di regola il martedì. Non è previsto un sistema di prenotazione online: la data va indicata in citazione tenendo conto del calendario martedì del giudice assegnato. Prima udienza tipicamente 45-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email URP uffici giudiziari: urpufficigiudiziari.tribunale.procura.forli@giustizia.it. Giorno udienze convalida: martedì."
  },
  gorizia: {
    udienze: "Al Tribunale di Gorizia la cancelleria contenzioso ordinario, lavoro e famiglia riceve in fascia ridotta dal lunedì al venerdì 8:30-11:30 (piano terra, stanze 20-22), con apertura del sabato per soli atti urgenti. La data di convalida segue il ruolo del giudice designato. Prima udienza entro 50-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email cancelleria civile: civile.tribunale.gorizia@giustizia.it. Tel: 0481/593857. Sportello civile aperto solo 8:30-11:30; sabato esclusivamente atti urgenti."
  },
  grosseto: {
    udienze: "Al Tribunale di Grosseto la materia locazioni è seguita direttamente dai funzionari assegnatari della cancelleria contenzioso civile e agrario (Carla Rabai 0564/419227, Luca De Vincentiis 0564/419228), che gestiscono il calendario delle convalide. Prima udienza tipicamente entro 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.grosseto@giustiziacert.it. Tel cancelleria: 0564/419227 (Rabai) — 0564/419228 (De Vincentiis)."
  },
  imperia: {
    udienze: "Al Tribunale di Imperia non esiste uno sportello locazioni separato: la materia confluisce nella cancelleria civile contenzioso al 1° piano, che gestisce indistintamente convalide di sfratto, finita locazione e contenzioso ordinario. La data di udienza viene assegnata dal ruolo del giudice designato. Prima udienza orientativamente entro 60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email cancelleria contenzioso civile: cancelleriacontenziosocivile.tribunale.imperia@giustizia.it. Tel: 0183/277241. La corrispondenza locazioni va indirizzata al contenzioso civile, non a uno sportello dedicato."
  },
  "la-spezia": {
    udienze: "Al Tribunale della Spezia l'iscrizione a ruolo della convalida è gestita dall'Ufficio Iscrizioni a Ruolo Generale (Contenzioso Civile, Decreti Ingiuntivi), che è distinto dall'Ufficio Istruttoria Contenzioso Ordinario: il fascicolo passa per due cancellerie diverse prima dell'udienza. Prima udienza tipica entro 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Centralino: 0187/595111. Iscrizione a ruolo distinta dall'istruttoria: prima passaggio in Ufficio Iscrizioni Ruolo Generale, poi in Contenzioso Ordinario."
  },
  lecco: {
    udienze: "Al Tribunale di Lecco il calendario locale fissa le udienze di convalida di sfratto il venerdì, con prime udienze locazioni il giovedì e successive il venerdì. La prenotazione è obbligatoria via portale Fallco (fallcoweb.it/prenotazioni/Lecco/ufficiosfratti) prima della notifica della citazione. Prima udienza entro 45-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Prenotazione obbligatoria via Fallco: fallcoweb.it/prenotazioni/Lecco/ufficiosfratti. Giorni udienze: venerdì (sfratti) — giovedì (prime udienze locazioni) — venerdì (successive). Riferimento I Sezione Civile."
  },
  lodi: {
    udienze: "Al Tribunale di Lodi le convalide di sfratto sono trattate dalla Cancelleria Esecuzioni Mobiliari e Convalida Sfratti — sportello unico (responsabile Marasco Giovanni, sede Viale Milano 2). Questa specializzazione organizzativa rende più rapida la gestione del fascicolo rispetto ai tribunali con cancelleria civile generalista. Prima udienza tipica: 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC sportello unico esecuzioni mobiliari + sfratti: esecuzioni.mobiliari.tribunale.lodi@giustiziacert.it. Tel: 0371/499226. Responsabile cancelleria: Marasco Giovanni — sede Viale Milano 2."
  },
  mantova: {
    udienze: "Al Tribunale di Mantova è in vigore una prenotazione online obbligatoria per le udienze di convalida di sfratto: la fascia oraria 10:30-12:30 accetta massimo 20 fascicoli per udienza, con slot esauribili. Il banner \"Prenotazione Udienze Online\" è in homepage del tribunale. Senza prenotazione confermata l'udienza non viene tenuta.",
    note: "Deposito PCT obbligatorio. Prenotazione online obbligatoria (max 20 fascicoli per udienza, fascia 10:30-12:30): tribunale.mantova.it/PrenCancInformazioni.aspx. Email tribunale: tribunale.mantova@giustizia.it."
  },
  massa: {
    udienze: "Al Tribunale di Massa l'iscrizione a ruolo delle convalide è gestita da numeri telefonici dedicati distinti da quelli per le informazioni sui fascicoli pendenti: 0585/818808-105-106 per il ruolo, 0585/818131-132 per consultazione fascicoli. La data di udienza segue il calendario del giudice. Prima udienza tipica: 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.massa@giustiziacert.it. Tel iscrizione a ruolo: 0585/818808 — 0585/818105 — 0585/818106. Tel informazioni fascicoli: 0585/818131 — 0585/818132."
  },
  pistoia: {
    udienze: "Al Tribunale di Pistoia le convalide di sfratto rientrano nella Cancelleria Civile - Procedimenti Speciali (direttrice Dott.ssa Catia Busillo), distinta dalle cancellerie Ruoli e Famiglia: questa specializzazione facilita la trattazione rapida del fascicolo. Prima udienza tipicamente 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email cancelleria civile: cancelleria.civile.tribunale.pistoia@giustizia.it. Tel: 0573/35711. Procedimenti speciali (incluse convalide): direttrice Dott.ssa Catia Busillo."
  },
  pordenone: {
    udienze: "Al Tribunale di Pordenone è attiva la prenotazione online delle udienze di convalida sfratto con 15 slot disponibili a partire dalle 9:30, ciascuno per un solo procedimento, fino a esaurimento. La piattaforma è prenotazionicancelleria.sitiwebgiustizia.it/login.aspx?ug=1672. La ricevuta va inserita nel fascicolo prima della notifica.",
    note: "Deposito PCT obbligatorio. Email cancelleria civile: cancelleria.civile.tribunale.pordenone@giustizia.it. Tel: 0434/501328. Prenotazione obbligatoria (15 slot dalle 9:30, 1 procedimento per slot): prenotazionicancelleria.sitiwebgiustizia.it/login.aspx?ug=1672."
  },
  rieti: {
    udienze: "Al Tribunale di Rieti la trattazione delle convalide è incardinata presso l'Ufficio Esecuzioni, dove tre referenti operativi seguono i fascicoli: Roberto Proietti (0746/208352), Mariella Scappa (0746/208266), Nicola Ottaviani (0746/208313). La data di udienza viene assegnata dal ruolo del giudice. Prima udienza orientativamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Centralino tribunale: 0746/2081. Referenti Ufficio Esecuzioni (convalide): Roberto Proietti 0746/208352 — Mariella Scappa 0746/208266 — Nicola Ottaviani 0746/208313."
  },
  rovigo: {
    udienze: "Al Tribunale di Rovigo la materia locatizia confluisce nella Cancelleria Contenzioso Civile e Volontaria Giurisdizione unificata: non esiste un indirizzo email separato per le locazioni. La data di udienza segue il ruolo del giudice designato. Prima udienza tipica: 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email tribunale (cancelleria unica): tribunale.rovigo@giustizia.it. Tel: 0425/428111. Cancelleria locazioni accorpata al contenzioso civile e volontaria giurisdizione: nessun indirizzo dedicato."
  },
  savona: {
    udienze: "Al Tribunale di Savona lo sportello del contenzioso civile è al 4° piano, sportello 2, con accesso fisico esclusivamente su prenotazione tramite l'applicativo dei servizi online. La fascia di reperibilità telefonica è ristretta al lunedì-venerdì 9:00-11:00. La data di udienza segue il ruolo del giudice. Prima udienza tipica: 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email contenzioso civile: contenziosocivile.tribunale.savona@giustizia.it. Tel: 019/8316584 (lun-ven 9:00-11:00). Accesso sportello solo su prenotazione (4° piano, sportello 2)."
  },
  sondrio: {
    udienze: "Al Tribunale di Sondrio la cancelleria civile riceve allo sportello fisico nella stanza 212 al 2° piano. Per le richieste via email è obbligatorio l'oggetto formattato \"RICHIESTA INFORMAZIONI – COGNOME E NOME\" con telefono in firma, altrimenti la mail non viene processata. La data di udienza segue il ruolo del giudice. Prima udienza orientativamente 55-65 giorni.",
    note: "Deposito PCT obbligatorio. Email cancelleria civile: cancelleriacivile.tribunale.sondrio@giustizia.it (oggetto obbligatorio: \"RICHIESTA INFORMAZIONI – COGNOME E NOME\"). Tel: 0342/529111. Sportello civile: stanza 212, 2° piano."
  },
  spoleto: {
    udienze: "Al Tribunale di Spoleto la cancelleria civile è aperta in due fasce distinte: 9:00-11:30 per consultazioni e copie, 11:30-13:00 riservata ai soli atti urgenti. Il sabato è aperta solo 9:00-13:00 per atti urgenti. Questa segmentazione oraria condiziona il deposito di urgenze in materia locatizia. Prima udienza tipica: 50-60 giorni.",
    note: "Deposito PCT obbligatorio. Email cancelleria civile: civile.tribunale.spoleto@giustizia.it. Tel: 0743/219419. Apertura sportello: 9:00-11:30 (consultazioni) — 11:30-13:00 (solo atti urgenti) — sabato 9:00-13:00 atti urgenti."
  },
  tivoli: {
    udienze: "Al Tribunale di Tivoli la prenotazione degli appuntamenti per il contenzioso civile avviene tramite portale Fallco (fallcoweb.it/prenotazioni/tivoli/contenziosoocivile). La risposta telefonica è garantita solo nella fascia 9:00-11:00. La data di convalida segue il ruolo del giudice designato. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.tivoli@giustiziacert.it. Tel: 0774/4511 (risposta garantita 9:00-11:00). Prenotazione appuntamenti: fallcoweb.it/prenotazioni/tivoli/contenziosoocivile."
  },
  trani: {
    udienze: "Al Tribunale di Trani le esecuzioni civili (e le pratiche connesse al rilascio dell'immobile post-convalida) hanno PEC dedicata distinta dalla PEC generale del tribunale: questo richiede un doppio canale di comunicazione tra fase di convalida e fase esecutiva. Sede storica al Palazzo Candido, Piazza Cesare Battisti. Prima udienza tipica: 55-65 giorni.",
    note: "Deposito PCT obbligatorio. PEC esecuzioni civili (rilascio): esecuzionicivili.tribunale.trani@giustizia.it. Tel: 0883/505311. Sede: Palazzo Candido, Piazza Cesare Battisti. Doppio canale PEC: convalida (cancelleria civile) — esecuzione (esecuzioni civili)."
  },
  urbino: {
    udienze: "Al Tribunale di Urbino la cancelleria civile è unificata con quella del lavoro: stesso indirizzo email per entrambi i ruoli, stesso personale. L'apertura al pubblico è ridotta a due ore, dal lunedì al venerdì 10:00-12:00. La data di udienza segue il ruolo del giudice. Prima udienza tipicamente 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email cancelleria unica civile + lavoro: civilelavoro.tribunale.urbino@giustizia.it. Tel: 0722/3769133. Apertura sportello: lun-ven 10:00-12:00 (sole 2 ore al giorno)."
  },
  vercelli: {
    udienze: "Al Tribunale di Vercelli le locazioni e gli sfratti sono trattati dalla Cancelleria Lavoro, Previdenza, Locazioni e Sfratti al piano terra — distinta dalla Cancelleria Civile contenziosa: è una scelta organizzativa che accorpa sfratti e ruolo lavoro nello stesso ufficio. La data di udienza va prenotata preventivamente con la cancelleria. Prima udienza tipica: 50-65 giorni.",
    note: "Deposito PCT obbligatorio. Email cancelleria lavoro/locazioni/sfratti: cancelleria.lavoro.tribunale.vercelli@giustizia.it. Tel: 0161/282244. Materia sfratti gestita dallo stesso ufficio del ruolo lavoro, non dalla cancelleria civile contenziosa."
  },
  viterbo: {
    udienze: "Al Tribunale di Viterbo l'accesso allo sportello civile è esclusivamente su appuntamento, dal lunedì al venerdì 9:00-12:00. I cancellieri di riferimento per la convalida di sfratto sono Giuliano Giuliani e David Zampetti. La data di udienza segue il ruolo del giudice designato. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.viterbo@giustiziacert.it. Tel: 0761/351813. Accesso sportello solo su appuntamento (lun-ven 9:00-12:00). Cancellieri di riferimento: Giuliano Giuliani — David Zampetti."
  }
};

const sediRaw = await readFile(SEDI_PATH, 'utf8');
const sedi = JSON.parse(sediRaw);

let updated = 0;
let missing = [];

for (const [slug, patch] of Object.entries(updates)) {
  const idx = sedi.findIndex((s) => s.slug === slug);
  if (idx === -1) {
    missing.push(slug);
    continue;
  }
  const current = sedi[idx].tribunaleInfo || {};
  sedi[idx].tribunaleInfo = {
    ...current,
    depositoPCT: true,
    udienze: patch.udienze,
    note: patch.note,
  };
  updated++;
}

if (missing.length) {
  console.error('SLUG MANCANTI:', missing.join(', '));
  process.exit(1);
}

await writeFile(SEDI_PATH, JSON.stringify(sedi, null, 2) + '\n', 'utf8');
console.log(`OK — aggiornate ${updated} citta del batch 3.`);
