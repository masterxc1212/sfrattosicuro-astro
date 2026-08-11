# Promozione «V3 Agosto» 2026 — landing, annunci, asset

**Data dell'ultima verifica operativa:** 11 agosto 2026
**Esito:** landing e asset coerenti; struttura dei gruppi e delle keyword riallineata;
3 annunci attivi, tutti idonei e diretti a V3 Agosto. Testo dei 2 annunci attivi
principali ricorretto l'11 agosto: le correzioni del 9 erano rientrate (vedi §5).
**Stato residuo:** (a) monitorare le due keyword nuove senza «moroso» e il rendimento
della keyword storica riattivata (§10); (b) **collaudare end-to-end l'invio del
modulo** dopo il cambio di redirect del 10 agosto (§11).

---

## 1. L'offerta

| Voce | Valore |
|------|--------|
| Compenso promozionale | **€1.000 IVA e cassa incluse** (ordinario: €1.300) |
| Condizione | Mandato professionale **sottoscritto entro il 31 agosto 2026** |
| Perimetro | Invariato: convalida + eventuale fase esecutiva fino alla riconsegna delle chiavi |
| Restano esclusi | Spese vive di legge; giudizio di merito in caso di opposizione (preventivo separato) |
| Invariati | Zero anticipi, pagamento dopo l'udienza di convalida |

Fonte unica del dato: `src/data/business-config.json` → `pricing.promozioni.agosto2026`.
Non ricopiare il valore altrove: le pagine lo leggono da lì via `src/lib/business.ts`.

L'eccezione è già registrata come **approvata** in
`docs/seo/vincoli-territorializzazione-sedi.md` §1 e non altera il prezzo ordinario
delle altre pagine.

## 2. La landing

- **URL pubblico:** <https://www.sfrattosicuro.it/landing-v3-agosto/>
- **Sorgente:** `src/pages/landing-v3-agosto/index.astro`, una riga:
  `<LandingExperimentPage variant="v3" campaign="august2026" />`
- **Componenti dedicati:** `LandingAugustNoticeSection.astro` (fascia in testa) e il
  ramo `isAugust` dentro `LandingExperimentPage.astro` (SEO, hero, FAQ, JSON-LD).

Condivide struttura, form, prove sociali e tracciamento con `/landing-v3/` e
`/landing-v4/`: cambiano solo prezzo, scadenza e le due FAQ di agosto.

### Esito della verifica del 9 agosto 2026

| Controllo | Esito |
|---|---|
| HTTP | **200** desktop, mobile e `AdsBot-Google` (anche `AdsBot-Google-Mobile`), 0 redirect |
| Varianti URL (http, non-www, senza slash finale) | tutte 200 |
| `robots.txt` | consente il percorso |
| Errori JavaScript in console | nessuno (desktop e mobile 375×812) |
| Overflow orizzontale mobile | assente |
| Prezzo €1.000 | coerente in ogni sezione (hero, fascia, blocco prezzo, FAQ, JSON-LD) |
| Occorrenze di €1.300 | 3 nel testo visibile, **tutte barrate** come «tariffa ordinaria» — nessun residuo che riferisca €1.300 all'offerta di agosto |
| Termine 31 agosto 2026 | presente in fascia, hero, blocco prezzo, FAQ, meta description |
| Apertura di agosto | «STUDIO APERTO TUTTO AGOSTO», «Studio operativo tutto il mese di agosto» |
| Recensioni Google | 22, allineato a `business-config.json` |
| Telefono / form / CTA | `tel:+390280898395`, 2 form verso `/php/invia-email.php`, sticky CTA presente |
| Tracciamento | GA4, Google Ads `AW-10983419342`, Meta Pixel, cattura `gclid`/UTM, `form_source` dedicato (`hero_form_v3_agosto`, `bottom_form_v3_agosto`) |

## 3. Formulazione giuridica sulla sospensione feriale

La promessa «lo studio lavora ad agosto» poggia sull'art. 3 della **legge 7 ottobre
1969 n. 742**, in relazione all'**art. 92 del R.D. 30 gennaio 1941 n. 12**.

Verificata su fonti primarie: giurisprudenza costante della Cassazione, Sez. III —
sentenze 4010/1980, 401/1984, 3462/1986, 6228/1986, 66/1989, 6540/1990, 4001/1995,
4195/1997, 677/2000, **25601/2016**: *«Nel procedimento di convalida di licenza per
finita locazione o di sfratto, la sospensione dei termini durante il periodo feriale
resta esclusa»*.

⚠️ **Limite da rispettare in ogni copy.** Cass. 25601/2016 precisa che *«la sospensione
feriale non opera nella fase sommaria del procedimento di sfratto ma solo nella
successiva fase a rito ordinario»*. L'esclusione copre quindi **la sola fase di
convalida**: se l'inquilino si oppone e il giudizio prosegue nelle forme del rito
ordinario, a quella fase la sospensione **si applica**.

Per questo, il 9 agosto 2026, la FAQ e la nota legale della landing sono state
riscritte per dire «fase sommaria di convalida» invece di parlare del procedimento
in blocco, ed è stato aggiunto l'inciso sull'opposizione. Stessa correzione nella
descrizione degli annunci (§5). **Non reintrodurre formule assolute** del tipo «lo
sfratto non si ferma ad agosto» senza il riferimento alla fase.

Nessuna promessa assoluta sui tempi: il dato «circa 60 giorni» compare sempre come
media, mai come garanzia.

## 4. Campagna e gruppi

- Account: `865-789-5088` · Campagna **Avvocato per Sfratto** · ID `22849022328`
- Strategia: `TARGET_SPEND` (Massimizza clic) · Budget `14807142876`, **€50/giorno
  condiviso** con la campagna `Avvocato per Sfratto [V4] Tripla offerta` (`24063657507`)
- Programmazione: **Lun-Ven 08:00-20:00, Sab 09:00-13:00. La domenica non pubblica.**
  (Zero impressioni di domenica è il comportamento atteso, non un guasto.)
- Etichetta delle copie promozionali: **`_agosto`** (label ID `22278677714`)

Stato operativo dei gruppi dopo l'intervento dell'11 agosto 2026:

| Gruppo | Stato | Decisione |
|---|---|---|
| Avvocato per Sfratto | **Attivo** | gruppo principale; riattivata la keyword a frase storicamente convertente |
| Come Sfrattare Inquilino | **Attivo** | mantiene solo le due varianti senza «moroso» |
| Costi Sfratto | **Attivo** | invariato |
| Sfratto Inquilino Moroso | **In pausa** | 0 conversioni e forte sovrapposizione semantica |
| Finita Locazione | **In pausa** | già in pausa prima dell'audit |
| Sfratto Commerciale | **In pausa** | già in pausa prima dell'audit |

## 5. Gli annunci `_agosto`

Tutti con URL finale `https://www.sfrattosicuro.it/landing-v3-agosto/` e percorso
visualizzato `/sfratto/agosto`.

### Annunci attivi verificati l'11 agosto 2026

| Gruppo | ID annuncio | Stato / efficacia |
|---|---|
| Avvocato per Sfratto | `820323505594` | Idoneo · Media |
| Come Sfrattare Inquilino | `820365206550` | Idoneo · Eccellente |
| Costi Sfratto | `820282626684` | Idoneo · Buono |

### Copie promozionali non attive perché il gruppo è in pausa

| Gruppo | ID annuncio |
|---|---|
| Sfratto Inquilino Moroso | `820398240449` |
| Sfratto Commerciale | `820398279107` |
| Finita Locazione | `820323514492` |

Titoli comuni presenti nelle copie promozionali: «Sfratto €1.000 ad Agosto», «Studio Aperto
Tutto Agosto», «Mandato Entro il 31 Agosto». Ogni annuncio conserva i titoli
specifici della keyword del proprio gruppo. Nessuna occorrenza di €1.300, nessun
URL verso `/landing-v3/` o altre landing precedenti.

**Correzioni applicate il 9 agosto 2026:**

1. Titolo «5,0 su Google · **21** Recensioni» → «· **22** Recensioni», per allinearlo
   al dato reale del sito (`socialProof.googleReviewsTotal`). La correzione riguardava
   i quattro annunci censiti con il numero nel titolo; gli altri usavano «5,0 su
   Google» senza numero e sono rimasti invariati.
2. Descrizione «La convalida di sfratto è esclusa dalla sospensione feriale. Studio
   aperto ad agosto.» → «**La fase di convalida è sottratta alla sospensione feriale.
   Studio aperto tutto agosto.**» (86 caratteri), per la ragione esposta al §3.

**Correzioni applicate l'11 agosto 2026 (le due del 9 agosto erano rientrate).**
Un audit della cronologia ha mostrato che entrambe le correzioni sopra erano state
disfatte sui due annunci attivi più importanti, per due strade diverse:

| Annuncio | Difetto | Come si era prodotto |
|---|---|---|
| `820365206550` Come Sfrattare Inquilino | «· **21** Recensioni» e la descrizione con la **formula assoluta** vietata dal §3 | l'annuncio **non esisteva** il 9 agosto: è stato creato il 10 agosto alle 12:49 clonando l'annuncio ordinario del gruppo, quindi si è riportato dietro il testo pre-correzione |
| `820323505594` Avvocato per Sfratto | «· **23** Recensioni», titolo «Sconti entro il 31 Agosto», titolo «studio legale sfratto» tutto minuscolo (quasi doppione di «Studio Legale Sfratti») | modifica manuale da interfaccia il 10 agosto alle 12:43 |

Entrambi riportati in linea via `AdService.mutate_ads`: recensioni a **22**, descrizione
per fase, «**Mandato Entro il 31 Agosto**» e «**Il Patto Sfratto Sicuro**» come negli
altri quattro. Riverificati **Attivati · Idonei · Revisionati**; l'efficacia torna a
`PENDING` dopo ogni modifica di testo e si riassesta in poche ore.

⚠️ **Regola che ne discende.** Clonare un annuncio ordinario per farne una copia
`_agosto` riporta indietro anche i difetti già corretti. Dopo ogni clonazione o
modifica manuale, rileggere titoli e descrizioni dall'API e confrontarli con questo
paragrafo: il numero di recensioni e la formula sulla sospensione feriale sono i due
punti che si rompono per primi.

## 6. Asset — il nodo architetturale e come è stato sciolto

**Il problema.** In Google Ads gli asset si agganciano ad account, campagna o gruppo
di annunci: **mai al singolo annuncio**. Le copie `_agosto` vivono negli stessi
gruppi degli annunci ordinari da €1.300, quindi qualunque sitelink o callout è
inevitabilmente condiviso fra le due offerte. Nessuna configurazione poteva renderle
coerenti entrambe nello stesso momento.

Alla verifica risultavano in conflitto:

- 6 sitelink di campagna che puntavano tutti a `/landing-v3/`, la pagina da €1.300;
- il sitelink «Costi e trasparenza» con descrizione «Prezzo fisso 1.300 euro»;
- il callout «Prezzo fisso €1.300»;
- **bug preesistente**: quel sitelink puntava a `#costi-trasparenza`, anchor che il
  redesign di luglio aveva eliminato. Era rotto anche per gli annunci ordinari.

**La soluzione adottata.** L'utente ha messo in pausa i cinque annunci ordinari
(scelta deliberata: da lunedì in campagna girano solo gli annunci di agosto). Questo
elimina alla radice la coesistenza delle due offerte, e rende corretta la
configurazione più semplice: **gli asset di campagna puntano tutti alla landing di
agosto**. Nessuna campagna separata, nessun budget nuovo, storico keyword intatto.

Valutata e **scartata** l'alternativa della campagna dedicata: il budget condiviso da
€50/giorno era già saturo all'88% (≈€44/giorno effettivi su 30 giorni), quindi una
terza campagna avrebbe sottratto traffico alle altre invece di aggiungerne, e le
keyword clonate sarebbero ripartite senza storico di Quality Score a 22 giorni dalla
scadenza della promozione.

### Sitelink di campagna dopo l'intervento

Tutti verso `https://www.sfrattosicuro.it/landing-v3-agosto/`, **anchor verificati
esistenti nel DOM di produzione**:

| Sitelink | Anchor | Descrizioni |
|---|---|---|
| Contatti e consulenza | `#contatti` | Ti richiamiamo entro 2 ore · Consulenza gratuita e sicura |
| Come funziona | `#come-funziona` | Le 4 fasi passo-passo · Convalida mediamente in 60 giorni |
| Costi e trasparenza | `#prezzo` | Tariffa di agosto per iscritto · Zero anticipi, nessuna sorpresa |
| Recensioni Google | `#recensioni-google` | Valutazioni eccellenti · Opinioni verificate clienti |
| Domande frequenti | `#faq` | Tempi, costi, casi particolari · Risposte chiare e pratiche |
| Perche sceglierci | `#il-tuo-avvocato` | Solo sfratti, metodo collaudato · Procedura seguita e documentata |

I 6 sitelink precedenti verso `/landing-v3/` sono stati **scollegati, non eliminati**:
gli asset restano in account e si possono ricollegare il 1° settembre.

### Altri asset

- **Callout**: rimosso dalla campagna il solo «Prezzo fisso €1.300». Restano 13
  callout, tutti privi di prezzo. L'asset è condiviso con la campagna V4: è stato
  rimosso **solo il collegamento** a questa campagna, quindi la V4 non è stata toccata.
- **Snippet strutturati**: «Servizi: Sfratto Per Morosità, Sfratto Finita Locazione,
  Recupero Canoni Locazione» — neutro, invariato.
- **Immagini e logo**: 4 `AD_IMAGE` + 1 `BUSINESS_LOGO`, neutri, invariati.
- **Asset di gruppo annunci**: nessuno.
- **Asset di account**: solo un `BUSINESS_MESSAGE`.
- **Asset automatici**: `TEXT_ASSET_AUTOMATION` e
  `FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION` sono **OPTED_OUT**, quindi Google non
  genera titoli o URL propri che potrebbero contraddire l'offerta.

**Esito:** nessun asset mostra €1.300, nessun asset porta a `/landing-v3/`, nessun
anchor inesistente. Gli anchor mai esistiti citati nella vecchia documentazione
(`#servizi`, `#prezzi`, `#chi-siamo`, `#recensioni`) non sono usati da nessun asset.

## 7. Stato degli annunci

Il precedente blocco `DESTINATION_NOT_WORKING` è **risolto**. Alla verifica
dell'11 agosto 2026 i tre annunci dei gruppi rimasti attivi risultano **Attivati** e
**Idonei**; Google Ads mostra tre righe attive e tutte e tre puntano a
`https://www.sfrattosicuro.it/landing-v3-agosto/`.

Le altre tre copie promozionali non sono bocciate per la destinazione: non erogano
perché i rispettivi gruppi sono in pausa. Non riattivarle senza prima riesaminare la
struttura keyword descritta al §10.

## 8. Cosa fare il 1° settembre 2026

1. Mettere in pausa i tre annunci `_agosto` rimasti attivi (Avvocato per Sfratto,
   Come Sfrattare Inquilino e Costi Sfratto). Le altre copie sono già escluse dalla
   pubblicazione perché i rispettivi gruppi sono in pausa.
2. Riattivare gli annunci ordinari da €1.300.
3. Ricollegare alla campagna i 6 sitelink verso `/landing-v3/` — **correggendo però
   `#costi-trasparenza` in `#prezzo`**, altrimenti si reintroduce il bug — e il callout
   «Prezzo fisso €1.300».
4. Valutare se togliere `/landing-v3-agosto/` dalla pubblicazione o lasciarla con un
   avviso di promozione scaduta.

## 9. Nota operativa: l'MCP Google Ads non è utilizzabile

Il connettore MCP `google-ads` è fermo alla **v20 dell'API, dismessa**: ogni chiamata
fallisce con `UNSUPPORTED_VERSION`. La libreria Python installata (`google-ads` 29.2.0)
supporta invece v21-v23.

Finché il connettore non viene aggiornato, operare con la libreria diretta:

```python
from google.ads.googleads.client import GoogleAdsClient
client = GoogleAdsClient.load_from_storage(
    r"C:\Users\danil\google-ads-mcp\env\google-ads.yaml", version="v23")
```

Su Windows serve `PYTHONIOENCODING=utf-8`, altrimenti il redirect dell'output rompe
gli accenti.

## 10. Audit gruppi e decisioni keyword — 11 agosto 2026

Periodo analizzato nell'interfaccia: **1-31 luglio 2026**. Le modifiche sono state
applicate direttamente in Google Ads l'11 agosto e poi riverificate.

### Decisioni applicate

1. Nel gruppo **Come Sfrattare Inquilino** sono state messe in pausa:
   - `"come sfrattare un inquilino moroso"` — 34 clic, €39,32, 0 conversioni;
   - `[come sfrattare un inquilino moroso]` — 42 clic, €44,14, 0 conversioni.
2. Nello stesso gruppo restano attive soltanto:
   - `"come sfrattare un inquilino"`;
   - `[come sfrattare un inquilino]`.
   Sono keyword appena attivate e senza dati storici: non giudicarle prima di aver
   raccolto traffico sufficiente.
3. Nel gruppo **Avvocato per Sfratto** è stata riattivata soltanto la corrispondenza
   a frase `"come sfrattare un inquilino moroso"`: a luglio aveva 407 clic,
   5,60 conversioni e CPA €76,82. La corrispondenza esatta omonima resta in pausa.
4. Il gruppo **Sfratto Inquilino Moroso** è stato messo interamente in pausa. La sua
   keyword principale a frase aveva 124 clic, €133,50 di costo, 0 conversioni e
   Quality Score 3/10; il gruppo era inoltre sovrapposto semanticamente agli altri.
   Le keyword interne possono risultare tecnicamente «attivate», ma non erogano finché
   il gruppo resta in pausa.
5. **Costi Sfratto** non è stato modificato: `"quanto costa uno sfratto"` aveva
   prodotto 2 conversioni a CPA €9,37. Anche **Avvocato per Sfratto** resta attivo;
   l'annuncio con efficacia «Media» va ottimizzato solo con un intervento separato,
   senza alterare ora la struttura validata.

### Configurazione finale da considerare fonte di verità

| Gruppo attivo | Keyword positive operative |
|---|---|
| Avvocato per Sfratto | 6: le 5 già attive + `"come sfrattare un inquilino moroso"` riattivata |
| Come Sfrattare Inquilino | 2: frase ed esatta di `come sfrattare un inquilino` senza «moroso» |
| Costi Sfratto | 5, invariate |

Totale: **3 gruppi attivi, 13 keyword positive operative e 3 annunci attivi**. Tutti
gli annunci attivi sono idonei e portano a V3 Agosto. I gruppi Finita Locazione,
Sfratto Commerciale e Sfratto Inquilino Moroso restano in pausa.

### Nota per Claude e per gli audit successivi

Quando una keyword già esistente viene riattivata, Google Ads conserva e ripresenta
le metriche storiche. Per questo le due varianti «moroso» spostate nel gruppo Come
sembravano nuove ma mostravano dati di luglio: erano criteri preesistenti riattivati,
non keyword prive di storico. Non duplicarle e non riattivare automaticamente le
versioni esatte o i gruppi in pausa.

## 11. Rendimento dal lancio e punti aperti — 11 agosto 2026

### Il numero che conta

| Giorno | Impressioni | Clic | Spesa | Conversioni |
|---|---|---|---|---|
| 7 agosto (ante promo) | 253 | 28 | €31,67 | **2** (Modulo) |
| 9 agosto (domenica) | — | — | — | non pubblica, atteso |
| 10 agosto | 430 | 64 | **€99,85** | 0 da modulo, 2 click-telefono |
| 11 agosto (parziale) | 181 | 11 | €18,16 | 0 |

**75 clic e €118,01 in due giorni, zero conversioni da modulo.** Nel CRM
(«Anagrafica», base `appXqSXlxeLUcR25p`) l'unico lead della finestra è **telefonico**
(canale MyCentralino, 10 agosto 13:20): **nessun lead da form web**.

Non è un guasto di tracciamento accertato: `invia-email.php` scrive nel CRM **prima**
del redirect, quindi un modulo inviato lascerebbe traccia anche con il redirect rotto.
Sono proprio zero invii. Ma il percorso è cambiato il 10 agosto — i form della landing
di agosto puntano ora a `/grazie.html?promo=agosto2026` — e nello stesso commit è stato
corretto il separatore in `invia-email.php` (`?` → `&` quando il redirect ha già una
query), senza il quale l'URL sarebbe stato `…?promo=agosto2026?gclid=…`. **Non è
verificato se la versione difettosa sia stata online per qualche ora del 10 agosto.**
Un invio di prova dalla landing chiude la questione: se il lead arriva in CRM **e** la
conversione «Sfratto Sicuro · Modulo» viene contata, il percorso è sano.

Verificato invece staticamente l'11 agosto: la landing risponde 200, non produce errori
in console, ed entrambi i form (`hero_form_v3_agosto`, `bottom_form_v3_agosto`) hanno
`action` e `redirect_url` corretti.

### Dove sono finiti i soldi del 10 agosto

**€63,43 su €99,85 — il 64% — li ha bruciati «Sfratto Inquilino Moroso»**, il gruppo con
Quality Score 3/10 e zero conversioni storiche, messo in pausa solo l'11 agosto alle
11:11. La spesa del 10 agosto è pari al **doppio esatto del budget giornaliero**: è il
tetto 2× che Google consente sul singolo giorno, non un errore di configurazione.

### Tre elementi non censiti altrove

- **Asset CALL aggiunto il 10 agosto** alla campagna (asset `370295469619`,
  `02 8089 8395`). La conversione «Clicks to call» è attiva e primaria, quindi traccia;
  ma è il numero diretto, non il numero di inoltro Google usato per le chiamate da sito
  (vedi la memoria `call-tracking-numero-inoltro-google`).
- **Campagna V4 `24063657507`**: `status=ENABLED` ma `serving_status=ENDED` — ultime
  impressioni l'8 agosto. Il budget da €50 condiviso è quindi **tutto** sulla campagna
  principale. I suoi asset contengono ancora il callout «Prezzo fisso €1.300» e sitelink
  verso `/landing-v4/`: innocui finché la campagna è ferma, **tornerebbero a erogare se
  qualcuno ne prolungasse le date**.
- **`/sfratto-agosto/`** (creata il 9 agosto come URL di riserva contro il blocco
  `DESTINATION_NOT_WORKING`) è online ma **non è usata da nessun annuncio né sitelink**:
  il blocco è rientrato e tutto punta a `/landing-v3-agosto/`. È `noindex,nofollow`,
  quindi non crea contenuto duplicato indicizzabile, ma resta un doppione da rimuovere
  consapevolmente o da tenere come riserva dichiarata.
