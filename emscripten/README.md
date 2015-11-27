## A lousy C port of a lousy JS port of a C library

*Allegro have been to JS and back*

**You think you're a hardcore allegro programmer? PROVE IT!**

### How do I make a C game for allegro.js?

1. Clone this repository
2. Install emscripten
3. Read `allegro.h`
4. Read and understand the examples
5. Write code
6. Compile-it
7. Enjoy

You don't need to write a single line of Javascript or HTML ! !

### How different is it from allegro.js

There is several tiny differences:
* All globals are functions (because emscripten)
* Because of name clash, rand and log have been renamed to rand16 and logmsg
* When passing an array parameter, you'll also have to pass its length
* There is no such thing as default parameters, closures, etc. (this is C programming, for real)

### How to compile C code into an HTML+Javascript program?

Compile your code with `emcc`:
```bash
emcc --pre-js ../allegro.js --js-library ../allegro.js --js-library library.js -I. -o my_game.html my_game.c
```

Open the created html file with your favorite JS enabled internet browser.

