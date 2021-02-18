/// Special types
export type CONFIG_DATA = Record<string, Record<string, string>>;

/**
 * Config
 *
 * @remarks
 * Stores config file
 */
export type CONFIG = {
  file: string;
  data: CONFIG_DATA;
  ready: boolean;
  type: "config";
};

/**
 * Timer
 *
 * @remarks
 * Structure of a timer
 */
export type TIMER = {
  timer: () => void;
  id: number;
};

/**
 * Touch object
 *
 * @remarks
 * The structure of touch object found in touch[] array and inside touch_pressed touch_released.
 * You can retain the touch obect picked up from touch_pressed in your code, but remember to let go of the dead ones.
 */
export type ALLEGRO_TOUCH_EVENT = {
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
};

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
export type BITMAP = {
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  ready: boolean;
  type: "bmp";
};

/**
 * Rle Bitmap
 *
 * @remarks
 *
 * @allegro 1.2.3
 */
export type RLE_SPRITE = {
  w: number;
  h: number;
  color_depth: number;
};

/**
 * Rle Bitmap
 *
 * @remarks
 *
 * @allegro 1.2.4
 */
export type COMPILED_SPRITE = {
  w: number;
  h: number;
  color_depth: number;
  planar: number;
};

/**
 * Joy info
 *
 * @remarks
 *
 * @allegro 1.2.5
 */
export type JOYSTICK_INFO = {
  flags: number;
  num_sticks: number;
  num_buttons: number;
  stick: JOYSTICK_STICK_INFO[];
  button: JOYSTICK_STICK_INFO[];
};

/**
 * Joystick Button Info
 *
 * @remarks
 *
 * @allegro 1.2.6
 */
export type JOYSTICK_BUTTON_INFO = {
  b: number;
  name: string;
};

/**
 * Joystick stick info
 *
 * @remarks
 *
 * @allegro 1.2.7
 */
export type JOYSTICK_STICK_INFO = {
  flags: number;
  num_axis: number;
  axis: JOYSTICK_AXIS_INFO[];
  name: string;
};

/**
 * Joystick axis info
 *
 * @remarks
 *
 * @allegro 1.2.8
 */
export type JOYSTICK_AXIS_INFO = {
  pos: number;
  d1: number;
  d2: number;
  name: string;
};

/**
 * Graphics mode list
 *
 * @remarks
 *
 * @allegro 1.2.9
 */
export type GFX_MODE_LIST = {
  num_modes: number;
  mode: GFX_MODE;
};

/**
 * Graphics mode
 *
 * @remarks
 *
 * @allegro 1.2.10
 */
export type GFX_MODE = {
  width: number;
  height: number;
  bpp: number;
};

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
export type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * V3D
 *
 * @remarks
 *
 * @allegro 1.2.14
 */
export type V3D = {
  x: number;
  y: number;
  z: number;
  u: number;
  v: number;
  c: number;
};

/**
 * V3D f
 *
 * @remarks
 *
 * @allegro 1.2.15
 */
export type V3D_f = {
  x: number;
  y: number;
  z: number;
  u: number;
  v: number;
  c: number;
};

/**
 * Color map
 *
 * @remarks
 *
 * @allegro 1.2.16
 */
export type COLOR_MAP = {
  data: number[][];
};

/**
 * RGB map
 *
 * @remarks
 *
 * @allegro 1.2.17
 */
export type RGB_MAP = {
  data: number[][][];
};

/**
 * Allegro ffblk
 *
 * @remarks
 *
 * @allegro 1.2.18
 */
export type al_ffblk = {
  attrib: number;
  time: number;
  name: string;
};

/**
 * Datafile
 *
 * @remarks
 *
 * @allegro 1.2.19
 */
export type DATAFILE = {
  dat: string;
  type: number;
  size: number;
  prop: string;
};

/**
 * Matrix
 *
 * @remarks
 *
 * @allegro 1.2.20
 */
export type MATRIX = {
  v: number[][];
  t: number[];
};

/**
 * Matrix f
 *
 * @remarks
 *
 * @allegro 1.2.21
 */
export type MATRIX_f = {
  v: number[][];
  t: number[];
};

/**
 * Quit
 *
 * @remarks
 *
 * @allegro 1.2.22
 */
export type QUAT = {
  w: number;
  x: number;
  y: number;
  z: number;
};

/**
 * Dialog
 *
 * @remarks
 *
 * @allegro 1.2.23
 */
export type DIALOG = {
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
};

/**
 * Menu
 *
 * @remarks
 *
 * @allegro 1.2.24
 */
export type MENU = {
  text: string;
  proc: () => void;
  child: MENU;
  flags: number;
  dp: string;
};

/**
 * Dialog player
 *
 * @remarks
 *
 * @allegro 1.2.25
 */
export type DIALOG_PLAYER = {
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
};

/**
 * Menu player
 *
 * @remarks
 *
 * @allegro 1.2.26
 */
export type MENU_PLAYER = {
  menu: MENU /* the menu itself */;
  bar: number /* set if it is a top level menu bar */;
  size: number /* number of items in the menu */;
  sel: number /* selected item */;
  x: number /* screen position of the menu */;
  y: number /* screen position of the menu */;
  w: number /* screen position of the menu */;
  h: number /* screen position of the menu */;
  numberproc: () => void /* callback function */;
  saved: BITMAP /* saved what was underneath it */;
  mouse_button_was_pressed: number /* set if mouse button pressed on last iteration */;
  back_from_child: number /* set if a child was activated on last iteration */;
  timestamp: number /* timestamp for gui_timer events */;
  mouse_sel: number /* item the mouse is currently over */;
  redraw: number /* set if redrawing is required */;
  auto_open: number /* set if menu auto-opening is activated */;
  ret: number /* return value */;
  dialog: DIALOG /* d_menu_proc() parent dialog (if any) */;
  parent: MENU_PLAYER /* the parent menu, or NULL for root */;
  child: MENU_PLAYER /* the child menu, or NULL for none */;
};

/**
 * Font
 *
 * @remarks
 * Reference entry for font object returned by load_font() and create_font().
 *
 * @allegro 1.2.27
 */
export type FONT = {
  element: HTMLStyleElement | null;
  file: string;
  name: string;
  size: number;
  type: "fnt";
};

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
export type SAMPLE = {
  element: HTMLAudioElement;
  file: string;
  volume: number;
  ready: boolean;
  type: "snd";
};

/**
 * Midi
 *
 * @remarks
 *
 * @allegro 1.2.30
 */
export type MIDI = {
  file: string;
  ready: boolean;
  type: "midi";
};

/**
 * Audio stream
 *
 * @remarks
 *
 * @allegro 1.2.31
 */
export type AUDIOSTREAM = {
  voice: number;
};

/**
 * Packfile
 *
 * @remarks
 *
 * @allegro 1.2.32
 */
export type PACKFILE = {
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
};

/**
 * Packfile vtable
 *
 * @remarks
 *
 * @allegro 1.2.33
 */
export type PACKFILE_VTABLE = {
  userdata: string;
};

/**
 * LZSS Pack data
 *
 * @remarks
 *
 * @allegro 1.2.34
 */
export type LZSS_PACK_DATA = {
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
};

/**
 * LZSS unpack data
 *
 * @remarks
 *
 * @allegro 1.2.35
 */
export type LZSS_UNPACK_DATA = {
  state: number;
  i: number;
  j: number;
  k: number;
  r: number;
  c: number;
  flags: number;
  text_buf: string;
};
