@echo off
cd /d "%~dp0"
start "Mnadani Backend" cmd /k "cd backend && venv\Scripts\python.exe manage.py runserver 8000"
start "Mnadani Frontend" cmd /k "npm.cmd run dev"
