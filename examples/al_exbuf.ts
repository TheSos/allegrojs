/*
 *    Example program for the Allegro library, by Shawn Hargreaves.
 *
 *    This program demonstrates the use of double buffering.
 *    It moves a circle across the screen, first just erasing and
 *    redrawing directly to the screen, then with a double buffer.
 */
import {
  allegro_init,
  allegro_message,
  blit,
  destroy_bitmap,
  END_OF_MAIN,
  install_keyboard,
  SCREEN_H,
  SCREEN_W,
  set_gfx_mode,
  screen,
  GFX_TEXT,
  GFX_AUTODETECT,
  GFX_SAFE,
  BITMAP,
  allegro_error,
  set_palette,
  install_timer,
  desktop_palette,
  create_bitmap,
  clear_keybuf,
  keypressed,
  release_screen,
  acquire_screen,
  clear_to_color,
  makecol,
  textprintf_ex,
  circlefill,
  enable_debug,
  gfx_driver,
  font,
  retrace_count,
  rest,
} from "../src/allegro.js";

enable_debug("debug");

async function main() {
  let buffer: BITMAP;
  let c: number;

  if (allegro_init() != 0) return 1;
  install_timer();
  install_keyboard();

  if (set_gfx_mode("canvas_id", GFX_AUTODETECT, 320, 200, 0, 0) != 0) {
    if (set_gfx_mode("canvas_id", GFX_SAFE, 320, 200, 0, 0) != 0) {
      set_gfx_mode("canvas_id", GFX_TEXT, 0, 0, 0, 0);
      allegro_message("Unable to set any graphic mode\n%s\n", allegro_error);
      return 1;
    }
  }

  set_palette(desktop_palette);

  /* allocate the memory buffer */
  buffer = create_bitmap(SCREEN_W, SCREEN_H);

  /* First without any buffering...
   * Note use of the global retrace_counter to control the speed. We also
   * compensate screen size (GFX_SAFE) with a virtual 320 screen width.
   */
  clear_keybuf();
  c = retrace_count + 32;
  while (retrace_count - c <= 320 + 32) {
    acquire_screen();
    clear_to_color(screen, makecol(255, 255, 255));
    circlefill(
      screen,
      ((retrace_count - c) * SCREEN_W) / 320,
      SCREEN_H / 2,
      32,
      makecol(0, 0, 0)
    );
    textprintf_ex(
      screen,
      font,
      0,
      0,
      makecol(0, 0, 0),
      -1,
      "No buffering (%s)",
      gfx_driver.name
    );
    release_screen();

    if (keypressed()) break;

    await rest(10);
  }

  /* and now with a double buffer... */
  clear_keybuf();
  c = retrace_count + 32;
  while (retrace_count - c <= 320 + 32) {
    clear_to_color(buffer, makecol(255, 255, 255));
    circlefill(
      buffer,
      ((retrace_count - c) * SCREEN_W) / 320,
      SCREEN_H / 2,
      32,
      makecol(0, 0, 0)
    );
    textprintf_ex(
      buffer,
      font,
      0,
      0,
      makecol(0, 0, 0),
      -1,
      "Double buffered (%s)",
      gfx_driver.name
    );
    blit(buffer, screen, 0, 0, 0, 0, SCREEN_W, SCREEN_H);

    if (keypressed()) break;

    await rest(10);
  }

  destroy_bitmap(buffer);

  return 0;
}
END_OF_MAIN(main);
