/// @name CORE ROUTINES
//@{

import { log } from "./debug.js";
import { SCREEN_H, SCREEN_W } from "./graphics.js";
import { _keyboard_loop } from "./keyboard.js";
import { scaleclamp } from "./math.js";
import { _mouse_loop, _mouse_loop_reset } from "./mouse.js";
import { clear_bitmap, rectfill } from "./primitives.js";
import { _touch_loop } from "./touch.js";
import { makecol } from "./color.js";
import { BITMAP, CONFIG, SAMPLE, MIDI } from "./types.js";
import { screen } from "./bitmap.js";
import { rest } from "./timer.js";

/// All downloadable objects
export const _downloadables: (BITMAP | CONFIG | MIDI | SAMPLE)[] = [];

/// Performs some loop tasks, such as cleaning up pressed[] and released[]
export function _uberloop() {
  _mouse_loop();
  _keyboard_loop();
  _mouse_loop_reset();
  _touch_loop();
}

/// time when ready() was called
let _loader_init_time = 0;

/// Holds the download complete handler function
let _bar_proc = loading_bar;

/// checks if everything has downloaded in intervals
export async function _progress_check() {
  let loaded = false;
  while (!loaded) {
    const num_assets = _downloadables.length;
    let num_loaded = 0;

    _downloadables.forEach((down) => {
      if (down.type === "snd") {
        if (down.element.readyState >= down.element.HAVE_FUTURE_DATA) {
          down.ready = true;
        }
      }
      if (down.ready) num_loaded += 1;
    });

    _bar_proc(num_assets / num_loaded);

    if (num_loaded >= num_assets) {
      log(
        "Loading complete! Took " +
          ((Date.now() - _loader_init_time) / 1000).toFixed(1) +
          " seconds!"
      );
      clear_bitmap(screen);
      loaded = true;
    }

    // eslint-disable-next-line no-await-in-loop
    await rest(100);
  }
}

/// Default loading bar rendering
/// This function is used by ready() to display a simple loading bar on screen. You need to manually specify a dummy function if you don't want loading screen.
/// @param progress loading progress in 0.0 - 1.0 range
export function loading_bar(progress: number) {
  rectfill(screen, 5, SCREEN_H - 55, SCREEN_W - 10, 50, makecol(0, 0, 0));
  rectfill(
    screen,
    10,
    SCREEN_H - 50,
    SCREEN_W - 20,
    40,
    makecol(255, 255, 255)
  );
  rectfill(screen, 15, SCREEN_H - 45, SCREEN_W - 30, 30, makecol(0, 0, 0));
  rectfill(
    screen,
    20,
    SCREEN_H - 40,
    scaleclamp(progress, 0, 1, 0, SCREEN_W - 40),
    20,
    makecol(255, 255, 255)
  );
}

/// Installs a handler to check if everything has downloaded.
/// You should always wrap your loop() function around it, unless there is nothing external you need. load_bitmap() and load_sample() all require some time to process and the execution cannot be stalled for that, so all code you wrap in this hander will only get executed after everything has loaded making sure you can access bitmap properties and data and play samples right away.  Note that load_font() does not affect ready(), so you should always load your fonts first.
/// @param procedure function to be called when everything has loaded.
/// @param bar loading bar callback function, if omitted, equals to loading_bar() and renders a simple loading bar. it must accept one parameter, that is loading progress in 0.0-1.0 range.
export async function allegro_ready(bar?: () => void) {
  _loader_init_time = Date.now();
  log("Loader initialised!");
  if (bar) _bar_proc = bar;
  else _bar_proc = loading_bar;
  return _progress_check();
}

//@}
