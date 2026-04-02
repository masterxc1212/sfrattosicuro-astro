# deploy.ps1 - Deploy completo sfrattosicuro.it
# Uso: cd <repo>; .\scripts\deploy.ps1
# Flags: -SkipBuild (salta build), -SkipVerify (salta verify)

param(
  [switch]$SkipBuild,
  [switch]$SkipVerify
)

$ErrorActionPreference = "Stop"

$distDir = "C:\Users\danil\.astro-local-builds\retrograde-ring\dist"
$ftpBase = "ftp://ftp.sfrattosicuro.it/sfrattosicuro.it/public_html"
$ftpUser = "openclaw@sfrattosicuro.it:Drayhomp1!"

# Helper: upload con retry
function Upload($local, $remote) {
  for ($i = 1; $i -le 3; $i++) {
    curl.exe -s -T $local $remote -u $ftpUser --ftp-create-dirs 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { return }
    Start-Sleep -Seconds 2
  }
  Write-Warning "FAILED: $remote"
}

# 1. BUILD
if (-not $SkipBuild) {
  Write-Host "=== BUILD ===" -ForegroundColor Cyan
  npm run build
  if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 1) { throw "Build fallita" }
  # Postbuild potrebbe non girare su Dropbox per EBUSY - esegui sempre esplicitamente
  Write-Host "--- Generazione sitemap ---"
  node scripts/generate-sitemaps.mjs
}

# 2. VERIFY
if (-not $SkipVerify) {
  Write-Host "=== VERIFY ===" -ForegroundColor Cyan
  $verifyOut = node scripts/verify-site-surface.mjs 2>&1 | Out-String
  Write-Host $verifyOut
  if ($verifyOut -match "VERIFY_RESULT: FAILED") { throw "Verify fallita - deploy bloccato" }
  Write-Host "Verify PASSED" -ForegroundColor Green
}

# 3. ASSETS CSS/JS
Write-Host "=== ASSETS CSS/JS ===" -ForegroundColor Cyan
$newAssets = Get-ChildItem "$distDir\_astro" | ForEach-Object {
  Upload $_.FullName "$ftpBase/_astro/$($_.Name)"
  $_.Name
}
Write-Host "  $($newAssets.Count) file caricati"

# 4. CLEANUP CSS VECCHI SUL SERVER
Write-Host "=== CLEANUP CSS VECCHI ===" -ForegroundColor Cyan
$currentCss = (Get-ChildItem "$distDir\_astro" -Filter "*.css").Name
$serverList = curl.exe -s "$ftpBase/_astro/" -u $ftpUser --list-only 2>&1
$serverCss = $serverList | Select-String "\.css" | ForEach-Object { $_.ToString().Trim() }
foreach ($f in $serverCss) {
  if ($currentCss -notcontains $f) {
    curl.exe -s -Q "DELE /_astro/$f" "ftp://ftp.sfrattosicuro.it/" -u $ftpUser 2>&1 | Out-Null
    Write-Host "  Deleted: $f"
  }
}

# 5. HTACCESS
Write-Host "=== .HTACCESS ===" -ForegroundColor Cyan
$htaccessDist = "$distDir\.htaccess"
if (Test-Path $htaccessDist) {
  Upload $htaccessDist "$ftpBase/.htaccess"
  Write-Host "  .htaccess caricato"
}

# 6. PAGINE PRINCIPALI
Write-Host "=== PAGINE PRINCIPALI ===" -ForegroundColor Cyan
$mainPages = @("index.html","chi-siamo/index.html","servizi/index.html","sedi/index.html",
               "blog/index.html","sitemap.xml","sitemap-pages.xml",
               "blog/post-sitemap.xml","blog/sitemap_index.xml",
               "privacy-policy/index.html","cookie-policy/index.html","termini/index.html",
               "favicon.ico","favicon.svg","robots.txt")
foreach ($p in $mainPages) {
  $local = "$distDir\$($p -replace '/','\\')"
  if (Test-Path $local) {
    Upload $local "$ftpBase/$p"
    Write-Host "  $p"
  }
}

# 7. BLOG
Write-Host "=== BLOG ===" -ForegroundColor Cyan
$blogCount = 0
Get-ChildItem "$distDir\blog" -Directory | ForEach-Object {
  $f = "$($_.FullName)\index.html"
  if (Test-Path $f) { Upload $f "$ftpBase/blog/$($_.Name)/index.html"; $blogCount++ }
}
Write-Host "  $blogCount articoli"

# 8. SERVIZI
Write-Host "=== SERVIZI ===" -ForegroundColor Cyan
Get-ChildItem "$distDir\servizi" -Directory | ForEach-Object {
  $f = "$($_.FullName)\index.html"
  if (Test-Path $f) { Upload $f "$ftpBase/servizi/$($_.Name)/index.html"; Write-Host "  $($_.Name)" }
}

# 9. SEDI
Write-Host "=== SEDI ===" -ForegroundColor Cyan
$sediCount = 0
Get-ChildItem "$distDir\sedi" -Directory | ForEach-Object {
  $f = "$($_.FullName)\index.html"
  if (Test-Path $f) {
    Upload $f "$ftpBase/sedi/$($_.Name)/index.html"
    $sediCount++
    if ($sediCount % 30 -eq 0) { Write-Host "  $sediCount sedi..." }
  }
}
Write-Host "  Totale: $sediCount sedi"

Write-Host "=== DEPLOY COMPLETATO ===" -ForegroundColor Green
Write-Host "Live: https://www.sfrattosicuro.it/"
