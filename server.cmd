@echo off
color 30
echo ==================================
echo Levantando Servidor...
echo ==================================
set DEBUG=syamyc-web:* & npm run develop
pause
exit