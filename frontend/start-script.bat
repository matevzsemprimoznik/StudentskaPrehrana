@echo off
rename .env temp.txt
findstr /v /i /L /c:"REST" temp.txt>.env
del temp.txt
for /f "tokens=14 delims= " %%a in ('ipconfig^|find "IPv4"') do set ip=%%a
set output=REST_URI=http://%ip%:8000
echo %output%>>.env