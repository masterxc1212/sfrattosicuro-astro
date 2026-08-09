# Promozione «V3 Agosto» 2026 — landing, annunci, asset

**Data della verifica integrale:** 9 agosto 2026
**Esito:** landing conforme, asset resi coerenti, 5 annunci attivati.
**Blocco residuo:** bocciatura Google `DESTINATION_NOT_WORKING` non ancora smaltita (vedi §7).

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

Gruppi coinvolti: Avvocato per Sfratto · Sfratto Inquilino Moroso · Sfratto
Commerciale · Finita Locazione · Costi Sfratto.

## 5. I cinque annunci `_agosto`

Tutti con URL finale `https://www.sfrattosicuro.it/landing-v3-agosto/` e percorso
visualizzato `/sfratto/agosto`.

| Gruppo | ID annuncio |
|---|---|
| Avvocato per Sfratto | `820323505594` |
| Sfratto Inquilino Moroso | `820398240449` |
| Sfratto Commerciale | `820398279107` |
| Finita Locazione | `820323514492` |
| Costi Sfratto | `820282626684` |

Titoli comuni presenti in tutti e cinque: «Sfratto €1.000 ad Agosto», «Studio Aperto
Tutto Agosto», «Mandato Entro il 31 Agosto». Ogni annuncio conserva i titoli
specifici della keyword del proprio gruppo. Nessuna occorrenza di €1.300, nessun
URL verso `/landing-v3/` o altre landing precedenti.

**Correzioni applicate il 9 agosto 2026:**

1. Titolo «5,0 su Google · **21** Recensioni» → «· **22** Recensioni», per allinearlo
   al dato reale del sito (`socialProof.googleReviewsTotal`). Riguarda 4 annunci su 5;
   il quinto usava «5,0 su Google» senza numero ed è rimasto invariato.
2. Descrizione «La convalida di sfratto è esclusa dalla sospensione feriale. Studio
   aperto ad agosto.» → «**La fase di convalida è sottratta alla sospensione feriale.
   Studio aperto tutto agosto.**» (86 caratteri), per la ragione esposta al §3.

## 6. Asset — il nodo architetturale e come è stato sciolto

**Il problema.** In Google Ads gli asset si agganciano ad account, campagna o gruppo
di annunci: **mai al singolo annuncio**. I cinque annunci `_agosto` vivono negli stessi
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

## 7. Stato degli annunci e blocco residuo

I cinque annunci sono stati portati a **ENABLED** il 9 agosto 2026.

**Risultano però ancora `DISAPPROVED` per `DESTINATION_NOT_WORKING`.** È un verdetto
stantio: gli annunci erano stati creati *prima* che la landing esistesse. La pagina è
andata online solo con il commit `24ad294` delle **19:48 UTC del 9 agosto 2026**, e
prima di quel momento l'URL rispondeva 404 — Google ha semplicemente fotografato quello.

La destinazione è stata verificata sana sotto ogni profilo (§2). È stato richiesto il
ricontrollo tramite `policy_validation_parameter.ignorable_policy_topics`, l'equivalente
API del pulsante «Richiedi revisione»; alla chiusura della sessione Google non lo aveva
ancora smaltito.

**Conseguenza pratica:** gli annunci non pubblicano finché la bocciatura non cade.
Sono stati comunque attivati perché partano da soli nel momento dell'approvazione,
senza bisogno di un altro intervento. **Da ricontrollare**, e se dopo 24-48 ore la
bocciatura persiste, aprire un reclamo dall'interfaccia Google Ads.

## 8. Cosa fare il 1° settembre 2026

1. Mettere in pausa (o rimuovere) i cinque annunci `_agosto`.
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
