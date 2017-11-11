#!/bin/sh
echo Generating docs for allegro.js...
doxygen Doxyfile
echo Cleaning up....
cp doc/html/allegro_8js.html allegro_8js.html
rm -rf doc
echo Done!
