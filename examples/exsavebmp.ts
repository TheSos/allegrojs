import {
  END_OF_MAIN,
  enable_debug,
  key,
  set_gfx_mode,
  install_mouse,
  install_keyboard,
  allegro_init,
  GFX_AUTODETECT,
  KEY_ESC,
  init_allegro_ts,
  mouse_x,
  mouse_y,
  makecol,
  screen,
  textout_ex,
  font,
  clear_to_color,
  rest,
  polygon,
  mouse_b,
  save_bitmap,
} from "../build/allegro.js";

async function main() {
  enable_debug("debug");

  allegro_init();
  set_gfx_mode(GFX_AUTODETECT, 640, 480, 0, 0);
  install_mouse();
  install_keyboard();

  while (!key[KEY_ESC]) {
    clear_to_color(screen, makecol(0, 0, 0));

    polygon(
      screen,
      6,
      [50, 50, 100, 100, 100, 150, 50, 200, 5, 150, mouse_x, mouse_y],
      makecol(255, 0, 0)
    );

    textout_ex(
      screen,
      font,
      "Click to Save",
      0,
      0,
      makecol(0, 0, 0),
      makecol(255, 255, 255)
    );

    if (mouse_b & 1) {
      save_bitmap("exsavebmp.png", screen);
      while (mouse_b & 1) {
        await rest(10);
      }
    }

    await rest(16);
  }

  return 0;
}
END_OF_MAIN();

// Start
init_allegro_ts("canvas_id", main);
