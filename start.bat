@echo off
REM Pokrece lokalni server za Trakop stranicu i otvara je u browseru.
cd /d "%~dp0"
start "" cmd /c "timeout /t 5 >nul & start http://localhost:5173"
npm start
