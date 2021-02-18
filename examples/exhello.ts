import {
  allegro_init,
  set_gfx_mode,
  screen,
  END_OF_MAIN,
  SCREEN_W,
  SCREEN_H,
  makecol,
  clear_to_color,
  textout_centre_ex,
  font,
  enable_debug,
  install_keyboard,
  readkey,
  init_allegro_ts,
  GFX_AUTODETECT_FULLSCREEN,
} from "../build/allegro.js";

enable_debug("debug");

async function main() {
  // Initialising allegro.js
  allegro_init();

  install_keyboard();

  // Selecting canvas element adn setting it up for display at 640x480
  set_gfx_mode(GFX_AUTODETECT_FULLSCREEN, 640, 480, 0, 0);

  // Clears the screen to white
  clear_to_color(screen, makecol(255, 255, 255));

  // Typoes 'Hello World!' message to the centre of the screen
  textout_centre_ex(
    screen,
    font,
    "Hello World!",
    SCREEN_W / 2,
    SCREEN_H / 2,
    makecol(0, 0, 0),
    makecol(255, 0, 0)
  );

  await readkey();

  return 0;
}
END_OF_MAIN();

// Start
init_allegro_ts("canvas_id", main);
