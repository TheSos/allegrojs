////////////////////////////////////////////
/// @name MOUSE ROUTINES
//@{

import { log, _allog, _error } from "./debug.js";
import { screen } from "./bitmap.js";
import { BITMAP } from "./types.js";
import { draw_sprite } from "./sprites.js";

/// Types
type CURSOR_TYPES =
  | "MOUSE_CURSOR_ALLEGRO"
  | "MOUSE_CURSOR_ARROW"
  | "MOUSE_CURSOR_BUSY"
  | "MOUSE_CURSOR_EDIT"
  | "MOUSE_CURSOR_NONE"
  | "MOUSE_CURSOR_QUESTION";

type MOUSE_DRIVER = {
  id: number;
  name: string;
  desc: string;
  ascii_name: string;
};

const MOUSEDRV_AUTODETECT = -1;
const MOUSEDRV_NONE = 0;

export const mouse_driver: MOUSE_DRIVER = {
  id: MOUSEDRV_NONE,
  name: "",
  desc: "",
  ascii_name: "No mouse",
};

/// Cursors
let _mouse_focus_x = 0;
let _mouse_focus_y = 0;
let _hardware_cursor = false;
let _selected_cursor: CURSOR_TYPES = "MOUSE_CURSOR_ALLEGRO";

const _cursors: Record<CURSOR_TYPES, BITMAP | null> = {
  MOUSE_CURSOR_ALLEGRO: null,
  MOUSE_CURSOR_ARROW: null,
  MOUSE_CURSOR_BUSY: null,
  MOUSE_CURSOR_EDIT: null,
  MOUSE_CURSOR_NONE: null,
  MOUSE_CURSOR_QUESTION: null,
};

/**
 * Installs mouse handlers.
 *
 * @remarks
 * Must be called after set_gfx_mode() to be able to determine mouse position within the given canvas!
 *
 * @param menu - If true, context menu will be available on right click on canvas. Default is false.
 *
 * @allegro 1.5.1
 */
export function install_mouse(menu = false) {
  if (_mouse_installed) {
    _allog("Mouse already installed");
    return -1;
  }

  mouse_driver.id = MOUSEDRV_AUTODETECT;
  mouse_driver.name = "Browser Mouse";
  mouse_driver.desc = "Allegro Browser Handler";
  mouse_driver.ascii_name = "Browser Mouse";

  screen.canvas.addEventListener("mouseup", _mouseup);
  screen.canvas.addEventListener("mousedown", _mousedown);
  screen.canvas.addEventListener("mousemove", _mousemove);
  screen.canvas.addEventListener("wheel", _mousewheel);
  if (menu) {
    _menu_supress = true;
  } else {
    screen.canvas.addEventListener("contextmenu", _mousemenu);
    _menu_supress = false;
  }
  _mouse_installed = true;
  log("Mouse installed!");
  return 0;
}

/**
 * Removes mouse handlers.
 *
 * @remarks
 * Remove mouse handler
 *
 * @allegro 1.5.2
 */
export function remove_mouse() {
  if (!_mouse_installed) {
    _error("You must call install_mouse before remove_mouse");
    return -1;
  }
  screen.canvas.removeEventListener("mouseup", _mouseup);
  screen.canvas.removeEventListener("mousedown", _mousedown);
  screen.canvas.removeEventListener("mousemove", _mousemove);
  screen.canvas.removeEventListener("wheel", _mousewheel);
  if (_menu_supress)
    screen.canvas.removeEventListener("contextmenu", _mousemenu);
  _mouse_installed = false;
  log("Mouse removed!");
  return 0;
}

/**
 * Poll Mouse
 *
 * @remarks
 * Does nothing!
 *
 * @allegro 1.5.3
 */
export function poll_mouse() {
  _mouse_loop();
}

/**
 * Mouse needs poll
 *
 * @remarks
 * Returns false, since we don't poll
 *
 * @allegro 1.5.4
 */
export function mouse_needs_poll(): boolean {
  return false;
}

/**
 * Enable hardware cursor
 *
 * @remarks
 * Enable hardware cursor (aka browser cursor)
 *
 * @allegro 1.5.5
 */
export function enable_hardware_cursor() {
  _hardware_cursor = true;
}

/**
 * Disable hardware cursor
 *
 * @remarks
 * Disables hardware cursor
 *
 * @allegro 1.5.6
 */
export function disable_hardware_cursor() {
  _hardware_cursor = false;
}

/**
 * Select mouse cursor
 *
 * @remarks
 * Select mouse cursor (sprite or os)
 *
 * @param cursor - Cursor type
 *
 * @allegro 1.5.7
 */
export function select_mouse_cursor(cursor: CURSOR_TYPES): void {
  _selected_cursor = cursor;
  if (_hardware_cursor) {
    show_os_cursor(cursor);
  }
}

/**
 * Set mouse cursor bitmap
 *
 * @remarks
 * Override default bitmap sprite for cursor type
 *
 * @param cursor - Type to override
 * @param bmp - Bitmap to use
 *
 * @allegro 1.5.8
 */
export function set_mouse_cursor_bitmap(
  cursor: CURSOR_TYPES,
  bmp: BITMAP | null
): void {
  _cursors[cursor] = bmp;
}

/**
 * Mouse X position within the canvas
 *
 * @allegro 1.5.9
 */
export let mouse_x = -1;

/**
 * Mouse Y position within the canvas
 *
 * @allegro 1.5.9
 */
export let mouse_y = -1;

/**
 * Mouse wheel position within the canvas
 *
 * @remarks
 * This might not work consistently across all browsers!
 *
 * @allegro 1.5.9
 */
export let mouse_z = -1;

/**
 * Mouse fourth axis position
 *
 * @allegro 1.5.9
 */
export const mouse_w = -1;

/**
 * Mouse button bitmask.
 *
 * @remarks
 * Each bit in the mask represents a separate mouse button state. If right mouse button is down, mouse_b value would be 4, 00100 in binary. Each bit represents one mouse button. use something like if (mouse_b&1) to check for separate buttons.
 * - Button 0 is LMB. (mouse_b&1)
 * - Button 1 is MMB / wheel. (mouse_b&2)
 * - Button 2 is RMB. (mouse_b&4)
 *
 * @allegro 1.5.9
 */
export let mouse_b = 0;

/**
 * Current mouse sprite
 *
 * @allegro 1.5.10
 */
export const mouse_sprite: BITMAP | null = null;

/**
 * Show mouse
 *
 * @remarks
 * Show mouse on bitmap
 *
 * @returns -1 on fail, 0 on success
 *
 * @allegro 1.5.11
 */
/// Enables showing system mouse cursor over canvas
export function show_mouse(bmp: BITMAP | null): number {
  if (!_mouse_installed) {
    _error("You must call install_mouse before show_mouse");
    return -1;
  }
  if (bmp) {
    screen.canvas.style.cursor = "auto";
  } else {
    screen.canvas.style.cursor = "none";
  }
  return 0;
}

/**
 * Scare mouse
 *
 * @remarks
 * Disables system mouse cursor over canvas.
 * Use this if you would like to provide your own cursor bitmap
 *
 * @returns -1 on fail, 0 on success
 *
 * @allegro 1.5.12
 */
export function scare_mouse(): number {
  if (!_mouse_installed) {
    _error("You must call install_mouse before hide_mouse");
    return -1;
  }
  screen.canvas.style.cursor = "none";
  return 0;
}

/**
 * Scare mouse area
 *
 * @remarks
 * Not implemented
 *
 * @param x - X point
 * @param y - Y point
 * @param w - Width of area
 * @param h - Height of area
 *
 * @allegro 1.5.13
 */
export function scare_mouse_area(x: number, y: number, w: number, h: number) {
  void x;
  void y;
  void w;
  void h;
}

/**
 * Show OS cursor
 *
 * @remarks
 * Shows os cursor instead of sprite cursor
 *
 * @param cursor - type of cursor
 *
 * @allegro 1.5.15
 */
export function show_os_cursor(cursor: CURSOR_TYPES) {
  switch (cursor) {
    case "MOUSE_CURSOR_ALLEGRO":
      screen.canvas.style.cursor = "auto";
      break;
    case "MOUSE_CURSOR_ARROW":
      screen.canvas.style.cursor = "move";
      break;
    case "MOUSE_CURSOR_BUSY":
      screen.canvas.style.cursor = "wait";
      break;
    case "MOUSE_CURSOR_EDIT":
      screen.canvas.style.cursor = "crosshair";
      break;
    case "MOUSE_CURSOR_NONE":
      screen.canvas.style.cursor = "auto";
      break;
    case "MOUSE_CURSOR_QUESTION":
      screen.canvas.style.cursor = "help";
      break;
    default:
      screen.canvas.style.cursor = "auto";
      break;
  }
}

/**
 * Freeze mouse flaga
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.5.16
 */
export const freeze_mouse_flag = false;

/**
 * Manually position mouse
 *
 * @remarks
 * This is simulataed
 *
 * @param x - X position to move to
 * @param y - Y position to move to
 *
 * @allegro 1.5.17
 */
export function position_mouse(x: number, y: number) {
  mouse_x = x;
  mouse_y = y;
}

/**
 * Position mouse z
 *
 * @param mouse_z - Move z position manually
 *
 * @allegro 1.5.18
 */
export function position_mouse_z(z: number) {
  mouse_z = z;
}

/**
 * Set mouse range
 *
 * @remarks
 * Not implemented
 *
 * @param x1 - Min x position
 * @param y1 - Min y position
 * @param y2 - Max x position
 * @param y2 - Max y position
 *
 * @allegro 1.5.19
 */
export function set_mouse_range(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  void x1;
  void y1;
  void x2;
  void y2;
  // NOOP
}

/**
 * Set mouse speed
 *
 * @remarks
 * Not implemented
 *
 * @param xspeed - speed in x position
 * @param yspeed - speed in y position
 *
 * @allegro 1.5.20
 */
export function set_mouse_speed(xspeed: number, yspeed: number) {
  void xspeed;
  void yspeed;
  // NOOP
}

/**
 * Set mouse sprite
 *
 * @remarks
 * Override default allegro sprite
 *
 * @param sprite - sprite to set
 *
 * @allegro 1.5.21
 */
export function set_mouse_sprite(sprite: BITMAP | null) {
  _cursors.MOUSE_CURSOR_ALLEGRO = sprite;
}

/**
 * Set mouse sprite focus
 *
 * @remarks
 * Not implemented
 *
 * @param x - Focus x poisiton
 * @param y - Focus y position
 *
 * @allegro 1.5.22
 */
export function set_mouse_sprite_focus(x: number, y: number) {
  _mouse_focus_x = x;
  _mouse_focus_y = y;
}

/**
 * Get mouse mickeys
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.5.23
 */
export function get_mouse_mickeys(mickeyx: number, mickeyy: number) {
  void mickeyx;
  void mickeyy;
  // NOOP
}

/**
 * Mouse callback
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.5.24
 */
export function mouse_callback(flags: number) {
  void flags;
  // NOOP
}

// Mouse mickey, X position since last loop().
// Only works inside loop()
export let mouse_mx = 0;

// Mouse mickey, Y position since last loop().
// Only works inside loop()
export let mouse_my = 0;

// Mouse mickey, wheel position since last loop().
// Only works inside loop()
export let mouse_mz = 0;

// Checks if mouse was installed
export let _mouse_installed = false;

// last mouse x position
export let _last_mouse_x = -1;

// last mouse y position
export let _last_mouse_y = -1;

// last mouse wheel position
export let _last_mouse_z = -1;

// is context menu enabled?
export const _menu = false;

// is menu supressed?
export let _menu_supress = false;

// Simple internal mouse loop
export function _mouse_loop() {
  if (_mouse_installed) {
    mouse_mx = mouse_x - _last_mouse_x;
    mouse_my = mouse_y - _last_mouse_y;
    mouse_mz = mouse_z - _last_mouse_z;
  }
}

// Mouse reset loop
export function _mouse_loop_reset() {
  if (_mouse_installed) {
    mouse_mx = 0;
    mouse_my = 0;
    mouse_mz = 0;
    _last_mouse_x = mouse_x;
    _last_mouse_y = mouse_y;
    _last_mouse_z = mouse_z;

    // Draw cursor
    const cursor = _cursors[_selected_cursor];
    if (cursor && !_hardware_cursor) {
      draw_sprite(
        screen,
        cursor,
        mouse_x - _mouse_focus_x,
        mouse_y - _mouse_focus_y
      );
      screen.canvas.style.cursor = "none";
    } else {
      show_os_cursor(_selected_cursor);
    }
  }
}

// Mouse context menu suppressor
export function _mousemenu(e: MouseEvent) {
  e.preventDefault();
}

// mouse up event handler
export function _mouseup(e: MouseEvent) {
  mouse_b &= ~(1 << e.button);
  e.preventDefault();
}

// mouse down event handler
export function _mousedown(e: MouseEvent) {
  mouse_b |= 1 << e.button;
  e.preventDefault();
}

// mouse move event handler
export function _mousemove(e: MouseEvent) {
  mouse_x = e.offsetX;
  mouse_y = e.offsetY;
  e.preventDefault();
}

// mouse wheel event handler
export function _mousewheel(e: WheelEvent) {
  mouse_z += e.deltaY;
  e.preventDefault();
}
