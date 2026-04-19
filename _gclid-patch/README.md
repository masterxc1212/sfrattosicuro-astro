# Patch GCLID — Sfratto Sicuro

Pacchetto per abilitare la cattura di `gclid` + UTM sul sito e propagarli
nei form che inviano a `public/php/invia-email.php`.

## Contenuto

```
_gclid-patch/
├── README.md                         (questo file)
├── GCLID-PIPELINE-STATUS.md          (documento di memoria: tassonomia lead, valori, bootstrap bidding)
├── GclidCaptureIsland.astro          (FILE NUOVO → src/components/)
├── apply-gclid-patch.ps1             (script di applicazione automatica)
└── patches/
    ├── SiteLayout.astro              (sostituisce src/layouts/SiteLayout.astro)
    ├── ContactFormIsland.astro       (sostituisce src/components/ContactFormIsland.astro)
    ├── LandingContactFormIsland.astro (sostituisce src/components/landing/LandingContactFormIsland.astro)
    └── gclid-capture-static.js       (FILE NUOVO → public/js/gclid-capture.js, per landing statiche)
```

## Applicazione automatica (consigliata)

Da PowerShell, dentro questa cartella:

```powershell
cd "C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring\_gclid-patch"
powershell -ExecutionPolicy Bypass -File .\apply-gclid-patch.ps1
```

Lo script fa backup automatici (`.bak.<timestamp>`) di tutti i file sovrascritti.

## Applicazione manuale

Copia 1:1 ciascun file alla destinazione:

| Source (in questa cartella)                        | Destination (progetto)                                                        | Azione       |
|----------------------------------------------------|-------------------------------------------------------------------------------|--------------|
| `GclidCaptureIsland.astro`                         | `src\components\GclidCaptureIsland.astro`                                     | NEW          |
| `patches\SiteLayout.astro`                         | `src\layouts\SiteLayout.astro`                                                | OVERWRITE    |
| `patches\ContactFormIsland.astro`                  | `src\components\ContactFormIsland.astro`                                      | OVERWRITE    |
| `patches\LandingContactFormIsland.astro`           | `src\components\landing\LandingContactFormIsland.astro`                       | OVERWRITE    |
| `patches\gclid-capture-static.js`                  | `public\js\gclid-capture.js`                                                  | NEW          |

## Verifica post-applicazione

1. `cd C:\Users\danil\.claude\projects\sfratto-sicuro`
2. `npm run build`
3. Apri `dist/index.html` (o una delle landing buildate) e verifica che:
   - Nel `<head>` compaia lo script inline con `ss_gclid_v1`.
   - I form verso `/php/invia-email.php` abbiano gli hidden input `gclid`, `utm_*`, `keyword`.
4. Test end-to-end in locale (`npm run dev`):
   - Visita `http://localhost:4321/?gclid=TEST_GCLID_123&utm_source=google&utm_campaign=test`
   - Apri DevTools → Application → Cookies: dev'esserci `ss_gclid_v1` con il JSON atteso.
   - Vai alla pagina con il form, ispeziona i hidden input: devono già contenere `TEST_GCLID_123`.
   - Prova un submit (test PHP locale o staging): il POST deve includere i campi nel payload.

## Landing statiche (public/landing/index.html)

Le pagine in `public/` NON passano per `SiteLayout`, quindi lo script va incluso a mano.
Aggiungi nel `<head>` di `public/landing/index.html`:

```html
<script src="/js/gclid-capture.js" defer></script>
```

(il file `public/js/gclid-capture.js` viene creato dallo script di applicazione automatica)

In alternativa, se preferisci zero round-trip, incolla inline l'intero contenuto di
`patches/gclid-capture-static.js` dentro un `<script>...</script>` nel `<head>`.

## Rollback

Ogni file sostituito ha un backup `.bak.<timestamp>` nello stesso path.
Per rollback:

```powershell
Get-ChildItem C:\Users\danil\.claude\projects\sfratto-sicuro -Recurse -Filter '*.bak.*' |
  ForEach-Object {
    $original = $_.FullName -replace '\.bak\.\d+-\d+$',''
    Copy-Item $_.FullName $original -Force
  }
```

## Cosa fa il componente

- **Cattura**: legge `?gclid`, `?utm_source`, `?utm_medium`, `?utm_campaign`, `?utm_term`, `?utm_content`, `?keyword` dalla URL al primo landing.
- **Persiste**: salva tutto in un cookie `ss_gclid_v1` con `max-age=7_776_000` (90 giorni), `SameSite=Lax`, `Secure` se HTTPS.
- **Restore**: ad ogni pagina, legge il cookie e popola i `<input type="hidden" name="...">` già presenti nei form target.
- **Patch submit**: listener globale `submit` (in fase capture) che, per i form che matchano
  `action="/php/invia-email.php"` o selettori noti, inietta gli hidden input mancanti al volo.
- **Merge policy**: se l'utente torna con un nuovo GCLID, quello nuovo sovrascrive; i campi UTM mancanti nella nuova URL NON svuotano quelli già presenti nel cookie (last-non-empty wins).
