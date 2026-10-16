// Pubblicazioni dello Studio: white paper in PDF per i proprietari.
// I PDF vivono in public/pubblicazioni/<slug>.pdf, le copertine in
// public/pubblicazioni/<slug>.webp. Per aggiungerne una basta un nuovo
// oggetto in questo array: elenco, scheda e sitemap si aggiornano da soli.

export interface Pubblicazione {
  slug: string;
  kind: string;
  title: string;
  subtitle: string;
  lede: string;
  abstract: string[];
  topics: string[];
  indice: string[];
  pages: number;
  sizeMb: string;
  published: string; // ISO
  updated: string; // ISO
  audience: string;
}

export const pubblicazioni: Pubblicazione[] = [
  {
    slug: 'guida-completa-sfratto-abitazioni',
    kind: 'White paper',
    title: "Lo sfratto, dall'intimazione alle chiavi",
    subtitle: 'Guida completa per il proprietario di un immobile a uso abitativo',
    lede:
      "Tutto il percorso in un'unica guida: il procedimento davanti al giudice per morosità o finita locazione e la fase esecutiva, fino alla riconsegna dell'immobile e al recupero delle somme.",
    abstract: [
      "La guida accompagna il proprietario lungo l'intera procedura di sfratto di un'abitazione, spiegando ogni passaggio senza dare per scontati i termini tecnici.",
      "La prima parte riguarda il procedimento di convalida: sfratto per morosità, licenza e sfratto per finita locazione, documenti, intimazione, udienza, termine di grazia e opposizione. La seconda parte descrive la fase esecutiva: titolo esecutivo, precetto, preavviso di rilascio, accesso dell'ufficiale giudiziario, beni lasciati nell'immobile, canoni e spese.",
      'Chiudono la guida le indicazioni pratiche, un glossario di oltre trenta voci e le domande più frequenti dei proprietari.'
    ],
    topics: ['Sfratto per morosità', 'Finita locazione', 'Udienza di convalida', 'Esecuzione per rilascio', 'Glossario'],
    indice: [
      'Il procedimento di convalida',
      'Lo sfratto per morosità',
      'La finita locazione',
      'I documenti necessari',
      'Intimazione e notifica',
      "L'udienza",
      'Termine di grazia e opposizione',
      'Tempi, costi e fisco',
      'Il punto di partenza della fase esecutiva',
      'Gli atti preliminari',
      "L'esecuzione sul posto",
      "Il giorno dell'accesso",
      "I beni dell'inquilino",
      'Canoni, spese e fisco',
      'Indicazioni pratiche, glossario e domande frequenti'
    ],
    pages: 20,
    sizeMb: '1,7',
    published: '2026-10-16',
    updated: '2026-10-16',
    audience: 'Proprietari di abitazioni locate'
  },
  {
    slug: 'sfratto-fino-alla-convalida',
    kind: 'White paper',
    title: 'Dallo sfratto alla convalida',
    subtitle: 'Morosità, licenza e finita locazione: la fase davanti al giudice',
    lede:
      "Il procedimento che consente al proprietario di un'abitazione di riottenere l'immobile, dalla preparazione dei documenti all'udienza di convalida.",
    abstract: [
      "La guida spiega che cosa accade dal momento in cui il proprietario decide di agire fino all'ordinanza con cui il giudice convalida lo sfratto o la licenza.",
      "Per ciascuna ipotesi (morosità, licenza per finita locazione, sfratto per finita locazione) indica i presupposti, i documenti da preparare, le modalità di notifica, che cosa succede in udienza e quali sono i possibili esiti: convalida, termine di grazia, opposizione e mutamento del rito.",
      'Una sezione è dedicata a tempi, costi e riflessi fiscali, con un glossario e le domande più frequenti.'
    ],
    topics: ['Intimazione', 'Termine di grazia', 'Opposizione', 'Contributo unificato', 'Disdetta'],
    indice: [
      'Il procedimento di convalida',
      'Lo sfratto per morosità',
      'La finita locazione',
      'I documenti necessari',
      'Intimazione e notifica',
      "L'udienza",
      'Termine di grazia e opposizione',
      'Tempi, costi e fisco',
      'Indicazioni pratiche',
      'Glossario',
      'Domande frequenti'
    ],
    pages: 12,
    sizeMb: '1,2',
    published: '2026-10-16',
    updated: '2026-10-16',
    audience: 'Proprietari di abitazioni locate'
  },
  {
    slug: 'dopo-la-convalida-di-sfratto',
    kind: 'White paper',
    title: 'Dopo la convalida dello sfratto',
    subtitle: "L'esecuzione per rilascio, passo per passo",
    lede:
      "Che cosa segue il provvedimento del giudice: gli atti necessari, l'intervento dell'ufficiale giudiziario, la riconsegna dell'immobile e il recupero delle somme dovute.",
    abstract: [
      "Ottenuta la convalida, l'inquilino che non lascia l'immobile può essere allontanato solo con l'esecuzione forzata. La guida descrive questa fase in modo ordinato e comprensibile.",
      "Spiega il titolo esecutivo e il decreto ingiuntivo, la copia attestata conforme, il precetto e il preavviso di rilascio, l'accesso dell'ufficiale giudiziario con fabbro e forza pubblica, la sorte dei beni lasciati nell'immobile (art. 609 c.p.c.) e il recupero di canoni e spese.",
      'Indicazioni pratiche, glossario e domande frequenti completano il documento.'
    ],
    topics: ['Precetto', 'Preavviso di rilascio', 'Ufficiale giudiziario', 'Beni lasciati', 'Recupero crediti'],
    indice: [
      'Il punto di partenza',
      'Gli atti preliminari',
      "L'esecuzione sul posto",
      "Il giorno dell'accesso",
      "I beni dell'inquilino",
      'Canoni, spese e fisco',
      'Indicazioni pratiche',
      'Glossario',
      'Domande frequenti'
    ],
    pages: 10,
    sizeMb: '1,0',
    published: '2026-10-16',
    updated: '2026-10-16',
    audience: 'Proprietari che hanno ottenuto la convalida'
  },
  {
    slug: 'sfratto-locali-commerciali',
    kind: 'White paper',
    title: 'Lo sfratto di locali commerciali',
    subtitle: "Negozi, uffici, laboratori e alberghi: dall'intimazione alle chiavi",
    lede:
      "Il procedimento per morosità o finita locazione degli immobili non abitativi, l'indennità di avviamento e la fase esecutiva fino alla riconsegna dei locali.",
    abstract: [
      "Le locazioni a uso diverso dall'abitativo seguono regole proprie: durata di sei o nove anni, disdetta solo per motivi di legge alla prima scadenza, indennità per la perdita dell'avviamento e nessun termine di grazia per sanare la morosità.",
      "La guida mette a confronto queste regole con quelle delle abitazioni e accompagna il proprietario lungo il procedimento di convalida, l'eventuale opposizione e la fase esecutiva.",
      'Sono trattati anche gli effetti fiscali dei canoni non incassati, con un glossario e le domande più frequenti.'
    ],
    topics: ['Uso diverso', 'Indennità di avviamento', 'Diniego di rinnovo', 'Clausola risolutiva', 'Opposizione'],
    indice: [
      'Che cosa cambia rispetto alle abitazioni',
      'Il procedimento di convalida',
      'La morosità',
      'La finita locazione',
      "L'indennità di avviamento",
      'I documenti necessari',
      'Intimazione e notifica',
      "L'udienza",
      "L'opposizione",
      'Tempi, costi e fisco',
      'La fase esecutiva',
      'Indicazioni pratiche, glossario e domande frequenti'
    ],
    pages: 22,
    sizeMb: '1,8',
    published: '2026-10-16',
    updated: '2026-10-16',
    audience: 'Proprietari di immobili commerciali'
  },
  {
    slug: 'fisco-e-canoni-di-locazione',
    kind: 'White paper',
    title: 'Il fisco e i canoni di locazione',
    subtitle: "E che cosa cambia quando l'inquilino non paga",
    lede:
      "Come si tassano gli affitti in regime ordinario, con la cedolare secca e per le società, e quando la legge consente di non pagare imposte sui canoni mai incassati.",
    abstract: [
      "La prima parte illustra la tassazione ordinaria dei canoni: IRPEF e reddito fondiario, cedolare secca al 21% o al 10%, imposta di registro e di bollo, IVA e regole proprie delle società.",
      "La seconda parte affronta il problema dei canoni non pagati: la regola generale per cui le imposte sono dovute anche sugli affitti non incassati, l'eccezione per le abitazioni dall'intimazione di sfratto, il credito d'imposta, la cedolare secca, i locali commerciali e la posizione delle società.",
      'Una tabella di riepilogo e l\'elenco dei documenti da consegnare al commercialista chiudono la guida.'
    ],
    topics: ['Cedolare secca', 'Art. 26 TUIR', "Credito d'imposta", 'Imposta di registro', 'Locali commerciali'],
    indice: [
      'Il regime ordinario',
      'La cedolare secca',
      'Registro, bollo e IVA',
      'Società e imprese',
      "Se l'inquilino non paga: la regola",
      "Abitazioni: lo stop alle imposte",
      "Abitazioni: il credito d'imposta",
      'Cedolare secca e morosità',
      'Locali commerciali',
      'Società, IVA e registro',
      'Riepilogo e documenti',
      'Domande frequenti'
    ],
    pages: 13,
    sizeMb: '1,2',
    published: '2026-10-16',
    updated: '2026-10-16',
    audience: 'Proprietari e locatori'
  }
];

export const getPubblicazione = (slug: string) => pubblicazioni.find((p) => p.slug === slug);
