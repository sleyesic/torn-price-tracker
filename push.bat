@echo off
cd /d %~dp0

git add .
git diff --cached --quiet
if %errorlevel%==0 (
    echo Rien à commit.
) else (
    git commit -m "Auto push"
    git push || git push --set-upstream origin main
)

pause
