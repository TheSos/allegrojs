import { MidiData } from "./midiParser";

// Special types
export type CONFIG_DATA = Record<string, Record<string, string>>;

/**
 * Config
 *
 * @remarks
 * Stores config file
 */
export interface CONFIG {
  file: string;
  data: CONFIG_DATA;
  ready: boolean;
  type: "config";
}

/**
 * Timer
 *
 * @remarks
 * Structure of a timer
 */
export interface TIMER {
  timer: () => void;
  id: number;
}

/**
 * Touch object
 *
 * @remarks
 * The structure of touch object found in touch[] array and inside touch_pressed touch_released.
 * You can retain the touch obect picked up from touch_pressed in your code, but remember to let go of the dead ones.
 */
export interface ALLEGRO_TOUCH_EVENT {
  sx: number;
  sy: number;
  mx: number;
  my: number;
  px: number;
  py: number;
  x: number;
  y: number;
  id: number;
  dead: boolean;
  age: number;
}

/**
 * Fixed
 *
 * @remarks
 * Represents allegro fixed types
 *
 * @allegro 1.2.1
 */
export type fixed = number;

/**
 * Bitmap object
 *
 * @remarks
 * Structure of bitmap object returned from load_bitmap() and create_bitmap().
 * For every bitmap laoded or created, a canvas element is created.
 * Loaded images are then drawn onto the canvas, so that you can easily manipulate images and everything is consistent.
 * You can also load a single file two times and modify it differently for each instance.
 *
 * @allegro 1.2.2
 */
export interface BITMAP {
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  ready: boolean;
  type: "bmp";
  clipping_rect: CLIPPING_RECTANGLE;
  clipping: boolean;
  is_screen: boolean;
  mem_type: "memory" | "system" | "video";
  parent: BITMAP | null;
}

/**
 * Subtype for clipping rectangles
 */
export interface CLIPPING_RECTANGLE {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Rle Bitmap
 *
 * @remarks
 *
 * @allegro 1.2.3
 */
export interface RLE_SPRITE {
  w: number;
  h: number;
  color_depth: number;
}

/**
 * Rle Bitmap
 *
 * @remarks
 *
 * @allegro 1.2.4
 */
export interface COMPILED_SPRITE {
  w: number;
  h: number;
  color_depth: number;
  planar: number;
}

/**
 * Joy info
 *
 * @remarks
 *
 * @allegro 1.2.5
 */
export interface JOYSTICK_INFO {
  flags: number;
  num_sticks: number;
  num_buttons: number;
  stick: JOYSTICK_STICK_INFO[];
  button: JOYSTICK_STICK_INFO[];
}

/**
 * Joystick Button Info
 *
 * @remarks
 *
 * @allegro 1.2.6
 */
export interface JOYSTICK_BUTTON_INFO {
  b: number;
  name: string;
}

/**
 * Joystick stick info
 *
 * @remarks
 *
 * @allegro 1.2.7
 */
export interface JOYSTICK_STICK_INFO {
  flags: number;
  num_axis: number;
  axis: JOYSTICK_AXIS_INFO[];
  name: string;
}

/**
 * Joystick axis info
 *
 * @remarks
 *
 * @allegro 1.2.8
 */
export interface JOYSTICK_AXIS_INFO {
  pos: number;
  d1: number;
  d2: number;
  name: string;
}

/**
 * Graphics mode list
 *
 * @remarks
 *
 * @allegro 1.2.9
 */
export interface GFX_MODE_LIST {
  num_modes: number;
  mode: GFX_MODE;
}

/**
 * Graphics mode
 *
 * @remarks
 *
 * @allegro 1.2.10
 */
export interface GFX_MODE {
  width: number;
  height: number;
  bpp: number;
}

/**
 * Palette max size
 *
 * @remarks
 *
 * @allegro 1.2.11
 */
export const PAL_SIZE = 256;

/**
 * Palette type
 *
 * @remarks
 *
 * @allegro 1.2.12
 */
export type PALETTE = RGB[];

/**
 * RGB entry
 *
 * @remarks
 *
 * @allegro 1.2.13
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * V3D
 *
 * @remarks
 *
 * @allegro 1.2.14
 */
export interface V3D {
  x: number;
  y: number;
  z: number;
  u: number;
  v: number;
  c: number;
}

/**
 * V3D f
 *
 * @remarks
 *
 * @allegro 1.2.15
 */
export interface V3D_f {
  x: number;
  y: number;
  z: number;
  u: number;
  v: number;
  c: number;
}

/**
 * Color map
 *
 * @remarks
 *
 * @allegro 1.2.16
 */
export interface COLOR_MAP {
  data: number[][];
}

/**
 * RGB map
 *
 * @remarks
 *
 * @allegro 1.2.17
 */
export interface RGB_MAP {
  data: number[][][];
}

/**
 * Allegro ffblk
 *
 * @remarks
 *
 * @allegro 1.2.18
 */
export interface al_ffblk {
  attrib: number;
  time: number;
  name: string;
}

/**
 * Datafile
 *
 * @remarks
 *
 * @allegro 1.2.19
 */
export interface DATAFILE {
  dat: string;
  type: number;
  size: number;
  prop: string;
}

/**
 * Matrix
 *
 * @remarks
 *
 * @allegro 1.2.20
 */
export interface MATRIX {
  v: number[][];
  t: number[];
}

/**
 * Matrix f
 *
 * @remarks
 *
 * @allegro 1.2.21
 */
export interface MATRIX_f {
  v: number[][];
  t: number[];
}

/**
 * Quit
 *
 * @remarks
 *
 * @allegro 1.2.22
 */
export interface QUAT {
  w: number;
  x: number;
  y: number;
  z: number;
}

/**
 * Dialog
 *
 * @remarks
 *
 * @allegro 1.2.23
 */
export interface DIALOG {
  proc: () => void;
  x: number;
  y: number;
  w: number;
  h: number;
  fg: number;
  bg: number;
  flags: number;
  d1: number;
  d2: number;
  dp: string;
  dp2: string;
  dp3: string;
}

/**
 * Menu
 *
 * @remarks
 *
 * @allegro 1.2.24
 */
export interface MENU {
  text: string;
  proc: () => void;
  child: MENU;
  flags: number;
  dp: string;
}

/**
 * Dialog player
 *
 * @remarks
 *
 * @allegro 1.2.25
 */
export interface DIALOG_PLAYER {
  obj: number;
  res: number;
  mouse_obj: number;
  focus_obj: number;
  joy_on: number;
  click_wait: number;
  mouse_ox: number;
  mouse_oy: number;
  mouse_oz: number;
  mouse_b: number;
  dialog: DIALOG;
}

/**
 * Menu player
 *
 * @remarks
 *
 * @allegro 1.2.26
 */
export interface MENU_PLAYER {
  menu: MENU /* The menu itself */;
  bar: number /* Set if it is a top level menu bar */;
  size: number /* Number of items in the menu */;
  sel: number /* Selected item */;
  x: number /* Screen position of the menu */;
  y: number /* Screen position of the menu */;
  w: number /* Screen position of the menu */;
  h: number /* Screen position of the menu */;
  numberproc: () => void /* Callback function */;
  saved: BITMAP /* Saved what was underneath it */;
  mouse_button_was_pressed: number /* Set if mouse button pressed on last iteration */;
  back_from_child: number /* Set if a child was activated on last iteration */;
  timestamp: number /* Timestamp for gui_timer events */;
  mouse_sel: number /* Item the mouse is currently over */;
  redraw: number /* Set if redrawing is required */;
  auto_open: number /* Set if menu auto-opening is activated */;
  ret: number /* Return value */;
  dialog: DIALOG /* D_menu_proc() parent dialog (if any) */;
  parent: MENU_PLAYER /* The parent menu, or NULL for root */;
  child: MENU_PLAYER /* The child menu, or NULL for none */;
}

/**
 * Font
 *
 * @remarks
 * Reference entry for font object returned by load_font() and create_font().
 *
 * @allegro 1.2.27
 */
export interface FONT {
  element: HTMLStyleElement | null;
  file: string;
  name: string;
  size: number;
  type: "fnt";
}

/**
 * Z Buffer
 *
 * @remarks
 *
 * @allegro 1.2.28
 */
export type ZBUFFER = BITMAP;

/**
 * Sample object
 *
 * @remarks
 * This is not a function. This is a sample object structure returned by load_sample().
 *
 * @allegro 1.2.29
 */
export interface SAMPLE {
  file: string;
  source: AudioBufferSourceNode;
  gain: GainNode;
  buffer: AudioBuffer | null;
  pan: StereoPannerNode;
  ready: boolean;
  type: "snd";
}

/**
 * Midi
 *
 * @remarks
 *
 * @allegro 1.2.30
 */
export interface MIDI {
  file: string;
  ready: boolean;
  type: "midi";
  data: MidiData;
}

/**
 * Audio stream
 *
 * @remarks
 *
 * @allegro 1.2.31
 */
export interface AUDIOSTREAM {
  voice: number;
}

/**
 * Packfile
 *
 * @remarks
 *
 * @allegro 1.2.32
 */
export interface PACKFILE {
  vtable: PACKFILE_VTABLE;
  userdata: () => void;
  is_normal_packfile: boolean;
  normal?: {
    hndl: number;
    flags: number;
    buf_pos: number;
    buf_size: number;
    todo: number;
    parent: PACKFILE;
    pack_data: LZSS_PACK_DATA;
    unpack_data: LZSS_UNPACK_DATA;
    filename: string;
    passdata: string;
    passpos: string;
    buff: string;
  };
}

/**
 * Packfile vtable
 *
 * @remarks
 *
 * @allegro 1.2.33
 */
export interface PACKFILE_VTABLE {
  userdata: string;
}

/**
 * LZSS Pack data
 *
 * @remarks
 *
 * @allegro 1.2.34
 */
export interface LZSS_PACK_DATA {
  state: number;
  i: number;
  c: number;
  len: number;
  r: number;
  s: number;
  last_match_length: number;
  code_buf_ptr: number;
  mask: number;
  code_buf: string;
  match_position: number;
  match_length: number;
  lson: number[];
  rson: number[];
  dad: number[];
  text_buf: string;
}

/**
 * LZSS unpack data
 *
 * @remarks
 *
 * @allegro 1.2.35
 */
export interface LZSS_UNPACK_DATA {
  state: number;
  i: number;
  j: number;
  k: number;
  r: number;
  c: number;
  flags: number;
  text_buf: string;
}
