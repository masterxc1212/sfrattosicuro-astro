# retrograde-ring — Sfratto Sicuro (Astro)

Progetto Astro del sito www.sfrattosicuro.it. Build statico deployato via GitHub Actions su SiteGround (FTPS).

## Deploy: usa lo script unificato

**Script**: `C:\Users\danil\Dropbox\DESKTOP\deploy-retrograde.ps1`

Uso normale:
```powershell
cd "C:\Users\danil\Dropbox\DESKTOP"
.\deploy-retrograde.ps1 "messaggio commit"
```

Con opzioni:
```powershell
.\deploy-retrograde.ps1 "msg" -SkipBuild    # salta npm run build
.\deploy-retrograde.ps1 "msg" -DryRun       # mostra cosa farebbe senza push
```

Lo script fa in ordine:
1. `cd` al repo (path hardcoded)
2. `git pull --rebase origin main` — evita push rejection
3. Renormalizza CRLF sui file modificati (js/ts/css/html/md/json/yml/astro/...) — fix per diff spurio generato dall'Edit tool di Claude
4. `npm run build` (salvo `-SkipBuild`)
5. `git add -A`
6. `git commit -m <msg>`
7. `git push`

Risultato: da modifiche locali a deploy triggerato su SiteGround in un singolo comando, ~10-30 secondi.

## Git: line endings

**Il problema**: l'Edit tool di Claude salva i file con LF, ma questo repo usa CRLF (Windows). Senza normalizzazione, ogni edit genera diff di migliaia di righe spurie.

**La soluzione**: lo script `deploy-retrograde.ps1` renormalizza automaticamente CRLF prima del commit. Non toccare `.gitattributes` del repo salvo necessità strutturali.

Se si lavora senza lo script e serve normalizzare manualmente un file:
```powershell
$text = Get-Content -Raw "<path>"
$text = ($text -replace "`r`n","`n") -replace "`n","`r`n"
[System.IO.File]::WriteAllText("$PWD\<path>", $text)
```

## Paths chiave

- Repo locale: `C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring`
- Remote: `https://github.com/masterxc1212/sfrattosicuro-astro.git` (branch `main`)
- Deploy target: SiteGround via FTPS, attivato da GitHub Actions
- Monitor CI: https://github.com/masterxc1212/sfrattosicuro-astro/actions

Struttura Astro:
- `src/pages/` — route sorgente
- `public/` — asset statici copiati raw nel build
- `public/assets/js/main.js` — JS globale della landing
- `public/landing-v3/` — landing ads (Google Ads sitelink target)
- `dist/` — output build (gitignored)

## Landing v3 + sitelink Google Ads

La landing `landing-v3/index.html` è target dei sitelink della campagna "Avvocato per Sfratto" (customer 865-789-5088, campaign 22849022328). Sitelink attivi con tag `SL_V3_*` puntano ad anchor del DOM.

**Section ID realmente presenti nel DOM della landing-v3** (verificati 19 aprile 2026):
`#main-content`, `#calcolatore-perdite`, `#cta-rapida`, `#recensioni-google`, `#rimborso-spese`, `#come-funziona`, `#costi-trasparenza`, `#perche-sceglierci`, `#faq`, `#contatti`.

Gli 8 sitelink attuali (`#hero`, `#servizi`, `#come-funziona`, `#prezzi`, `#faq`, `#chi-siamo`, `#recensioni`, `#contatti`) hanno 4 mismatch con il DOM: `#servizi`, `#prezzi`, `#chi-siamo`, `#recensioni` NON esistono come ID. Da rimappare (es. `#prezzi`→`#costi-trasparenza`, `#chi-siamo`→`#perche-sceglierci`, `#recensioni`→`#recensioni-google`). `#hero` non esiste ma lo scroll fallisce silenziosamente → utente atterra in cima, comportamento accettabile.

**Fix hash-scroll esterno (aprile 2026)**: `public/assets/js/main.js` include le funzioni `scrollToHash()` e `initInitialHashScroll()` per gestire l'arrivo con hash da Google SERP. Il vecchio `initSmoothScroll()` gestiva solo i click interni. Senza il nuovo handler, arrivando da un sitelink l'utente atterrava sull'hero invece che sulla sezione target.

## Script operativi correlati

- `C:\Users\danil\Dropbox\DESKTOP\sitelinks_v3_sync.py` — migrazione/verifica sitelink Google Ads (dry-run / execute / verify-only)
- `C:\Users\danil\Dropbox\DESKTOP\run-sitelinks-v3-sync.ps1` — launcher PowerShell per sitelinks_v3_sync.py

## Lesson learned

- Sempre `git pull --rebase` prima del commit: il remote può avanzare per commit da altre macchine o da GitHub Actions che pusha risorse (es. sitemap). Lo script usa `--autostash` così modifiche locali non committate non bloccano il pull.
- Lo script `deploy-retrograde.ps1` elimina gli errori ricorrenti: cd perso, LF vs CRLF, push rejection, Dropbox lock su `.astro/`
- File in `public/` sono copiati raw in `dist/`: non c'è trasformazione, quindi un edit in `public/assets/js/main.js` si propaga 1:1 al deploy
- **Cache CDN SiteGround**: modifiche a file statici (`main.js`, `calculator.js`, ecc.) NON si propagano istantaneamente al browser anche dopo il deploy. Il CDN continua a servire la versione cached finché non scade il TTL. **Soluzione permanente**: helper `src/lib/asset-version.ts` con `versionedSrc('/path/to/file.js')` calcola SHA-256 del file a build time e aggiunge `?v=<hash>` automatico. Quando il file cambia, cambia l'hash -> browser bypassa cache. File invariato = hash uguale = cache CDN lavora normalmente. Applicato su landing-v2 e landing-v3.
- **Dropbox + Astro build**: Dropbox client tiene handle aperti su cartelle sincronizzate -> EBUSY durante `rmdir .astro` fatto da Astro a inizio build. Fix permanente: `Set-Content -Path ".astro" -Stream com.dropbox.ignored -Value 1` (idem per `dist` e `node_modules`). Lo script di deploy fa anche un cleanup preventivo di `.astro` + retry automatico in caso di fallimento.
