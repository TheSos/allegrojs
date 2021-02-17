/// @name TOUCH ROUTINES
//@{

import { log, _allog } from "./debug.js";
import { screen } from "./bitmap.js";
import { ALLEGRO_TOUCH_EVENT } from "./types.js";

/// is touch installed
export let _touch_installed = false;

/// Array of ALLEGRO_TOUCH_EVENT holding the currently held touches
export const touch: ALLEGRO_TOUCH_EVENT[] = [];

/// Array of ALLEGRO_TOUCH_EVENT holding the just started touches
export const touch_pressed: ALLEGRO_TOUCH_EVENT[] = [];

/// Array of ALLEGRO_TOUCH_EVENT holding the just finished touches
export const touch_released: ALLEGRO_TOUCH_EVENT[] = [];

/// Installs touch support
/// Installs handlers for touch events. After calling this, touch* arrays will get populated with multitouch data maximum touch points depend on the device. Four is usually a safe option.
export function install_touch() {
  if (_touch_installed) {
    _allog("Touch already installed");
    return -1;
  }
  screen.canvas.addEventListener("touchstart", _touchstart);
  screen.canvas.addEventListener("touchend", _touchend);
  screen.canvas.addEventListener("touchcancel", _touchend);
  screen.canvas.addEventListener("touchmove", _touchmove);
  _touch_installed = true;
  log("Touch installed!");
  return 0;
}

/// Removes touch support
/// Uninstalls handlers for touch events.
export function remove_touch() {
  if (!_touch_installed) {
    _allog("Touch not installed");
    return -1;
  }
  screen.canvas.removeEventListener("touchstart", _touchstart);
  screen.canvas.removeEventListener("touchend", _touchend);
  screen.canvas.removeEventListener("touchcancel", _touchend);
  screen.canvas.removeEventListener("touchmove", _touchmove);
  _touch_installed = false;
  log("Touch removed!");
  return 0;
}

export function _touch_loop() {
  if (_touch_installed) {
    touch_released.length = 0;
    touch_pressed.length = 0;
    touch.forEach((t) => {
      t.mx = 0;
      t.my = 0;
      t.px = t.x;
      t.py = t.y;
      t.age += 1;
    });
  }
}

export function _get_touch(id?: number) {
  if (typeof id !== "number") {
    return null;
  }
  return touch.find((t) => t.id === id) ?? null;
}

export function _touchstart(e: TouchEvent) {
  if (!e.target) {
    return;
  }
  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  for (let c = 0; c < e.changedTouches.length; c += 1) {
    const point = e.changedTouches.item(c);

    if (point) {
      const t: ALLEGRO_TOUCH_EVENT = {
        sx: point.clientX - rect.left,
        sy: point.clientY - rect.top,
        mx: 0,
        my: 0,
        px: point.clientX - rect.left,
        py: point.clientY - rect.top,
        x: point.clientX - rect.left,
        y: point.clientY - rect.top,
        id: point.identifier,
        dead: false,
        age: 0,
      };
      touch.push(t);
      touch_pressed.push(t);
    }
  }
  e.preventDefault();
}

export function _touchend(e: TouchEvent) {
  for (let c = 0; c < e.changedTouches.length; c += 1) {
    const point = e.changedTouches.item(c);
    const t = _get_touch(point?.identifier);
    if (t) {
      touch.splice(touch.indexOf(t), 1);
      touch_released.push(t);
      t.dead = true;
    }
  }
  e.preventDefault();
}

export function _touchmove(e: TouchEvent) {
  if (!e.target) {
    return;
  }
  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  for (let c = 0; c < e.changedTouches.length; c += 1) {
    const point = e.changedTouches.item(c);
    const t = _get_touch(point?.identifier);
    if (t && point) {
      const x = point.clientX - rect.left;
      const y = point.clientY - rect.top;
      t.mx += t.x - x;
      t.my += t.y - y;
      t.x = x;
      t.y = y;
    }
  }
  e.preventDefault();
}

//@}
////////////////////////////////////////////
