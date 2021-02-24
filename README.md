# allegro.ts

## a HTML5 game making library

---

## [GitHub](https://github.com/alegemaate/allegrots) - [API](https://alegemaate.com/allegrots/)

### What is allegro.ts?

_allegro.ts_ is a project which attempts to map the entire allegro 4 api to javascript in as close of a manner as possible.

This is based on [allegro.js](https://github.com/TheSos/allegrojs) an earlier project to bring the allegro 4 library to the browser. This differs by attempting to make a 1 to 1 mapping from allegro 4 to the browser which allows for the use as an emscripten library.

### Building

Install packages
`yarn`

Build core

```sh
yarn build
```

Build examples

```sh
yarn build-examples
```

Build Emscripten examples

```sh
cd emscripten
./build.sh
<emcmake> cmake .
```

### Generate docs

`yarn docs`

### Examples

#### Classics

- [exaccel](https://alegemaate.com/allegrots/examples/al_exaccel)
- [exbitmap](https://alegemaate.com/allegrots/examples/al_exbitmap)
- [exbuf](https://alegemaate.com/allegrots/examples/al_exbuf)
- [exconfig](https://alegemaate.com/allegrots/examples/al_exconfig)
- [exmidi](https://alegemaate.com/allegrots/examples/al_exmidi)
- [exmouse](https://alegemaate.com/allegrots/examples/al_exmouse)
- [exsample](https://alegemaate.com/allegrots/examples/al_exsample)
- [extimer](https://alegemaate.com/allegrots/examples/al_extimer)

#### Other

- [Simple Bitmap](https://alegemaate.com/allegrots/examples/exbmp)
- [Bouncing Ball](https://alegemaate.com/allegrots/examples/exbounce)
- [Simple Game](https://alegemaate.com/allegrots/examples/exgame)
- [Hello World!](https://alegemaate.com/allegrots/examples/exhello)
- [Python Turtle](https://alegemaate.com/allegrots/examples/exturtle)
- [Save Bitmap](https://alegemaate.com/allegrots/examples/exsavebmp)
- [Stress Test](https://alegemaate.com/allegrots/examples/stress)

```

```
