@echo off
REM Deploy della nota "riservato a proprietari" sui contatti della landing-v3.
cd /d "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
if exist ".git\index.lock" del /f /q ".git\index.lock"
git add src/components/landing/LandingV3ContactSection.astro
git commit -m "feat(landing-v3): nota 'riservato a proprietari' su contatti telefono/WhatsApp"
REM pulisco grazie.html dal solo rumore EOL per evitare problemi di autostash
git checkout -- public/grazie.html
git pull --rebase origin main
git push origin main
echo.
echo FATTO. Push eseguito; CI in corso.
