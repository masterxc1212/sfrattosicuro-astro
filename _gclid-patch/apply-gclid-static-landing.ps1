# ============================================================================
# apply-gclid-static-landing.ps1
# Inserisce il tag <script src="/js/gclid-capture.js" defer></script>
# prima di </head> in public/landing/index.html (landing statica che NON
# passa per SiteLayout di Astro).
#
# Uso (da PowerShell, in qualsiasi cwd):
#   powershell -ExecutionPolicy Bypass -File `
#     "C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring\_gclid-patch\apply-gclid-static-landing.ps1"
#
# Idempotente: se il tag e' gia' presente non fa nulla.
# Crea backup .bak.<timestamp> del file originale.
# ============================================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'C:\Users\danil\.claude\projects\sfratto-sicuro'
$target      = Join-Path $projectRoot 'public\landing\index.html'

if (-not (Test-Path $target)) {
    Write-Error "File non trovato: $target"
    exit 1
}

# Verifica che il file referenziato esista (deve essere stato creato dallo script principale)
$jsFile = Join-Path $projectRoot 'public\js\gclid-capture.js'
if (-not (Test-Path $jsFile)) {
    Write-Warning "Attenzione: $jsFile NON esiste. Esegui prima apply-gclid-patch.ps1 oppure lo script faro' riferimento a un file mancante."
}

$content = Get-Content -Raw -Path $target -Encoding UTF8

# Idempotenza: se il tag c'e' gia', esci
if ($content -match '/js/gclid-capture\.js') {
    Write-Host "OK (no-op): il tag <script src=\"/js/gclid-capture.js\"> e' gia' presente in $target"
    exit 0
}

# Cerca il primo </head> case-insensitive e inserisci sopra
$pattern  = '</head>'
$idx      = $content.IndexOf($pattern, [System.StringComparison]::OrdinalIgnoreCase)
if ($idx -lt 0) {
    Write-Error "Tag </head> non trovato in $target. Patch annullata."
    exit 1
}

$insertion = @"

  <!-- GCLID + UTM capture (attribuzione Google Ads) -->
  <script src="/js/gclid-capture.js" defer></script>

"@

# Backup
$timestamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupPath = "$target.bak.$timestamp"
Copy-Item $target $backupPath -Force
Write-Host "Backup: $backupPath"

# Inserisci immediatamente prima di </head>, preservando l'</head> originale
$newContent = $content.Substring(0, $idx) + $insertion + $content.Substring($idx)

# Scrivi UTF8 senza BOM (compatibile con il file originale)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($target, $newContent, $utf8NoBom)

Write-Host "OK: tag <script src=\"/js/gclid-capture.js\" defer></script> inserito prima di </head> in $target"
Write-Host ""
Write-Host "Prossimi step:"
Write-Host "  1. cd $projectRoot"
Write-Host "  2. npm run build"
Write-Host "  3. Verificare che dist/landing/index.html contenga 'gclid-capture.js'"
