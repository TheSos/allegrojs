/*
 *    Example program for the Allegro library, by Shawn Hargreaves.
 *
 *    This program demonstrates how to play MIDI files.
 */

import {
  allegro_init,
  allegro_message,
  END_OF_MAIN,
  install_keyboard,
  SCREEN_H,
  SCREEN_W,
  set_gfx_mode,
  screen,
  GFX_TEXT,
  GFX_AUTODETECT,
  GFX_SAFE,
  allegro_error,
  readkey,
  set_palette,
  MIDI,
  install_timer,
  install_sound,
  DIGI_AUTODETECT,
  MIDI_AUTODETECT,
  set_display_switch_mode,
  SWITCH_BACKGROUND,
  SWITCH_BACKAMNESIA,
  desktop_palette,
  clear_to_color,
  font,
  keypressed,
  makecol,
  rectfill,
  rest,
  textprintf_centre_ex,
  text_height,
  text_length,
  KEY_P,
  load_midi,
  get_midi_length,
  midi_pos,
  midi_driver,
  play_midi,
  midi_time,
  midi_resume,
  destroy_midi,
  midi_pause,
  enable_debug,
  ready,
} from "../src/allegro.js";

enable_debug("debug");

async function main() {
  let the_music: MIDI;
  let length = 0,
    pos = 0;
  let beats = 0,
    beat = 0;
  let x = 0,
    y = 0,
    tw = 0,
    th = 0;
  let background_color = 0;
  let text_color;
  let paused = false;
  let done = 0;

  const argc = 2;
  const argv = ["", "data/sample.mid"];

  if (allegro_init() != 0) return 1;

  if (argc != 2) {
    allegro_message("Usage: 'exmidi filename.mid'\n");
    return 1;
  }

  install_keyboard();
  install_timer();

  /* install a MIDI sound driver */
  if (install_sound(DIGI_AUTODETECT, MIDI_AUTODETECT, null) != 0) {
    allegro_message("Error initialising sound system\n%s\n", allegro_error);
    return 1;
  }

  /* read in the MIDI file */
  the_music = load_midi(argv[1] ?? "");

  await ready();

  if (!the_music) {
    allegro_message("Error reading MIDI file '%s'\n", argv[1] ?? "");
    return 1;
  }

  length = get_midi_length(the_music);
  beats = -midi_pos; /* get_midi_length updates midi_pos to the negative
                         number of beats (quarter notes) in the midi. */

  if (set_gfx_mode("canvas_id", GFX_AUTODETECT, 320, 200, 0, 0) != 0) {
    if (set_gfx_mode("canvas_id", GFX_SAFE, 320, 200, 0, 0) != 0) {
      set_gfx_mode("canvas_id", GFX_TEXT, 0, 0, 0, 0);
      allegro_message("Unable to set any graphic mode\n%s\n", allegro_error);
      return 1;
    }
  }

  /* try to continue in the background */
  if (set_display_switch_mode(SWITCH_BACKGROUND))
    set_display_switch_mode(SWITCH_BACKAMNESIA);

  set_palette(desktop_palette);
  background_color = makecol(255, 255, 255);
  text_color = makecol(0, 0, 0);
  clear_to_color(screen, background_color);
  th = text_height(font);
  x = SCREEN_W / 2;

  textprintf_centre_ex(
    screen,
    font,
    x,
    SCREEN_H / 3,
    text_color,
    -1,
    "Driver: %s",
    midi_driver.name
  );
  textprintf_centre_ex(
    screen,
    font,
    x,
    SCREEN_H / 2,
    text_color,
    -1,
    "Playing %s",
    argv[1] ?? ""
  );

  /* start up the MIDI file */
  play_midi(the_music, true);

  y = (2 * SCREEN_H) / 3;
  tw = text_length(font, "0000:00 / 0000:00");
  /* wait for a key press */
  while (!done) {
    /* P key pauses/resumes, any other key exits. */
    while (keypressed()) {
      const k = (await readkey()) & 255;
      if (k == KEY_P) {
        paused = !paused;
        if (paused) {
          midi_pause();
          textprintf_centre_ex(
            screen,
            font,
            x,
            y + th * 3,
            text_color,
            -1,
            "P A U S E D"
          );
        } else {
          midi_resume();
          rectfill(
            screen,
            x - tw / 2,
            y + th * 3,
            x + tw / 2,
            y + th * 4,
            background_color
          );
        }
      } else done = 1;
    }
    pos = midi_time;
    beat = midi_pos;
    rectfill(screen, x - tw / 2, y, x + tw / 2, y + th * 2, background_color);
    textprintf_centre_ex(
      screen,
      font,
      x,
      y,
      text_color,
      -1,
      "%d:%02d / %d:%02d",
      pos / 60,
      pos % 60,
      length / 60,
      length % 60
    );
    textprintf_centre_ex(
      screen,
      font,
      x,
      y + th,
      text_color,
      -1,
      "beat %d / %d",
      beat,
      beats
    );
    /* We have nothing else to do. */
    await rest(100);
  }

  /* destroy the MIDI file */
  destroy_midi(the_music);

  return 0;
}

END_OF_MAIN(main);
