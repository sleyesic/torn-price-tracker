@echo off
cd /d %~dp0
git add .
git commit -m "Auto push"
git push
pause
