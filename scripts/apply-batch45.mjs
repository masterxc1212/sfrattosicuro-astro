#!/usr/bin/env node
/**
 * apply-batch45.mjs — Aggiorna tribunaleInfo.udienze e tribunaleInfo.note
 * per le 42 città dei batch 4 + 5 (chiusura progetto sedi).
 *
 * Mantiene indirizzo e sezione esistenti, sostituisce solo udienze + note.
 * Dati raccolti da agente di ricerca su giustizia.it / siti tribunali / OdA locali.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEDI_PATH = join(__dirname, '..', 'src', 'data', 'sedi.json');

const updates = {
  // ── BATCH 4 ──────────────────────────────────────────────────────────
  agrigento: {
    udienze: "Al Tribunale di Agrigento la cancelleria civile (ufficio iscrizione a ruolo, stanza 446) riceve dal lunedì al sabato 8:30-13:30: l'apertura del sabato è una particolarità che semplifica i depositi urgenti rispetto alla maggior parte dei tribunali italiani. La data di convalida sfratto segue il ruolo del giudice designato; prima udienza orientativamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.agrigento@giustiziacert.it. Tel: 0922/527301. Apertura sportello civile: lun-sab 8:30-13:30 (sabato compreso). Iscrizione a ruolo presso stanza 446."
  },
  "ascoli-piceno": {
    udienze: "Al Tribunale di Ascoli Piceno il deposito degli atti relativi al contenzioso civile — incluse le convalide di sfratto — passa per una PEC dedicata distinta dall'indirizzo di presidenza, scelta organizzativa che separa i flussi amministrativi da quelli giurisdizionali. La data di convalida segue il calendario del giudice. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria contenzioso civile: contenziosocivile.tribunale.ascolipiceno@giustiziacert.it. Indirizzare gli atti relativi a sfratti esclusivamente alla PEC contenzioso, non alla PEC di presidenza."
  },
  asti: {
    udienze: "Al Tribunale di Asti il calendario delle udienze civili è pubblicato annualmente ai sensi dell'art. 69 bis disp. att. c.p.c. e consultabile sul sito dell'Ordine degli Avvocati di Asti: prima della notifica della citazione conviene verificare la data assegnata al giudice della convalida. Prima udienza orientativamente 50-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email tribunale: tribunale.asti@giustizia.it. Tel: 0141/388111. Calendario udienze ex art. 69 bis disp. att. c.p.c. consultabile su ordineavvocatiasti.it (sezione Calendario delle udienze)."
  },
  avezzano: {
    udienze: "Al Tribunale di Avezzano l'accesso ai servizi di cancelleria civile è subordinato a prenotazione obbligatoria tramite il portale dedicato Reservio (servizio-prenotazioni-tribunale-az.reservio.com): senza appuntamento confermato non è possibile depositare atti né consultare fascicoli. La data di convalida segue il ruolo del giudice. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC dirigenza: dirigente.tribunale.avezzano@giustiziacert.it. Tel: 0863/20384. Prenotazione obbligatoria sportello: servizio-prenotazioni-tribunale-az.reservio.com (portale Reservio dedicato)."
  },
  belluno: {
    udienze: "Al Tribunale di Belluno la cancelleria contenzioso civile è aperta al pubblico in fascia ridotta dal lunedì al venerdì 9:00-11:00, con presidio sabato 8:30-12:30 per soli atti urgenti e in scadenza: la finestra ristretta richiede di pianificare i depositi di sfratto con anticipo. La data di convalida segue il ruolo del giudice. Prima udienza 50-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC tribunale: tribunale.belluno@giustiziacert.it. Tel: 0437/947402. Apertura sportello civile lun-ven 9:00-11:00 (solo 2 ore al giorno); sabato 8:30-12:30 esclusivamente per atti urgenti e in scadenza."
  },
  benevento: {
    udienze: "Al Tribunale di Benevento i procedimenti di convalida sfratto sono incardinati presso la Prima Sezione Civile (Presidente Dott.ssa Maria Ilaria Romano), specializzazione che facilita la trattazione del fascicolo locazioni. La data di udienza segue il calendario del giudice designato. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.benevento@giustiziacert.it. Convalide sfratto trattate dalla Prima Sezione Civile (Presidente Dott.ssa Maria Ilaria Romano). Riferimento: tribunale.benevento.it/prima-sezione-civile."
  },
  biella: {
    udienze: "Al Tribunale di Biella la cancelleria contenzioso civile è aperta al pubblico dal lunedì al venerdì 9:00-11:30, con apertura del sabato fino alle 12:00 esclusivamente per atti urgenti e in scadenza nello stesso giorno: la fascia oraria è più stretta della media nazionale. La data di convalida segue il ruolo del giudice. Prima udienza 50-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.biella@giustiziacert.it. Apertura sportello civile lun-ven 9:00-11:30 (2,5 ore al giorno); sabato fino alle 12:00 solo atti urgenti e in scadenza."
  },
  cassino: {
    udienze: "Al Tribunale di Cassino i procedimenti di convalida sfratto sono trattati dalla Dott.ssa Vincenza Ovallesco; le cancellerie civili dei giudici Pignata, Grillo e Notari sono ubicate al primo piano della sede di Via Tasso. La data di udienza segue il ruolo del giudice. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo: prot.tribunale.cassino@giustiziacert.it. Sede principale: Via Tasso, primo piano (cancellerie civili Pignata, Grillo, Notari). Convalide sfratto: Dott.ssa Vincenza Ovallesco."
  },
  castrovillari: {
    udienze: "Al Tribunale di Castrovillari la cancelleria contenzioso civile è aperta al pubblico dal lunedì al venerdì 9:30-12:30, con orario esteso il martedì e giovedì pomeriggio 14:30-17:30: questa fascia pomeridiana doppia è una particolarità rara nei tribunali italiani. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.castrovillari@giustiziacert.it. Tel: 0981/486711. Apertura sportello civile lun-ven 9:30-12:30; martedì e giovedì anche pomeriggio 14:30-17:30."
  },
  crotone: {
    udienze: "Al Tribunale di Crotone la cancelleria contenzioso civile è ubicata al quinto piano (responsabile Dott.ssa Annarita Aulicino): per il deposito di atti relativi a sfratti occorre rivolgersi a questo ufficio. La PEC di protocollo è riservata agli affari amministrativi e non sostituisce il PCT. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo (solo amministrativi): prot.tribunale.crotone@giustiziacert.it. Tel: 0962/920111. Cancelleria contenzioso civile al 5° piano, responsabile Dott.ssa Annarita Aulicino. Per atti giurisdizionali utilizzare PCT."
  },
  enna: {
    udienze: "Al Tribunale di Enna la cancelleria volontaria giurisdizione e contenzioso civile è aperta al pubblico dal lunedì al venerdì 9:00-12:00, con presidio dedicato del sabato per atti urgenti e non rinviabili: la finestra ridotta richiede di organizzare per tempo i depositi di sfratto. La data di convalida segue il calendario del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC volontaria giurisdizione: volgiurisdizione.tribunale.enna@giustiziacert.it. Apertura sportello civile lun-ven 9:00-12:00; sabato presidio per atti urgenti e non rinviabili."
  },
  fermo: {
    udienze: "Al Tribunale di Fermo la cancelleria contenzioso civile è aperta dal lunedì al sabato 9:00-13:00, ma dalle 12:00 alle 13:00 e il sabato si ricevono esclusivamente atti urgenti in scadenza nello stesso giorno: la programmazione del deposito sfratti va calibrata sulla fascia 9:00-12:00. La data di convalida segue il ruolo del giudice. Prima udienza 50-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.fermo@giustiziacert.it. Tel: 0734/2821. Apertura sportello: lun-sab 9:00-13:00 (fascia 12:00-13:00 e sabato solo atti urgenti in scadenza)."
  },
  gela: {
    udienze: "Al Tribunale di Gela la cancelleria contenzioso civile è ubicata al secondo piano della torre civile, con presidio del sabato 8:45-12:45 per atti urgenti e in scadenza: il sabato sportello è una particolarità organizzativa che agevola le scadenze locatizie. La data di convalida segue il ruolo del giudice. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.gela@giustiziacert.it. Tel: 0933/812435. Sede cancelleria al 2° piano della torre civile; sportello del sabato 8:45-12:45 per atti urgenti e in scadenza."
  },
  isernia: {
    udienze: "Al Tribunale di Isernia le udienze civili — incluse le convalide di sfratto — non si svolgono nella sede del tribunale ma presso il Palazzo della Provincia di Isernia in Via Berta, primo piano corridoio B: questa dislocazione logistica è un'unicità che richiede di indicare correttamente il luogo dell'udienza nella citazione. Prima udienza orientativamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.isernia@giustiziacert.it. Tel: 0865/4711291. Sede udienze civili: Palazzo della Provincia, Via Berta, primo piano corridoio B (NON nella sede del Tribunale)."
  },
  ivrea: {
    udienze: "Al Tribunale di Ivrea le udienze di convalida di sfratto sono fissate ogni lunedì e il secondo mercoledì di ciascun mese, secondo calendario locale concordato con l'Ordine degli Avvocati: la prenotazione degli appuntamenti per il deposito atti avviene via portale Fallcoweb (fallcoweb.it/prenotazioni/ivrea). Prima udienza generalmente entro 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email tribunale: tribunale.ivrea@giustizia.it. Calendario convalide sfratto: tutti i lunedì + secondo mercoledì del mese. Prenotazione appuntamenti via Fallcoweb: fallcoweb.it/prenotazioni/ivrea."
  },
  lagonegro: {
    udienze: "Al Tribunale di Lagonegro la cancelleria civile è diretta dalla Dott.ssa Consolata Landi e riceve al pubblico dal lunedì al venerdì 9:00-13:00 nella sede di Via Napoli a Lagonegro: la fascia oraria estesa fino alle 13:00 è più ampia della media dei piccoli tribunali. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo: prot.tribunale.lagonegro@giustiziacert.it. Tel: 0973/2333250. Sede: Via Napoli, Lagonegro. Cancelleria civile diretta da Dott.ssa Consolata Landi, apertura lun-ven 9:00-13:00."
  },
  lanciano: {
    udienze: "Al Tribunale di Lanciano la cancelleria contenzioso civile è ubicata al secondo piano stanza 26 (responsabile Dott.ssa Annalisa Di Cocco), con apertura al pubblico dal lunedì al venerdì 9:30-12:30: i depositi di sfratto vanno indirizzati a questo ufficio. La data di convalida segue il ruolo del giudice. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: civile.tribunale.lanciano@giustiziacert.it. Tel: 0872/713963. Cancelleria contenzioso civile: 2° piano stanza 26, responsabile Dott.ssa Annalisa Di Cocco, lun-ven 9:30-12:30."
  },
  lanusei: {
    udienze: "Il Tribunale di Lanusei è un tribunale di piccole dimensioni nell'Ogliastra (Sardegna) e per i procedimenti di convalida sfratto occorre contattare direttamente il centralino dell'ufficio: la mancanza di una PEC dedicata pubblicamente accessibile per la cancelleria civile rende preferibile il contatto telefonico preliminare alla notifica. Prima udienza orientativamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Tel cancelleria: 0782/473435. Tribunale di piccole dimensioni: per convalide sfratto contattare il centralino prima della notifica per concordare modalità operative. Riferimento: tribunalelanusei.it."
  },
  larino: {
    udienze: "Al Tribunale di Larino la cancelleria civile è ubicata al secondo piano della sede di Piazza del Popolo 1, nel centro storico della città: per le richieste di natura giurisdizionale (incluse le convalide di sfratto) occorre rivolgersi a questo ufficio. La PEC di protocollo è destinata agli affari amministrativi. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo (solo amministrativi): prot.tribunale.larino@giustiziacert.it. Tel: 0874/821218. Sede cancelleria civile: Piazza del Popolo 1, secondo piano. Per atti giurisdizionali utilizzare PCT."
  },
  locri: {
    udienze: "Al Tribunale di Locri la cancelleria contenzioso civile è aperta al pubblico con orario esteso il martedì e giovedì pomeriggio 15:00-16:00 (responsabile Dott.ssa Carmela Pirrottina): questa fascia pomeridiana facilita la gestione dei depositi urgenti in materia locatizia. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.locri@giustiziacert.it. Tel: 0964/398437. Responsabile Dott.ssa Carmela Pirrottina. Apertura pomeridiana cancelleria: martedì e giovedì 15:00-16:00."
  },
  marsala: {
    udienze: "Al Tribunale di Marsala la cancelleria contenzioso civile è in Via del Fante 50/A, primo piano stanza 133, con apertura del sabato esclusivamente per atti urgenti in scadenza: la dislocazione fisica e la finestra del sabato ristretta richiedono pianificazione dei depositi di sfratto. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.marsala@giustiziacert.it. Tel: 0923/765303. Sede: Via del Fante 50/A, primo piano stanza 133. Sabato solo atti urgenti in scadenza."
  },
  "nocera-inferiore": {
    udienze: "Al Tribunale di Nocera Inferiore la cancelleria contenzioso civile è in Via Falcone 12/14 (Nuova Palazzina), primo piano stanze 201-204, sotto il coordinamento della Dott.ssa Magrina Di Mauro: la nuova palazzina è distinta dal palazzo storico del tribunale e va indicata correttamente per il deposito atti. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.nocerainferiore@giustiziacert.it. Tel: 081/3239219. Sede: Via Falcone 12/14 (Nuova Palazzina), primo piano stanze 201-204. Coordinatrice: Dott.ssa Magrina Di Mauro."
  },
  nola: {
    udienze: "Al Tribunale di Nola le cancellerie sono distinte tra Prima e Seconda Sezione Civile, ciascuna con PEC dedicata: prima del deposito conviene verificare a quale sezione è assegnato il fascicolo locatizio. Sede in Palazzo Orsini, Piazza G. Bruno. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC Prima Sezione Civile: sez1.civile.tribunale.nola@giustiziacert.it. PEC Seconda Sezione: sez2.civile.tribunale.nola@giustiziacert.it. Tel: 081/5117111. Sede: Palazzo Orsini, Piazza G. Bruno. Verificare la sezione di assegnazione."
  },
  nuoro: {
    udienze: "Al Tribunale di Nuoro l'accesso ai procedimenti di sfratto avviene tramite la cancelleria civile centrale, con sede in Via Leonardo da Vinci 17: per le pratiche locatizie occorre rivolgersi a questo ufficio. La data di convalida segue il ruolo del giudice designato. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC dirigenza: dirigente.tribunale.nuoro@giustiziacert.it. Tel: 0784/258070. Sede: Via Leonardo da Vinci 17, Nuoro. Convalide sfratto presso cancelleria civile centrale."
  },
  oristano: {
    udienze: "Al Tribunale di Oristano la cancelleria volontaria giurisdizione e contenzioso civile è aperta al pubblico dal lunedì al venerdì 9:00-12:00, fascia oraria più ridotta rispetto alla media nazionale: i depositi di sfratto vanno organizzati nella mattinata. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo: prot.tribunale.oristano@giustiziacert.it. Apertura sportello civile lun-ven 9:00-12:00 (3 ore al giorno, finestra più stretta della media)."
  },

  // ── BATCH 5 ──────────────────────────────────────────────────────────
  "barcellona-pozzo-di-gotto": {
    udienze: "Al Tribunale di Barcellona Pozzo di Gotto la cancelleria civile ha sede in Via Giudice Giovanni Falcone 2: la PEC è dedicata e distinta dalla mail ordinaria della cancelleria, scelta organizzativa che separa i flussi giurisdizionali da quelli informativi. La data di convalida segue il ruolo del giudice. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: cancelleriacivile.tribunale.barcellonapozzodigotto@giustiziacert.it. Sede: Via Giudice Giovanni Falcone 2, Barcellona Pozzo di Gotto (ME). PEC dedicata distinta dalla mail ordinaria."
  },
  caltagirone: {
    udienze: "Al Tribunale di Caltagirone la cancelleria contenzioso civile è in Viale Mario Milazzo 218, secondo piano stanze 137-138-139 (responsabile Dott.ssa Filippina Montalto): la dislocazione su tre stanze contigue indica una specializzazione interna del personale per i procedimenti civili. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.caltagirone@giustiziacert.it. Tel: 0933/369247. Sede: Viale Mario Milazzo 218, secondo piano stanze 137-138-139. Responsabile: Dott.ssa Filippina Montalto."
  },
  caltanissetta: {
    udienze: "Al Tribunale di Caltanissetta la cancelleria civile è ubicata al quinto piano della sede di Via Libertà 5: per il deposito atti relativi a sfratti è obbligatorio l'utilizzo del PCT, mentre la PEC generale del tribunale è riservata agli affari amministrativi. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio (per atti giurisdizionali; PEC generale solo per amministrativi). Tel: 0934/71111. Sede cancelleria civile: Via Libertà 5, quinto piano. Riferimento: urp.caltanissetta.giustizia.it."
  },
  "lamezia-terme": {
    udienze: "Al Tribunale di Lamezia Terme la cancelleria procedimenti contenziosi e agraria è diretta dalla Dott.ssa Ornella Torchia: per le convalide di sfratto è preferibile contattare il numero diretto della cancelleria contenzioso, evitando la PEC di presidenza riservata agli affari amministrativi. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC presidenza (solo amministrativi): presidente.tribunale.lameziaterme@giustiziacert.it. Tel cancelleria contenzioso: 0968/498235. Cancelleria contenziosi e agraria diretta da Dott.ssa Ornella Torchia."
  },
  "napoli-nord": {
    udienze: "Il Tribunale di Napoli Nord è un tribunale autonomo con sede ad Aversa (CE), istituito come articolazione del distretto napoletano: l'accesso alla cancelleria civile è consentito esclusivamente previo appuntamento tramite portale di prenotazione, con calendario fissato secondo ordine cronologico di richiesta. Prima udienza orientativamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo: prot.tribunale.napolinord@giustiziacert.it. Sede: Aversa (CE). Accesso cancelleria civile solo previo appuntamento via portale (ordine cronologico). Riferimento protocollo: coanapolinord.it."
  },
  palmi: {
    udienze: "Al Tribunale di Palmi le cancellerie civili hanno sede in Via Roma 28, con apertura al pubblico dal lunedì al venerdì 8:30-12:30; il sabato e il 6 dicembre (festa patronale di San Nicola) l'accesso è limitato ai soli atti urgenti: la chiusura specifica del 6 dicembre è una particolarità locale da considerare. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.palmi@giustiziacert.it. Sede: Via Roma 28, Palmi. Apertura sportello: lun-ven 8:30-12:30; sabato e 6 dicembre (festa patronale) solo atti urgenti."
  },
  paola: {
    udienze: "Al Tribunale di Paola la sede è in Via G. Falcone e P. Borsellino 9: il tribunale ha dismesso le utenze fax sostituendole con caselle PEC dedicate per ogni cancelleria, scelta digitale che richiede l'utilizzo dell'indirizzo PEC corretto per il contenzioso civile. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.paola@giustiziacert.it. Sede: Via G. Falcone e P. Borsellino 9, Paola (CS). Fax dismessi: utilizzare esclusivamente PCT o PEC dedicata cancelleria."
  },
  patti: {
    udienze: "Al Tribunale di Patti la cancelleria registro generale contenzioso civile ha sede in Via Molino Croce ed è aperta al pubblico dal lunedì al sabato 9:30-12:30, con sabato riservato esclusivamente ad atti urgenti e in scadenza: l'apertura del sabato (anche se limitata) è utile per i depositi di sfratto a cavallo del weekend. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.patti@giustiziacert.it. Tel: 0941/052288. Sede: Via Molino Croce, Patti (ME). Apertura sportello: lun-sab 9:30-12:30 (sabato solo atti urgenti e in scadenza)."
  },
  "santa-maria-capua-vetere": {
    udienze: "Al Tribunale di Santa Maria Capua Vetere l'accesso ai servizi di cancelleria è consentito esclusivamente tramite Front Office con prenotazione preventiva sul portale dedicato del tribunale: senza appuntamento confermato non è possibile depositare atti né consultare fascicoli. La sede è in Via Santagata. Prima udienza tipicamente 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Sede: Via Santagata, Santa Maria Capua Vetere (CE). Accesso cancelleria solo previa prenotazione su portale dedicato del Tribunale (Front Office). Riferimento: tribunalesantamariacapuavetere.it."
  },
  sciacca: {
    udienze: "Al Tribunale di Sciacca la cancelleria contenzioso civile gestisce in un unico ufficio l'iscrizione di convalide di sfratto, decreti ingiuntivi, procedimenti in materia agraria e societaria, con apertura al pubblico 9:00-12:30: l'accorpamento delle materie richiede di indicare correttamente il rito nella richiesta di iscrizione. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.sciacca@giustiziacert.it. Apertura sportello: lun-ven 9:00-12:30. Cancelleria contenziosa unica per sfratti, decreti ingiuntivi, materia agraria e societaria."
  },
  sulmona: {
    udienze: "Al Tribunale di Sulmona la cancelleria contenzioso civile è ubicata al primo piano stanza 38 (responsabile Anna Tortis), con sede in Piazza Capograssi 1: i depositi di sfratto vanno indirizzati a questo ufficio specifico, distinto dalle altre cancellerie del tribunale. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo: prot.tribunale.sulmona@giustiziacert.it. Tel: 0864/2453316. Sede: Piazza Capograssi 1. Cancelleria contenzioso civile: 1° piano stanza 38, responsabile Anna Tortis."
  },
  "tempio-pausania": {
    udienze: "Al Tribunale di Tempio Pausania (autonomo, competente sulla Gallura) la cancelleria civile-lavoro è aperta dal lunedì al venerdì 9:00-12:00 e il martedì pomeriggio 14:45-15:45; le richieste copie atti vanno indirizzate esclusivamente via email a annamaria.fontana@giustizia.it (referente nominativo): l'apertura pomeridiana del martedì e il canale email diretto sono particolarità organizzative. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC protocollo: prot.tribunale.tempiopausania@giustiziacert.it. Tel: 079/678900. Apertura sportello: lun-ven 9:00-12:00 + martedì 14:45-15:45. Richieste copie esclusivamente a annamaria.fontana@giustizia.it (referente nominativo)."
  },
  "termini-imerese": {
    udienze: "Al Tribunale di Termini Imerese la sede è in Piazza F. Ugo Di Blasi 1, con presidio del sabato 8:45-12:45 dedicato esclusivamente ad atti urgenti e in scadenza: lo sportello del sabato facilita il deposito di sfratti urgenti. La PEC generale è riservata agli affari amministrativi e non sostituisce il PCT per gli atti giurisdizionali. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Email tribunale (solo amministrativi): tribunale.terminiimerese@giustizia.it. Tel: 091/8152246. Sede: Piazza F. Ugo Di Blasi 1. Sportello del sabato 8:45-12:45 per atti urgenti e in scadenza."
  },
  "vallo-della-lucania": {
    udienze: "Al Tribunale di Vallo della Lucania la cancelleria civile è in Via A. De Hippolytis 4, primo piano stanze 2-14 (responsabile Dott.ssa Rosa Salzano), con presidio del sabato 9:00-12:00 dedicato ad atti urgenti: l'apertura del sabato è utile per i depositi di sfratto in scadenza nel weekend. La data di convalida segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC cancelleria civile: civile.tribunale.vallodellalucania@giustiziacert.it. Sede: Via A. De Hippolytis 4, primo piano stanze 2-14. Responsabile: Dott.ssa Rosa Salzano. Sabato 9:00-12:00 atti urgenti."
  },
  vasto: {
    udienze: "Al Tribunale di Vasto la cancelleria contenzioso civile è al secondo piano (responsabile Dott.ssa Maria Lazetera): l'ufficio sentenze e decreti ingiuntivi è competente anche per le pratiche di convalida sfratto, accorpamento organizzativo che riduce i passaggi interni del fascicolo. La data di udienza segue il ruolo del giudice. Prima udienza 55-65 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. PEC contenzioso civile: contenziosocivile.tribunale.vasto@giustiziacert.it. Tel: 0873/304703. Cancelleria contenzioso civile: 2° piano, responsabile Dott.ssa Maria Lazetera. Convalide sfratto trattate insieme a sentenze e decreti ingiuntivi."
  },
  velletri: {
    udienze: "Al Tribunale di Velletri le convalide di sfratto sono trattate dalla Seconda Sezione Civile con l'ausilio di due GOT (giudici onorari) cui è assegnato il compito deflattivo specifico per la materia locatizia: questa specializzazione organizzativa accelera la trattazione dei fascicoli. La cancelleria è aperta lun-ven 9:30-13:00. Prima udienza tipicamente 50-60 giorni dalla notifica.",
    note: "Deposito PCT obbligatorio. Tel: 06/961500239. Convalide sfratto presso Seconda Sezione Civile, con 2 GOT dedicati alla deflazione del ruolo locazioni. Apertura sportello: lun-ven 9:30-13:00."
  },
  verbania: {
    udienze: "Al Tribunale di Verbania le udienze straordinarie di convalida di sfratto e finita locazione sono fissate solo 4 volte l'anno — l'ultimo mercoledì di febbraio, marzo, aprile e maggio — con chiamata a 15 minuti l'una dall'altra: il calendario ristretto richiede di programmare la notifica della citazione con largo anticipo per intercettare la data utile. Prenotazione obbligatoria via portale del tribunale.",
    note: "Deposito PCT obbligatorio. Calendario convalide sfratto: solo 4 udienze/anno (ultimo mercoledì di febbraio, marzo, aprile, maggio), chiamate ogni 15 minuti. Prenotazione obbligatoria: tribunale.verbania.giustizia.it/PrenCancelleria.aspx."
  }
};

const sediRaw = await readFile(SEDI_PATH, 'utf8');
const sedi = JSON.parse(sediRaw);

let updated = 0;
let missing = [];

for (const [slug, info] of Object.entries(updates)) {
  const sede = sedi.find(s => s.slug === slug);
  if (!sede) {
    missing.push(slug);
    continue;
  }
  if (!sede.tribunaleInfo) {
    sede.tribunaleInfo = {};
  }
  sede.tribunaleInfo.udienze = info.udienze;
  sede.tribunaleInfo.note = info.note;
  // garantisce campo depositoPCT a true se non già presente
  if (sede.tribunaleInfo.depositoPCT === undefined) {
    sede.tribunaleInfo.depositoPCT = true;
  }
  updated++;
}

await writeFile(SEDI_PATH, JSON.stringify(sedi, null, 2) + '\n', 'utf8');

console.log(`Aggiornate: ${updated} città su ${Object.keys(updates).length}`);
if (missing.length > 0) {
  console.log(`MANCANTI nello sedi.json:`, missing);
}
