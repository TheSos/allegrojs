@echo off
echo Generating docs for jallegro.js...
doxygen Doxyfile
echo Cleaning up....
copy doc\html\jallegro_8js.html index.html
del /s /f /q doc\*.*
rd doc\html\search
rd doc\html
rd doc\latex
rd doc
echo Done!