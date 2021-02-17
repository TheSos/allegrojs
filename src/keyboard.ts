////////////////////////////////////////////
/// @name KEYBOARD ROUTINES
//@{

import { _allog, log } from "./debug.js";
import { rest } from "./timer.js";

/// 1.7.1 Installs keyboard handlers
/// Unlike mouse, keyboard can be installed before initialising graphics, and the handlers will function over the entire website, as opposed to canvas only. After this call, the key[] array can be used to check state of each key. All keys will have their default action disabled, unless specified in the enable_keys array. This means that i.e. backspace won't go back, arrows won't scroll. By default, function keys  (KEY_F1..KEY_F12) are the only ones not suppressed
/// @param enable_keys array of keys that are not going to have their default action prevented, i.e. [KEY_F5] will enable reloading the website. By default, if this is omitted, function keys are the only ones on the list.
export function install_keyboard(enable_keys?: number[]) {
  if (_keyboard_installed) {
    _allog("Keyboard already installed");
    return -1;
  }
  if (enable_keys) {
    _enabled_keys = enable_keys;
  } else {
    _enabled_keys = _default_enabled_keys;
  }
  for (let c = 0; c < 0x80; c += 1) {
    key[c] = false;
  }
  document.addEventListener("keyup", _keyup);
  document.addEventListener("keydown", _keydown);
  _keyboard_installed = true;
  log("Keyboard installed!");
  return 0;
}

/// 1.7.2 Uninstalls keyboard
export function remove_keyboard() {
  if (!_keyboard_installed) {
    _allog("Keyboard not installed");
    return -1;
  }
  document.removeEventListener("keyup", _keyup);
  document.removeEventListener("keydown", _keydown);
  _keyboard_installed = false;
  log("Keyboard removed!");
  return 0;
}

/// 1.7.3
export function install_keyboard_hooks(
  keypressed: () => void,
  readkey: () => void
) {
  void keypressed;
  void readkey;
}

/// 1.7.4
export function poll_keyboard(): number {
  return 0;
}

/// 1.7.5
export function keyboard_needs_poll(): boolean {
  return false;
}

/// 1.7.6 Array of flags indicating state of each key.
/// Available keyboard scan codes are as follows:
/// *     KEY_A ... KEY_Z,
/// *     KEY_0 ... KEY_9,
/// *     KEY_0_PAD ... KEY_9_PAD,
/// *     KEY_F1 ... KEY_F12,
/// *     KEY_ESC, KEY_TILDE, KEY_MINUS, KEY_EQUALS, KEY_BACKSPACE, KEY_TAB, KEY_OPENBRACE, KEY_CLOSEBRACE, KEY_ENTER, KEY_COLON, KEY_QUOTE, KEY_BACKSLASH, KEY_COMMA, KEY_STOP, KEY_SLASH, KEY_SPACE,
/// *     KEY_INSERT, KEY_DEL, KEY_HOME, KEY_END, KEY_PGUP, KEY_PGDN, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN,
/// *     KEY_SLASH_PAD, KEY_ASTERISK, KEY_MINUS_PAD, KEY_PLUS_PAD, KEY_DEL_PAD, KEY_ENTER_PAD,
/// *     KEY_PRTSCR, KEY_PAUSE,
/// *     KEY_LSHIFT, KEY_RSHIFT, KEY_LCONTROL, KEY_RCONTROL, KEY_ALT, KEY_ALTGR, KEY_LWIN, KEY_RWIN, KEY_MENU, KEY_SCRLOCK, KEY_NUMLOCK, KEY_CAPSLOCK
/// *     KEY_EQUALS_PAD, KEY_BACKQUOTE, KEY_SEMICOLON, KEY_COMMAND
export const key: boolean[] = [];

export const key_buffer: number[] = [];

/// 1.7.7
export const key_shifts = 0;

/// 1.7.8
export function keypressed(): boolean {
  return key_buffer.length > 0;
}

/// 1.7.9
export async function readkey(): Promise<number> {
  while (key_buffer.length === 0) {
    // eslint-disable-next-line no-await-in-loop
    await rest(10);
  }
  const top = key_buffer.pop();
  if (typeof top === "number") {
    return top;
  }
  return -1;
}

/// 1.7.10
export function ureadkey(scancode: number): number {
  void scancode;
  return 0;
}

/// 1.7.11
export function scancode_to_ascii(scancode: number) {
  return scancode;
}

/// 1.7.12
export function scancode_to_name(scancode: number) {
  return scancode;
}

/// 1.7.13
export function simulate_keypress(key: number) {
  _keydown_handler(key);
}

/// 1.7.14
export function simulate_ukeypress(key: number, scancode: number) {
  void scancode;
  _keydown_handler(key);
}

/// 1.7.15
export function keyboard_callback(key: number) {
  void key;
}

/// 1.7.16
export function keyboard_ucallback(key: number, scancode: number) {
  void key;
  void scancode;
}

/// 1.7.17
export function keyboard_lowlevel_callback(key: number) {
  void key;
}

/// 1.7.18
export function set_leds(leds: number) {
  void leds;
}

/// 1.7.19
export function set_keyboard_rate(delay: number, repeat: number) {
  void delay;
  void repeat;
}

/// 1.7.20
export function clear_keybuf() {
  key_buffer.length = 0;
}

/// 1.7.21
export const three_finger_flag = false;

/// 1.7.22
export const key_led_flag = false;

/// Internal
export const KEY_0 = 0x30,
  KEY_0_PAD = 0x60,
  KEY_1 = 0x31,
  KEY_1_PAD = 0x61,
  KEY_2 = 0x32,
  KEY_2_PAD = 0x62,
  KEY_3 = 0x33,
  KEY_3_PAD = 0x63,
  KEY_4 = 0x34,
  KEY_4_PAD = 0x64,
  KEY_5 = 0x35,
  KEY_5_PAD = 0x65,
  KEY_6 = 0x36,
  KEY_6_PAD = 0x66,
  KEY_7 = 0x37,
  KEY_7_PAD = 0x67,
  KEY_8 = 0x38,
  KEY_8_PAD = 0x68,
  KEY_9 = 0x39,
  KEY_9_PAD = 0x69,
  KEY_A = 0x41,
  KEY_ALT = 0x12,
  KEY_ALTGR = 0x12,
  KEY_ASTERISK = 0x6a,
  KEY_B = 0x42,
  KEY_BACKSLASH = 0xdc,
  KEY_BACKSPACE = 0x08,
  KEY_C = 0x43,
  KEY_CAPSLOCK = 0x14,
  KEY_CLOSEBRACE = 0xdd,
  KEY_COLON = 0xba,
  KEY_COMMA = 0xbc,
  KEY_D = 0x44,
  KEY_DEL = 0x2e,
  KEY_DOWN = 0x28,
  KEY_E = 0x45,
  KEY_END = 0x23,
  KEY_ENTER = 0x0d,
  KEY_ENTER_PAD = 0x0d,
  KEY_EQUALS = 0xbb,
  KEY_EQUALS_PAD = 0x0c,
  KEY_ESC = 0x1b,
  KEY_F = 0x46,
  KEY_F1 = 0x70,
  KEY_F10 = 0x79,
  KEY_F11 = 0x7a,
  KEY_F12 = 0x7b,
  KEY_F2 = 0x71,
  KEY_F3 = 0x72,
  KEY_F4 = 0x73,
  KEY_F5 = 0x74,
  KEY_F6 = 0x75,
  KEY_F7 = 0x76,
  KEY_F8 = 0x77,
  KEY_F9 = 0x78,
  KEY_G = 0x47,
  KEY_H = 0x48,
  KEY_HOME = 0x24,
  KEY_I = 0x49,
  KEY_INSERT = 0x2d,
  KEY_J = 0x4a,
  KEY_K = 0x4b,
  KEY_L = 0x4c,
  KEY_LCONTROL = 0x11,
  KEY_LEFT = 0x25,
  KEY_LSHIFT = 0x10,
  KEY_LWIN = 0x5b,
  KEY_M = 0x4d,
  KEY_MENU = 0x5d,
  KEY_MINUS = 0xbd,
  KEY_MINUS_PAD = 0x6d,
  KEY_N = 0x4e,
  KEY_NUMLOCK = 0x90,
  KEY_O = 0x4f,
  KEY_OPENBRACE = 0xdb,
  KEY_P = 0x50,
  KEY_PAUSE = 0x13,
  KEY_PGDN = 0x22,
  KEY_PGUP = 0x21,
  KEY_PLUS_PAD = 0x6b,
  KEY_PRTSCR = 0x2c,
  KEY_Q = 0x51,
  KEY_QUOTE = 0xde,
  KEY_R = 0x52,
  KEY_RCONTROL = 0x11,
  KEY_RIGHT = 0x27,
  KEY_RSHIFT = 0x10,
  KEY_RWIN = 0x5c,
  KEY_S = 0x53,
  KEY_SCRLOCK = 0x9d,
  KEY_SLASH = 0xbf,
  KEY_SLASH_PAD = 0x6f,
  KEY_SPACE = 0x20,
  KEY_STOP = 0xbe,
  KEY_T = 0x54,
  KEY_TAB = 0x09,
  KEY_TILDE = 0xc0,
  KEY_U = 0x55,
  KEY_UP = 0x26,
  KEY_V = 0x56,
  KEY_W = 0x57,
  KEY_X = 0x58,
  KEY_Y = 0x59,
  KEY_Z = 0x5a;

/// Is keyboard even installed
export let _keyboard_installed = false;

/// default keys to not suppress
export const _default_enabled_keys = [
  KEY_F1,
  KEY_F2,
  KEY_F3,
  KEY_F4,
  KEY_F5,
  KEY_F6,
  KEY_F7,
  KEY_F8,
  KEY_F9,
  KEY_F10,
  KEY_F11,
  KEY_F12,
  KEY_ESC,
];

/// array of prevent default avoiders
let _enabled_keys: number[] = [];

/// Internal keyboard loop
export function _keyboard_loop() {
  if (_keyboard_installed) {
    key_buffer.length = 0;
  }
}

/// key down event handler
function _keydown(e: KeyboardEvent) {
  _keydown_handler(e.keyCode);
  if (!_enabled_keys.includes(e.keyCode)) e.preventDefault();
}

function _keydown_handler(keyCode: number) {
  key[keyCode] = true;
  key_buffer.push(keyCode << 8);
}

/// key up event handler
function _keyup(e: KeyboardEvent) {
  _keyup_handler(e.keyCode);
  if (!_enabled_keys.includes(e.keyCode)) e.preventDefault();
}

function _keyup_handler(keyCode: number) {
  key[keyCode] = false;
}

//@}
