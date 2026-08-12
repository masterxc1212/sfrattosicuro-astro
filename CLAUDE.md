# retrograde-ring — Sfratto Sicuro (Astro)

Progetto Astro del sito www.sfrattosicuro.it. Build statico deployato su SiteGround via GitHub Actions (FTPS).

## ⚠️ Vincoli operativi — LEGGERE PRIMA DI MODIFICARE CONTENUTI

Quando si lavora su contenuti delle sedi (`/sedi/{slug}/`), home, landing (v2/v3), blog o componenti che mostrano prezzi/tempi/contatti, leggere SEMPRE prima:

- **`docs/seo/vincoli-territorializzazione-sedi.md`** — promesse landing inviolabili (€1.300 fisso, 60gg medi, no acconti, ecc.) + variabili globali centralizzate + pilot Lombardia.

I valori di business (prezzo €1.300, tempi 60gg, telefoni, whatsapp, orari) NON vanno hardcodati: andranno presto centralizzati in `src/data/business-config.json`. Vedi sez. 2 del file vincoli per la migration map.

## Paths canonici

- **Repo locale**: `C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro`
- **Remote**: `https://github.com/masterxc1212/sfrattosicuro-astro.git` (branch `main`)
- **CI / deploy target**: SiteGround via FTPS, attivato da GitHub Actions (`.github/workflows/deploy-siteground.yml`)
- **Monitor CI**: https://github.com/masterxc1212/sfrattosicuro-astro/actions

Tutto il lavoro su questo progetto deve avvenire dentro la cartella sopra. Non esistono altre copie attive del repo (vecchi path tipo `Dropbox\sfratto_sicuro\astro_copie\...` sono obsoleti).

## Deploy: workflow git -> GitHub Actions

Il deploy in produzione è triggerato da `git push` su `main`. La GitHub Action fa build + upload FTPS su SiteGround. Workflow normale:

```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"

# 1. Allinea con remote (autostash protegge modifiche locali non committate)
git pull --rebase --autostash origin main

# 2. (opzionale) build locale per verificare che compili
npm run build

# 3. Stage + commit dei soli file pertinenti al lavoro corrente
git add <path-specifici>
git commit -m "feat: ..."

# 4. Push -> triggera GitHub Actions -> deploy live
git push origin main
```

Tempi tipici: ~5-10 secondi per il push, ~3-5 minuti per il completamento del workflow Actions.

### Deploy diretto FTP (fallback)

`scripts\deploy.ps1` è un fallback che fa upload FTPS diretto a SiteGround senza passare per GitHub Actions. Si usa quando:
- la pipeline Actions è ferma o lenta
- bisogna riallineare il server senza creare un commit

```powershell
cd "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
.\scripts\deploy.ps1                # build + sitemap + verify + upload
.\scripts\deploy.ps1 -SkipBuild     # salta `npm run build`
.\scripts\deploy.ps1 -SkipVerify    # salta verify-site-surface
```

Lo script legge il dist da `C:\Users\danil\.astro-local-builds\retrograde-ring\dist` (path configurato in `astro.config.mjs` per evitare lock di Dropbox sulla cartella `dist/` interna al repo).

## Git: line endings (CRLF)

**Il problema**: Edit/Write tool salvano LF, ma il repo usa CRLF (Windows). Senza normalizzazione un edit puo' produrre diff di centinaia di righe spurie.

### ⚠️ PRIMA REGOLA: quasi sempre NON serve normalizzare nulla

Il `.gitattributes` del repo forza gia' `* text=auto eol=crlf`: Git gestisce la conversione da solo al momento del commit (i warning «CRLF will be replaced by LF» sono quello, non un errore). **Prima di normalizzare a mano, guarda il diff**: se `git diff --stat` mostra solo le righe che hai davvero toccato, non c'e' niente da sistemare.

### ⚠️ IL COMANDO DI NORMALIZZAZIONE CORROMPE L'UTF-8 SE SCRITTO MALE

Incidente reale del 12 agosto 2026 (installazione del pixel TikTok), intercettato ispezionando il diff **prima** del commit. Questo comando — che era quello documentato qui — legge il file con la codepage ANSI di sistema e lo riscrive in UTF-8:

```powershell
# ❌ NON USARE: distrugge i caratteri non ASCII
$text = Get-Content -Raw $f
[System.IO.File]::WriteAllText("$PWD\$f", $text)
```

Effetto su `LandingExperimentPage.astro`: `€1.300` → `â‚¬1.300`, `Sì` → `SÃ¬`, `è` → `Ã¨`, `’` → `â€™`, `«»` → `Â«Â»`.

Non e' solo un problema estetico: `replaceAugustPrice` cerca `/€1\.300/` per costruire la promo di agosto. Con il simbolo corrotto la sostituzione non aggancia piu' nulla e la landing mostra **l'hero a €1.000 e le FAQ a €1.300**. Un danno di questo tipo passa il build senza un solo warning.

**Versione corretta** (encoding esplicito in lettura E scrittura), per un singolo file:
```powershell
$f = "src\data\sedi.json"
$text = [System.IO.File]::ReadAllText("$PWD\$f", [System.Text.Encoding]::UTF8)
$text = ($text -replace "`r`n","`n") -replace "`n","`r`n"
[System.IO.File]::WriteAllText("$PWD\$f", $text, (New-Object System.Text.UTF8Encoding $false))
```

Il `$false` di `UTF8Encoding` evita di aggiungere il BOM, che sui file `.astro` e `.json` e' a sua volta una sorgente di problemi.

**Fix di massa** prima di un commit (stessa accortezza):
```powershell
git diff --name-only | ForEach-Object {
  if ($_ -match '\.(js|ts|css|html|md|json|yml|yaml|astro|mjs|cjs|jsx|tsx)$' -and (Test-Path $_)) {
    $t = [System.IO.File]::ReadAllText("$PWD\$_", [System.Text.Encoding]::UTF8)
    [System.IO.File]::WriteAllText("$PWD\$_", (($t -replace "`r`n","`n") -replace "`n","`r`n"), (New-Object System.Text.UTF8Encoding $false))
  }
}
```

**Controllo dopo qualunque normalizzazione** (da bash, prima di committare):
```bash
node -e "const fs=require('fs');for(const f of process.argv.slice(1)){const t=fs.readFileSync(f,'utf8');console.log(f,'| mojibake:',/Ã|â€|â‚¬|Â«|Â§/.test(t));}" <file...>
```
Se stampa `mojibake: true` la codifica e' andata: `git checkout -- <file>` e riapplica le modifiche senza normalizzare.

## Struttura Astro

- `src/pages/` - route sorgente
- `src/data/sedi.json` - dati 137 sedi (tribunali) con `tribunaleInfo` reale
- `src/data/site.json`, `landing-configs.json`, `service-pages.ts` - altri dati statici
- `src/lib/home-model.ts` - tipi TypeScript condivisi (incluso `TribunaleInfo`)
- `public/` - asset statici copiati raw nel build (no transform)
- `public/assets/js/main.js` - JS globale della landing principale
- `public/landing-v3/` - landing dedicata ads (target sitelink Google Ads)
- `dist/` - output build (gitignored, normalmente in `~/.astro-local-builds/retrograde-ring/dist`)
- `scripts/` - script Node.js operativi (apply-batchN.mjs, generate-sitemaps.mjs, verify-site-surface.mjs, deploy.ps1)

## Landing v3 + sitelink Google Ads

La landing `landing-v3/index.html` è target dei sitelink della campagna "Avvocato per Sfratto" (customer 865-789-5088, campaign 22849022328). Sitelink attivi con tag `SL_V3_*` puntano ad anchor del DOM.

**Section ID realmente presenti nel DOM della landing-v3** (verificati 19 aprile 2026):
`#main-content`, `#calcolatore-perdite`, `#cta-rapida`, `#recensioni-google`, `#rimborso-spese`, `#come-funziona`, `#costi-trasparenza`, `#perche-sceglierci`, `#faq`, `#contatti`.

Gli 8 sitelink attuali (`#hero`, `#servizi`, `#come-funziona`, `#prezzi`, `#faq`, `#chi-siamo`, `#recensioni`, `#contatti`) hanno 4 mismatch con il DOM: `#servizi`, `#prezzi`, `#chi-siamo`, `#recensioni` NON esistono come ID. Da rimappare (es. `#prezzi`->`#costi-trasparenza`, `#chi-siamo`->`#perche-sceglierci`, `#recensioni`->`#recensioni-google`). `#hero` non esiste ma lo scroll fallisce silenziosamente -> utente atterra in cima, comportamento accettabile.

**Fix hash-scroll esterno (aprile 2026)**: `public/assets/js/main.js` include le funzioni `scrollToHash()` e `initInitialHashScroll()` per gestire l'arrivo con hash da Google SERP. Il vecchio `initSmoothScroll()` gestiva solo i click interni. Senza il nuovo handler, arrivando da un sitelink l'utente atterrava sull'hero invece che sulla sezione target.

## Landing V3/V4 + A/B test pricing (aggiornamento 26 luglio 2026)

Le route `/landing-v3/` e `/landing-v4/` condividono ora il componente
`src/components/landing/LandingExperimentPage.astro`, così struttura, form,
prove sociali e tracking restano identici nel test:

- **V3 controllo:** formula completa da EUR 1.300 fino alle chiavi.
- **V4 trattamento:** EUR 800 fase di convalida, EUR 700 eventuale fase
  esecutiva, oppure EUR 1.300 formula completa consigliata.
- **Experiment ID:** `pricing_v3_v4_2026_07`.
- **Documento operativo:** `docs/ab-test-landing-v3-v4-2026-07.md`.

Su mobile la promessa, il titolo, la prova sociale e i benefici vengono prima
del form. Il vecchio ordinamento form-first non va ripristinato senza dati che
lo giustifichino. La V4 usa `LandingV4PricingSection.astro` e
`LandingV4FaqSection.astro`; la V3 mantiene i blocchi economici precedenti.

Il tracking condiviso è gestito da
`src/components/LandingExperimentTracking.astro`: invia la vista variante in
GA4 e aggiunge ai form `experiment_id` e `experiment_variant`. Restano attivi
anche gli eventi diagnostici `form_start`, `submit_attempt` e
`submit_blocked`.

Le recensioni Google reali sono **22**. Il fallback è centralizzato in
`business-config.json` come `socialProof.googleReviewsTotal`; il caricamento
live tramite `/php/get-reviews.php` può aggiornare il DOM, con fallback
`public/assets/data/reviews-cache.json`. Non reintrodurre numeri hardcodati nei
componenti.

Build verificata il 26 luglio 2026: **213 pagine**, completata senza errori.
Il rilascio V3/V4 è destinato alla campagna Google Ads `Avvocato per Sfratto`
(customer `865-789-5088`, campaign `22849022328`).

## Promozione «V3 Agosto» 2026 (aggiornamento 9 agosto 2026)

Terza landing dallo stesso componente: `/landing-v3-agosto/`
(`<LandingExperimentPage variant="v3" campaign="august2026" />`), con
**€1.000 IVA e cassa incluse** per mandato sottoscritto **entro il 31 agosto 2026**.
Prezzo e scadenza vivono in `business-config.json` →
`pricing.promozioni.agosto2026`: non ricopiarli nei componenti.

Documento operativo completo: **`docs/promo-v3-agosto-2026.md`** (offerta, esito
della verifica integrale, ID dei 5 annunci `_agosto`, mappa dei sitelink, blocco
Google residuo, checklist di rientro del 1° settembre).

Tre punti da non perdere:

- **Anchor**: dopo il redesign di luglio `#costi-trasparenza` e `#perche-sceglierci`
  **non esistono più** (ora `#prezzo` e `#il-tuo-avvocato`). Verificare sempre
  l'anchor sul DOM di produzione prima di usarlo in un sitelink.
- **Sospensione feriale**: l'esclusione riguarda la **sola fase sommaria di
  convalida** (Cass. civ. Sez. III 25601/2016). Dopo l'opposizione, nel rito
  ordinario la sospensione si applica. Mai formule assolute nel copy.
- **Asset condivisi**: sitelink e callout si agganciano a campagna o gruppo, mai al
  singolo annuncio. Far convivere nello stesso gruppo un'offerta da €1.300 e una da
  €1.000 con asset coerenti per entrambe è impossibile: o si separa la struttura, o
  gli asset restano senza prezzo e senza URL contraddittori.

⚠️ Il connettore MCP `google-ads` è fermo alla v20 dell'API (dismessa) e restituisce
`UNSUPPORTED_VERSION`. Usare la libreria Python diretta con `version="v23"` — vedi
§9 del documento operativo.

## Progetto sedi/tribunali (chiuso)

`tribunali-batch-progress.json` traccia l'arricchimento di `sedi.json.tribunaleInfo` per tutte le 137 sedi. Stato al 30 aprile 2026: **137/137 completate**, batch 0-5 chiusi, zero duplicati `udienze`/`note`. La skill `tribunali-sedi-ansalone` documenta il workflow se serve riprendere.

## Script operativi correlati (potrebbero essere fuori repo)

Alcuni script che operano sulla campagna Google Ads vivono storicamente in `C:\Users\danil\Dropbox\DESKTOP\` (es. `sitelinks_v3_sync.py`, `run-sitelinks-v3-sync.ps1`). Non sono parte del repo Astro: vanno gestiti separatamente, eventualmente migrati dentro `scripts/` se diventano stabili.

## Lesson learned

- Sempre `git pull --rebase --autostash origin main` prima del commit: il remote può avanzare per commit da altre macchine o da GitHub Actions che pusha sitemap. `--autostash` evita blocchi se ci sono modifiche locali non committate.
- File in `public/` sono copiati raw in `dist/`: un edit a `public/assets/js/main.js` si propaga 1:1 al deploy.
- **Cache CDN SiteGround**: modifiche a file statici (`main.js`, `calculator.js`, ecc.) NON si propagano istantaneamente al browser dopo il deploy. Il CDN continua a servire la versione cached finché non scade il TTL. **Soluzione**: helper `src/lib/asset-version.ts` con `versionedSrc('/path/to/file.js')` calcola SHA-256 del file a build time e aggiunge `?v=<hash>`. File invariato = hash uguale = cache CDN lavora normalmente. Applicato su landing-v2 e landing-v3.
- **Dropbox + Astro build**: Dropbox client tiene handle aperti su cartelle sincronizzate -> EBUSY durante `rmdir .astro` fatto da Astro a inizio build. Fix: `Set-Content -Path ".astro" -Stream com.dropbox.ignored -Value 1` (idem per `dist` e `node_modules`). Per evitare del tutto il problema, il `dist/` di build è ridiretto fuori dalla cartella Dropbox tramite `outDir` in `astro.config.mjs` (`~/.astro-local-builds/retrograde-ring/dist`).
- **Selezione file da committare**: usare `git add <path-specifici>` quando il `git status` mostra modifiche di lavori paralleli (es. `_gclid-patch/`, `public/.htaccess`) che non c'entrano con il commit corrente. Evitare `git add -A` se non si è sicuri di voler portare via tutto.
