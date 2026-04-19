# ============================================================================
# build-skill-archive.ps1
# Impacchetta skill-source\ in un archivio .skill installabile in Claude Desktop
# Output: C:\Users\danil\Desktop\sfratto-ads-gclid-ansalone.skill
# ============================================================================

$ErrorActionPreference = 'Stop'

$sourceDir = 'C:\Users\danil\Dropbox\sfratto_sicuro\astro_copie\2026_03_19\sfrattosicuro-astro\retrograde-ring\_gclid-patch\oci-pipeline\skill-source'
$skillName = 'sfratto-ads-gclid-ansalone'
$destZip   = "C:\Users\danil\Desktop\$skillName.zip"
$destSkill = "C:\Users\danil\Desktop\$skillName.skill"

if (-not (Test-Path $sourceDir)) {
    Write-Error "Cartella sorgente non trovata: $sourceDir"
    exit 1
}

$skillMd = Join-Path $sourceDir 'SKILL.md'
if (-not (Test-Path $skillMd)) {
    Write-Error "SKILL.md mancante in $sourceDir"
    exit 1
}

if (Test-Path $destZip)   { Remove-Item $destZip -Force }
if (Test-Path $destSkill) { Remove-Item $destSkill -Force }

Write-Host "Contenuto sorgente:"
Get-ChildItem -Recurse $sourceDir | ForEach-Object {
    $rel = $_.FullName.Substring($sourceDir.Length).TrimStart('\')
    if ($_.PSIsContainer) {
        Write-Host ("  [dir]  " + $rel)
    } else {
        Write-Host ("  [file] " + $rel)
    }
}

Compress-Archive -Path (Join-Path $sourceDir '*') -DestinationPath $destZip -Force

Move-Item -Path $destZip -Destination $destSkill -Force

if (-not (Test-Path $destSkill)) {
    Write-Error "Archiviazione fallita: $destSkill non creato"
    exit 1
}

$size = (Get-Item $destSkill).Length
Write-Host ""
Write-Host "============================================"
Write-Host "OK: archivio skill creato"
Write-Host ("  Path: " + $destSkill)
Write-Host ("  Size: " + $size + " byte")
Write-Host "============================================"
Write-Host ""
Write-Host "Per installare in Claude Desktop:"
Write-Host "  1. Apri Claude Desktop"
Write-Host ("  2. Trascina " + $skillName + ".skill nella chat")
Write-Host "  3. Clicca sul pulsante 'Save skill' che compare"
