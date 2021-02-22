/**
	You must concatenate allegro.js and this file before you try to use
	this file as an emscripten JS library.
	cat ../allegro.js > lib.js && cat library.js >> lib.js

	I'm an emscripten library, the “glue” code between C and JS
**/

const AllegroJS = {
  // PRIVATE STUFF
  $ALLEG: {
    // HANDLERS
    // Index 0 is reserved for default values
    bitmaps: [null],
    bitmap_addrs: [null],
    samples: [null],
    fonts: [null],
    // POINTER TO SCREEN
    screen: null,
    // C ARRAY POINTERS
    key: null,
    touch: null,

    // PRIVATE FUNCTIONS
    // Writes `array`(array of integers) to memory at address `buffer`
    writeArray32ToMemory: function (array, buffer) {
      for (let i = 0; i < array.length; i++) {
        HEAP32[(buffer + i * 4) >> 2] = array[i];
      }
    },
    // Reads `length` integers from memory at address `buffer`
    readArray32FromMemory: function (buffer, length) {
      const res = [];
      for (let i = 0; i < length; i++) {
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
    // Creates `screen` and `font` C globals
    post_set_gfx_mode: function () {
      ALLEG.bitmaps[0] = screen;
      ALLEG.fonts[0] = font;
      ALLEG.screen = ALLEG.alloc_pack_bitmap(0);
    },
    // Stores bitmap infomations in a C bitmap struct
    pack_bitmap: function (handle) {
      const addr = ALLEG.bitmap_addrs[handle];
      setValue(addr, handle, "i32");
      setValue(addr + 4, ALLEG.bitmaps[handle].w, "i32");
      setValue(addr + 8, ALLEG.bitmaps[handle].h, "i32");
    },
    // Allocates and packs a bitmap for C
    alloc_pack_bitmap: function (handle) {
      const res = _malloc(3 * 4);
      ALLEG.bitmap_addrs[handle] = res;
      ALLEG.pack_bitmap(handle);
      return res;
    },
    // Repacks every bitmaps (because bitmap loading is asynchronous) called by _ready
    repack_bitmaps: function () {
      for (let it = 1; it < ALLEG.bitmaps.length; it++) {
        ALLEG.pack_bitmap(it);
      }
    },
    // Returns the handle (array index for ALLEG.bitmaps) for the given bitmap struct pointed by `ptr`
    unpack_bitmap: function (ptr) {
      return getValue(ptr, "i32");
    },
  },

  // Bitmap.ts
  screen: function () {
    return ALLEG.screen;
  },
  create_bitmap: function (width, height) {
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(create_bitmap(width, height)) - 1
    );
  },
  create_bitmap_ex: function (color_depth, width, height) {
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(create_bitmap_ex(color_depth, width, height)) - 1
    );
  },
  create_sub_bitmap: function (parent, x, y, width, height) {
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(
        create_sub_bitmap(
          ALLEG.bitmaps[ALLEG.unpack_bitmap(parent)],
          x,
          y,
          width,
          height
        )
      ) - 1
    );
  },
  create_video_bitmap: function (width, height) {
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(create_video_bitmap(width, height)) - 1
    );
  },
  create_system_bitmap: function (width, height) {
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(create_system_bitmap(width, height)) - 1
    );
  },
  destroy_bitmap: function (bmp) {
    return destroy_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  lock_bitmap: function (bitmap) {
    return lock_bitmap(ALLEG.unpack_bitmap(bitmap));
  },
  bitmap_color_depth: function (bmp) {
    return bitmap_color_depth(ALLEG.unpack_bitmap(bmp));
  },
  bitmap_mask_color: function (bmp) {
    return bitmap_mask_color(ALLEG.unpack_bitmap(bmp));
  },
  is_same_bitmap: function (bmp1, bmp2) {
    return is_same_bitmap(ALLEG.unpack_bitmap(bmp1), ALLEG.unpack_bitmap(bmp2));
  },
  is_planar_bitmap: function (bmp) {
    return is_planar_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  is_linear_bitmap: function (bmp) {
    return is_linear_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  is_memory_bitmap: function (bmp) {
    return is_memory_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  is_screen_bitmap: function (bmp) {
    return is_screen_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  is_video_bitmap: function (bmp) {
    return is_video_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  is_system_bitmap: function (bmp) {
    return is_system_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  is_sub_bitmap: function (bmp) {
    return is_sub_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  acquire_bitmap: function (bmp) {
    return acquire_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  release_bitmap: function (bmp) {
    return release_bitmap(ALLEG.unpack_bitmap(bmp));
  },
  acquire_screen,
  release_screen,
  set_clip_rect: function (bitmap, x1, y1, x2, y2) {
    return set_clip_rect(ALLEG.unpack_bitmap(bitmap), x1, y1, x2, y2);
  },
  get_clip_rect: function (bitmap) {
    return get_clip_rect(ALLEG.unpack_bitmap(bitmap));
  },
  add_clip_rect: function (bitmap, x1, y1, x2, y2) {
    return add_clip_rect(ALLEG.unpack_bitmap(bitmap), x1, y1, x2, y2);
  },
  set_clip_state: function (bitmap, state) {
    return set_clip_state(ALLEG.unpack_bitmap(bitmap), state);
  },
  get_clip_state: function (bitmap) {
    return get_clip_state(ALLEG.unpack_bitmap(bitmap));
  },
  is_inside_bitmap: function (bmp, x, y, clip) {
    return is_inside_bitmap(ALLEG.unpack_bitmap(bmp), x, y, clip);
  },
  load_bitmap: function (filename, pal) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_bitmap(filename_s, pal)) - 1
    );
  },
  load_bmp: function (filename) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_bmp(filename_s)) - 1
    );
  },
  load_bmp_pf: function (f, pal) {
    return ALLEG.alloc_pack_bitmap(ALLEG.bitmaps.push(load_bmp_pf(f, pal)) - 1);
  },
  load_lbm: function (filename, pal) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_lbm(filename_s, pal)) - 1
    );
  },
  load_pcx: function (filename, pal) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_pcx(filename_s, pal)) - 1
    );
  },
  load_pcx_pf: function (f, pal) {
    return ALLEG.alloc_pack_bitmap(ALLEG.bitmaps.push(load_pcx_pf(f, pal)) - 1);
  },
  load_tga: function (filename, pal) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.alloc_pack_bitmap(
      ALLEG.bitmaps.push(load_tga(filename_s, pal)) - 1
    );
  },
  load_tga_pf: function (f, pal) {
    return ALLEG.alloc_pack_bitmap(ALLEG.bitmaps.push(load_tga_pf(f, pal)) - 1);
  },
  save_bitmap: function (filename, bmp, pal) {
    const filename_s = UTF8ToString(filename);
    return save_bitmap(filename_s, ALLEG.unpack_bitmap(bmp), pal);
  },
  save_bmp: function (filename, bmp, pal) {
    const filename_s = UTF8ToString(filename);
    return save_bmp(filename_s, ALLEG.unpack_bitmap(bmp), pal);
  },
  save_bmp_pf: function (f, bmp, pal) {
    return save_bmp_pf(f, ALLEG.unpack_bitmap(bmp), pal);
  },
  save_pcx: function (filename, bmp, pal) {
    const filename_s = UTF8ToString(filename);
    return save_pcx(filename_s, ALLEG.unpack_bitmap(bmp), pal);
  },
  save_pcx_pf: function (f, bmp, pal) {
    return save_pcx_pf(f, ALLEG.unpack_bitmap(bmp), pal);
  },
  save_tga: function (filename, bmp, pal) {
    const filename_s = UTF8ToString(filename);
    return save_tga(filename_s, ALLEG.unpack_bitmap(bmp), pal);
  },
  save_tga_pf: function (f, bmp, pal) {
    return save_tga_pf(f, ALLEG.unpack_bitmap(bmp), pal);
  },
  register_bitmap_file_type: function (ext, load, save) {
    const ext_s = UTF8ToString(filename);
    return register_bitmap_file_type(ext_s, load, save);
  },
  set_color_conversion,

  // Color.ts
  makecol8,
  makecol15,
  makecol16,
  makecol24,
  makecol32,
  makeacol32,
  makecol,
  makecol_depth,
  makeacol_depth,
  makeacol,
  makecol15_dither,
  getr8,
  getr15,
  getr16,
  getr24,
  getr32,
  getg8,
  getg15,
  getg16,
  getg24,
  getg32,
  getb8,
  getb15,
  getb16,
  getb24,
  getb32,
  geta32,
  getr,
  getg,
  getb,
  geta,
  getr_depth,
  getg_depth,
  getb_depth,
  geta_depth,

  // Config.ts
  install_allegro,
  allegro_init,
  allegro_exit,
  END_OF_MAIN,
  allegro_id: function () {
    return allegro_id;
  },
  allegro_error: function () {
    return allegro_error;
  },
  ALLEGRO_VERSION: function () {
    return ALLEGRO_VERSION;
  },
  ALLEGRO_SUB_VERSION: function () {
    return ALLEGRO_SUB_VERSION;
  },
  ALLEGRO_WIP_VERSION: function () {
    return ALLEGRO_WIP_VERSION;
  },
  ALLEGRO_VERSION_STR: function () {
    return ALLEGRO_VERSION_STR;
  },
  ALLEGRO_DATE_STR: function () {
    return ALLEGRO_DATE_STR;
  },
  ALLEGRO_DATE: function () {
    return ALLEGRO_DATE;
  },
  AL_ID: function (a, b, c, d) {
    return AL_ID(
      UTF8ToString(a),
      UTF8ToString(b),
      UTF8ToString(c),
      UTF8ToString(d)
    );
  },
  MAKE_VERSION: function (a, b, c) {
    return MAKE_VERSION(UTF8ToString(a), UTF8ToString(b), UTF8ToString(c));
  },
  os_type: function () {
    return os_type;
  },
  os_version: function () {
    return os_version;
  },
  os_multitasking: function () {
    return os_multitasking;
  },
  allegro_message: function (str, args) {
    allegro_message(UTF8ToString(str), args);
  },
  set_window_title: function (name) {
    set_window_title(UTF8ToString(title));
  },
  set_close_button_callback,
  desktop_color_depth,
  get_desktop_resolution,
  check_cpu,
  cpu_vendor: function () {
    return cpu_vendor;
  },
  cpu_family: function () {
    return cpu_family;
  },
  cpu_model: function () {
    return cpu_model;
  },
  cpu_capabilities: function () {
    return cpu_capabilities;
  },

  // Configuration.ts
  set_config_file,
  set_config_data,
  override_config_data,
  push_config_state,
  pop_config_state,
  flush_config_state,
  reload_config_texts,
  hook_config_section,
  config_is_hooked,
  get_config_string,
  get_config_int,
  get_config_hex,
  get_config_float,
  get_config_id,
  get_config_argv,
  get_config_text,
  set_config_string,
  set_config_int,
  set_config_hex,
  set_config_float,
  set_config_id,
  list_config_entries,
  list_config_sections,
  free_config_entries,

  // Core.ts
  init_allegro_ts: function (canvas_id) {
    const cid_s = UTF8ToString(canvas_id);
    init_allegro_ts(cid_s);
    ALLEG.post_set_gfx_mode();
  },
  loading_bar: loading_bar,
  allegro_ready: function () {
    Asyncify.handleAsync(async () => {
      await allegro_ready();
      ALLEG.repack_bitmaps();
    });
  },

  // Debug.ts
  enable_debug: function (debug_id) {
    enable_debug(UTF8ToString(debug_id));
  },

  // Font.ts
  register_font_file_type,
  load_font: function (filename) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.fonts.push(load_font(filename_s)) - 1;
  },
  destroy_font: function (f) {
    return destroy_font(ALLEG.fonts[f]);
  },
  make_trans_font,
  is_color_font: function (f) {
    return is_color_font(ALLEG.fonts[f]);
  },
  is_mono_font: function (f) {
    return is_mono_font(ALLEG.fonts[f]);
  },
  is_compatible_font: function (f) {
    return is_compatible_font(ALLEG.fonts[f]);
  },
  get_font_ranges,
  get_font_range_begin,
  get_font_range_end,
  extract_font_range,
  transpose_font,
  merge_fonts,
  text_length: function (f, s) {
    return text_length(ALLEG.fonts[f], UTF8ToString(s));
  },
  text_height: function (f) {
    return text_height(ALLEG.fonts[f]);
  },
  textout_ex: function (bitmap, f, s, x, y, color, bg) {
    const str = UTF8ToString(s);
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
    const str = UTF8ToString(s);
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
    const str = UTF8ToString(s);
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
  textout_justify_ex: function (bitmap, f, s, x, y, color, bg) {
    const str = UTF8ToString(s);
    textout_justify_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      x,
      y,
      color,
      bg,
      str
    );
  },
  textprintf_ex: function (bitmap, f, x, y, color, bg, s, ...args) {
    const str = UTF8ToString(s);
    textprintf_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      x,
      y,
      color,
      bg,
      str,
      ...args
    );
  },
  textprintf_centre_ex: function (bitmap, f, x, y, color, bg, s, ...args) {
    const str = UTF8ToString(s);
    textprintf_centre_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      x,
      y,
      color,
      bg,
      str,
      ...args
    );
  },
  textprintf_right_ex: function (bitmap, f, x, y, color, bg, s, ...args) {
    const str = UTF8ToString(s);
    textprintf_right_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      x,
      y,
      color,
      bg,
      str,
      ...args
    );
  },
  textprintf_justify_ex: function (bitmap, f, x, y, color, bg, s, ...args) {
    const str = UTF8ToString(s);
    textprintf_justify_ex(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      ALLEG.fonts[f],
      x,
      y,
      color,
      bg,
      str,
      ...args
    );
  },

  // Graphics.ts
  gfx_driver: function () {
    return gfx_driver;
  },
  SCREEN_W: function () {
    return SCREEN_W;
  },
  SCREEN_H: function () {
    return SCREEN_H;
  },
  set_color_depth,
  get_color_depth,
  request_refresh_rate,
  get_refresh_rate,
  get_gfx_mode_list,
  destroy_gfx_mode_list,
  set_gfx_mode: function (card, w, h, v_w, v_h) {
    set_gfx_mode(card, w, h, v_w, v_h);
    ALLEG.post_set_gfx_mode();
  },
  gfx_capabilities: function () {
    return gfx_capabilities;
  },
  set_display_switch_mode,
  set_display_switch_callback,
  remove_display_switch_callback,
  get_display_switch_mode,
  is_windowed_mode,
  enable_triple_buffer,
  scroll_screen,
  request_scroll,
  poll_scroll,
  show_video_bitmap: function (bmp) {
    show_video_bitmap(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)]);
  },
  request_video_bitmap,
  vsync,
  font: function () {
    return 0;
  },

  // Keyboard.ts
  install_keyboard_hooks,
  poll_keyboard,
  keyboard_needs_poll,
  keypressed,
  readkey: function (time) {
    Asyncify.handleAsync(async () => {
      await readkey(time);
    });
  },
  ureadkey,
  scancode_to_ascii,
  scancode_to_name,
  simulate_keypress,
  simulate_ukeypress,
  keyboard_callback,
  keyboard_ucallback,
  keyboard_lowlevel_callback,
  set_leds,
  set_keyboard_rate,
  clear_keybuf,
  key: function () {
    return ALLEG.key;
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

  // Mouse.ts
  install_mouse,
  remove_mouse,
  poll_mouse,
  mouse_needs_poll,
  enable_hardware_cursor,
  disable_hardware_cursor,
  select_mouse_cursor,
  set_mouse_cursor_bitmap,
  show_mouse: function (bmp) {
    show_mouse(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)]);
  },
  scare_mouse,
  scare_mouse_area,
  show_os_cursor,
  position_mouse,
  position_mouse_z,
  set_mouse_range,
  set_mouse_speed,
  set_mouse_sprite,
  set_mouse_sprite_focus,
  get_mouse_mickeys,
  mouse_callback,
  mouse_x: function () {
    return mouse_x;
  },
  mouse_y: function () {
    return mouse_y;
  },
  mouse_z: function () {
    return mouse_z;
  },
  mouse_w: function () {
    return mouse_w;
  },
  mouse_b: function () {
    return mouse_b;
  },

  // Palette.ts
  set_palette: function (pal) {
    set_palette(pal);
  },

  // Primitives.ts
  clear_bitmap: function (bitmap) {
    clear_bitmap(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)]);
  },
  clear_to_color: function (bitmap, color) {
    clear_to_color(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], color);
  },
  putpixel: function (bmp, x, y, c) {
    putpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)], x, y, c);
  },
  _putpixel: function (bmp, x, y, c) {
    _putpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)], x, y, c);
  },
  _putpixel15: function (bmp, x, y, c) {
    _putpixel15(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)], x, y, c);
  },
  _putpixel16: function (bmp, x, y, c) {
    _putpixel16(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)], x, y, c);
  },
  _putpixel24: function (bmp, x, y, c) {
    _putpixel24(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)], x, y, c);
  },
  _putpixel32: function (bmp, x, y, c) {
    _putpixel32(ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)], x, y, c);
  },
  getpixel: function (bitmap, x, y) {
    return getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  _getpixel: function (bitmap, x, y) {
    return _getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  _getpixel15: function (bitmap, x, y) {
    return _getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  _getpixel16: function (bitmap, x, y) {
    return _getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  _getpixel24: function (bitmap, x, y) {
    return _getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  _getpixel32: function (bitmap, x, y) {
    return _getpixel(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y);
  },
  vline: function (bitmap, x, y1, y2, color) {
    vline(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y1, y2, color);
  },
  hline: function (bitmap, x1, y, x2, color) {
    hline(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x1, y, x2, color);
  },
  line: function (bitmap, x1, y1, x2, y2, color) {
    line(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x1, y1, x2, y2, color);
  },
  fastline: function (bitmap, x1, y1, x2, y2, color) {
    fastline(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x1, y1, x2, y2, color);
  },
  triangle: function (bitmap, x1, y1, x2, y2, x3, y3, color) {
    triangle(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      color
    );
  },
  polygon: function (bitmap, vertices, points, color) {
    const points_arr = ALLEG.readArray32FromMemory(points, vertices);
    polygon(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      vertices,
      points_arr,
      color
    );
  },
  rect: function (bitmap, x1, y1, x2, y2, color) {
    rect(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x1, y1, x2, y2, color);
  },
  rectfill: function (bitmap, x1, y1, x2, y2, color) {
    rectfill(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x1, y1, x2, y2, color);
  },
  circle: function (bitmap, x, y, radius, color) {
    circle(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, radius, color);
  },
  circlefill: function (bitmap, x, y, radius, color) {
    circlefill(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, radius, color);
  },
  ellipse: function (bitmap, x, y, rx, ry, color) {
    ellipse(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, rx, ry, color);
  },
  ellipsefill: function (bitmap, x, y, rx, ry, color) {
    ellipsefill(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x,
      y,
      rx,
      ry,
      color
    );
  },
  arc: function (bitmap, x, y, ang1, ang2, radius, color) {
    arc(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)],
      x,
      y,
      ang1,
      ang2,
      radius,
      color
    );
  },
  spline: function (bitmap, points, color) {
    spline(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], points, color);
  },
  floodfill: function (bmp, x, y, color) {
    floodfill(ALLEG.bitmaps[ALLEG.unpack_bitmap(bitmap)], x, y, color);
  },

  // Sample.ts
  digi_driver: function () {
    return digi_driver;
  },
  install_sound: install_sound,
  set_volume: set_volume,
  get_volume: get_volume,
  load_sample: function (filename) {
    const filename_s = UTF8ToString(filename);
    return ALLEG.samples.push(load_sample(filename_s)) - 1;
  },
  destroy_sample: function (sample) {
    destroy_sample(ALLEG.samples[sample]);
  },
  play_sample: function (sample, vol, pan, freq, loop) {
    play_sample(ALLEG.samples[sample], vol, pan, freq, loop);
  },
  adjust_sample: function (sample, vol, pan, freq, loop) {
    adjust_sample(ALLEG.samples[sample], vol, pan, freq, loop);
  },
  stop_sample: function (sample) {
    stop_sample(ALLEG.samples[sample]);
  },
  pause_sample: function (sample) {
    pause_sample(ALLEG.samples[sample]);
  },

  // Sprites.ts
  draw_sprite_h_flip: function (bmp, sprite, x, y) {
    draw_sprite_h_flip(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y
    );
  },
  stretch_sprite: function (bmp, sprite, x, y, w, h) {
    stretch_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      w,
      h
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
  rotate_scaled_sprite: function (bmp, sprite, x, y, angle, scale) {
    rotate_scaled_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      angle,
      scale
    );
  },
  pivot_scaled_sprite: function (bmp, sprite, x, y, cx, cy, angle, scale) {
    pivot_scaled_sprite(
      ALLEG.bitmaps[ALLEG.unpack_bitmap(bmp)],
      ALLEG.bitmaps[ALLEG.unpack_bitmap(sprite)],
      x,
      y,
      cx,
      cy,
      angle,
      scale
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

  // Timer.ts
  install_timer: install_timer,
  install_int: function (p, msec) {
    const procedure = () => {
      const stack = stackSave();
      dynCall("v", p, null);
      stackRestore(stack);
    };
    install_int(procedure, msec);
  },
  install_int_ex: function (p, speed) {
    const procedure = () => {
      const stack = stackSave();
      dynCall("v", p, null);
      stackRestore(stack);
    };
    install_int_ex(procedure, speed);
  },
  remove_int: function (p) {
    // FIXME: how is this supposed to work!?
  },
  rest: function (time) {
    Asyncify.handleAsync(async () => {
      await rest(time);
    });
  },
  retrace_count: function () {
    return retrace_count;
  },
};

autoAddDeps(AllegroJS, "$ALLEG");

mergeInto(LibraryManager.library, AllegroJS);
