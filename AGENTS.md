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

**Il problema**: Edit/Write tool salvano LF, ma il repo usa CRLF (Windows). Senza normalizzazione ogni edit produce diff di centinaia di righe spurie.

**Fix manuale** (da PowerShell) per un singolo file:
```powershell
$f = "src\data\sedi.json"
$text = Get-Content -Raw $f
$text = ($text -replace "`r`n","`n") -replace "`n","`r`n"
[System.IO.File]::WriteAllText("$PWD\$f", $text)
```

**Fix di massa** prima di un commit:
```powershell
git diff --name-only | ForEach-Object {
  if ($_ -match '\.(js|ts|css|html|md|json|yml|yaml|astro|mjs|cjs|jsx|tsx)$' -and (Test-Path $_)) {
    $t = Get-Content -Raw $_
    [System.IO.File]::WriteAllText("$PWD\$_", (($t -replace "`r`n","`n") -replace "`n","`r`n"))
  }
}
```

In alternativa il `.gitattributes` del repo già forza `* text=auto eol=crlf` su Windows, ma Git non riapplica le conversioni a file già modificati: la rinormalizzazione manuale resta utile dopo grossi edit batch.

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

Le landing `/landing-v3/`, `/landing-v4/` e `/landing-v3-agosto/` sono target degli asset della campagna "Avvocato per Sfratto" (customer 865-789-5088, campaign 22849022328). Dal 26 luglio 2026 sono tutte generate dallo stesso componente `src/components/landing/LandingExperimentPage.astro`, quindi **condividono la stessa struttura di anchor**.

**Section ID realmente presenti nel DOM (riverificati sulla produzione il 9 agosto 2026):**
`#main-content`, `#site-header`, `#come-funziona`, `#prezzo`, `#recensioni-google`, `#il-tuo-avvocato`, `#faq`, `#contatti`, `#form-rapido`, `#procedura-protocollo`, `#provvedimenti-carousel`, `#hero-form`, `#total-reviews` (+ `#august-notice-title` solo sulla landing agosto).

⚠️ **Non esistono più** gli anchor citati nelle versioni precedenti di questo file: `#costi-trasparenza`, `#perche-sceglierci`, `#calcolatore-perdite`, `#cta-rapida`, `#rimborso-spese`. Il redesign di luglio 2026 li ha sostituiti — in particolare `#costi-trasparenza` → **`#prezzo`** e `#perche-sceglierci` → **`#il-tuo-avvocato`**. Non usarli mai come destinazione di un sitelink: lo scroll fallisce in silenzio e l'utente resta in cima alla pagina.

**Regola operativa**: prima di creare o modificare un sitelink, verificare che l'anchor esista davvero nel DOM di produzione, per esempio con
`curl -s <url> | grep -o 'id="[a-z0-9-]*"' | sort -u`.

Stato dei sitelink di campagna al 9 agosto 2026: 6 sitelink, tutti verso `/landing-v3-agosto/` con anchor verificati (vedi `docs/promo-v3-agosto-2026.md`).

**Fix hash-scroll esterno (aprile 2026)**: `public/assets/js/main.js` include le funzioni `scrollToHash()` e `initInitialHashScroll()` per gestire l'arrivo con hash da Google SERP. Il vecchio `initSmoothScroll()` gestiva solo i click interni. Senza il nuovo handler, arrivando da un sitelink l'utente atterrava sull'hero invece che sulla sezione target.

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
