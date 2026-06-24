@echo off
REM Deploy delle creative Meta (public/assets/meta) -> CI SiteGround.
cd /d "C:\Users\danil\Dropbox\claude_projects\sfratto-sicuro"
if exist ".git\index.lock" del /f /q ".git\index.lock"
git add public/assets/meta
git commit -m "assets(meta): creative Sfratto Sicuro per campagna Meta (3 concept x 3 formati)"
git pull --rebase origin main
git push origin main
echo.
echo FATTO. Push eseguito; la CI builda e carica su SiteGround.
