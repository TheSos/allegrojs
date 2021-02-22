#!/bin/bash
# Clean up
echo "Setting up lib"
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
function build_file {
  echo "Building $1"
  emcc --pre-js ./build/allegro.library.js --js-library ./build/allegro.library.js --js-library library.js -I. -o ./build/$1.html $1.c -s ASYNCIFY -s 'ASYNCIFY_IMPORTS=["rest","allegro_ready","readkey"]' -s EXPORTED_FUNCTIONS='["_malloc","_main"]'
}

build_file "musicmaker"
build_file "exbmp"
build_file "exstress"
build_file "exbounce"
build_file "exflip"
build_file "exaccel"
