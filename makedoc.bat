@echo off
echo Generating docs for jallegro.js...
doxygen Doxyfile
echo Cleaning up....
copy doc\jallegro*.* .
del /s /f /q doc\*.*
del doc
echo Done!