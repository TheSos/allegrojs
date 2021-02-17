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
    touch: null,

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
    },
    // Creates C arrays storing touch structures
    post_install_touch: function () {
      // limitation: maximum 32 touch object
      ALLEG.touch = _malloc(4 * 11 * 32);
    },
    // Deletes C arrays storing key statuses
    post_remove_keyboard: function () {
      _free(ALLEG.key);
      ALLEG.key = null;
    },
    // Deletes C arrays storing touch structures
    post_remove_touch: function () {
      _free(ALLEG.touch);
      ALLEG.touch = null;
    },
    // Writes JS key arrays to C memory
    copy_key_statuses: function () {
      ALLEG.writeArray32ToMemory(key, ALLEG.key);
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
  key: function () {
    return ALLEG.key;
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
  init_allegro_ts: function (canvas_id) {
    var cid_s = UTF8ToString(canvas_id);
    init_allegro_ts(cid_s);
    ALLEG.post_set_gfx_mode();
  },
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
      var stack = stackSave();
      dynCall("v", p, null);
      stackRestore(stack);
    };
    install_int(procedure, msec);
  },
  install_int_ex: function (p, speed) {
    var procedure = function () {
      var stack = stackSave();
      dynCall("v", p, null);
      stackRestore(stack);
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
      var stack = stackSave();
      dynCall("v", p, null);
      stackRestore(stack);
    }, speed);
  },
  loading_bar: loading_bar,
  allegro_ready: function () {
    Asyncify.handleAsync(async () => {
      await allegro_ready();
      ALLEG.repack_bitmaps();
    });
  },
  remove_int: function (p) {
    // FIXME: how is this supposed to work!?
  },
  install_keyboard: function () {
    // We have to reset `key` here because emscripten use the key variable in src/shell.js
    key = [];
    install_keyboard();
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
  set_gfx_mode: function (card, w, h, v_w, v_h) {
    set_gfx_mode(card, w, h, v_w, v_h);
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
  textout_ex: function (bitmap, f, s, x, y, color, bg) {
    var str = UTF8ToString(s);
    textout_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      str,
      x,
      y,
      color,
      bg
    );
  },
  textout_centre_ex: function (bitmap, f, s, x, y, color, bg) {
    var str = UTF8ToString(s);
    textout_centre_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      str,
      x,
      y,
      color,
      bg
    );
  },
  textout_right_ex: function (bitmap, f, s, x, y, color, bg) {
    var str = UTF8ToString(s);
    textout_right_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      str,
      x,
      y,
      color,
      bg
    );
  },
  textprintf_ex: function (bitmap, f, x, y, colour, bg, s, ...args) {
    var str = UTF8ToString(s);
    textprintf_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      x,
      y,
      colour,
      bg,
      str,
      ...args
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
  enable_debug: function (debug_id) {
    enable_debug(UTF8ToString(debug_id));
  },
  // log() renamed to logmsg() because of name clashing in C source
  logmsg: function (s) {
    log(UTF8ToString(s));
  },
  wipe_log: wipe_log,
  rest: function (time) {
    Asyncify.handleAsync(async () => {
      await rest(time);
    });
  },
};

autoAddDeps(AllegroJS, "$ALLEG");

mergeInto(LibraryManager.library, AllegroJS);
