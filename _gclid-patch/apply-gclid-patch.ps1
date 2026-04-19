# ============================================================================
# apply-gclid-patch.ps1
# Applica le patch GCLID al progetto sfratto-sicuro.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File apply-gclid-patch.ps1
# Lo script DEVE risiedere nella cartella _gclid-patch/ insieme a:
#   - GclidCaptureIsland.astro
#   - patches/SiteLayout.astro
#   - patches/ContactFormIsland.astro
#   - patches/LandingContactFormIsland.astro
#   - patches/gclid-capture-static.js
#
# Fa backup di ogni file sovrascritto in <file>.bak.<timestamp>.
# ============================================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'C:\Users\danil\.claude\projects\sfratto-sicuro'

if (-not (Test-Path $projectRoot)) {
    Write-Error "Project root non trovato: $projectRoot"
    exit 1
}

$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'

# Mapping: src (relativo a $PSScriptRoot) -> dest (relativo a $projectRoot)
# IsNew = true se il file non esiste ancora nel progetto (no backup)
$mappings = @(
    [PSCustomObject]@{ Src = 'GclidCaptureIsland.astro';                  Dest = 'src\components\GclidCaptureIsland.astro';                       IsNew = $true  }
    [PSCustomObject]@{ Src = 'patches\SiteLayout.astro';                  Dest = 'src\layouts\SiteLayout.astro';                                  IsNew = $false }
    [PSCustomObject]@{ Src = 'patches\ContactFormIsland.astro';           Dest = 'src\components\ContactFormIsland.astro';                        IsNew = $false }
    [PSCustomObject]@{ Src = 'patches\LandingContactFormIsland.astro';    Dest = 'src\components\landing\LandingContactFormIsland.astro';         IsNew = $false }
    [PSCustomObject]@{ Src = 'patches\gclid-capture-static.js';           Dest = 'public\js\gclid-capture.js';                                    IsNew = $true  }
)

foreach ($m in $mappings) {
    $srcPath  = Join-Path $PSScriptRoot $m.Src
    $destPath = Join-Path $projectRoot $m.Dest

    if (-not (Test-Path $srcPath)) {
        Write-Warning "SKIP (source non trovato): $srcPath"
        continue
    }

    $destDir = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Write-Host "Creata cartella: $destDir"
    }

    if ((Test-Path $destPath) -and -not $m.IsNew) {
        $backupPath = "$destPath.bak.$timestamp"
        Copy-Item $destPath $backupPath -Force
        Write-Host "Backup: $backupPath"
    }

    Copy-Item $srcPath $destPath -Force
    Write-Host "OK: $($m.Src) -> $($m.Dest)"
}

Write-Host ""
Write-Host "========================================================"
Write-Host "Patch GCLID applicata. Prossimi step:"
Write-Host "  1. cd $projectRoot"
Write-Host "  2. npm run build"
Write-Host "  3. Verificare dist/ contenga lo script di cattura"
Write-Host "  4. Per public/landing/index.html (statica): aggiungere"
Write-Host '       <script src="/js/gclid-capture.js" defer></script>'
Write-Host "     nel <head> oppure incollare inline il contenuto di"
Write-Host "     public\js\gclid-capture.js"
Write-Host "========================================================"
