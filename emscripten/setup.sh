#!/bin/bash

# Clean up
echo "Cleaning up"
rm -f -r ./build
mkdir ./build
cp -r ../examples/data ./build/data
rm -f CMakeCache.txt
rm -f -r CMakeFiles

# Flatten
echo "Setting up lib"
for filename in ../build/*.js; do
  [ -e "$filename" ] || continue
  cat "$filename" >> ./build/allegro.library.js
done

# Replace
if [ "$OSTYPE" == "osx" ]; then
  sed -i "" "s/export.*\*.*from.*$//g" ./build/allegro.library.js
  sed -i "" "s/import.*$//g" ./build/allegro.library.js
  sed -i "" "s/export//g" ./build/allegro.library.js
else
  sed -i """s/export.*\*.*from.*$//g" ./build/allegro.library.js
  sed -i """s/import.*$//g" ./build/allegro.library.js
  sed -i """s/export//g" ./build/allegro.library.js
fi

# Done!
echo "Done!"
echo "Run 'cmake .' or 'emcmake cmake .' to build to binary or web"
read -p "Press any key..."

