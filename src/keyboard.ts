import { _allog, log } from "./debug.js";
import { rest } from "./timer.js";

/**
 * Keyboard driverr
 *
 * @remarks
 * The driver we use for timer routines.
 * Only exists for compatibility.
 *
 */
export const keyboard_driver = {
  id: 0,
  name: "Browser Keyboard",
  desc: " Browser Keyboard",
  ascii_name: "Browser Keyboard",
};

/**
 * Installs keyboard handlers
 *
 * @remarks
 * Unlike mouse, keyboard can be installed before initialising graphics, and the handlers will function over the entire website, as opposed to canvas only. After this call, the key[] array can be used to check state of each key. All keys will have their default action disabled, unless specified in the enable_keys array. This means that i.e. backspace won't go back, arrows won't scroll. By default, function keys  (KEY_F1..KEY_F12) are the only ones not suppressed
 *
 * @param enable_keys - array of keys that are not going to have their default action prevented, i.e. [KEY_F5] will enable reloading the website. By default, if this is omitted, function keys are the only ones on the list.
 *
 * @allegro 1.7.1
 */
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

/**
 * Uninstalls keyboard
 *
 * @remarks
 * Simply removes event listeners from document
 *
 * @allegro 1.7.2
 */
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

/**
 * Installs hooks for keyboard input
 *
 * @remarks
 * Not implemented
 *
 * @param keypressed - Callback on keypress
 * @param readkey - Callback for handling key read
 *
 * @allegro 1.7.3
 *
 * @alpha
 */
export function install_keyboard_hooks(
  keypressed: () => void,
  readkey: () => void
) {
  void keypressed;
  void readkey;
}

/**
 * Poll Keyboard
 *
 * @remarks
 * Needs to do nothing since our key events are happening in background using events
 *
 * @allegro 1.7.4
 */
export function poll_keyboard(): number {
  return 0;
}

/**
 * Keyboard needs poll
 *
 * @remarks
 * Always false since we do not use polling system
 *
 * @allegro 1.7.5
 */
export function keyboard_needs_poll(): boolean {
  return false;
}

/**
 * Array of flags indicating state of each key.
 *
 * @remarks
 * Available keyboard scan codes are as follows:
 *   KEY_A ... KEY_Z,
 *   KEY_0 ... KEY_9,
 *   KEY_0_PAD ... KEY_9_PAD,
 *   KEY_F1 ... KEY_F12,
 *   KEY_ESC, KEY_TILDE, KEY_MINUS, KEY_EQUALS, KEY_BACKSPACE, KEY_TAB, KEY_OPENBRACE, KEY_CLOSEBRACE, KEY_ENTER, KEY_COLON, KEY_QUOTE, KEY_BACKSLASH, KEY_COMMA, KEY_STOP, KEY_SLASH, KEY_SPACE,
 *   KEY_INSERT, KEY_DEL, KEY_HOME, KEY_END, KEY_PGUP, KEY_PGDN, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN,
 *   KEY_SLASH_PAD, KEY_ASTERISK, KEY_MINUS_PAD, KEY_PLUS_PAD, KEY_DEL_PAD, KEY_ENTER_PAD,
 *   KEY_PRTSCR, KEY_PAUSE,
 *   KEY_LSHIFT, KEY_RSHIFT, KEY_LCONTROL, KEY_RCONTROL, KEY_ALT, KEY_ALTGR, KEY_LWIN, KEY_RWIN, KEY_MENU, KEY_SCRLOCK, KEY_NUMLOCK, KEY_CAPSLOCK
 *   KEY_EQUALS_PAD, KEY_BACKQUOTE, KEY_SEMICOLON, KEY_COMMAND
 *
 * @allegro 1.7.6
 */
export const key: boolean[] = [];

export const key_buffer: number[] = [];

/**
 * Packed status of special keys
 *
 * @remarks
 * This is set in the key listener
 *
 * @allegro 1.7.7
 */
export let key_shifts = 0;

/**
 * Check if any key has been pressed
 *
 * @remarks
 * Simply checks key buffer for existing keys
 *
 * @allegro 1.7.8
 */
export function keypressed(): boolean {
  return key_buffer.length > 0;
}

/**
 * Read key from keybuffer
 *
 * @remarks
 * This function is a promise that resolves when a key has been put in the keybuffer.
 * Once one has beeen found, it pops the key off the top off the key_buffer stack and returns it.
 *
 * @allegro 1.7.9
 */
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

/**
 * Read unicode key
 *
 * @remarks
 * Not implemented
 *
 * @param scancode - Unicode scancode to read
 *
 * @allegro 1.7.10
 *
 * @alpha
 */
export function ureadkey(scancode: number): number {
  void scancode;
  return 0;
}

/**
 * Convert scancode to ascii
 *
 * @remarks
 * Not implemented
 *
 * @param scancode - Unicode scancode to convert to ascii
 *
 * @allegro 1.7.11
 *
 * @alpha
 */
export function scancode_to_ascii(scancode: number) {
  return scancode;
}

/**
 * Convert scancode to name
 *
 * @remarks
 * Not implemented
 *
 * @param scancode - Unicode scancode
 *
 * @allegro 1.7.12
 *
 * @alpha
 */
export function scancode_to_name(scancode: number) {
  return scancode;
}

/**
 * Simulate keypress
 *
 * @remarks
 * Shoves a key into the keybuffer as if it has been pressed.
 *
 * @param key - Key to simulate pressing
 *
 * @allegro 1.7.13
 */
export function simulate_keypress(key: number) {
  _keydown_handler(key);
}

/**
 * Simulate ukeypress
 *
 * @remarks
 * Not implemented
 *
 * @param key - Code of key
 * @param scancode - Code for unicode character
 *
 * @allegro 1.7.14
 *
 * @alpha
 */
export function simulate_ukeypress(key: number, scancode: number) {
  void scancode;
  _keydown_handler(key);
}

/**
 * Keyboard callback
 *
 * @remarks
 * Not implemented
 *
 * @param key - Code of key
 *
 * @allegro 1.7.15
 *
 * @alpha
 */
export function keyboard_callback(key: number) {
  void key;
}

/**
 * Keyboard unicode callback
 *
 * @remarks
 * Not implemented
 *
 * @param key - ASCII key code
 * @param scancode - Code for unicode character
 *
 * @allegro 1.7.16
 *
 * @alpha
 */
export function keyboard_ucallback(key: number, scancode: number) {
  void key;
  void scancode;
}

/**
 * Low level of keyboard callback
 *
 * @remarks
 * Not implemented
 *
 * @param key - ASCII key code
 *
 * @allegro 1.7.17
 *
 * @alpha
 */
export function keyboard_lowlevel_callback(key: number) {
  void key;
}

/**
 * Set keyboard LEDS
 *
 * @remarks
 * Not implemented
 *
 * @param leds - Packed int containing leds to enable
 *
 * @allegro 1.7.18
 *
 * @alpha
 */
export function set_leds(leds: number) {
  void leds;
}

/**
 * Set keyboard rate
 *
 * @remarks
 * Meant to limit how often keyboard is polled for repeated keys, probably can not implement
 *
 * @param delay - Delay time
 * @param repeat - Disable repeated keys
 *
 * @allegro 1.7.19
 *
 * @alpha
 */
export function set_keyboard_rate(delay: number, repeat: number) {
  void delay;
  void repeat;
}

/**
 * Clear keybuffer
 *
 * @remarks
 * Clears all items from key_buffer
 *
 * @allegro 1.7.20
 */
export function clear_keybuf() {
  key_buffer.length = 0;
}

/**
 * Three finger flag
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.7.21
 *
 * @alpha
 */
export const three_finger_flag = false;

/**
 * Key Led Flag
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.7.22
 *
 * @alpha
 */
export const key_led_flag = false;

/**
 * KEY Codes
 *
 * @remarks
 * These should be identical to allegro key codes
 *
 */
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
  KEY_Z = 0x5a,
  KEY_MAX = 0x5b;

export const KB_SHIFT_FLAG = 0x0001,
  KB_CTRL_FLAG = 0x0002,
  KB_ALT_FLAG = 0x0004,
  KB_LWIN_FLAG = 0x0008,
  KB_RWIN_FLAG = 0x0010,
  KB_MENU_FLAG = 0x0020,
  KB_COMMAND_FLAG = 0x0040,
  KB_SCROLOCK_FLAG = 0x0100,
  KB_NUMLOCK_FLAG = 0x0200,
  KB_CAPSLOCK_FLAG = 0x0400,
  KB_INALTSEQ_FLAG = 0x0800,
  KB_ACCENT1_FLAG = 0x1000,
  KB_ACCENT2_FLAG = 0x2000,
  KB_ACCENT3_FLAG = 0x4000,
  KB_ACCENT4_FLAG = 0x8000;

/**
 * Is keyboard installed
 *
 * @remarks
 * Flag for if keyboard has been installed yet
 *
 * @internal
 */
export let _keyboard_installed = false;

/**
 * Default unsupressed keys
 *
 * @remarks
 * Default internal keys which represent what not to supress in browser
 *
 * @internal
 */
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

/**
 * Unsupressed keys
 *
 * @remarks
 * Internal keys which represent what not to supress in browser
 *
 * @internal
 */
let _enabled_keys: number[] = [];

/**
 * Internal Keyboard loop
 *
 * @remarks
 * Run internal keyboard routines
 *
 * @internal
 */
export function _keyboard_loop() {
  if (_keyboard_installed) {
    key_buffer.length = 0;
  }
}

/**
 * Internal keydown listener
 *
 * @remarks
 * Gets called when a key is down if keyboard has been installed
 *
 * @internal
 */
function _keydown(e: KeyboardEvent) {
  _keydown_handler(e.keyCode);
  if (!_enabled_keys.includes(e.keyCode)) e.preventDefault();
}

/**
 * Internal keydown helper
 *
 * @remarks
 * Set keycodes and add to keybuffer
 *
 * @internal
 */
function _keydown_handler(keyCode: number) {
  key[keyCode] = true;
  key_buffer.push(keyCode << 8);
  switch (keyCode) {
    case KEY_LSHIFT:
    case KEY_RSHIFT:
      key_shifts |= KB_SHIFT_FLAG;
      break;
    case KEY_LCONTROL:
    case KEY_RCONTROL:
      key_shifts |= KB_CTRL_FLAG;
      break;
    case KEY_ALT:
      key_shifts |= KB_ALT_FLAG;
      break;
    case KEY_LWIN:
      key_shifts |= KB_LWIN_FLAG;
      break;
    case KEY_RWIN:
      key_shifts |= KB_RWIN_FLAG;
      break;
    case KEY_MENU:
      key_shifts |= KB_MENU_FLAG;
      break;
    case KEY_SCRLOCK:
      key_shifts |= KB_SCROLOCK_FLAG;
      break;
    case KEY_NUMLOCK:
      key_shifts |= KB_NUMLOCK_FLAG;
      break;
    case KEY_CAPSLOCK:
      key_shifts |= KB_CAPSLOCK_FLAG;
      break;
  }
}

/**
 * Internal keyup handler
 *
 * @remarks
 * Gets called when a key is up if keyboard has been installed
 *
 * @internal
 */
function _keyup(e: KeyboardEvent) {
  _keyup_handler(e.keyCode);
  if (!_enabled_keys.includes(e.keyCode)) e.preventDefault();
}

/**
 * Internal keyup helper
 *
 * @remarks
 * Unset keycodes
 *
 * @internal
 */
function _keyup_handler(keyCode: number) {
  key[keyCode] = false;
  switch (keyCode) {
    case KEY_LSHIFT:
    case KEY_RSHIFT:
      key_shifts ^= KB_SHIFT_FLAG;
      break;
    case KEY_LCONTROL:
    case KEY_RCONTROL:
      key_shifts ^= KB_CTRL_FLAG;
      break;
    case KEY_ALT:
      key_shifts ^= KB_ALT_FLAG;
      break;
    case KEY_LWIN:
      key_shifts ^= KB_LWIN_FLAG;
      break;
    case KEY_RWIN:
      key_shifts ^= KB_RWIN_FLAG;
      break;
    case KEY_MENU:
      key_shifts ^= KB_MENU_FLAG;
      break;
    case KEY_SCRLOCK:
      key_shifts ^= KB_SCROLOCK_FLAG;
      break;
    case KEY_NUMLOCK:
      key_shifts ^= KB_NUMLOCK_FLAG;
      break;
    case KEY_CAPSLOCK:
      key_shifts ^= KB_CAPSLOCK_FLAG;
      break;
  }
}
