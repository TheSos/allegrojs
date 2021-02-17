#!/bin/bash

# Build
yarn build

# Clean up
rm -f -r ./build
mkdir ./build
cp -r ../examples/data ./build/data

# Flatten
for filename in ../build/*.js; do
  [ -e "$filename" ] || continue
  cat "$filename" >> ./build/allegro.library.js
done

# Replace
sed -i "" "s/export.*\*.*from.*$//g" ./build/allegro.library.js
sed -i "" "s/import.*$//g" ./build/allegro.library.js
sed -i "" "s/export//g" ./build/allegro.library.js

# Run EMCC compiler
emcc --pre-js ./build/allegro.library.js --js-library ./build/allegro.library.js --js-library library.js -I. -o ./build/exbmp.html exbmp.c -s ASYNCIFY -s 'ASYNCIFY_IMPORTS=["rest","allegro_ready"]' -s EXPORTED_FUNCTIONS='["_malloc","_main"]'
emcc --pre-js ./build/allegro.library.js --js-library ./build/allegro.library.js --js-library library.js -I. -o ./build/exstress.html exstress.c -s ASYNCIFY -s 'ASYNCIFY_IMPORTS=["rest","allegro_ready"]' -s EXPORTED_FUNCTIONS='["_malloc","_main"]'
emcc --pre-js ./build/allegro.library.js --js-library ./build/allegro.library.js --js-library library.js -I. -o ./build/exbounce.html exbounce.c -s ASYNCIFY -s 'ASYNCIFY_IMPORTS=["rest","allegro_ready"]' -s EXPORTED_FUNCTIONS='["_malloc","_main"]'
