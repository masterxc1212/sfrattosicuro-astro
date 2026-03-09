export interface ServicePage {
  slug: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  whenToUse: string[];
  includes: string[];
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
      'Assistiamo i proprietari nelle procedure di sfratto per morosità quando l’inquilino non paga il canone o gli oneri accessori previsti dal contratto di locazione.',
    primaryKeyword: 'sfratto per morosità',
    secondaryKeywords: ['intimazione sfratto morosità', 'tempi sfratto morosità', 'costo sfratto morosità'],
    whenToUse: [
      'Canoni di locazione non pagati da più mensilità.',
      'Inadempimento degli oneri accessori previsti dal contratto.',
      'Necessità di avviare rapidamente la procedura per il rilascio dell’immobile.'
    ],
    includes: [
      'Analisi preliminare della documentazione locativa.',
      'Predisposizione e deposito degli atti necessari alla procedura.',
      'Assistenza nelle fasi giudiziali fino al rilascio dell’immobile.',
      'Valutazione del recupero canoni in parallelo alla procedura di sfratto.'
    ],
    faqs: [
      {
        q: 'Quando è possibile avviare uno sfratto per morosità?',
        a: 'In generale quando il conduttore non paga il canone o gli oneri accessori dovuti. La valutazione concreta dipende dai documenti contrattuali e dalla situazione del singolo caso.'
      },
      {
        q: 'Si può chiedere anche il recupero dei canoni non pagati?',
        a: 'Sì, il recupero dei canoni può essere valutato insieme alla procedura di sfratto, così da impostare una strategia legale coordinata.'
      },
      {
        q: 'Seguite il proprietario fino alla liberazione dell’immobile?',
        a: 'Sì, l’assistenza copre tutte le fasi operative della procedura fino alla chiusura della pratica.'
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
      'Supportiamo i proprietari nelle procedure di rilascio dell’immobile quando il contratto di locazione è scaduto e il conduttore non restituisce l’immobile.',
    primaryKeyword: 'sfratto per finita locazione',
    secondaryKeywords: ['rilascio immobile fine contratto', 'contratto scaduto immobile non rilasciato'],
    whenToUse: [
      'Contratto di locazione giunto a scadenza.',
      'Mancata restituzione dell’immobile da parte del conduttore.',
      'Necessità di formalizzare il rilascio in modo corretto e tracciabile.'
    ],
    includes: [
      'Verifica del contratto e delle comunicazioni effettuate.',
      'Impostazione della procedura di rilascio più adatta al caso.',
      'Gestione delle attività processuali fino alla riconsegna dell’immobile.'
    ],
    faqs: [
      {
        q: 'Se il contratto è scaduto il rilascio è automatico?',
        a: 'Non sempre. Se l’immobile non viene rilasciato spontaneamente può essere necessario avviare la procedura legale di rilascio.'
      },
      {
        q: 'Serve documentazione specifica?',
        a: 'Sì, contratto, eventuali comunicazioni e situazione aggiornata dell’immobile sono elementi utili per impostare correttamente il procedimento.'
      },
      {
        q: 'Operate anche fuori dalla città del proprietario?',
        a: 'Sì, il servizio è organizzato con operatività su tutto il territorio nazionale.'
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
      'Assistiamo i proprietari nel recupero dei canoni di locazione non pagati e degli oneri accessori dovuti dall’inquilino.',
    primaryKeyword: 'recupero canoni non pagati',
    secondaryKeywords: ['recupero crediti affitto', 'canoni arretrati locazione', 'decreto ingiuntivo canoni locazione'],
    whenToUse: [
      'Presenza di mensilità arretrate o insoluti ricorrenti.',
      'Oneri accessori non saldati dal conduttore.',
      'Necessità di integrare il recupero crediti con altre azioni legali in materia di locazione.'
    ],
    includes: [
      'Analisi dei crediti esigibili in base alla documentazione disponibile.',
      'Definizione del percorso legale di recupero più efficace.',
      'Coordinamento con eventuale procedura di sfratto quando necessario.'
    ],
    faqs: [
      {
        q: 'Il recupero canoni può essere fatto senza sfratto?',
        a: 'Sì, a seconda del caso il recupero crediti può essere impostato in autonomia oppure insieme alla procedura di sfratto.'
      },
      {
        q: 'Quali importi si possono recuperare?',
        a: 'In generale canoni arretrati e oneri accessori documentati. La quantificazione precisa dipende dal contratto e dalla situazione concreta.'
      },
      {
        q: 'È utile agire subito sui primi insoluti?',
        a: 'Sì, una valutazione tempestiva aiuta a preservare la posizione del proprietario e ad evitare l’aggravarsi dell’esposizione.'
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
      'Assistiamo i proprietari nelle controversie derivanti dal contratto di locazione e nelle contestazioni tra locatore e conduttore.',
    primaryKeyword: 'controversie locazione',
    secondaryKeywords: ['contenzioso locatore conduttore', 'lite contratto locazione', 'assistenza legale locazioni'],
    whenToUse: [
      'Contestazioni su obblighi contrattuali e uso dell’immobile.',
      'Conflitti sulla gestione del rapporto locativo.',
      'Necessità di impostare una difesa chiara con documentazione completa.'
    ],
    includes: [
      'Inquadramento legale della controversia e dei rischi connessi.',
      'Definizione della strategia di tutela più sostenibile.',
      'Assistenza nelle fasi stragiudiziali e giudiziali.'
    ],
    faqs: [
      {
        q: 'Quali sono le controversie più frequenti in locazione?',
        a: 'Le più comuni riguardano inadempimenti contrattuali, mancati pagamenti, rilascio dell’immobile e contestazioni sugli oneri accessori.'
      },
      {
        q: 'Conviene tentare prima una soluzione stragiudiziale?',
        a: 'In molti casi sì, perché può ridurre tempi e costi. La scelta dipende comunque dalla posizione concreta delle parti.'
      },
      {
        q: 'Posso ricevere un piano operativo prima di agire?',
        a: 'Sì, dopo l’analisi preliminare viene definito un percorso con priorità e step consigliati.'
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
      'Redigiamo contratti di locazione chiari e strutturati per prevenire contenziosi e tutelare il proprietario nella gestione del rapporto con l’inquilino.',
    primaryKeyword: 'contratto di locazione',
    secondaryKeywords: ['contratto di affitto', 'redazione contratto locazione', 'tutela locatore contratto'],
    whenToUse: [
      'Nuova locazione con necessità di clausole chiare e coerenti.',
      'Revisione di bozza contrattuale già predisposta.',
      'Esigenza di ridurre il rischio di future controversie.'
    ],
    includes: [
      'Analisi del contesto locativo e delle esigenze del proprietario.',
      'Predisposizione del testo contrattuale con impostazione chiara.',
      'Revisione di clausole sensibili per una migliore tutela del locatore.'
    ],
    faqs: [
      {
        q: 'Perché è importante un contratto di locazione ben strutturato?',
        a: 'Un contratto chiaro riduce le ambiguità, migliora la gestione del rapporto e limita il rischio di contenziosi futuri.'
      },
      {
        q: 'Posso far revisionare un contratto già pronto?',
        a: 'Sì, è possibile analizzare un testo esistente e proporre miglioramenti prima della sottoscrizione.'
      },
      {
        q: 'Il servizio è rivolto solo a proprietari privati?',
        a: 'Il servizio è impostato per la tutela del proprietario e può essere adattato alle diverse esigenze locative.'
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
      'Forniamo assistenza continuativa nella gestione del rapporto con l’inquilino e nelle problematiche che possono insorgere durante la locazione.',
    primaryKeyword: 'tutela proprietario immobile',
    secondaryKeywords: ['diritti proprietario casa affittata', 'tutela locatore', 'assistenza proprietario locazione'],
    whenToUse: [
      'Necessità di prevenire criticità nel rapporto con il conduttore.',
      'Dubbi operativi su adempimenti e scelte da adottare.',
      'Gestione coordinata di più problematiche legate alla stessa locazione.'
    ],
    includes: [
      'Analisi periodica della posizione locativa del proprietario.',
      'Supporto sulle principali decisioni operative durante la locazione.',
      'Integrazione con servizi specifici (sfratto, recupero canoni, controversie) quando necessario.'
    ],
    faqs: [
      {
        q: 'Cosa significa tutela del proprietario in concreto?',
        a: 'Significa avere un supporto legale organizzato per prevenire e gestire criticità contrattuali, economiche e operative durante la locazione.'
      },
      {
        q: 'Il servizio è utile anche senza morosità in corso?',
        a: 'Sì, è utile anche in fase preventiva, per impostare correttamente il rapporto locativo e ridurre i rischi futuri.'
      },
      {
        q: 'Posso attivare la tutela e poi passare a un servizio specifico?',
        a: 'Sì, se emergono esigenze puntuali il percorso può evolvere verso il servizio più adatto al caso.'
      }
    ]
  }
];

export const servicePagesBySlug = new Map(servicePages.map((item) => [item.slug, item]));
