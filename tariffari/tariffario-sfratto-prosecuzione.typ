// Tariffario — Prosecuzione dello sfratto dopo l'opposizione
// Identita' coordinata Studio Avv. Danilo Ansalone (2026)

#let verde = rgb("#1E4A38")
#let inchiostro = rgb("#222222")
#let grigio = rgb("#6b6b6b")

#set page(
  paper: "a4",
  margin: (top: 1.4cm, bottom: 1.15cm, left: 2cm, right: 2cm),
  footer: context [
    #set text(font: "Garamond", size: 8pt, fill: grigio)
    #line(length: 100%, stroke: 0.4pt + rgb("#cccccc"))
    #v(2pt)
    #grid(
      columns: (1fr, auto),
      [Studio Legale Ansalone — C.F. NSLDNL75S04H703U · P. IVA 04380590655],
      align(right)[pag. #counter(page).get().first() di #counter(page).final().first()],
    )
  ],
)

#set text(font: "Garamond", size: 10.5pt, fill: inchiostro, lang: "it")
#set par(justify: true, leading: 0.66em, spacing: 0.85em)
#set list(spacing: 0.55em, indent: 2pt, body-indent: 6pt)

// ————————————————————————————————————— CARTA INTESTATA
#grid(
  columns: (auto, 1fr),
  column-gutter: 12pt,
  align: (left + horizon, right + horizon),
  image("monogramma-da-verde.png", height: 15mm),
  [
    #set text(size: 9pt)
    #set par(justify: false, leading: 0.5em, spacing: 0.5em)
    #text(tracking: 1.2pt, weight: "medium", smallcaps[Avv. Danilo Ansalone]) \
    Via F. P. Volpe n. 2 — 84122 Salerno \
    Tel +39 089 0978260 — consulenza\@daniloansalone.it \
    PEC danilo.ansalone\@pec.giuffre.it — www.daniloansalone.it \
    Ordine degli Avvocati di Salerno
  ],
)
#v(3pt)
#line(length: 100%, stroke: 0.5pt + inchiostro)

// ————————————————————————————————————— TITOLO
#v(11pt)
#align(center)[
  #text(size: 9pt, tracking: 3pt, fill: verde, weight: "medium", smallcaps[Tariffario dei compensi professionali])
  #v(5pt)
  #text(size: 18pt, weight: "bold", fill: verde)[Prosecuzione dello sfratto dopo l'opposizione]
  #v(3pt)
  #text(size: 10.5pt, style: "italic", fill: grigio)[Fase di merito successiva al mutamento del rito (art. 667 c.p.c.)]
]

#v(9pt)

Il compenso di *€ 1.300,00* (IVA e CPA comprese) riguarda la #emph[fase iniziale]
della procedura di sfratto — intimazione, notifica e udienza di convalida.
In caso di opposizione dell'inquilino e prosecuzione del giudizio dopo il
mutamento del rito, la causa entra nella fase di merito e si applicano, *in
aggiunta al compenso della fase iniziale*, le tariffe indicate di seguito.

#v(7pt)

// ————————————————————————————————————— BOX FASE INIZIALE
#block(
  width: 100%,
  inset: (x: 14pt, y: 8pt),
  radius: 3pt,
  fill: rgb("#f4f2ec"),
  stroke: 0.5pt + rgb("#d8d3c4"),
  grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    [#text(weight: "medium")[Fase iniziale] — intimazione, notifica, udienza di convalida],
    [#text(size: 15pt, weight: "bold", fill: verde)[€ 1.300,00]],
  ),
)

#v(9pt)

// ————————————————————————————————————— FUNZIONE FASCIA DI PREZZO
#let fascia(titolo, prezzo, condizione, occhiello, voci) = block(
  width: 100%,
  breakable: false,
  inset: 0pt,
  radius: 4pt,
  stroke: 0.9pt + verde,
  clip: true,
  [
    #block(
      width: 100%,
      inset: (x: 14pt, y: 7pt),
      fill: verde,
      grid(
        columns: (1fr, auto),
        align: (left + horizon, right + horizon),
        text(fill: white, size: 13pt, weight: "bold")[#titolo],
        text(fill: white, size: 16pt, weight: "bold")[#prezzo],
      ),
    )
    #block(
      width: 100%,
      inset: (x: 14pt, top: 8pt, bottom: 9pt),
      [
        #set par(leading: 0.58em, spacing: 0.6em)
        #text(style: "italic", fill: grigio, size: 10pt)[#condizione]
        #v(5pt)
        #text(weight: "medium", size: 9.5pt, fill: verde, smallcaps[#occhiello])
        #v(2pt)
        #voci
      ],
    )
  ],
)

#fascia(
  "Tariffa base",
  "€ 2.500,00",
  [Quando la causa non richiede prove testimoniali, consulenza tecnica o altra attività istruttoria.],
  [Comprende],
  [
    - studio dell'opposizione;
    - redazione e deposito delle memorie;
    - procedimento di mediazione obbligatoria;
    - partecipazione alle udienze;
    - attività difensiva fino alla sentenza.
  ],
)

#v(9pt)

#fascia(
  "Tariffa completa",
  "€ 3.500,00",
  [Quando il giudizio richiede attività istruttoria, in aggiunta alla trattazione.],
  [In particolare quando ricorrono],
  [
    - prove testimoniali;
    - interrogatorio formale delle parti;
    - consulenza tecnica d'ufficio (CTU);
    - più udienze istruttorie;
    - attività difensiva particolarmente complessa.
  ],
)

#v(11pt)

// ————————————————————————————————————— ESCLUSIONI
#text(size: 11pt, weight: "medium", fill: verde, smallcaps[Restano escluse (a carico del cliente)])
#v(3pt)
#grid(
  columns: (1fr, 1fr),
  column-gutter: 20pt,
  [
    #set par(leading: 0.55em)
    #set list(spacing: 0.5em)
    - spese dell'organismo di mediazione;
    - contributo unificato e marca da bollo;
    - spese di notifica;
    - compensi di consulenti tecnici (CTU / CTP);
  ],
  [
    #set par(leading: 0.55em)
    #set list(spacing: 0.5em)
    - spese vive e di trasferta;
    - attività esecutiva successiva alla sentenza (preavviso di rilascio, ufficiale giudiziario);
    - giudizio di appello.
  ],
)

#v(8pt)
#line(length: 100%, stroke: 0.4pt + rgb("#d8d3c4"))
#v(5pt)

// ————————————————————————————————————— NOTE
#set text(size: 9.5pt, fill: rgb("#444444"))
#set par(leading: 0.55em, spacing: 0.55em)
#grid(
  columns: (auto, 1fr),
  column-gutter: 7pt,
  row-gutter: 4pt,
  text(fill: verde)[▪], [I compensi indicati si riferiscono al *solo primo grado* di giudizio.],
  text(fill: verde)[▪], [Il compenso è dovuto *indipendentemente dall'esito* della causa: l'avvocato assume un'obbligazione di mezzi, non di risultato.],
  text(fill: verde)[▪], [Gli importi sono *comprensivi di IVA e contributo Cassa Forense (CPA)* e sono al netto delle spese sopra escluse.],
  text(fill: verde)[▪], [Il presente tariffario vale come preventivo di massima ai sensi dell'art. 13, co. 5, L. 31 dicembre 2012 n. 247; per ciascun incarico verrà rilasciato preventivo scritto personalizzato.],
)

#v(9pt)
#set text(size: 10pt, fill: inchiostro)
#grid(
  columns: (1fr, auto),
  align: (left + bottom, right + bottom),
  text(style: "italic", fill: grigio, size: 9pt)[Listino valido dal 13 luglio 2026 — Salerno.],
  align(right)[
    Studio Legale Ansalone \
    #text(weight: "bold")[Avv. Danilo Ansalone]
  ],
)
