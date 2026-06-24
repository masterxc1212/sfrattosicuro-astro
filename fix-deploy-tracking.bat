@echo off
REM Ripristina grazie.html, aggancia il pixel Meta via JS esterno, e deploya il tracking Lead+Contact.
cd /d "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
if exist ".git\index.lock" del /f /q ".git\index.lock"

echo === ripristino grazie.html pulito da HEAD ===
git checkout -- public/grazie.html

echo === aggancio il pixel (una riga, UTF-8 no BOM, idempotente) ===
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='public/grazie.html'; $enc=New-Object System.Text.UTF8Encoding($false); $c=[System.IO.File]::ReadAllText($f,$enc); if($c -notmatch 'meta-pixel-grazie'){ $c=$c -replace '</body>', '    <script src=\"/assets/js/meta-pixel-grazie.js\" defer></script></body>'; [System.IO.File]::WriteAllText($f,$c,$enc); Write-Host 'INIETTATO' } else { Write-Host 'GIA PRESENTE' }"

echo === commit + deploy ===
git add public/grazie.html public/assets/js/meta-pixel-grazie.js src/components/MetaPixelTracking.astro
git commit -m "feat(tracking): Meta Pixel eventi Lead+Contact (grazie via JS esterno + componente landing)"
git pull --rebase origin main
git push origin main
echo.
echo FATTO. Push eseguito; CI in corso.
