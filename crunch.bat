@echo off
echo Crunching jallegro.js
java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --generate_exports --js jallegro.js --js_output_file jalleg.js
echo Written crunched jallegro to jalleg.js