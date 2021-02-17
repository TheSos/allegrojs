/*
 *    Example program for the Allegro library, by Shawn Hargreaves.
 *
 *    This program demonstrates how to use the timer routines.
 *    These can be a bit of a pain, because you have to be sure
 *    you lock all the memory that is used inside your interrupt
 *    handlers.  The first part of the example shows a basic use of
 *    timing using the blocking function rest(). The second part
 *    shows how to use three timers with different frequencies in
 *    a non blocking way.
 */

import {
  screen,
  allegro_error,
  allegro_init,
  allegro_message,
  BPS_TO_TIMER,
  END_OF_FUNCTION,
  END_OF_MAIN,
  font,
  GFX_AUTODETECT,
  GFX_SAFE,
  GFX_TEXT,
  install_int,
  install_int_ex,
  install_keyboard,
  install_timer,
  LOCK_FUNCTION,
  LOCK_VARIABLE,
  makecol,
  rest,
  SCREEN_W,
  SECS_TO_TIMER,
  set_gfx_mode,
  set_palette,
  textprintf_centre_ex,
  clear_to_color,
  desktop_palette,
  timer_driver,
  enable_debug,
  readkey,
  keypressed,
} from "../src/allegro.js";

enable_debug("debug");

/* these must be declared volatile so the optimiser doesn't mess up */
let x: number = 0;
let y: number = 0;
let z: number = 0;

/* timer interrupt handler */
function inc_x() {
  x++;
}
END_OF_FUNCTION(inc_x);

/* timer interrupt handler */
function inc_y() {
  y++;
}

END_OF_FUNCTION(inc_y);

/* timer interrupt handler */
function inc_z() {
  z++;
}

END_OF_FUNCTION(inc_z);

async function main() {
  let c: number;

  if (allegro_init() != 0) return 1;
  install_keyboard();
  install_timer();

  if (set_gfx_mode("canvas_id", GFX_AUTODETECT, 320, 200, 0, 0) != 0) {
    if (set_gfx_mode("canvas_id", GFX_SAFE, 320, 200, 0, 0) != 0) {
      set_gfx_mode("canvas_id", GFX_TEXT, 0, 0, 0, 0);
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
    8,
    makecol(0, 0, 0),
    makecol(255, 255, 255),
    "Driver: %s",
    timer_driver.name
  );

  /* use rest() to delay for a specified number of milliseconds */
  textprintf_centre_ex(
    screen,
    font,
    SCREEN_W / 2,
    48,
    makecol(0, 0, 0),
    makecol(255, 255, 255),
    "Timing five seconds:"
  );

  for (c = 1; c <= 5; c++) {
    textprintf_centre_ex(
      screen,
      font,
      SCREEN_W / 2,
      62 + c * 10,
      makecol(0, 0, 0),
      makecol(255, 255, 255),
      "%d",
      c
    );
    await rest(1000);
  }

  textprintf_centre_ex(
    screen,
    font,
    SCREEN_W / 2,
    142,
    makecol(0, 0, 0),
    makecol(255, 255, 255),
    "Press a key to set up interrupts"
  );

  await readkey();

  /* all variables and code used inside interrupt handlers must be locked */
  LOCK_VARIABLE(x);
  LOCK_VARIABLE(y);
  LOCK_VARIABLE(z);
  LOCK_FUNCTION(inc_x);
  LOCK_FUNCTION(inc_y);
  LOCK_FUNCTION(inc_z);

  /* the speed can be specified in milliseconds (this is once a second) */
  install_int(inc_x, 1000);

  /* or in beats per second (this is 10 ticks a second) */
  install_int_ex(inc_y, BPS_TO_TIMER(10));

  /* or in seconds (this is 10 seconds a tick) */
  install_int_ex(inc_z, SECS_TO_TIMER(10));

  /* the interrupts are now active... */
  while (!keypressed()) {
    textprintf_centre_ex(
      screen,
      font,
      SCREEN_W / 2,
      176,
      makecol(0, 0, 0),
      makecol(255, 255, 255),
      "x=%d, y=%d, z=%d",
      x,
      y,
      z
    );

    await rest(10);
  }

  return 0;
}

END_OF_MAIN(main);
