@echo off
echo Generating docs for allegro.js...
doxygen Doxyfile
echo Cleaning up....
copy doc\html\allegro_8js.html allegro_8js.html
del /s /f /q doc\*.*
rd doc\html\search
rd doc\html
rd doc\latex
rd doc
echo Done!