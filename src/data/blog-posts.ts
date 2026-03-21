export type BlogCategory = 'Sfratti' | 'Locazioni';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  lead: string;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  readingTime: string;
  sourceNote: string;
  html: string;
}

const posts: BlogPost[] = [
  {
    slug: 'risoluzione-contratto-locazione',
    title: 'Risoluzione del contratto di locazione: guida per il proprietario',
    description:
      'Come risolvere il contratto di locazione per inadempimento o accordo: passi corretti, rischi da evitare e quando rivolgersi a un avvocato.',
    excerpt:
      'Una guida pratica per il proprietario su come sciogliere anticipatamente un contratto di locazione: risoluzione consensuale, per inadempimento, clausola risolutiva espressa e adempimenti post-risoluzione.',
    lead:
      'Sciogliere anticipatamente un contratto di locazione richiede metodo: capire di che tipo di risoluzione si tratta, seguire la procedura giusta e formalizzare tutto per iscritto. Ecco come farlo senza esporsi a contestazioni.',
    publishedAt: '2026-03-21',
    category: 'Locazioni',
    readingTime: '9 min',
    sourceNote:
      'Articolo pubblicato dal workflow statico Astro dopo approvazione umana del draft locale `draft_risoluzione-contratto-locazione.md` del 2026-03-21.',
    html: `
      <p>Molti proprietari confondono la <strong>risoluzione del contratto di locazione</strong> con la disdetta o con la procedura di sfratto. Sono strumenti diversi, con presupposti e conseguenze diverse. Capire quale applicare — e come — è il primo passo per gestire la fine anticipata di un rapporto locativo senza commettere errori che poi costano.</p>

      <p>Questo articolo è pensato per il proprietario che si trova in una delle situazioni più frequenti: l'inquilino non rispetta il contratto, o entrambe le parti vogliono chiudere in anticipo, oppure qualcosa è cambiato e il contratto non può più proseguire nelle condizioni originali.</p>

      <h2>Risoluzione, sfratto, disdetta: non sono la stessa cosa</h2>
      <p>Prima di tutto, è utile fare chiarezza sui termini.</p>
      <ul>
        <li><strong>La disdetta</strong> è il recesso comunicato con il preavviso contrattuale a scadenza naturale del contratto. È il percorso ordinario per non rinnovare.</li>
        <li><strong>Lo sfratto</strong> è una procedura giudiziaria che il proprietario avvia davanti al tribunale quando l'inquilino non vuole lasciare l'immobile — per morosità o per finita locazione. Per approfondire le due procedure principali, leggi la guida sullo <a href="/blog/guida-pratica-sfratto-per-morosita-nel-2026/">sfratto per morosità</a> e quella sullo <a href="/blog/sfratto-per-finita-locazione/">sfratto per finita locazione</a>.</li>
        <li><strong>La risoluzione</strong> è invece lo scioglimento anticipato del contratto, prima della scadenza, per una causa specifica. Può avvenire per accordo tra le parti, per inadempimento grave dell'inquilino, o per clausola contrattuale.</li>
      </ul>

      <h2>Le cause principali di risoluzione</h2>

      <h3>1. Risoluzione consensuale (accordo tra le parti)</h3>
      <p>La forma più semplice e meno conflittuale. Proprietario e inquilino si accordano per chiudere il contratto prima della scadenza. Non serve andare in tribunale, ma servono alcune cose:</p>
      <ul>
        <li><strong>Un accordo scritto</strong>, firmato da entrambe le parti, che indichi la data di cessazione e le condizioni (riconsegna chiavi, eventuali somme dovute, stato dell'immobile).</li>
        <li><strong>La comunicazione all'Agenzia delle Entrate</strong>, entro 30 giorni dalla data di cessazione, tramite il modello RLI. Per chi vuole un promemoria sul funzionamento del portale, è utile rileggere la guida sulla <a href="/blog/registrazione-contratto-locazione-online/">registrazione del contratto di locazione online</a>.</li>
        <li><strong>La restituzione del deposito cauzionale</strong>, se non ci sono danni o insoluti da compensare. Le regole su quando e come il proprietario può trattenere la cauzione sono spiegate nell'articolo sul <a href="/blog/deposito-cauzionale-affitto/">deposito cauzionale affitto</a>.</li>
      </ul>
      <p><strong>Attenzione:</strong> anche se l'accordo è verbale e l'inquilino consegna le chiavi, il contratto registrato resta formalmente attivo fino alla comunicazione all'Agenzia delle Entrate. Non trascurare questo passaggio.</p>

      <h3>2. Risoluzione per inadempimento grave</h3>
      <p>Quando l'inquilino non rispetta gli obblighi contrattuali in modo serio e continuativo, il proprietario può agire per ottenere la risoluzione per via giudiziale, ai sensi dell'articolo 1453 del Codice Civile.</p>
      <p>Le cause più frequenti sono:</p>
      <ul>
        <li>mancato pagamento del canone (anche se in questo caso si avvia più spesso la procedura di sfratto per morosità, che è più rapida);</li>
        <li>sublocazione non autorizzata;</li>
        <li>uso dell'immobile difforme dalla destinazione contrattuale;</li>
        <li>danni gravi o modifiche strutturali non autorizzate;</li>
        <li>comportamenti che turbano la quiete condominiale in modo reiterato.</li>
      </ul>
      <p>In questo caso, il proprietario non può semplicemente dichiarare risolto il contratto da solo: deve rivolgersi al tribunale con un'azione di risoluzione. Il giudice accerta l'inadempimento e pronuncia la risoluzione, con obbligo di rilascio per l'inquilino.</p>
      <p><strong>Cosa fare prima di andare in giudizio:</strong><br>In molti casi conviene diffidare formalmente l'inquilino a cessare il comportamento inadempiente, con una lettera raccomandata. La diffida non è obbligatoria per legge, ma rafforza la posizione del proprietario e a volte risolve la situazione senza necessità di ricorrere al tribunale.</p>

      <h3>3. Clausola risolutiva espressa</h3>
      <p>Se il contratto contiene una <strong>clausola risolutiva espressa</strong> (art. 1456 c.c.), il proprietario può dichiarare risolto il contratto con una semplice comunicazione scritta, senza passare dal giudice, quando si verifica l'evento previsto dalla clausola.</p>
      <p>Esempio tipico: "In caso di mancato pagamento di due mensilità, il contratto si intende risolto di diritto."</p>
      <p>Perché funzioni, la clausola deve: essere presente nel contratto scritto e registrato; essere sufficientemente specifica (non generica); essere azionata con una dichiarazione scritta dell'avente diritto.</p>
      <p>Anche dopo la dichiarazione di risoluzione, se l'inquilino non lascia l'immobile, il proprietario dovrà comunque avviare una procedura giudiziaria per ottenere il rilascio effettivo — ma la risoluzione già perfezionata rafforza la sua posizione.</p>

      <h2>Cosa fare dopo la risoluzione</h2>
      <p>Qualunque sia la causa, una volta che il contratto è risolto ci sono alcuni adempimenti da non saltare:</p>
      <ol>
        <li><strong>Redigere un verbale di riconsegna</strong> con l'inquilino: data, stato dell'immobile, lettura contatori, restituzione delle chiavi. Firmato da entrambi, è il documento che chiude il rapporto.</li>
        <li><strong>Comunicare la cessazione all'Agenzia delle Entrate</strong> (modello RLI), se il contratto era registrato.</li>
        <li><strong>Verificare la posizione del deposito cauzionale</strong>: restituirlo entro tempi ragionevoli se non ci sono trattenute legittime, oppure documentare per iscritto le ragioni di eventuali trattenute parziali o totali.</li>
        <li><strong>Aggiornare eventuali comunicazioni alle autorità competenti</strong>, se l'inquilino era straniero o se era necessaria la comunicazione di ospitalità/cessione di fabbricato.</li>
      </ol>

      <h2>Gli errori più comuni da evitare</h2>
      <p><strong>Cambiare la serratura senza accordo o provvedimento.</strong> È vietato. Anche se l'inquilino è inadempiente, il proprietario non può entrare in possesso dell'immobile con forza propria: si chiama autotutela vietata e può portare a denunce penali.</p>
      <p><strong>Considerare chiuso il contratto perché l'inquilino ha smesso di pagare.</strong> Il mancato pagamento è una causa di inadempimento, ma il contratto resta formalmente in essere finché non viene risolto con le procedure corrette.</p>
      <p><strong>Non comunicare la cessazione all'Agenzia delle Entrate.</strong> Anche se la cessazione è consensuale e pacifica, l'omessa comunicazione espone a sanzioni e può creare problemi in caso di contestazioni future.</p>
      <p><strong>Restituire il deposito cauzionale senza prima verificare lo stato dell'immobile.</strong> Una volta restituita la cauzione senza riserve, è molto più difficile far valere successivamente eventuali danni o insoluti.</p>

      <h2>Quando è necessario rivolgersi a un avvocato</h2>
      <p>La risoluzione consensuale ben documentata può essere gestita autonomamente, ma ci sono situazioni in cui affidarsi a un professionista è la scelta più prudente:</p>
      <ul>
        <li>l'inquilino non collabora o contesta la causa di risoluzione;</li>
        <li>ci sono somme importanti in gioco (danni, canoni arretrati, spese);</li>
        <li>il contratto contiene clausole non standard che richiedono interpretazione;</li>
        <li>si valuta di agire per risoluzione per inadempimento in tribunale.</li>
      </ul>
      <p>In questi casi, un avvocato specializzato in diritto delle locazioni può valutare la fattispecie concreta, impostare la strategia più efficace e gestire le comunicazioni formali in modo che non si creino cavilli a favore dell'inquilino.</p>

      <h2>Hai bisogno di assistenza per sciogliere un contratto di locazione?</h2>
      <p>Sfratto Sicuro assiste i proprietari nella gestione dei rapporti locativi, dalla risoluzione consensuale alle procedure giudiziarie per inadempimento. Se la tua situazione è complicata o non sai da dove cominciare, <a href="/">contattaci per una valutazione del caso</a>: un professionista può aiutarti a scegliere il percorso corretto e a tutelarti in ogni fase.</p>

      <h2>FAQ — Domande frequenti sulla risoluzione del contratto di locazione</h2>

      <p><strong>È obbligatorio andare in tribunale per risolvere un contratto di locazione?</strong><br>No. Se le parti sono d'accordo, la risoluzione consensuale si formalizza con un accordo scritto e la comunicazione all'Agenzia delle Entrate. Il tribunale serve solo quando c'è un inadempimento contestato o l'inquilino non vuole lasciare l'immobile.</p>

      <p><strong>In quanto tempo devo comunicare la cessazione anticipata all'Agenzia delle Entrate?</strong><br>Entro 30 giorni dalla data di effettiva cessazione del contratto, tramite il modello RLI (lo stesso usato per la registrazione).</p>

      <p><strong>Cosa succede se l'inquilino non lascia l'immobile dopo la risoluzione?</strong><br>La risoluzione del contratto non vale come titolo esecutivo per il rilascio. Se l'inquilino rimane nell'immobile, il proprietario deve avviare una procedura giudiziaria — in alcuni casi uno sfratto, in altri un'azione di rivendica o di rilascio — per ottenere il titolo che consente l'esecuzione forzata.</p>

      <p><strong>Posso trattenere il deposito cauzionale per i canoni non pagati?</strong><br>Sì, ma solo fino all'importo delle mensilità effettivamente non pagate e documentate. Trattenere l'intera cauzione in modo generico, senza documentazione, può essere contestato dall'inquilino. Consulta la guida sul <a href="/blog/deposito-cauzionale-affitto/">deposito cauzionale affitto</a> per i dettagli.</p>

      <p><strong>La clausola risolutiva espressa è sempre valida nei contratti di locazione?</strong><br>In linea generale sì, purché sia inserita nel contratto scritto e registrato e si riferisca a ipotesi specifiche e gravi. Alcune clausole troppo generiche possono essere contestate. Prima di azionarla, è prudente farla verificare da un professionista.</p>

      <p><strong>Posso chiedere un risarcimento danni all'inquilino dopo la risoluzione per inadempimento?</strong><br>Sì. La risoluzione per inadempimento non esclude la possibilità di agire per il risarcimento dei danni subiti (canoni non pagati, danni all'immobile, spese legali). Le due azioni possono essere svolte contestualmente o in sequenza.</p>

      <script type="application/ld+json">
      {"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Risoluzione del contratto di locazione: guida per il proprietario","description":"Come risolvere il contratto di locazione per inadempimento o accordo: passi corretti, rischi da evitare e quando rivolgersi a un avvocato.","url":"https://www.sfrattosicuro.it/blog/risoluzione-contratto-locazione/"},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"È obbligatorio andare in tribunale per risolvere un contratto di locazione?","acceptedAnswer":{"@type":"Answer","text":"No. Se le parti sono d'accordo, la risoluzione consensuale si formalizza con un accordo scritto e la comunicazione all'Agenzia delle Entrate."}},{"@type":"Question","name":"In quanto tempo devo comunicare la cessazione anticipata all'Agenzia delle Entrate?","acceptedAnswer":{"@type":"Answer","text":"Entro 30 giorni dalla data di effettiva cessazione del contratto, tramite il modello RLI."}},{"@type":"Question","name":"Cosa succede se l'inquilino non lascia l'immobile dopo la risoluzione?","acceptedAnswer":{"@type":"Answer","text":"Il proprietario deve avviare una procedura giudiziaria per ottenere il titolo che consente l'esecuzione forzata."}},{"@type":"Question","name":"Posso trattenere il deposito cauzionale per i canoni non pagati?","acceptedAnswer":{"@type":"Answer","text":"Sì, ma solo fino all'importo delle mensilità effettivamente non pagate e documentate."}},{"@type":"Question","name":"La clausola risolutiva espressa è sempre valida nei contratti di locazione?","acceptedAnswer":{"@type":"Answer","text":"In linea generale sì, purché sia inserita nel contratto scritto e registrato e si riferisca a ipotesi specifiche e gravi."}},{"@type":"Question","name":"Posso chiedere un risarcimento danni all'inquilino dopo la risoluzione per inadempimento?","acceptedAnswer":{"@type":"Answer","text":"Sì. La risoluzione per inadempimento non esclude la possibilità di agire per il risarcimento dei danni subiti."}}]}]}
      </script>
    `,
  },
  {
    slug: 'subentro-contratto-locazione',
    title: 'Subentro contratto locazione: cosa deve verificare il proprietario',
    description:
      'Controlli, documenti, consenso del proprietario, adempimenti e errori da evitare quando cambia il conduttore nel contratto di locazione.',
    excerpt:
      'Una guida pratica per il proprietario che deve valutare un subentro nel contratto di locazione, tra verifiche sul nuovo soggetto, pendenze economiche e formalizzazione corretta del passaggio.',
    lead:
      'Il subentro non è un semplice cambio di nome: per il proprietario significa verificare chi entra, come resta strutturato il contratto e quali passaggi vanno formalizzati bene per evitare problemi dopo.',
    publishedAt: '2026-03-20',
    category: 'Locazioni',
    readingTime: '8 min',
    sourceNote:
      'Articolo pubblicato dal workflow statico Astro dopo approvazione umana del draft locale `draft_subentro-contratto-locazione.md` del 2026-03-20.',
    html: `
      <p>Quando si parla di subentro nel contratto di locazione, molti proprietari pensano a un semplice cambio di nome. In realtà il passaggio va gestito con più attenzione: cambia il soggetto che entra nel rapporto, cambiano i profili di affidabilità da valutare e, spesso, cambiano anche i rischi se la formalizzazione viene fatta in modo approssimativo.</p>

      <p>Il punto pratico è questo: il subentro può essere una soluzione ordinata, ma solo se il proprietario verifica bene chi entra, che cosa resta del contratto originario e quali adempimenti servono per non ritrovarsi dopo con contestazioni, insoluti o documenti incoerenti. Se devi anche rimettere mano al testo contrattuale, può esserti utile la pagina sui <a href="/servizi/contratti-di-locazione/">contratti di locazione</a>.</p>

      <h2>Quando si parla davvero di subentro nel contratto di locazione</h2>
      <p>Nel linguaggio comune si usa spesso “subentro” per situazioni molto diverse tra loro. Per il proprietario, però, non basta un’etichetta generica: bisogna capire quale cambiamento sta avvenendo davvero.</p>
      <p>I casi più frequenti sono questi:</p>
      <ul>
        <li>un conduttore esce e ne entra un altro;</li>
        <li>un nuovo soggetto si aggiunge a un contratto già in corso;</li>
        <li>il cambio dipende da vicende personali o familiari che incidono sulla posizione del conduttore;</li>
        <li>il proprietario riceve una richiesta di continuare il rapporto con una persona diversa da quella inizialmente firmataria.</li>
      </ul>
      <p>La domanda corretta non è quindi solo “si può fare?”, ma “in quali condizioni conviene accettarlo e come va gestito per non creare un problema più grande di quello che si vuole risolvere?”.</p>

      <h2>I primi controlli da fare prima di dire sì</h2>
      <p>Accettare un subentro senza verifiche è uno degli errori più sottovalutati nella gestione della locazione. Il proprietario dovrebbe trattare il nuovo ingresso quasi come una mini-istruttoria: meno complessa di una nuova locazione completa, ma comunque seria.</p>

      <h3>Identità e affidabilità del nuovo soggetto</h3>
      <p>Il primo controllo riguarda chi entra nel contratto. Prima ancora degli adempimenti formali, conviene verificare:</p>
      <ul>
        <li>identità anagrafica corretta;</li>
        <li>capacità reddituale o solidità economica;</li>
        <li>stabilità lavorativa o fonte di reddito;</li>
        <li>eventuale presenza di garanti o supporti aggiuntivi se il profilo è debole.</li>
      </ul>
      <p>Molti problemi nascono perché il proprietario, per evitare attriti con l’inquilino uscente, salta proprio la parte più importante: capire se il nuovo soggetto è davvero sostenibile per il rapporto locativo.</p>

      <h3>Coerenza con il contratto in essere</h3>
      <p>Non tutti i contratti reggono allo stesso modo un cambio di soggetto. Prima di accettare, conviene rileggere con attenzione:</p>
      <ul>
        <li>tipo di contratto già in corso;</li>
        <li>durata residua;</li>
        <li>eventuali clausole che meritano aggiornamento;</li>
        <li>regime fiscale scelto;</li>
        <li>equilibrio originario del rapporto.</li>
      </ul>
      <p>Questo passaggio è importante anche per non creare incoerenze con il tipo di contratto già in uso. Se, per esempio, il rapporto è stato costruito con presupposti molto specifici, il semplice cambio del conduttore può richiedere una valutazione più attenta. Su questo è utile anche la guida al <a href="/blog/contratto-transitorio-affitto/">contratto transitorio affitto</a> se il rapporto ha una durata breve o motivazioni particolari.</p>

      <h3>Morosità, conguagli e pendenze da chiudere</h3>
      <p>Uno dei punti più delicati riguarda ciò che resta indietro. Prima di formalizzare il subentro, il proprietario dovrebbe chiarire:</p>
      <ul>
        <li>se ci sono canoni non pagati;</li>
        <li>se esistono oneri accessori da conguagliare;</li>
        <li>se il deposito cauzionale è un tema ancora aperto;</li>
        <li>da quale data il nuovo soggetto assume obblighi e responsabilità.</li>
      </ul>
      <p>Se questi aspetti restano confusi, il rischio è trovarsi dopo a discutere su chi debba rispondere degli insoluti o su quale parte del rapporto faccia capo al vecchio conduttore e quale al nuovo. Per questo, quando ci sono arretrati o pagamenti irregolari, conviene tenere distinti subentro e tutela del credito. In casi simili può essere utile anche il servizio sul <a href="/servizi/recupero-canoni-non-pagati/">recupero canoni non pagati</a>.</p>

      <h2>Quando il proprietario deve formalizzare bene il passaggio</h2>
      <p>Il subentro non va gestito con accordi vaghi o con semplici messaggi scambiati in fretta. Se il proprietario decide di accettarlo, il passaggio deve essere formalizzato in modo chiaro, perché è proprio la chiarezza documentale a ridurre le contestazioni future.</p>
      <p>In concreto conviene fissare per iscritto:</p>
      <ul>
        <li>chi esce dal rapporto e chi entra;</li>
        <li>da quale data decorre il nuovo assetto;</li>
        <li>quali obblighi restano invariati;</li>
        <li>quali importi risultano già saldati o ancora da definire;</li>
        <li>come viene trattato l’eventuale deposito cauzionale;</li>
        <li>quali allegati o documenti vengono aggiornati.</li>
      </ul>
      <p>Questa attenzione è utile anche per i successivi adempimenti pratici. Se dopo il subentro occorre coordinare registrazione, variazione o gestione telematica, la guida sulla <a href="/blog/registrazione-contratto-locazione-online/">registrazione del contratto di locazione online</a> resta il riferimento più utile per orientarsi senza confondere i passaggi.</p>

      <h2>Quali documenti conviene chiedere</h2>
      <p>Prima di confermare il subentro, il proprietario dovrebbe raccogliere almeno i documenti essenziali per valutare il nuovo conduttore e per tenere ordinato il fascicolo della locazione.</p>
      <p>Una checklist prudente può includere:</p>
      <ul>
        <li>documento di identità del nuovo soggetto;</li>
        <li>codice fiscale;</li>
        <li>documentazione reddituale o lavorativa coerente con il caso;</li>
        <li>eventuale accordo scritto sul passaggio tra vecchio e nuovo conduttore, se esiste;</li>
        <li>situazione aggiornata dei pagamenti del contratto in corso;</li>
        <li>eventuali chiarimenti sul deposito cauzionale;</li>
        <li>bozza dell’atto o scrittura con cui si formalizza il cambiamento.</li>
      </ul>
      <p>Non serve trasformare ogni pratica in un dossier infinito. Serve però raccogliere abbastanza elementi per capire che il passaggio non stia solo spostando il rischio da una persona all’altra, lasciando il proprietario scoperto.</p>

      <h2>Gli errori più comuni che complicano il subentro</h2>
      <p>I problemi più frequenti non nascono dal subentro in sé, ma dal modo frettoloso in cui viene gestito.</p>
      <p>Gli errori tipici sono questi:</p>
      <ul>
        <li>accettare il nuovo soggetto senza verificare reddito e affidabilità;</li>
        <li>non chiarire le pendenze economiche maturate prima del cambio;</li>
        <li>usare formule troppo generiche o copiate senza adattarle al caso concreto;</li>
        <li>non coordinare bene scrittura privata, contratto e adempimenti successivi;</li>
        <li>trattare il subentro come un dettaglio amministrativo quando in realtà cambia l’equilibrio del rapporto.</li>
      </ul>
      <p>Quando il caso è litigioso o poco lineare, la fretta costa quasi sempre più del controllo iniziale. Se il rapporto è già conflittuale, conviene valutare con prudenza anche la pagina dedicata alle <a href="/servizi/controversie-locazione/">controversie locazione</a>.</p>

      <h2>Checklist pratica per il proprietario</h2>
      <p>Prima di accettare un subentro nel contratto di locazione, questa è la sequenza più utile da seguire:</p>
      <ol>
        <li>capire esattamente quale cambiamento viene richiesto;</li>
        <li>verificare identità e affidabilità del nuovo soggetto;</li>
        <li>rileggere contratto, durata residua e assetto economico;</li>
        <li>fotografare con precisione eventuali insoluti o conguagli aperti;</li>
        <li>decidere come trattare deposito cauzionale e responsabilità pregresse;</li>
        <li>formalizzare il passaggio per iscritto in modo chiaro;</li>
        <li>coordinare gli adempimenti successivi senza lasciare zone grigie.</li>
      </ol>
      <p>È una checklist semplice, ma fa una differenza enorme: impedisce che un cambio apparentemente ordinario diventi, dopo qualche mese, una controversia su pagamenti, validità degli accordi o responsabilità reciproche.</p>

      <h2>Quando conviene fermarsi e fare una verifica legale</h2>
      <p>Non tutti i subentri meritano lo stesso livello di attenzione. Se il passaggio è lineare, documentato e senza pendenze, spesso basta una gestione ordinata. Ma ci sono casi in cui il proprietario farebbe bene a fermarsi un attimo prima di accettare:</p>
      <ul>
        <li>quando ci sono canoni arretrati o contestazioni aperte;</li>
        <li>quando il nuovo soggetto ha un profilo economico debole;</li>
        <li>quando il contratto originario è già poco chiaro;</li>
        <li>quando il rapporto nasce da eventi familiari o personali che rendono il quadro meno lineare;</li>
        <li>quando il proprietario teme di perdere controllo su responsabilità, garanzie o scadenze.</li>
      </ul>
      <p>In queste situazioni il tema non è complicare la pratica, ma proteggere il rapporto. Un controllo fatto prima evita spesso una gestione molto più costosa dopo.</p>

      <h2>Se ti serve un controllo prima di accettare</h2>
      <p>Se stai valutando un subentro nel contratto di locazione e vuoi capire quali verifiche fare prima di accettarlo, puoi richiedere una consulenza a Sfratto Sicuro: l’obiettivo è aiutarti a mantenere il rapporto locativo ordinato, documentato e sostenibile per il proprietario.</p>

      <h2>FAQ</h2>
      <h3>Il subentro nel contratto di locazione è solo un cambio di nominativo?</h3>
      <p>No. Per il proprietario significa cambiare il soggetto che entra nel rapporto, con effetti pratici su affidabilità, documenti, pagamenti e responsabilità da chiarire.</p>

      <h3>Prima di accettare il subentro conviene controllare il reddito del nuovo conduttore?</h3>
      <p>Sì. È uno dei controlli più utili, perché il cambio di persona incide direttamente sulla sostenibilità futura del rapporto locativo.</p>

      <h3>Il proprietario deve chiarire anche eventuali insoluti precedenti?</h3>
      <p>Sì. È prudente distinguere con precisione ciò che resta a carico del rapporto precedente da ciò che decorrerà dopo il nuovo ingresso, per evitare contestazioni successive.</p>

      <h3>Il deposito cauzionale va considerato nel passaggio?</h3>
      <p>Sì. È uno dei punti che conviene definire in modo espresso, altrimenti il rischio è creare ambiguità tra vecchio conduttore, nuovo soggetto e proprietario.</p>

      <h3>Quando il subentro merita una verifica legale più attenta?</h3>
      <p>Quando esistono pendenze economiche, contestazioni, documenti poco chiari o un profilo del nuovo conduttore che non offre sufficiente tranquillità al proprietario.</p>
    `
  },
  {
    slug: 'contratto-transitorio-affitto',
    title: 'Contratto transitorio affitto: quando conviene davvero',
    description:
      'Quando il contratto transitorio conviene davvero al proprietario, quali requisiti servono e quali errori evitare per non ritrovarsi con un rapporto contestabile.',
    excerpt:
      'Guida pratica al contratto transitorio: quando usarlo, quali motivi reggono davvero, quali documenti servono e quali errori possono trasformarlo in un rapporto contestabile.',
    lead:
      'Non basta scrivere “contratto transitorio” per avere un rapporto breve e inattaccabile: servono motivazioni concrete, coerenza documentale e una struttura corretta fin dall’inizio.',
    publishedAt: '2026-03-19',
    category: 'Locazioni',
    readingTime: '7 min',
    sourceNote:
      'Articolo ripristinato staticamente dal registro locale degli articoli pubblicati (Post ID 36, workflow slug confermato). Corpo ricostruito in modo conservativo per preservare la URL già uscita.',
    html: `
      <p>Il contratto transitorio viene spesso presentato come la soluzione semplice per “affittare per pochi mesi senza vincoli”. In realtà funziona bene solo quando la transitorietà è reale, documentabile e coerente con il contenuto del contratto. Se questi elementi mancano, il rischio non è solo teorico: il rapporto può diventare contestabile e generare problemi proprio quando il proprietario vuole rientrare in possesso dell’immobile.</p>

      <p>Per questo, prima di usare questa formula, conviene ragionare in modo pratico su tre aspetti: quando il contratto transitorio è davvero appropriato, quali presupposti devono emergere con chiarezza e quali errori fanno nascere contenziosi evitabili. Se vuoi inquadrare il tema lato tutela del proprietario, possono essere utili anche i riferimenti interni su <a href="/servizi/contratti-di-locazione/">contratti di locazione</a>, <a href="/servizi/controversie-locazione/">controversie locative</a> e <a href="/servizi/tutela-proprietario/">tutela del proprietario</a>.</p>

      <h2>Quando il contratto transitorio conviene davvero</h2>
      <p>Conviene quando esiste un’esigenza temporanea autentica, specifica e spiegabile. Il punto non è la durata breve in sé, ma la ragione per cui le parti non vogliono o non possono impostare un rapporto ordinario.</p>
      <ul>
        <li>il proprietario prevede di riutilizzare l’immobile entro un periodo definito;</li>
        <li>l’inquilino ha una necessità abitativa limitata nel tempo e concretamente individuabile;</li>
        <li>le parti vogliono dare al rapporto una cornice coerente con una situazione temporanea reale, non solo “più comoda”;</li>
        <li>la documentazione e le clausole sono allineate con il motivo di transitorietà.</li>
      </ul>
      <p>Se invece l’obiettivo reale è semplicemente avere più libertà di interrompere il rapporto o evitare le regole del contratto ordinario, il transitorio parte già male. In quel caso il vantaggio iniziale può trasformarsi in un contenzioso successivo.</p>

      <h2>Il punto decisivo: la transitorietà deve essere concreta, non generica</h2>
      <p>L’errore più comune è usare motivazioni vaghe o standardizzate. Una clausola generica, copiata da un fac-simile, difficilmente protegge da sola il proprietario se poi il caso concreto racconta una storia diversa.</p>
      <p>Conviene quindi verificare fin da subito:</p>
      <ul>
        <li>chi ha l’esigenza transitoria, il locatore o il conduttore;</li>
        <li>se questa esigenza è descritta in modo preciso e non stereotipato;</li>
        <li>se esistono elementi documentali coerenti con quanto scritto nel contratto;</li>
        <li>se la durata scelta è ragionevole rispetto al motivo indicato.</li>
      </ul>
      <p>Questo passaggio conta molto più di quanto sembri, perché quando nasce una lite il contratto non viene letto solo per la sua etichetta, ma per la sua sostanza.</p>

      <h2>Quando invece è meglio evitare questa formula</h2>
      <p>Ci sono situazioni in cui il contratto transitorio non è la strada più prudente. Per esempio, quando il proprietario non ha una reale esigenza temporanea, quando l’inquilino cerca in pratica una sistemazione stabile oppure quando nessuno riesce a spiegare in modo credibile perché il rapporto debba durare solo pochi mesi.</p>
      <p>In casi simili, forzare la mano sul transitorio può creare problemi in uscita: contestazioni sulla natura del rapporto, difficoltà nel rilascio dell’immobile o controversie che finiscono per costare più di quanto si voleva risparmiare all’inizio. Se vuoi impostare il rapporto in modo più robusto, la pagina su <a href="/servizi/contratti-di-locazione/">contratti di locazione</a> è il punto di partenza più utile.</p>

      <h2>Checklist pratica prima di firmare</h2>
      <p>Prima della firma conviene fare una verifica essenziale ma rigorosa:</p>
      <ul>
        <li>identificare con precisione il motivo della transitorietà;</li>
        <li>verificare che la durata sia coerente con quel motivo;</li>
        <li>raccogliere i documenti che supportano la situazione dichiarata;</li>
        <li>scrivere clausole chiare su durata, decorrenza, canone e riconsegna;</li>
        <li>controllare che il testo non contenga formule incoerenti o prese da modelli diversi;</li>
        <li>valutare in anticipo che cosa succede se l’immobile non viene rilasciato alla scadenza.</li>
      </ul>
      <p>Questa checklist sembra formale, ma in realtà è ciò che riduce il rischio di arrivare impreparati al momento più delicato: la fine del rapporto.</p>

      <h2>Il nodo vero per il proprietario: l’uscita dall’immobile</h2>
      <p>Molti ragionano sul contratto transitorio solo in fase di ingresso. Invece il test decisivo arriva alla scadenza: l’immobile viene davvero restituito senza problemi? Le parti hanno la stessa lettura del rapporto? La documentazione regge?</p>
      <p>Se il contratto è stato impostato male, il problema non è solo “tecnico”. Il proprietario rischia di perdere tempo, di dover chiarire la natura del rapporto e, nei casi peggiori, di affrontare una vera <a href="/servizi/controversie-locazione/">controversia locativa</a>. Per questo il contratto transitorio conviene davvero solo quando riduce l’incertezza, non quando la sposta in avanti.</p>

      <h2>Come ridurre il rischio di contestazioni</h2>
      <p>Per lavorare bene, il proprietario dovrebbe trattare il contratto transitorio come uno strumento da cucire sul caso concreto, non come un modello standard da riempire in fretta. Le buone prassi, in concreto, sono queste:</p>
      <ul>
        <li>descrivere la situazione reale in modo chiaro;</li>
        <li>evitare formule stereotipate se non corrispondono ai fatti;</li>
        <li>tenere traccia dei documenti utili già prima della firma;</li>
        <li>non rinviare i controlli alla scadenza del rapporto;</li>
        <li>valutare fin dall’inizio la strategia migliore se il conduttore non rilascia l’immobile.</li>
      </ul>
      <p>Quando il rapporto nasce bene, anche la gestione finale è di solito più semplice. Quando nasce male, spesso il contenzioso era già scritto in partenza.</p>

      <h2>Percorsi interni utili</h2>
      <ul>
        <li><a href="/servizi/contratti-di-locazione/">Contratti di locazione</a></li>
        <li><a href="/servizi/controversie-locazione/">Controversie di locazione</a></li>
        <li><a href="/servizi/tutela-proprietario/">Tutela del proprietario</a></li>
        <li><a href="/servizi/sfratto-per-finita-locazione/">Sfratto per finita locazione</a></li>
        <li><a href="/blog/guida-pratica-sfratto-per-morosita-nel-2026/">Sfratto per morosità nel 2026: tempi, costi e procedura</a></li>
      </ul>

      <h2>Cosa fare se hai dubbi prima di firmare</h2>
      <p>Se stai valutando un contratto transitorio, la scelta più utile è verificare subito se la formula è davvero coerente con il caso concreto. Farlo prima evita di dover discutere dopo su validità, durata e rilascio dell’immobile. Se emerge un rischio, è molto meglio correggere l’impostazione del contratto all’inizio che trasformare il problema in una lite successiva.</p>

      <h2>FAQ</h2>
      <h3>Il contratto transitorio è sempre la scelta più flessibile per il proprietario?</h3>
      <p>No. È utile solo quando esiste una vera esigenza temporanea. Se viene usato solo per avere un rapporto più breve “sulla carta”, può diventare fragile proprio nel momento in cui serve tutela.</p>

      <h3>Serve una motivazione specifica o basta indicare che il contratto è transitorio?</h3>
      <p>Serve una motivazione concreta e coerente con il caso reale. L’etichetta da sola non basta se il contenuto del rapporto racconta qualcosa di diverso.</p>

      <h3>Cosa succede se alla scadenza l’immobile non viene rilasciato?</h3>
      <p>È proprio qui che emergono i problemi di un contratto impostato male. Se la situazione degenera, può essere necessario passare dalla gestione ordinaria del rapporto a una vera tutela giudiziale del proprietario.</p>

      <h3>Quando conviene far controllare il contratto?</h3>
      <p>Prima della firma. Il controllo preventivo è quasi sempre il modo più economico e utile per evitare errori strutturali e contestazioni successive.</p>
    `
  },
  {
    slug: 'guida-pratica-sfratto-per-morosita-nel-2026',
    title: 'Sfratto per morosità nel 2026: tempi, costi e procedura',
    description:
      'Tempi realistici, costi, documenti e passaggi operativi dello sfratto per morosità: guida pratica aggiornata per proprietari e locatori.',
    excerpt:
      'Dalla prima rata non pagata alla convalida fino al rilascio dell’immobile: guida pratica per capire come funziona davvero lo sfratto per morosità nel 2026.',
    lead:
      'Dalla prima rata non pagata alla convalida, fino al rilascio dell’immobile e al recupero dei canoni: una guida operativa, chiara e aggiornata per il proprietario che vuole muoversi senza errori.',
    publishedAt: '2026-03-14',
    category: 'Sfratti',
    readingTime: '10 min',
    sourceNote:
      'Articolo recuperato dal contenuto live ancora raggiungibile sul dominio e reinserito nel build Astro come pagina statica preservando la URL pubblicata.',
    html: `
      <p>Lo sfratto per morosità è una procedura che va capita in modo concreto, non solo “in teoria”. Chi ha un inquilino che ha smesso di pagare di solito si trova davanti a tre problemi insieme: fermare l’aumento dell’insoluto, rientrare in possesso dell’immobile e capire se ci sono margini reali per recuperare anche le somme arretrate.</p>

      <p>Per questo, nel 2026, parlare di sfratto per morosità in modo utile significa spiegare non solo quali sono i passaggi della procedura, ma anche quando conviene attivarsi, quali documenti servono, cosa può rallentare i tempi e come leggere correttamente costi e aspettative.</p>

      <p>Se vuoi prima inquadrare il servizio in modo operativo, qui trovi i riferimenti interni più utili:</p>
      <ul>
        <li><a href="/servizi/sfratto-per-morosita/">servizio dedicato allo sfratto per morosità</a>;</li>
        <li><a href="/servizi/sfratto-per-morosita/#documenti-title">documenti utili per partire</a>;</li>
        <li><a href="/servizi/sfratto-per-morosita/#costi-tempi">costi e tempi operativi del servizio</a>;</li>
        <li><a href="/servizi/recupero-canoni-non-pagati/">recupero canoni non pagati</a>;</li>
        <li><a href="/#faq-sfratto">FAQ principali sulla procedura di sfratto</a>.</li>
      </ul>

      <h2>Quando conviene attivarsi davvero</h2>
      <p>L’errore più frequente è aspettare troppo. Molti proprietari provano prima a “gestire da soli” il problema per settimane o mesi, spesso sulla base di promesse informali dell’inquilino. In alcuni casi può avere senso tentare un ultimo confronto, ma quando la morosità diventa concreta e ripetuta, rinviare tende solo ad aggravare il danno economico.</p>
      <p>In pratica, conviene fare una valutazione seria quando:</p>
      <ul>
        <li>i canoni non vengono più versati con regolarità;</li>
        <li>l’inquilino paga solo in parte o salta più mensilità;</li>
        <li>gli oneri accessori non vengono più corrisposti e il debito cresce;</li>
        <li>le comunicazioni diventano evasive o contraddittorie;</li>
        <li>il proprietario ha bisogno di capire se impostare insieme rilascio dell’immobile e recupero del credito.</li>
      </ul>
      <p>Agire presto non significa agire in modo impulsivo. Significa, al contrario, raccogliere i dati giusti e impostare la pratica in modo pulito prima che la situazione si deteriori ulteriormente.</p>

      <h2>Checklist documenti: cosa serve davvero per partire bene</h2>
      <p>Una pratica di sfratto impostata bene parte quasi sempre dalla qualità della documentazione. Prima ancora di discutere di tempi o costi, conviene verificare di avere a disposizione:</p>
      <ul>
        <li>contratto di locazione;</li>
        <li>prova della registrazione del contratto;</li>
        <li>prospetto dei canoni non pagati, mese per mese;</li>
        <li>eventuali oneri accessori insoluti, se rilevanti nel caso concreto;</li>
        <li>copia di bonifici ricevuti, versamenti parziali o periodi scoperti;</li>
        <li>eventuali messaggi, PEC, email o solleciti già inviati;</li>
        <li>dati aggiornati dell’immobile e del conduttore.</li>
      </ul>
      <p>Questa fase sembra amministrativa, ma in realtà è strategica: un conteggio poco chiaro o una documentazione incompleta può tradursi in contestazioni, ritardi o passaggi gestiti male in udienza.</p>

      <h2>Come funziona la procedura di sfratto per morosità</h2>
      <h3>1. Verifica preliminare e impostazione del caso</h3>
      <p>La prima attività utile non è “mandare subito qualcosa”, ma verificare con precisione il quadro del rapporto locativo: contratto, importi dovuti, storia dei pagamenti, eventuali comunicazioni e obiettivo concreto del proprietario. In questa fase bisogna capire se la situazione è davvero coerente con una procedura di sfratto per morosità e se il fascicolo è pronto.</p>
      <p>È anche il momento giusto per chiarire se il focus è solo il rilascio dell’immobile o se bisogna impostare parallelamente anche il profilo economico del <a href="/servizi/recupero-canoni-non-pagati/">recupero canoni non pagati</a>.</p>

      <h3>2. Redazione dell’intimazione e fissazione dell’udienza</h3>
      <p>Una volta verificato il caso, si predispongono gli atti e si avvia il procedimento. Qui la precisione conta: dati anagrafici, importi, riferimenti al contratto, cronologia della morosità e notifiche devono essere coerenti. Una pratica formalmente ordinata riduce il rischio di intoppi che, in queste materie, fanno perdere tempo prezioso.</p>
      <p>Per chi vuole capire meglio questa fase lato servizio, è utile anche la sezione <a href="/servizi/sfratto-per-morosita/#procedura">come si sviluppa la procedura</a>.</p>

      <h3>3. Udienza: convalida, opposizione e termine di grazia</h3>
      <p>L’udienza è uno snodo centrale, ma non sempre ha un esito identico. Nelle situazioni lineari si può arrivare alla convalida in tempi relativamente contenuti; in altri casi l’inquilino può comparire, contestare il credito, chiedere tempo o far emergere elementi che rendono il percorso più articolato.</p>
      <p>Una variabile concreta è il cosiddetto termine di grazia, che in alcune situazioni può incidere sui tempi complessivi. Per questo motivo è sbagliato vendere lo sfratto come un automatismo: la procedura ha una struttura chiara, ma i tempi reali dipendono anche da come si sviluppa il contraddittorio.</p>

      <h3>4. Dopo la convalida: rilascio dell’immobile e fase esecutiva</h3>
      <p>Un punto che molti proprietari sottovalutano è questo: convalida non significa automaticamente immobile liberato il giorno dopo. Se il conduttore non rilascia spontaneamente, bisogna gestire la fase successiva fino alla liberazione effettiva dell’immobile.</p>
      <p>È qui che si vede la differenza tra una spiegazione generica e una utile: il problema del proprietario non è solo ottenere un provvedimento, ma capire quando potrà davvero rientrare in possesso del bene e con quali passaggi operativi.</p>

      <h2>Tempi dello sfratto per morosità nel 2026: cosa aspettarsi in modo realistico</h2>
      <p>Sui tempi conviene essere molto chiari. La landing di Sfratto Sicuro parla di un protocollo operativo orientato, in molti casi, ad arrivare all’udienza per la convalida in circa 60 giorni. Questa è una promessa operativa sensata se letta correttamente: non è una garanzia assoluta uguale per tutti, ma un obiettivo che dipende dalla corretta impostazione della pratica e dal contesto concreto.</p>
      <p>I tempi effettivi possono variare per ragioni molto pratiche:</p>
      <ul>
        <li>tribunale competente e relativo calendario;</li>
        <li>qualità delle notifiche;</li>
        <li>completezza della documentazione iniziale;</li>
        <li>comparizione o meno dell’inquilino;</li>
        <li>eventuale opposizione;</li>
        <li>concessione di termini;</li>
        <li>passaggio dalla fase di convalida a quella esecutiva.</li>
      </ul>
      <p>La lettura corretta, quindi, è questa: nei casi ben impostati si può puntare a una fase iniziale rapida, ma il tempo totale fino al rilascio effettivo dell’immobile non va mai confuso con il solo tempo che porta all’udienza.</p>

      <h2>Costi: come parlarne senza creare aspettative sbagliate</h2>
      <p>Anche sul tema costi serve precisione. La pagina servizio dedicata allo <a href="/servizi/sfratto-per-morosita/#costi-tempi">sfratto per morosità</a> indica oggi una proposta commerciale molto chiara:</p>
      <ul>
        <li>1.300 € tutto incluso fino alla convalida dello sfratto;</li>
        <li>nessun anticipo;</li>
        <li>pagamento al momento della convalida.</li>
      </ul>
      <p>Questo dato è utile perché rende l’offerta leggibile. Però va spiegato bene: il proprietario deve distinguere tra ciò che riguarda la fase fino alla convalida e ciò che, eventualmente, può riguardare attività ulteriori, fase esecutiva o gestione separata del credito.</p>
      <p>Se oltre al rilascio vuoi valutare anche il recupero economico, la pagina dedicata al <a href="/servizi/recupero-canoni-non-pagati/#costi-tempi">recupero canoni non pagati</a> indica un’impostazione differente, orientata al risultato, con compenso del 10% delle somme da recuperare. Anche qui il punto non è memorizzare una cifra, ma capire se il tuo caso richiede un percorso unico o due binari coordinati.</p>

      <h2>Gli errori più comuni che fanno perdere tempo</h2>
      <p>In questa materia, i ritardi nascono spesso da errori molto concreti:</p>
      <ul>
        <li>non avere un prospetto chiaro degli insoluti;</li>
        <li>confondere promesse verbali con pagamenti reali;</li>
        <li>attendere troppo prima di far valutare il caso;</li>
        <li>pensare che la convalida chiuda automaticamente tutto;</li>
        <li>trattare il recupero dei canoni come un tema separato da affrontare “più avanti” senza una strategia.</li>
      </ul>
      <p>Per questo, in questo articolo, i percorsi consigliati puntano direttamente alle sezioni rilevanti del servizio e non a pagine generiche.</p>

      <h2>Percorsi interni utili da consultare subito</h2>
      <ul>
        <li><a href="/servizi/sfratto-per-morosita/">Sfratto per morosità: pagina servizio completa</a></li>
        <li><a href="/servizi/sfratto-per-morosita/#documenti-title">Documenti utili per partire</a></li>
        <li><a href="/servizi/sfratto-per-morosita/#faq-servizio">FAQ del servizio sfratto per morosità</a></li>
        <li><a href="/servizi/recupero-canoni-non-pagati/">Servizio recupero canoni non pagati</a></li>
        <li><a href="/sedi/">Sedi operative sul territorio nazionale</a></li>
      </ul>

      <h2>Cosa fare adesso se l’inquilino non paga</h2>
      <p>Se stai affrontando una morosità concreta, le prime mosse utili sono quasi sempre queste:</p>
      <ul>
        <li>ricostruire il debito in modo preciso, mese per mese;</li>
        <li>raccogliere contratto, registrazione e prove dei mancati pagamenti;</li>
        <li>verificare se ci sono già comunicazioni scritte utili;</li>
        <li>capire se il tuo obiettivo prioritario è il rilascio, il recupero del credito o entrambi;</li>
        <li>far valutare il caso con un’impostazione operativa, prima che il ritardo aumenti ancora.</li>
      </ul>
      <p>Se vuoi muoverti in modo ordinato, puoi partire dalla pagina del <a href="/servizi/sfratto-per-morosita/">servizio sfratto per morosità</a>, verificare <a href="/servizi/sfratto-per-morosita/#costi-tempi">tempi e costi operativi</a> e, se c’è anche un problema economico rilevante, approfondire il <a href="/servizi/recupero-canoni-non-pagati/">recupero dei canoni non pagati</a>. Se hai bisogno di capire la copertura territoriale, trovi qui anche le <a href="/sedi/">sedi operative</a>.</p>

      <h2>FAQ</h2>
      <h3>Quanto tempo serve per uno sfratto per morosità?</h3>
      <p>Dipende dal tribunale, dalle notifiche, dalla documentazione, dall’eventuale opposizione dell’inquilino e dalla fase esecutiva successiva. Sfratto Sicuro indica, in molti casi, un obiettivo operativo di circa 60 giorni per arrivare alla fase di udienza/convalida, ma i tempi effettivi vanno valutati caso per caso.</p>

      <h3>La convalida significa che l’immobile viene liberato subito?</h3>
      <p>No. La convalida è un passaggio decisivo, ma il rilascio effettivo può richiedere ulteriori attività se il conduttore non lascia spontaneamente l’immobile.</p>

      <h3>È possibile affiancare allo sfratto il recupero dei canoni non pagati?</h3>
      <p>Sì. Anzi, spesso è la scelta più utile dal punto di vista strategico: il proprietario non deve solo rientrare in possesso del bene, ma anche capire se e come proteggere il proprio credito.</p>

      <h3>Quanto costa avviare la procedura con Sfratto Sicuro?</h3>
      <p>Alla data attuale, la pagina servizio dedicata indica 1.300 € tutto incluso fino alla convalida dello sfratto, senza anticipo e con pagamento al momento della convalida. Eventuali attività ulteriori o complementari vanno comunque lette in base al caso concreto e ai servizi collegati.</p>

      <h3>Qual è il primo errore da evitare?</h3>
      <p>Aspettare troppo senza ricostruire bene il debito e senza verificare la documentazione. Quando la morosità si prolunga, spesso peggiorano sia la posizione economica del proprietario sia la gestione pratica del rilascio.</p>
    `
  },
  {
    slug: 'sfratto-per-finita-locazione',
    title: 'Sfratto per finita locazione: tempi reali e passaggi operativi',
    description:
      'Guida pratica su sfratto per finita locazione, differenze tra prima e seconda scadenza del 4+4, passaggi operativi e rilascio dell’immobile.',
    excerpt:
      'Cosa deve controllare il proprietario quando il contratto scade, quando si può agire per finita locazione e quali passaggi operativi aspettarsi.',
    lead:
      'Quando il contratto arriva a scadenza e l’immobile non viene rilasciato, il proprietario ha bisogno di una strategia ordinata: distinguere bene scadenze, disdetta e passaggi esecutivi evita errori che fanno perdere tempo.',
    publishedAt: '2026-03-15',
    category: 'Sfratti',
    readingTime: '8 min',
    sourceNote:
      'URL, titolo e meta description confermati in `blog_queue.json` come articolo già live nella baseline del 2026-03-15. Corpo ricostruito in modo conservativo dal titolo pubblicato, dal meta riassuntivo e dalle pagine servizio correlate.',
    html: `
      <p>Lo sfratto per finita locazione riguarda i casi in cui il contratto è arrivato alla sua scadenza e il conduttore non rilascia l’immobile. Per il proprietario il nodo non è solo “far scadere il contratto”, ma impostare bene la fase precedente e quella successiva, evitando passi confusi su disdetta, termini e documenti.</p>
      <p>La distinzione tra prima e seconda scadenza del contratto 4+4 conta molto, perché incide sul modo in cui si arriva alla cessazione del rapporto. Se il problema invece è il mancato pagamento del canone, il percorso corretto è diverso ed è spiegato nella guida allo <a href="/blog/guida-pratica-sfratto-per-morosita-nel-2026/">sfratto per morosità</a>.</p>

      <h2>Quando si parla davvero di finita locazione</h2>
      <p>Si entra in questo scenario quando il rapporto locativo è giunto alla scadenza rilevante e il proprietario ha impostato correttamente la cessazione del contratto. Il punto pratico è che non basta desiderare la riconsegna dell’immobile: bisogna verificare se ci si trova alla prima scadenza utile, alla seconda o in un diverso assetto contrattuale.</p>
      <ul>
        <li>la scadenza del contratto va letta in modo preciso;</li>
        <li>la comunicazione del locatore deve essere coerente con il tipo di contratto;</li>
        <li>i tempi dipendono anche da notifiche, udienza e fase esecutiva;</li>
        <li>l’obiettivo finale resta il rilascio effettivo dell’immobile, non solo il provvedimento giudiziale.</li>
      </ul>

      <h2>Prima e seconda scadenza del 4+4: perché la differenza conta</h2>
      <p>Uno degli errori più frequenti è trattare tutte le scadenze allo stesso modo. In realtà la prima scadenza del 4+4 e la seconda hanno logiche diverse. Per questo il proprietario deve muoversi con largo anticipo, verificando se esistono i presupposti corretti e quale comunicazione sia stata effettivamente inviata.</p>

      <h2>I passaggi operativi da aspettarsi</h2>
      <p>Quando l’immobile non viene rilasciato spontaneamente, il percorso richiede ordine documentale e visione pratica. In genere contano:</p>
      <ol>
        <li>contratto e registrazione;</li>
        <li>prova della scadenza e delle comunicazioni inviate;</li>
        <li>verifica del mancato rilascio;</li>
        <li>avvio della procedura più corretta in base al caso concreto;</li>
        <li>eventuale fase esecutiva se il rilascio non avviene spontaneamente.</li>
      </ol>
      <p>È importante ricordare che i tempi reali dipendono non solo dal titolo giuridico, ma anche da tribunale, notifiche, udienze e organizzazione della fase di esecuzione.</p>

      <h2>Dove si sbaglia più spesso</h2>
      <ul>
        <li>confondere finita locazione e morosità;</li>
        <li>arrivare tardi alla gestione della scadenza;</li>
        <li>non coordinare bene contratto, comunicazioni e obiettivo finale;</li>
        <li>pensare che la sola scadenza basti a riottenere subito l’immobile;</li>
        <li>sottovalutare la fase successiva all’udienza.</li>
      </ul>

      <h2>Percorsi interni utili</h2>
      <p>Per una panoramica più ampia puoi vedere anche la pagina servizio dedicata allo <a href="/servizi/sfratto-per-finita-locazione/">sfratto per finita locazione</a>. Se invece il dubbio nasce già nella fase contrattuale, può aiutare leggere la guida sul <a href="/blog/contratto-transitorio-affitto/">contratto transitorio</a> o quella sul <a href="/blog/canone-concordato/">canone concordato</a>.</p>

      <h2>FAQ</h2>
      <h3>La scadenza del contratto basta da sola per riavere l’immobile?</h3>
      <p>No. La scadenza è il presupposto del problema, ma il rilascio concreto richiede una gestione corretta dei passaggi successivi.</p>
      <h3>Finita locazione e morosità sono la stessa cosa?</h3>
      <p>No. Possono intrecciarsi nei fatti, ma seguono logiche e presupposti diversi. Conviene distinguere subito il caso concreto.</p>
      <h3>Qual è il primo controllo utile per il proprietario?</h3>
      <p>Verificare tipo di contratto, scadenza rilevante, comunicazioni già inviate e obiettivo reale: rilascio dell’immobile, tutela del credito o entrambi.</p>
    `
  },
  {
    slug: 'canone-concordato',
    title: 'Canone concordato: quando conviene al proprietario',
    description:
      'Cedolare secca al 10%, IMU ridotta, contratto 3+2 e verifica degli accordi territoriali: guida pratica per capire quando il canone concordato conviene davvero.',
    excerpt:
      'Una guida operativa per proprietari su vantaggi fiscali, limiti e controlli da fare prima di scegliere un contratto a canone concordato.',
    lead:
      'Il canone concordato può essere conveniente, ma solo se il minor canone viene davvero compensato da fiscalità, IMU e corretta impostazione del contratto.',
    publishedAt: '2026-03-18',
    category: 'Locazioni',
    readingTime: '8 min',
    sourceNote:
      'URL e data confermate dal sito live WordPress (meta article:published_time 2026-03-18T07:12:54+00:00 e link archivio). Contenuto ricostruito in modo conservativo dal draft locale e dal testo live leggibile.',
    html: `
      <p>Il canone concordato interessa molti proprietari perché promette un equilibrio diverso rispetto al contratto a canone libero: un canone più contenuto, ma in cambio alcuni vantaggi fiscali che possono migliorare il rendimento netto dell’immobile. Il punto, però, è capire quando questa convenienza è reale e quando invece resta solo teorica.</p>
      <p>Per decidere bene servono tre verifiche: quale canone è ammesso dagli accordi territoriali del Comune, quali agevolazioni fiscali sono concretamente applicabili e quanto si riduce davvero il margine rispetto a un contratto libero. Se vuoi impostare correttamente anche la parte operativa, può esserti utile la guida sulla <a href="/blog/registrazione-contratto-locazione-online/">registrazione del contratto di locazione online</a>.</p>

      <h2>Che cos’è il canone concordato</h2>
      <p>Nel canone concordato il corrispettivo non viene fissato liberamente dalle parti oltre ogni limite, ma deve rientrare nei parametri previsti dagli accordi territoriali. Questo significa che il proprietario non può ragionare solo sul valore di mercato dell’immobile: deve prima verificare la fascia applicabile, le caratteristiche dell’appartamento e l’eventuale attestazione richiesta.</p>
      <ul>
        <li>il canone dipende dal Comune e dalla zona;</li>
        <li>incidono metratura, caratteristiche e correttivi locali;</li>
        <li>gli accordi territoriali vanno controllati prima della firma;</li>
        <li>spesso serve un’attestazione di conformità per usare tutte le agevolazioni.</li>
      </ul>

      <h2>I vantaggi fiscali che contano davvero</h2>
      <p>Il primo vantaggio che molti guardano è la cedolare secca al 10%, più leggera rispetto al regime ordinario del canone libero. A questo possono aggiungersi riduzioni IMU e altri benefici collegati alla disciplina del concordato. Però il proprietario deve evitare un errore classico: guardare solo all’aliquota fiscale senza confrontarla con il minor canone effettivo.</p>
      <p>La convenienza aumenta quando il canone concordato resta vicino al prezzo di mercato, quando il carico fiscale personale è alto e quando il Comune riconosce un alleggerimento IMU significativo.</p>

      <h2>Quando conviene davvero al proprietario</h2>
      <p>Conviene soprattutto nei casi in cui il differenziale con il canone di mercato non è troppo ampio. Se la riduzione del canone è modesta, il vantaggio fiscale può compensarla bene. Se invece i parametri territoriali portano il canone molto sotto il mercato, il proprietario deve fare un conto più severo, altrimenti il risparmio fiscale rischia di non bastare.</p>
      <ul>
        <li>conviene più spesso nelle aree dove gli accordi sono aggiornati;</li>
        <li>può avere senso per chi vuole maggiore prevedibilità fiscale;</li>
        <li>richiede un confronto numerico, non una scelta “di principio”;</li>
        <li>non riduce di per sé i rischi di morosità o di mancato rilascio.</li>
      </ul>

      <h2>Il contratto 3+2 e i controlli da fare</h2>
      <p>La formula più frequente è il contratto 3+2. Prima di firmare, conviene controllare durata, regole di rinnovo, range del canone e correttezza documentale. Un’impostazione imprecisa può mettere in discussione la piena fruizione delle agevolazioni o generare contestazioni successive.</p>
      <p>Questa attenzione conta anche perché il tipo di contratto non elimina i problemi patologici del rapporto: se l’inquilino smette di pagare, il proprietario deve comunque muoversi su binari di tutela come quelli descritti nella guida sul <a href="/blog/guida-pratica-sfratto-per-morosita-nel-2026/">sfratto per morosità</a>.</p>

      <h2>Gli errori più comuni</h2>
      <ul>
        <li>firmare senza aver verificato l’accordo territoriale aggiornato;</li>
        <li>confondere la convenienza fiscale con una convenienza economica automatica;</li>
        <li>usare un canone fuori fascia;</li>
        <li>dimenticare attestazioni o adempimenti necessari;</li>
        <li>non coordinare bene contratto, registrazione e regime fiscale scelto.</li>
      </ul>

      <h2>FAQ</h2>
      <h3>Il canone concordato conviene sempre più del canone libero?</h3>
      <p>No. Conviene solo quando il minor canone viene compensato in modo credibile dal vantaggio fiscale e dal quadro locale applicabile.</p>
      <h3>La cedolare secca al 10% basta da sola per decidere?</h3>
      <p>No. Va letta insieme al livello del canone ammesso, alle riduzioni IMU e al rendimento netto finale.</p>
      <h3>Serve verificare gli accordi territoriali prima di firmare?</h3>
      <p>Sì. È uno dei controlli più importanti, perché senza accordo corretto il contratto rischia di essere impostato male fin dall’inizio.</p>
    `
  },
  {
    slug: 'registrazione-contratto-locazione-online',
    title: 'Registrazione contratto di locazione online: guida pratica',
    description:
      'Come registrare online un contratto di locazione con il modello RLI, quali documenti servono, quali scadenze rispettare e quali errori evitare.',
    excerpt:
      'Guida pratica alla registrazione telematica del contratto di locazione: documenti, portale Agenzia delle Entrate, costi e scadenze.',
    lead:
      'Registrare correttamente il contratto è il primo passo per tutelare il proprietario: la procedura online è gestibile, ma richiede ordine su documenti, tempi e regime fiscale.',
    publishedAt: '2026-03-17',
    category: 'Locazioni',
    readingTime: '8 min',
    sourceNote:
      'URL e data confermate dal sito live WordPress (meta article:published_time 2026-03-17T08:57:34+00:00 e link archivio). Contenuto ricostruito in modo conservativo dal draft locale e dal testo live leggibile.',
    html: `
      <p>La registrazione del contratto di locazione online è uno degli adempimenti più importanti per il proprietario. Non è un passaggio secondario: da qui dipendono regolarità fiscale, opponibilità del contratto e gestione più ordinata di tutto il rapporto locativo.</p>
      <p>La buona notizia è che la procedura telematica è affrontabile anche senza intermediario, purché si arrivi preparati con documenti, dati catastali e scelta fiscale già chiari. Se stai ancora valutando il tipo di contratto da usare, può essere utile leggere anche i contenuti su <a href="/blog/canone-concordato/">canone concordato</a> e <a href="/blog/contratto-transitorio-affitto/">contratto transitorio</a>.</p>

      <h2>Perché la registrazione conta davvero</h2>
      <p>Registrare il contratto non significa solo “fare una pratica all’Agenzia delle Entrate”. Significa dare struttura regolare al rapporto, ridurre zone d’ombra e partire con una documentazione che diventa essenziale se in futuro emergono ritardi, contestazioni o vere inadempienze.</p>
      <ul>
        <li>serve per i contratti che superano i limiti di esenzione previsti;</li>
        <li>consente di formalizzare correttamente dati, durata e canone;</li>
        <li>incide sulla gestione fiscale del rapporto;</li>
        <li>riduce problemi successivi su validità e prova del contratto.</li>
      </ul>

      <h2>Cosa preparare prima di iniziare</h2>
      <p>Prima di accedere al servizio online conviene avere già raccolto contratto firmato, dati anagrafici delle parti, dati catastali dell’immobile, importo del canone e durata. Se si sceglie la cedolare secca, la decisione deve essere coerente fin da questa fase.</p>
      <p>Arrivare impreparati spesso genera gli errori più banali: dati inseriti male, documenti incompleti, dubbi sul regime fiscale e scadenze superate inutilmente.</p>

      <h2>Come funziona la procedura telematica</h2>
      <p>La registrazione online si svolge tramite i servizi dell’Agenzia delle Entrate e il modello RLI. In pratica bisogna:</p>
      <ol>
        <li>accedere con credenziali abilitate;</li>
        <li>inserire i dati generali del contratto;</li>
        <li>compilare i dati delle parti e dell’immobile;</li>
        <li>indicare il regime fiscale scelto;</li>
        <li>chiudere la procedura con il pagamento, se dovuto, e conservare la ricevuta.</li>
      </ol>
      <p>La ricevuta finale va archiviata con cura, perché sarà uno dei documenti più utili per qualunque fase successiva del rapporto.</p>

      <h2>Scadenze e costi da non sbagliare</h2>
      <p>Il punto più delicato è quasi sempre il termine di registrazione. Ritardi, dimenticanze o errori nel pagamento possono generare sanzioni e complicazioni evitabili. Anche qui la logica giusta è semplice: meglio una pratica ordinata subito che un ravvedimento dopo.</p>
      <ul>
        <li>controlla sempre la decorrenza effettiva del contratto;</li>
        <li>verifica se applichi cedolare secca o regime ordinario;</li>
        <li>non lasciare in sospeso proroghe, risoluzioni o variazioni;</li>
        <li>conserva ricevuta e copia del contratto registrato.</li>
      </ul>

      <h2>Gli errori più frequenti del proprietario</h2>
      <ul>
        <li>superare il termine di registrazione confidando di sistemare tutto dopo;</li>
        <li>inserire dati catastali errati;</li>
        <li>non coordinare bene cedolare secca e clausole del contratto;</li>
        <li>trascurare le comunicazioni successive su proroghe o cessazioni;</li>
        <li>non archiviare la documentazione finale.</li>
      </ul>

      <h2>FAQ</h2>
      <h3>La registrazione online si può fare senza intermediario?</h3>
      <p>Sì, se il proprietario ha accesso ai servizi telematici e prepara correttamente documenti e dati necessari.</p>
      <h3>Qual è l’errore più comune?</h3>
      <p>Arrivare tardi o con dati incompleti: è il modo più semplice per trasformare un adempimento lineare in un problema fiscale e operativo.</p>
      <h3>Perché conviene conservare con cura la ricevuta?</h3>
      <p>Perché diventa una prova documentale importante per la gestione futura del contratto e per eventuali contestazioni.</p>
    `
  },
  {
    slug: 'adeguamento-istat-affitto',
    title: 'Adeguamento ISTAT dell’affitto: come funziona e quando puoi chiederlo',
    description:
      'Guida pratica all’adeguamento ISTAT del canone di affitto: clausola contrattuale, indice FOI, limiti della cedolare secca e comunicazione corretta al conduttore.',
    excerpt:
      'Quando l’adeguamento ISTAT può essere richiesto, come si calcola e quali errori evitare per non compromettere la gestione del contratto.',
    lead:
      'L’adeguamento ISTAT può aiutare il proprietario a difendere il valore del canone nel tempo, ma non è automatico: servono clausola corretta, calcolo coerente e comunicazione tracciabile.',
    publishedAt: '2026-03-16',
    category: 'Locazioni',
    readingTime: '7 min',
    sourceNote:
      'URL, titolo e data confermati dal sito live WordPress tramite link archivio alla URL /blog/adeguamento-istat-affitto/ con data 2026-03-16T07:44:58+00:00. Corpo ricostruito in modo conservativo dal draft locale, perché la pagina live oggi restituisce 404.',
    html: `
      <p>L’adeguamento ISTAT dell’affitto è uno dei temi che i proprietari spesso scoprono tardi, cioè quando si rendono conto che il canone pattuito anni prima vale ormai meno in termini reali. Però non basta parlare genericamente di inflazione: l’aggiornamento funziona solo se il contratto lo consente e se viene gestito con metodo.</p>
      <p>Per evitare contestazioni conviene ragionare su tre punti: presenza della clausola, corretto riferimento all’indice FOI e comunicazione formale all’inquilino. Se stai valutando il rapporto locativo in modo più ampio, possono esserti utili anche i contenuti su <a href="/blog/canone-concordato/">canone concordato</a> e <a href="/blog/registrazione-contratto-locazione-online/">registrazione del contratto</a>.</p>

      <h2>Quando puoi chiedere l’adeguamento ISTAT</h2>
      <p>L’aggiornamento non scatta da solo. Il primo controllo è sempre contrattuale: bisogna verificare se il testo firmato contiene una clausola che preveda l’adeguamento del canone. In assenza di quella previsione, il proprietario non può trattare l’aumento come un automatismo.</p>
      <ul>
        <li>serve una clausola chiara nel contratto;</li>
        <li>occorre individuare il momento da cui decorre l’aggiornamento;</li>
        <li>va distinto il regime ordinario dalla cedolare secca;</li>
        <li>è prudente tenere traccia delle richieste inviate.</li>
      </ul>

      <h2>L’indice FOI e il calcolo pratico</h2>
      <p>Il riferimento normalmente usato è l’indice FOI. In concreto il proprietario dovrebbe confrontare il periodo corretto, applicare la variazione prevista dal contratto e verificare che il conteggio sia coerente con il regime locativo scelto. Il problema non è solo fare il conto, ma farlo in modo difendibile se l’inquilino lo contesta.</p>
      <p>Per questo ha senso conservare sempre il calcolo, il mese di riferimento e la documentazione usata: pochi minuti di precisione oggi possono evitare discussioni molto più lunghe domani.</p>

      <h2>Cedolare secca e limiti da ricordare</h2>
      <p>Uno dei passaggi più importanti riguarda la cedolare secca. Quando si applica questo regime, l’adeguamento del canone incontra limiti che il proprietario non deve ignorare. È un errore frequente pensare di poter unire tutti i vantaggi fiscali possibili senza guardare alle incompatibilità concrete.</p>

      <h2>Come comunicarlo all’inquilino</h2>
      <p>Anche quando la clausola esiste e il calcolo è corretto, l’aumento va comunicato in modo tracciabile. Messaggi informali o accordi verbali sono la strada più rapida per creare zone grigie. Molto meglio una comunicazione chiara, con riferimenti al contratto, al criterio di calcolo e alla decorrenza richiesta.</p>
      <ul>
        <li>indica la clausola contrattuale richiamata;</li>
        <li>specifica l’indice e il periodo utilizzati;</li>
        <li>riporta il nuovo importo richiesto;</li>
        <li>conserva prova dell’invio.</li>
      </ul>

      <h2>Errori da evitare</h2>
      <ul>
        <li>dare per scontato che l’adeguamento sia sempre automatico;</li>
        <li>calcolare l’aumento con indice o periodo errati;</li>
        <li>ignorare i limiti del regime fiscale scelto;</li>
        <li>non inviare una comunicazione chiara e tracciabile;</li>
        <li>muoversi tardi senza ricostruire bene gli anni precedenti.</li>
      </ul>

      <h2>FAQ</h2>
      <h3>L’adeguamento ISTAT vale sempre?</h3>
      <p>No. Vale solo se il contratto lo prevede e se viene richiesto e gestito in modo coerente con il regime applicabile.</p>
      <h3>Basta fare il calcolo per poter chiedere subito il nuovo canone?</h3>
      <p>No. Conviene sempre accompagnare il conteggio con una comunicazione formale e tracciabile al conduttore.</p>
      <h3>La cedolare secca incide sull’adeguamento?</h3>
      <p>Sì, ed è uno dei primi punti da verificare per evitare richieste non compatibili con il regime scelto.</p>
    `
  },
  {
    slug: 'deposito-cauzionale-affitto',
    title: 'Deposito cauzionale affitto: quando si può trattenere',
    description:
      'Quando il proprietario può valutare di trattenere il deposito cauzionale, quali prove servono e quali errori evitare alla chiusura della locazione.',
    excerpt:
      'Una guida pratica su cauzione, danni, insoluti e comunicazioni finali per il proprietario che vuole muoversi con prudenza.',
    lead:
      'Il deposito cauzionale tutela il proprietario, ma non può diventare una scorciatoia automatica: per trattenerlo servono motivi chiari, prove e una gestione ordinata della fine rapporto.',
    publishedAt: '2026-03-15',
    category: 'Locazioni',
    readingTime: '8 min',
    sourceNote:
      'Titolo e slug confermati dal payload locale di pubblicazione `publish-day1-deposito-cauzionale-affitto-fix2.json`; presenza in `blog_queue.json` tra i 5 articoli pubblicati del ciclo. Data ricostruita in modo conservativo dal naming “day1” del payload editoriale.',
    html: `
      <p>Il deposito cauzionale viene spesso visto come una protezione automatica contro qualunque problema di fine locazione. In realtà, per il proprietario, la questione è più delicata: la cauzione è una garanzia, non una somma da trattenere senza spiegazioni o senza documentazione.</p>
      <p>Le situazioni più frequenti riguardano danni all’immobile, canoni insoluti o spese rimaste scoperte. Proprio per questo, prima di decidere qualunque trattenuta, conviene ricostruire bene lo stato dei luoghi, i conteggi e le comunicazioni finali. Se il problema nasce da morosità più ampia, può essere utile leggere anche la guida sul <a href="/blog/guida-pratica-sfratto-per-morosita-nel-2026/">sfratto per morosità</a>.</p>

      <h2>A cosa serve davvero il deposito</h2>
      <p>La cauzione serve a coprire inadempimenti documentabili del conduttore. Non autorizza il proprietario a compensazioni generiche o automatiche. Questo vale soprattutto quando il rapporto si chiude in modo teso e la tentazione di “tenere tutto” sembra la strada più semplice.</p>
      <ul>
        <li>può rilevare per danni eccedenti il normale uso;</li>
        <li>può rilevare per spese o canoni realmente insoluti;</li>
        <li>richiede sempre un minimo serio di prova;</li>
        <li>non sostituisce una gestione corretta del rilascio dell’immobile.</li>
      </ul>

      <h2>Quando la trattenuta può avere senso</h2>
      <p>La valutazione più prudente si fa alla fine del rapporto, quando l’immobile è stato riconsegnato e il proprietario può verificare con precisione lo stato dei locali, gli eventuali danni e la situazione economica finale. È qui che verbale di riconsegna, fotografie, conteggi e preventivi diventano decisivi.</p>

      <h2>Quando trattenere il deposito è rischioso</h2>
      <p>Diventa rischioso quando il proprietario vuole usare la cauzione come sostituto automatico dell’ultimo canone, quando i danni sono solo ipotizzati o quando mancano prove serie. In questi casi la trattenuta può aprire una nuova lite, invece di chiuderne una.</p>
      <ul>
        <li>assenza di verbale o sopralluogo finale;</li>
        <li>danni non quantificati;</li>
        <li>spese ancora incerte o non ripartite;</li>
        <li>conteggi confusi sugli insoluti;</li>
        <li>comunicazioni finali vaghe o incomplete.</li>
      </ul>

      <h2>Checklist prudente per il proprietario</h2>
      <ol>
        <li>verifica l’importo della cauzione e il contratto;</li>
        <li>accerta data e modalità della riconsegna;</li>
        <li>redigi un verbale il più possibile dettagliato;</li>
        <li>raccogli foto, preventivi, fatture e conteggi;</li>
        <li>comunica in modo chiaro che cosa intendi trattenere e perché.</li>
      </ol>

      <h2>FAQ</h2>
      <h3>Il deposito può coprire automaticamente l’ultimo mese di affitto?</h3>
      <p>No. Va valutato con prudenza e sempre dentro un quadro documentale serio, non come scorciatoia automatica.</p>
      <h3>Bastano piccoli segni di usura per trattenere la cauzione?</h3>
      <p>No. Il normale deterioramento d’uso non equivale automaticamente a un danno addebitabile.</p>
      <h3>Qual è la regola pratica più utile?</h3>
      <p>Prima documentare bene, poi decidere. Fare il contrario è il modo più rapido per esporsi a contestazioni.</p>
    `
  }
];

export const blogPosts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
export const getLatestBlogPosts = (limit = 3) => blogPosts.slice(0, limit);
export const blogPostsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));
export const blogCategories: BlogCategory[] = ['Sfratti', 'Locazioni'];
