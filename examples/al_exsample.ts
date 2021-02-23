/*
 *    Example program for the Allegro library, by Shawn Hargreaves.
 *
 *    This program demonstrates how to play samples. You have to
 *    use this example from the command line to specify as first
 *    parameter a WAV or VOC sound file to play. If the file is
 *    loaded successfully, the sound will be played in an infinite
 *    loop. While it is being played, you can use the left and right
 *    arrow keys to modify the panning of the sound. You can also
 *    use the up and down arrow keys to modify the pitch.
 */

import {
  screen,
  SAMPLE,
  allegro_init,
  allegro_message,
  install_keyboard,
  install_timer,
  install_sound,
  DIGI_AUTODETECT,
  MIDI_NONE,
  allegro_error,
  load_sample,
  set_gfx_mode,
  GFX_AUTODETECT,
  adjust_sample,
  clear_to_color,
  desktop_palette,
  destroy_sample,
  END_OF_MAIN,
  font,
  GFX_SAFE,
  GFX_TEXT,
  key,
  KEY_DOWN,
  KEY_ESC,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_SPACE,
  KEY_UP,
  makecol,
  play_sample,
  poll_keyboard,
  rest,
  SCREEN_H,
  SCREEN_W,
  set_palette,
  textprintf_centre_ex,
  digi_driver,
  init_allegro_ts,
  allegro_ready,
  enable_debug,
} from "../build/allegro.js";

async function main() {
  enable_debug("debug");

  let the_sample: SAMPLE;
  let pan = 128;
  let pitch = 1000;

  const argc = 2;
  const argv = ["", "data/munch.mp3"];

  if (allegro_init() != 0) return 1;

  if (argc != 2) {
    allegro_message("Usage: 'exsample filename.[wav|voc]'\n");
    return 1;
  }

  install_keyboard();
  install_timer();

  /* install a digital sound driver */
  if (install_sound(DIGI_AUTODETECT, MIDI_NONE, null) != 0) {
    allegro_message("Error initialising sound system\n%s\n", allegro_error);
    return 1;
  }

  /* read in the WAV file */
  the_sample = await load_sample(argv[1]);

  if (!the_sample) {
    allegro_message("Error reading WAV file '%s'\n", argv[1]);
    return 1;
  }

  if (set_gfx_mode(GFX_AUTODETECT, 320, 200, 0, 0) != 0) {
    if (set_gfx_mode(GFX_SAFE, 320, 200, 0, 0) != 0) {
      set_gfx_mode(GFX_TEXT, 0, 0, 0, 0);
      allegro_message("Unable to set any graphic mode\n%s\n", allegro_error);
      return 1;
    }
  }

  set_palette(desktop_palette);
  clear_to_color(screen, makecol(255, 255, 255));

  textprintf_centre_ex(
    screen,
    font,
    SCREEN_W / 2,
    SCREEN_H / 3,
    makecol(0, 0, 0),
    -1,
    "Driver: %s",
    digi_driver.name
  );
  textprintf_centre_ex(
    screen,
    font,
    SCREEN_W / 2,
    SCREEN_H / 2,
    makecol(0, 0, 0),
    -1,
    "Playing %s",
    argv[1]
  );
  textprintf_centre_ex(
    screen,
    font,
    SCREEN_W / 2,
    (SCREEN_H * 2) / 3,
    makecol(0, 0, 0),
    -1,
    "Use the arrow keys to adjust it"
  );

  /* start up the sample */
  play_sample(the_sample, 255, pan, pitch, true);

  do {
    poll_keyboard();

    /* alter the pan position? */
    if (key[KEY_LEFT] && pan > 0) pan--;
    else if (key[KEY_RIGHT] && pan < 255) pan++;

    /* alter the pitch? */
    if (key[KEY_UP] && pitch < 16384) pitch = (pitch * 513) / 512 + 1;
    else if (key[KEY_DOWN] && pitch > 64) pitch = (pitch * 511) / 512 - 1;

    /* adjust the sample */
    adjust_sample(the_sample, 255, pan, pitch, true);

    /* delay a bit */
    await rest(16);
  } while (!key[KEY_ESC] && !key[KEY_SPACE]);

  /* destroy the sample */
  destroy_sample(the_sample);

  return 0;
}

END_OF_MAIN();

init_allegro_ts("canvas_id", main);
