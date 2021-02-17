/**
	You must concatenate allegro.js and this file before you try to use
	this file as an emscripten JS library.
	cat ../allegro.js > lib.js && cat library.js >> lib.js

	I'm an emscripten library, the “glue” code between C and JS
**/

var AllegroJS = {
  // PRIVATE STUFF
  $ALLEG: {
    // HANDLERS
    // Index 0 is reserved for default values
    bitmaps: [null],
    bitmap_addrs: [null],
    samples: [null],
    fonts: [null],
    // POINTER TO CANVAS
    screen: null,
    // C ARRAY POINTERS
    key: null,
    pressed: null,
    released: null,
    touch: null,
    touch_pressed: null,
    touch_released: null,

    // PRIVATE FUNCTIONS
    // Writes `array`(array of integers) to memory at address `buffer`
    writeArray32ToMemory: function (array, buffer) {
      for (var i = 0; i < array.length; i++) {
        HEAP32[(buffer + i * 4) >> 2] = array[i];
      }
    },
    // Reads `length` integers from memory at address `buffer`
    ReadArray32FromMemory: function (buffer, length) {
      var res = [];
      for (var i = 0; i < length; i++) {
        res.push(HEAP32[(buffer + i * 4) >> 2]);
      }
      return res;
    },
    // Creates C arrays storing key statuses
    post_install_keyboard: function () {
      ALLEG.key = _malloc(4 * key.length);
      ALLEG.pressed = _malloc(4 * pressed.length);
      ALLEG.released = _malloc(4 * released.length);
    },
    // Creates C arrays storing touch structures
    post_install_touch: function () {
      // limitation: maximum 32 touch object
      ALLEG.touch = _malloc(4 * 11 * 32);
      ALLEG.touch_pressed = _malloc(4 * 11 * 32);
      ALLEG.touch_released = _malloc(4 * 11 * 32);
    },
    // Deletes C arrays storing key statuses
    post_remove_keyboard: function () {
      _free(ALLEG.key);
      _free(ALLEG.pressed);
      _free(ALLEG.released);
      ALLEG.key = null;
      ALLEG.pressed = null;
      ALLEG.released = null;
    },
    // Deletes C arrays storing touch structures
    post_remove_touch: function () {
      _free(ALLEG.touch);
      _free(ALLEG.touch_pressed);
      _free(ALLEG.touch_released);
      ALLEG.touch = null;
      ALLEG.touch_pressed = null;
      ALLEG.touch_released = null;
    },
    // Writes JS key arrays to C memory
    copy_key_statuses: function () {
      ALLEG.writeArray32ToMemory(key, ALLEG.key);
      ALLEG.writeArray32ToMemory(pressed, ALLEG.pressed);
      ALLEG.writeArray32ToMemory(released, ALLEG.released);
    },
    // Writes JS touch arrays to C memory
    copy_touch_structs: function () {
      var write_touch_array = function (array, buffer) {
        for (var i = 0; i < array.length && i < 32; i++) {
          HEAP32[(buffer + i * 11 * 4) >> 2] = array[i].x;
          HEAP32[(buffer + i * 11 * 4 + 4) >> 2] = array[i].y;
          HEAP32[(buffer + i * 11 * 4 + 2 * 4) >> 2] = array[i].mx;
          HEAP32[(buffer + i * 11 * 4 + 3 * 4) >> 2] = array[i].my;
          HEAP32[(buffer + i * 11 * 4 + 4 * 4) >> 2] = array[i].px;
          HEAP32[(buffer + i * 11 * 4 + 5 * 4) >> 2] = array[i].py;
          HEAP32[(buffer + i * 11 * 4 + 6 * 4) >> 2] = array[i].sx;
          HEAP32[(buffer + i * 11 * 4 + 7 * 4) >> 2] = array[i].sy;
          HEAP32[(buffer + i * 11 * 4 + 8 * 4) >> 2] = array[i].id;
          HEAP32[(buffer + i * 11 * 4 + 9 * 4) >> 2] = array[i].age;
          HEAP32[(buffer + i * 11 * 4 + 10 * 4) >> 2] = array[i].dead;
        }
      };
      write_touch_array(touch, ALLEG.touch);
      write_touch_array(touch_pressed, ALLEG.touch_pressed);
      write_touch_array(touch_released, ALLEG.touch_released);
    },
    // Creates `screen` and `font` C globals
    post_set_gfx_mode: function () {
      ALLEG.bitmaps[0] = screen;
      ALLEG.fonts[0] = font;
      ALLEG.screen = ALLEG.alloc_pack_bitmap(0);
    },
    // Stores bitmap infomations in a C bitmap struct
    pack_bitmap: function (handle) {
      var addr = ALLEG.bitmap_addrs[handle];
      setValue(addr, handle, "i32");
      setValue(addr + 4, ALLEG.bitmaps[handle].w, "i32");
      setValue(addr + 8, ALLEG.bitmaps[handle].h, "i32");
    },
    // Allocates and packs a bitmap for C
    alloc_pack_bitmap: function (handle) {
      var res = _malloc(3 * 4);
      ALLEG.bitmap_addrs[handle] = res;
      ALLEG.pack_bitmap(handle);
      return res;
    },
    // Repacks every bitmaps (because bitmap loading is asynchronous) called by _ready
    repack_bitmaps: function () {
      for (var it = 1; it < ALLEG.bitmaps.length; it++) {
        ALLEG.pack_bitmap(it);
      }
    },
    // Returns the handle (array index for ALLEG.bitmaps) for the given bitmap struct pointed by `ptr`
    unpack_bitmap: function (ptr) {
      return getValue(ptr, "i32");
    },
  },

  // GLOBALS, as functions because globals are no longer supported in emscripten (too bad)
  mouse_b: function () {
    return mouse_b;
  },
  mouse_pressed: function () {
    return mouse_pressed;
  },
  mouse_released: function () {
    return mouse_released;
  },
  mouse_x: function () {
    return mouse_x;
  },
  mouse_y: function () {
    return mouse_y;
  },
  mouse_z: function () {
    return mouse_z;
  },
  mouse_mx: function () {
    return mouse_mx;
  },
  mouse_my: function () {
    return mouse_my;
  },
  mouse_mz: function () {
    return mouse_mz;
  },
  touch: function (len) {
    setValue(len, touch.length, "i32");
    return ALLEG.touch;
  },
  touch_pressed: function (len) {
    setValue(len, touch_pressed.length, "i32");
    return ALLEG.touch_pressed;
  },
  touch_released: function (len) {
    setValue(len, touch_released.length, "i32");
    return ALLEG.touch_released;
  },
  key: function () {
    return ALLEG.key;
  },
  pressed: function () {
    return ALLEG.pressed;
  },
  released: function () {
    return ALLEG.released;
  },
  screen: function () {
    return ALLEG.screen;
  },
  SCREEN_W: function () {
    return SCREEN_W;
  },
  SCREEN_H: function () {
    return SCREEN_H;
  },
  font: function () {
    return 0;
  },
  ALLEGRO_CONSOLE: function () {
    return ALLEGRO_CONSOLE;
  },

  // FUNCTIONS
  install_allegro: install_allegro,
  allegro_init: allegro_init,
  install_mouse: install_mouse,
  remove_mouse: remove_mouse,
  show_mouse: show_mouse,
  scare_mouse: scare_mouse,

  install_touch: function () {
    install_touch();
    ALLEG.post_install_touch();
  },
  remove_touch: function () {
    remove_touch();
    ALLEG.post_remove_touch();
  },

  install_timer: install_timer,
  install_int: function (p, msec) {
    var procedure = function () {
      var stack = Runtime.stackSave();
      Runtime.dynCall("v", p, null);
      Runtime.stackRestore(stack);
    };
    install_int(procedure, msec);
  },
  install_int_ex: function (p, speed) {
    var procedure = function () {
      var stack = Runtime.stackSave();
      Runtime.dynCall("v", p, null);
      Runtime.stackRestore(stack);
    };
    install_int_ex(procedure, speed);
  },
  loop: function (p, speed) {
    loop(function () {
      if (_keyboard_installed) {
        ALLEG.copy_key_statuses();
      }
      if (_touch_installed) {
        ALLEG.copy_touch_structs();
      }
      var stack = Runtime.stackSave();
      Runtime.dynCall("v", p, null);
      Runtime.stackRestore(stack);
    }, speed);
  },
  loading_bar: loading_bar,
  allegro_ready: function (p, b) {
    var procedure = function () {
      // repack bitmaps because they were loaded asynchronously
      ALLEG.repack_bitmaps();
      var stack = Runtime.stackSave();
      Runtime.dynCall("v", p, null);
      Runtime.stackRestore(stack);
    };
    if (b) {
      var bar = function (f) {
        var stack = Runtime.stackSave();
        Runtime.dynCall("vf", b, [allocate([f], "float", ALLOC_STACK)]);
        Runtime.stackRestore(stack);
      };
      allegro_ready(procedure, bar);
    } else {
      allegro_ready(procedure, null);
    }
  },
  remove_int: function (p) {
    // FIXME: how is this supposed to work!?
  },
  install_keyboard: function (enable_keys, len) {
    // We have to reset `key` here because emscripten use the key variable in src/shell.js
    key = [];
    var enable_key_jsa = ALLEG.ReadArray32FromMemory(enable_keys, len);
    install_keyboard(enable_key_jsa);
    ALLEG.post_install_keyboard();
  },
  remove_keyboard: function () {
    remove_keyboard();
    ALLEG.post_remove_keyboard();
  },

  create_bitmap: function (width, height) {
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(create_bitmap(width, height)) - 1
    );
  },
  load_bitmap: function (filename) {
    var filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_bitmap(filename_s)) - 1
    );
  },
  load_bmp: function (filename) {
    var filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_bmp(filename_s)) - 1
    );
  },
  load_sheet: function (filename, w, h, len) {
    var filename_s = UTF8ToString(filename);
    var frames = load_sheet(filename_s, w, h);
    setValue(len, frames.length, "i32");
    var res = _malloc(4 * frames.length);
    for (var it = 0; it < frames.length; it++) {
      var handle = ALLEG.bitmaps.push(frames[it]);
      setValue(res + 4 * it, ALLEG.alloc_pack_bitmap(handle), "*");
    }
    return res;
  },

  set_gfx_mode: function (canvas_id, card, w, h, v_w, v_h) {
    var cid_s = UTF8ToString(canvas_id);
    set_gfx_mode(cid_s, card, w, h, v_w, v_h);
    ALLEG.post_set_gfx_mode();
  },

  makecol: makecol,
  getr: getr,
  getg: getg,
  getb: getb,
  geta: geta,
  getpixel: function (bitmap, x, y) {
    return getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  putpixel: function (bitmap, x, y, colour) {
    putpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, colour);
  },
  clear_bitmap: function (bitmap) {
    clear_bitmap(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)]);
  },
  clear_to_color: function (bitmap, colour) {
    clear_to_color(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], colour);
  },
  line: function (bitmap, x1, y1, x2, y2, colour, width) {
    line(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x1,
      y1,
      x2,
      y2,
      colour,
      width
    );
  },
  vline: function (bitmap, x, y1, y2, colour, width) {
    vline(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y1, y2, colour, width);
  },
  hline: function (bitmap, x1, y, x2, colour, width) {
    hline(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x1, y, x2, colour, width);
  },
  triangle: function (bitmap, x1, y1, x2, y2, x3, y3, colour, width) {
    triangle(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      colour,
      width
    );
  },
  trianglefill: function (bitmap, x1, y1, x2, y2, x3, y3, colour) {
    trianglefill(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      colour
    );
  },
  polygon: function (bitmap, vertices, points, colour, width) {
    var points_arr = ALLEG.ReadArray32FromMemory(points, vertices);
    polygon(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      vertices,
      points_arr,
      colour,
      width
    );
  },
  polygonfill: function (bitmap, vertices, points, colour) {
    var points_arr = ALLEG.ReadArray32FromMemory(points, vertices);
    polygonfill(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      vertices,
      points_arr,
      colour
    );
  },
  rect: function (bitmap, x, y, w, h, colour, width) {
    rect(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, w, h, colour, width);
  },
  rectfill: function (bitmap, x, y, w, h, colour) {
    rectfill(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, w, h, colour);
  },
  circle: function (bitmap, x, y, radius, colour, width) {
    circle(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x,
      y,
      radius,
      colour,
      width
    );
  },
  circlefill: function (bitmap, x, y, radius, colour) {
    circlefill(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x,
      y,
      radius,
      colour
    );
  },
  arc: function (bitmap, x, y, ang1, ang2, radius, colour, width) {
    arc(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x,
      y,
      ang1,
      ang2,
      radius,
      colour,
      width
    );
  },
  arcfill: function (bitmap, x, y, ang1, ang2, radius, colour) {
    arcfill(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x,
      y,
      ang1,
      ang2,
      radius,
      colour
    );
  },

  draw_sprite: function (bmp, sprite, x, y) {
    draw_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y
    );
  },
  scaled_sprite: function (bmp, sprite, x, y, sx, sy) {
    scaled_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      sx,
      sy
    );
  },
  rotate_sprite: function (bmp, sprite, x, y, angle) {
    rotate_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      angle
    );
  },
  pivot_sprite: function (bmp, sprite, x, y, cx, cy, angle) {
    pivot_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      cx,
      cy,
      angle
    );
  },
  rotate_scaled_sprite: function (bmp, sprite, x, y, angle, sx, sy) {
    rotate_scaled_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      angle,
      sx,
      sy
    );
  },
  pivot_scaled_sprite: function (bmp, sprite, x, y, cx, cy, angle, sx, sy) {
    pivot_scaled_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      cx,
      cy,
      angle,
      sx,
      sy
    );
  },
  blit: function (source, dest, sx, sy, dx, dy, w, h) {
    blit(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(source)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(dest)],
      sx,
      sy,
      dx,
      dy,
      w,
      h
    );
  },
  simple_blit: function (source, dest, x, y) {
    simple_blit(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(source)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(dest)],
      x,
      y
    );
  },
  stretch_blit: function (source, dest, sx, sy, sw, sh, dx, dy, dw, dh) {
    stretch_blit(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(source)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(dest)],
      sx,
      sy,
      sw,
      sh,
      dx,
      dy,
      dw,
      dh
    );
  },

  load_base64_font: function (data) {
    var data_s = UTF8ToString(data);
    return ALLEG.fonts.push(load_base64_font(data_s));
  },
  load_font: function (filename) {
    var filename_s = UTF8ToString(filename);
    return ALLEG.fonts.push(load_font(filename_s)) - 1;
  },
  create_font: function (family) {
    var family_s = UTF8ToString(family);
    return ALLEG.fonts.push(create_font(family_s)) - 1;
  },
  textout: function (b, f, s, x, y, size, col, outline, width) {
    var str = UTF8ToString(s);
    textout(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(b)],
      ALLEG.fonts[f],
      str,
      x,
      y,
      size,
      col,
      outline,
      width
    );
  },
  textout_centre: function (b, f, s, x, y, size, col, outline, width) {
    var str = UTF8ToString(s);
    textout_centre(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(b)],
      ALLEG.fonts[f],
      str,
      x,
      y,
      size,
      col,
      outline,
      width
    );
  },
  textout_right: function (b, f, s, x, y, size, col, outline, width) {
    var str = UTF8ToString(s);
    textout_right(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(b)],
      ALLEG.fonts[f],
      str,
      x,
      y,
      size,
      col,
      outline,
      width
    );
  },

  install_sound: install_sound,
  set_volume: set_volume,
  get_volume: get_volume,
  load_sample: function (filename) {
    var filename_s = UTF8ToString(filename);
    return ALLEG.samples.push(load_sample(filename_s)) - 1;
  },
  destroy_sample: function (sample) {
    destroy_sample(ALLEG.samples[sample]);
  },
  play_sample: function (sample, vol, freq, loop) {
    play_sample(ALLEG.samples[sample], vol, freq, loop);
  },
  adjust_sample: function (sample, vol, freq, loop) {
    adjust_sample(ALLEG.samples[sample], vol, freq, loop);
  },
  stop_sample: function (sample) {
    stop_sample(ALLEG.samples[sample]);
  },
  pause_sample: function (sample) {
    pause_sample(ALLEG.samples[sample]);
  },

  // rand renamed to rand16 because of name clashing in C source
  rand16: rand,
  rand32: rand32,
  frand: frand,
  distance: distance,
  distance2: distance2,
  linedist: linedist,
  lerp: lerp,
  dot: dot,
  sgn: sgn,
  angle: angle,
  anglediff: anglediff,
  clamp: clamp,
  scale: scale,
  scaleclamp: scaleclamp,

  enable_debug: function (debug_id) {
    enable_debug(UTF8ToString(debug_id));
  },
  // log() renamed to logmsg() because of name clashing in C source
  logmsg: function (s) {
    log(UTF8ToString(s));
  },
  wipe_log: wipe_log,
};

autoAddDeps(AllegroJS, "$ALLEG");

mergeInto(LibraryManager.library, AllegroJS);
