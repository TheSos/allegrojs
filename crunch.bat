@echo off
echo Crunching allegro.js
java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --generate_exports --js allegro.js --js_output_file alleg.js
echo Written crunched allegro to alleg.js