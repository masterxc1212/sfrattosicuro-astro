export interface ServicePage {
  slug: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  overview: string[];
  whenToUse: string[];
  procedureSteps: Array<{ title: string; text: string }>;
  documents: string[];
  includes: string[];
  caseExample: {
    title: string;
    scenario: string;
    activity: string;
    outcome: string;
  };
  pricing: {
    fee: string;
    payment: string;
    timing: string;
    note: string;
  };
  faqs: Array<{ q: string; a: string }>;
}

export const servicePages: ServicePage[] = [
  {
    slug: 'sfratto-per-morosita',
    shortTitle: 'Sfratto per morosità',
    title: 'Sfratto per morosità: assistenza legale per proprietari | Sfratto Sicuro',
    metaDescription:
      'Assistenza legale per sfratto per morosità: analisi del caso, deposito atti, udienza e rilascio immobile. Supporto operativo su tutto il territorio nazionale.',
    h1: 'Sfratto per morosità',
    intro:
      'Quando il canone non viene più pagato, il proprietario deve agire con tempestività e metodo. Il servizio di sfratto per morosità è strutturato per trasformare una situazione critica in un percorso legale chiaro, tracciabile e orientato al risultato.',
    overview: [
      'La procedura di sfratto per morosità nasce per tutelare il locatore in presenza di insoluti sul canone e, nei limiti previsti dalla legge, sugli oneri accessori. Non è la strada corretta per contestazioni estranee alla morosità economica.',
      'L’obiettivo è ottenere la convalida e il rilascio dell’immobile con un percorso ordinato: verifica documentale, atti, udienza e gestione delle fasi successive fino alla chiusura della pratica.',
      'Una gestione impostata bene fin dall’inizio riduce i tempi persi, evita errori formali e consente di coordinare anche il recupero delle somme dovute.'
    ],
    whenToUse: [
      'Canoni non pagati secondo quanto risulta da contratto e conteggi.',
      'Oneri accessori non corrisposti, nei casi e nelle soglie previste dalla normativa.',
      'Necessità di riottenere l’immobile e fermare l’aggravarsi del danno economico.'
    ],
    procedureSteps: [
      {
        title: '1) Verifica preliminare',
        text: 'Si controllano contratto, registrazione, prova dei mancati pagamenti e cronologia delle comunicazioni già inviate all’inquilino.'
      },
      {
        title: '2) Predisposizione e notifica degli atti',
        text: 'Si prepara l’atto introduttivo con i dati economici corretti e si procede con la notifica secondo le regole processuali.'
      },
      {
        title: '3) Udienza e convalida',
        text: 'All’udienza si chiede la convalida dello sfratto. In base all’esito, si procede verso l’ordinanza di rilascio e i passaggi successivi.'
      },
      {
        title: '4) Chiusura operativa',
        text: 'La pratica viene seguita fino alla liberazione dell’immobile, con aggiornamenti costanti al proprietario.'
      }
    ],
    documents: [
      'Contratto di locazione e registrazione.',
      'Prova dei canoni/oneri non pagati (estratti, prospetti, quietanze mancanti).',
      'Eventuali comunicazioni già inviate al conduttore.',
      'Documenti identificativi e dati dell’immobile.'
    ],
    includes: [
      'Analisi documentale iniziale e impostazione strategica.',
      'Predisposizione atti e gestione delle scadenze procedurali.',
      'Assistenza fino alla fase di rilascio dell’immobile.',
      'Valutazione del recupero crediti in parallelo.'
    ],
    caseExample: {
      title: 'Caso pratico: morosità progressiva in locazione abitativa',
      scenario:
        'Un proprietario segnala 4 mensilità non pagate e oneri condominiali arretrati, con difficoltà a ottenere risposte dal conduttore.',
      activity:
        'Dopo verifica documentale, viene avviata la procedura con atti completi e calcolo aggiornato degli insoluti. La gestione resta centralizzata con un referente unico.',
      outcome:
        'La pratica arriva alla convalida e prosegue fino al rilascio. In parallelo viene impostata la tutela economica per il recupero delle somme dovute.'
    },
    pricing: {
      fee: '1.300 € tutto incluso fino alla convalida dello sfratto.',
      payment: 'Nessun anticipo: pagamento al momento della convalida.',
      timing: 'In molti casi puntiamo ad arrivare all’udienza per la convalida in circa 60 giorni.',
      note: 'I tempi possono variare in base al Tribunale competente e alla situazione concreta della pratica.'
    },
    faqs: [
      {
        q: 'Lo sfratto per morosità si usa anche per ogni altro inadempimento contrattuale?',
        a: 'No. È lo strumento tipico per la morosità economica. Nelle locazioni abitative, in generale, il riferimento è l’art. 5 L. 392/1978 (ritardo sul canone oltre 20 giorni e/o oneri accessori per importi rilevanti). Per inadempimenti diversi si valuta un percorso legale differente.'
      },
      {
        q: 'Si può affiancare il recupero dei canoni non pagati?',
        a: 'Sì. In molti casi è opportuno coordinare sfratto e recupero crediti per proteggere sia il possesso dell’immobile sia il profilo economico.'
      },
      {
        q: 'Quanto incide la qualità della documentazione?',
        a: 'Incide molto: una pratica completa e coerente aiuta a ridurre contestazioni e ritardi nelle fasi processuali.'
      }
    ]
  },
  {
    slug: 'sfratto-per-finita-locazione',
    shortTitle: 'Sfratto per finita locazione',
    title: 'Sfratto per finita locazione: rilascio immobile a fine contratto | Sfratto Sicuro',
    metaDescription:
      'Supporto legale per sfratto per finita locazione quando il contratto è scaduto e l’immobile non viene rilasciato. Assistenza su tutto il territorio nazionale.',
    h1: 'Sfratto per finita locazione',
    intro:
      'Quando il contratto è scaduto e l’immobile non viene riconsegnato, il proprietario ha bisogno di una procedura solida e ben governata. Il servizio per finita locazione consente di impostare il rilascio con rigore formale e con una strategia operativa coerente.',
    overview: [
      'La finita locazione riguarda soprattutto la cessazione del rapporto e la mancata riconsegna dell’immobile. È una situazione diversa dalla morosità pura e va impostata con atti coerenti con questo presupposto.',
      'Una gestione precisa delle comunicazioni e della documentazione riduce i margini di contestazione e rende il percorso più lineare.',
      'Il proprietario viene seguito in ogni fase, dall’analisi iniziale fino alla conclusione operativa della pratica.'
    ],
    whenToUse: [
      'Contratto scaduto con immobile ancora occupato.',
      'Mancata riconsegna nonostante comunicazioni già inviate.',
      'Esigenza di programmare tempi certi di rientro in possesso.'
    ],
    procedureSteps: [
      {
        title: '1) Verifica della scadenza e delle comunicazioni',
        text: 'Si controllano contratto, eventuali rinnovi, disdette e corrispondenza intercorsa con il conduttore.'
      },
      {
        title: '2) Impostazione della procedura',
        text: 'Si prepara la linea processuale adatta al caso, con attenzione ai passaggi formali e alla correttezza documentale.'
      },
      {
        title: '3) Udienza e provvedimento',
        text: 'Si segue la fase giudiziale per arrivare al provvedimento di rilascio e pianificare i passaggi successivi.'
      },
      {
        title: '4) Supporto fino alla riconsegna',
        text: 'L’assistenza prosegue fino alla concreta restituzione dell’immobile.'
      }
    ],
    documents: [
      'Contratto e allegati.',
      'Comunicazioni di scadenza/disdetta.',
      'Eventuali riscontri del conduttore.',
      'Documentazione anagrafica e dati immobile.'
    ],
    includes: [
      'Analisi del quadro contrattuale.',
      'Gestione degli atti e delle fasi di udienza.',
      'Coordinamento operativo fino al rilascio.',
      'Aggiornamenti costanti al proprietario.'
    ],
    caseExample: {
      title: 'Caso pratico: contratto scaduto e immobile non rilasciato',
      scenario:
        'Alla scadenza del contratto il conduttore non riconsegna l’immobile, mentre il proprietario deve programmare una nuova locazione.',
      activity:
        'Dopo verifica della documentazione, viene impostata la procedura con focus sulla corretta gestione delle comunicazioni pregresse e degli atti processuali.',
      outcome:
        'Il proprietario ottiene il provvedimento e la pratica viene seguita fino alla riconsegna effettiva.'
    },
    pricing: {
      fee: '1.300 € tutto incluso fino alla convalida dello sfratto.',
      payment: 'Nessun anticipo: pagamento al momento della convalida.',
      timing: 'In molti casi puntiamo ad arrivare all’udienza per la convalida in circa 60 giorni.',
      note: 'I tempi possono variare in base al Tribunale competente e alla situazione concreta della pratica.'
    },
    faqs: [
      {
        q: 'Se il contratto è scaduto il rilascio è automatico?',
        a: 'Non sempre. Se l’immobile non viene riconsegnato spontaneamente, può essere necessario attivare la procedura legale.'
      },
      {
        q: 'Questa procedura è uguale allo sfratto per morosità?',
        a: 'No, il presupposto è diverso: qui il punto centrale è la fine del rapporto locativo e la mancata riconsegna.'
      },
      {
        q: 'Posso essere seguito anche se non vivo nella città dell’immobile?',
        a: 'Sì, il servizio è organizzato per operare su tutto il territorio nazionale.'
      }
    ]
  },
  {
    slug: 'recupero-canoni-non-pagati',
    shortTitle: 'Recupero canoni non pagati',
    title: 'Recupero canoni non pagati: assistenza legale locazioni | Sfratto Sicuro',
    metaDescription:
      'Assistenza legale per recupero canoni non pagati e oneri accessori in materia di locazione. Valutazione strategica anche con procedura di sfratto.',
    h1: 'Recupero canoni non pagati',
    intro:
      'Quando gli insoluti si accumulano, il punto non è solo quantificare il danno: è recuperare valore in modo efficace. Il servizio di recupero canoni non pagati è pensato per proteggere il credito del proprietario con una strategia legale concreta e misurabile.',
    overview: [
      'L’obiettivo non è solo quantificare l’arretrato, ma scegliere la via più efficace per recuperarlo in tempi sostenibili.',
      'Ogni pratica viene costruita su documenti verificabili: contratto, scadenze, pagamenti ricevuti e importi residui.',
      'Quando utile, il recupero crediti viene integrato con la procedura di rilascio dell’immobile per una gestione unitaria.'
    ],
    whenToUse: [
      'Canoni arretrati accumulati nel tempo.',
      'Oneri accessori non pagati con impatto economico crescente.',
      'Necessità di bloccare ulteriori perdite e impostare un piano legale concreto.'
    ],
    procedureSteps: [
      {
        title: '1) Ricostruzione del credito',
        text: 'Si definisce in modo puntuale quanto è dovuto, distinguendo canoni, oneri e periodi di riferimento.'
      },
      {
        title: '2) Scelta del percorso',
        text: 'Si valuta la soluzione più efficace tra recupero autonomo del credito e percorso coordinato con la procedura di sfratto.'
      },
      {
        title: '3) Azione legale',
        text: 'Si avviano gli atti necessari mantenendo coerenza tra documentazione e domande economiche formulate.'
      },
      {
        title: '4) Monitoraggio e chiusura',
        text: 'La pratica viene monitorata fino alla definizione dell’esito e agli eventuali passaggi successivi.'
      }
    ],
    documents: [
      'Contratto di locazione e registrazione.',
      'Storico pagamenti e insoluti.',
      'Prospetto oneri accessori.',
      'Eventuali comunicazioni inviate al conduttore.'
    ],
    includes: [
      'Analisi economico-documentale del credito.',
      'Impostazione della strategia di recupero.',
      'Gestione atti e fasi operative.',
      'Coordinamento con eventuale sfratto.'
    ],
    caseExample: {
      title: 'Caso pratico: arretrati distribuiti su più mensilità',
      scenario:
        'Il proprietario registra pagamenti parziali e salti di mensilità, con difficoltà a ricostruire il credito reale.',
      activity:
        'Viene preparato un prospetto analitico delle somme dovute e avviata una strategia legale coerente con i documenti disponibili.',
      outcome:
        'Il credito viene trattato in modo strutturato, con percorso coordinato rispetto alla situazione dell’immobile.'
    },
    pricing: {
      fee: '10% delle somme da recuperare.',
      payment: 'Compenso orientato al risultato: paghi in funzione di quanto viene realmente recuperato.',
      timing: 'Avvio operativo rapido dopo verifica documentale e quantificazione del credito.',
      note: 'Il compenso si applica alle somme effettivamente incassate. Eventuali spese vive e oneri di procedura sono indicati con trasparenza in preventivo.'
    },
    faqs: [
      {
        q: 'Il recupero canoni può partire anche senza sfratto?',
        a: 'Sì. In base al caso si può agire sul credito in autonomia oppure integrare il recupero con la procedura di rilascio.'
      },
      {
        q: 'Come si evitano errori nel calcolo degli arretrati?',
        a: 'Con una ricostruzione puntuale mese per mese e con documenti di supporto chiari e aggiornati.'
      },
      {
        q: 'È utile intervenire presto?',
        a: 'Sì, perché riduce il rischio di accumulo e consente di pianificare prima una strategia efficace.'
      }
    ]
  },
  {
    slug: 'controversie-locazione',
    shortTitle: 'Controversie locazione',
    title: 'Controversie locazione: assistenza legale locatore-conduttore | Sfratto Sicuro',
    metaDescription:
      'Assistenza legale nelle controversie in materia di locazione tra locatore e conduttore. Analisi del caso e strategia operativa per la tutela del proprietario.',
    h1: 'Controversie in materia di locazione',
    intro:
      'Le controversie locative richiedono lucidità decisionale e impostazione tecnica: agire senza una linea chiara aumenta tempi e costi. Questo servizio aiuta il proprietario a governare il contenzioso con una strategia ordinata, sostenibile e orientata all’esito.',
    overview: [
      'Ogni contenzioso ha un equilibrio diverso tra urgenza, prova documentale e obiettivo pratico del proprietario.',
      'Prima di agire, conviene definire in modo realistico il risultato atteso e i tempi possibili.',
      'La gestione può includere sia una fase stragiudiziale sia, quando necessario, l’avvio del giudizio.'
    ],
    whenToUse: [
      'Contestazioni contrattuali rilevanti tra locatore e conduttore.',
      'Conflitti ricorrenti che bloccano la gestione regolare della locazione.',
      'Necessità di proteggere posizione economica e disponibilità dell’immobile.'
    ],
    procedureSteps: [
      {
        title: '1) Inquadramento del conflitto',
        text: 'Si analizzano fatti, documenti e comunicazioni per distinguere i punti realmente decisivi dai temi secondari.'
      },
      {
        title: '2) Strategia operativa',
        text: 'Si definisce un piano con priorità, rischi e passaggi consigliati, valutando anche possibili soluzioni stragiudiziali.'
      },
      {
        title: '3) Attivazione della tutela',
        text: 'Si procede con gli atti necessari, mantenendo coerenza tra obiettivo concreto e strumenti giuridici utilizzati.'
      },
      {
        title: '4) Gestione continuativa',
        text: 'Il proprietario riceve aggiornamenti costanti fino alla definizione della controversia.'
      }
    ],
    documents: [
      'Contratto e allegati.',
      'Comunicazioni formali tra le parti.',
      'Documenti economici (canoni, oneri, eventuali danni).',
      'Elementi utili a ricostruire i fatti in ordine cronologico.'
    ],
    includes: [
      'Analisi strategica del contenzioso.',
      'Definizione percorso stragiudiziale/giudiziale.',
      'Gestione atti e adempimenti.',
      'Supporto fino alla chiusura della pratica.'
    ],
    caseExample: {
      title: 'Caso pratico: contestazioni multiple su una locazione in corso',
      scenario:
        'Il proprietario affronta contemporaneamente contestazioni economiche e operative con il conduttore, senza una linea unitaria.',
      activity:
        'Viene costruito un piano di azione per priorità, separando i temi urgenti da quelli accessori e coordinando gli atti conseguenti.',
      outcome:
        'La controversia viene riportata su un percorso gestibile, con obiettivi chiari e riduzione delle aree di incertezza.'
    },
    pricing: {
      fee: 'Da 990 € per fase stragiudiziale; da 1.490 € per giudiziale di primo grado (base).',
      payment: 'Percorso a step con preventivo scritto: investi in modo progressivo, in base alle attività realmente necessarie.',
      timing: 'Piano operativo iniziale entro tempi rapidi dopo presa in carico documentale.',
      note: 'Il preventivo finale viene calibrato su urgenza, valore della controversia e complessità, con impostazione orientata a contenere la perdita del proprietario.'
    },
    faqs: [
      {
        q: 'Conviene sempre iniziare con una causa?',
        a: 'Non sempre. Dipende da obiettivo, urgenza e documenti disponibili. In alcuni casi una fase stragiudiziale ben impostata è preferibile.'
      },
      {
        q: 'Come si evita di confondere i diversi problemi della locazione?',
        a: 'Con una mappa del caso: fatti, prove, priorità e azioni dedicate a ciascun tema.'
      },
      {
        q: 'Il servizio è utile anche per proprietari con più immobili?',
        a: 'Sì, soprattutto quando serve una gestione ordinata e ripetibile su pratiche diverse.'
      }
    ]
  },
  {
    slug: 'contratti-di-locazione',
    shortTitle: 'Contratti di locazione',
    title: 'Predisposizione contratti di locazione per proprietari | Sfratto Sicuro',
    metaDescription:
      'Predisposizione contratti di locazione chiari e strutturati per prevenire contenziosi e tutelare il proprietario nella gestione dell’immobile locato.',
    h1: 'Predisposizione contratti di locazione',
    intro:
      'Un contratto ben costruito è la prima forma di tutela del proprietario: previene conflitti, riduce ambiguità e migliora la gestione della locazione. Il servizio è progettato per tradurre esigenze operative in clausole chiare, efficaci e difendibili nel tempo.',
    overview: [
      'Molte criticità nascono da testi generici o non coerenti con la situazione reale dell’immobile e del rapporto locativo.',
      'La redazione contrattuale deve essere comprensibile, completa e allineata agli obiettivi del locatore.',
      'Una buona impostazione iniziale riduce il rischio di contenzioso e migliora la tenuta del rapporto nel tempo.'
    ],
    whenToUse: [
      'Nuova locazione con esigenza di clausole chiare.',
      'Revisione di bozza già predisposta.',
      'Necessità di aggiornare contratti usati in passato.'
    ],
    procedureSteps: [
      {
        title: '1) Analisi della situazione locativa',
        text: 'Si definiscono obiettivi del proprietario, caratteristiche dell’immobile e profili da proteggere contrattualmente.'
      },
      {
        title: '2) Redazione o revisione del testo',
        text: 'Si struttura il contratto con clausole coerenti e linguaggio chiaro, riducendo ambiguità interpretative.'
      },
      {
        title: '3) Verifica finale',
        text: 'Si controlla la coerenza complessiva del testo e l’adeguatezza rispetto alla gestione pratica della locazione.'
      }
    ],
    documents: [
      'Dati immobile e proprietario.',
      'Eventuale bozza contrattuale già esistente.',
      'Indicazioni operative desiderate dal locatore.',
      'Elementi utili alla personalizzazione delle clausole.'
    ],
    includes: [
      'Analisi preventiva dei rischi contrattuali.',
      'Redazione/revisione testo in ottica proprietario.',
      'Chiarezza su clausole sensibili.',
      'Supporto nella fase di finalizzazione.'
    ],
    caseExample: {
      title: 'Caso pratico: revisione contratto prima della firma',
      scenario:
        'Un proprietario intende firmare un contratto standard ma teme clausole poco chiare su pagamenti e gestione dell’immobile.',
      activity:
        'Il testo viene revisionato e riorganizzato con impostazione più chiara, mantenendo coerenza con le esigenze concrete della locazione.',
      outcome:
        'Il contratto finale risulta più leggibile e più solido in ottica preventiva.'
    },
    pricing: {
      fee: 'Revisione contratto da 149 €; redazione completa da 290 €; versione premium da 590 €.',
      payment: 'Prezzo chiaro prima dell’incarico, definito in base al livello di personalizzazione richiesto.',
      timing: 'Prima bozza operativa in tempi rapidi dopo raccolta delle informazioni essenziali.',
      note: 'Un contratto impostato bene riduce il rischio di contenziosi futuri: il costo preventivo è spesso inferiore al costo di una gestione correttiva successiva.'
    },
    faqs: [
      {
        q: 'Perché conviene investire nella qualità del contratto?',
        a: 'Perché un testo chiaro riduce conflitti, migliora la gestione e tutela meglio il proprietario nel tempo.'
      },
      {
        q: 'Posso far rivedere un contratto già pronto?',
        a: 'Sì, la revisione è utile proprio per correggere punti deboli prima della firma.'
      },
      {
        q: 'Il servizio è solo per nuove locazioni?',
        a: 'No, è utile anche per aggiornare schemi contrattuali usati da anni.'
      }
    ]
  },
  {
    slug: 'tutela-proprietario',
    shortTitle: 'Tutela del proprietario',
    title: 'Tutela del proprietario immobile locato | Sfratto Sicuro',
    metaDescription:
      'Tutela del proprietario nella gestione del rapporto locativo: assistenza continuativa, prevenzione criticità e supporto legale nelle fasi operative.',
    h1: 'Tutela del proprietario',
    intro:
      'La tutela continuativa del proprietario è un presidio strategico, non un intervento d’emergenza. L’obiettivo è prevenire criticità, ridurre l’esposizione economica e supportare decisioni corrette in ogni fase del rapporto locativo.',
    overview: [
      'Molti proprietari hanno bisogno di un riferimento stabile, non di interventi isolati solo in emergenza.',
      'Con un supporto continuativo si possono intercettare prima i segnali di rischio e scegliere per tempo la strategia più efficace.',
      'Quando necessario, il percorso si integra con servizi specifici come sfratto, recupero canoni o gestione controversie.'
    ],
    whenToUse: [
      'Gestione di locazioni con criticità ricorrenti.',
      'Esigenza di prevenire contenziosi.',
      'Necessità di avere un piano chiaro per decisioni operative e legali.'
    ],
    procedureSteps: [
      {
        title: '1) Check iniziale della posizione',
        text: 'Si analizza il rapporto locativo e si individuano le aree con maggiore rischio operativo o economico.'
      },
      {
        title: '2) Piano di tutela',
        text: 'Si definiscono priorità, azioni preventive e criteri di intervento in caso di criticità.'
      },
      {
        title: '3) Assistenza continuativa',
        text: 'Il proprietario viene supportato nelle scelte principali con aggiornamenti e indicazioni operative.'
      },
      {
        title: '4) Integrazione con servizi specialistici',
        text: 'Se emerge un problema specifico, la gestione passa rapidamente al servizio più adatto senza perdere continuità.'
      }
    ],
    documents: [
      'Contratto e dati essenziali della locazione.',
      'Storico dei pagamenti e delle comunicazioni.',
      'Eventuali precedenti contestazioni.',
      'Elementi utili alla valutazione preventiva del rischio.'
    ],
    includes: [
      'Analisi periodica della posizione del proprietario.',
      'Supporto nelle scelte operative più rilevanti.',
      'Prevenzione delle criticità ricorrenti.',
      'Passaggio rapido a procedure specialistiche quando necessario.'
    ],
    caseExample: {
      title: 'Caso pratico: gestione preventiva di locazione complessa',
      scenario:
        'Il proprietario segnala segnali deboli di criticità (ritardi, comunicazioni poco chiare, incertezza su prossime scadenze).',
      activity:
        'Viene impostato un piano di monitoraggio e prevenzione, con regole operative chiare per evitare escalation.',
      outcome:
        'La gestione resta sotto controllo e, in caso di peggioramento, è già pronto il percorso legale più adatto.'
    },
    pricing: {
      fee: 'Abbonamento mensile: Base 79 €, Plus 129 €, Pro 199 €.',
      payment: 'Formula continuativa con livello di supporto modulabile, così il proprietario investe in prevenzione prima che il danno economico aumenti.',
      timing: 'Attivazione del piano dopo onboarding documentale e definizione priorità operative.',
      note: 'I piani differiscono per intensità di supporto, priorità e profondità della gestione continuativa; il livello viene scelto in base a rischio e numero di pratiche da presidiare.'
    },
    faqs: [
      {
        q: 'La tutela del proprietario serve solo se c’è già morosità?',
        a: 'No, è utile anche in prevenzione, prima che il problema diventi una vera emergenza.'
      },
      {
        q: 'Posso attivare poi un servizio specifico?',
        a: 'Sì. Quando necessario, il percorso viene collegato a sfratto, recupero canoni o gestione controversie.'
      },
      {
        q: 'È un servizio adatto anche a chi gestisce più immobili?',
        a: 'Sì, perché aiuta a standardizzare decisioni e tempi di intervento.'
      }
    ]
  }
];

export const servicePagesBySlug = new Map(servicePages.map((item) => [item.slug, item]));
