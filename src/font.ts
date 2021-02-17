////////////////////////////////////////////
/// @name TEXT OUTPUT
//@{

import { rectfill, _fillstyle } from "./primitives.js";
import { BITMAP, FONT, RGB } from "./types.js";
import { vsprintf } from "./libs/sprintf.js";
import { create_bitmap } from "./bitmap.js";

let _text_len_canvas: BITMAP | null = null;

let _num_fonts = 0;

/// 1.18.1
export function register_font_file_type(
  ext: string,
  load: (filename: string, pal: RGB, param: string) => void
) {
  void ext;
  void load;
}

/// 1.18.2 Loads font from file.
/// This actually creates a style element, puts code inside and appends it to class. I heard it works all the time most of the time. Note that this function won't make ready() wait, as it's not possible to consistently tell if a font has been loaded in js, thus load your fonts first thing, and everything should be fine.
/// @param filename Font file URL
/// @return font object
export function load_font(filename: string, size = 12): FONT {
  const s = document.createElement("style");
  _num_fonts += 1;
  const fontname = "font" + _num_fonts;
  s.id = fontname;
  s.type = "text/css";
  document.head.appendChild(s);
  s.textContent =
    "@font-face { font-family: " + fontname + "; src:url('" + filename + "');}";
  return { element: s, file: filename, name: fontname, size, type: "fnt" };
}

/// 1.18.3
export function destroy_font(f: FONT) {
  void f;
}

/// 1.18.4
export function make_trans_font(f: FONT) {
  void f;
}

/// 1.18.5
export function is_color_font(f: FONT) {
  void f;
  return true;
}

/// 1.18.6
export function is_mono_font(f: FONT) {
  void f;
  return false;
}

/// 1.18.7
export function is_compatible_font(f: FONT) {
  void f;
  return true;
}

/// 1.18.8
export function get_font_ranges(f: FONT) {
  void f;
  return 1;
}

/// 1.18.9
export function get_font_range_begin(f: FONT, range: number) {
  void f;
  void range;
  return 1;
}

/// 1.18.10
export function get_font_range_end(f: FONT, range: number) {
  void f;
  void range;
  return 1;
}

/// 1.18.11
export function extract_font_range(f: FONT, begin: number, end: number) {
  void begin;
  void end;
  return f;
}

/// 1.18.12
export function transpose_font(f: FONT, drange: number) {
  void drange;
  return f;
}

/// 1.18.13
export function merge_fonts(f1: FONT, f2: FONT) {
  void f2;
  return f1;
}

/// 1.19.2
export const allegro_404_char = "^";

/// 1.19.3
export function text_length(f: FONT, str: string) {
  if (!_text_len_canvas) {
    _text_len_canvas = create_bitmap(0, 0);
  }
  _text_len_canvas.context.font = f.size + "px " + f.name;
  const metrics = _text_len_canvas.context.measureText(str);
  return metrics.width;
}

/// 1.19.4
export function text_height(f: FONT) {
  return f.size;
}

/// 1.19.5
export function textout_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
) {
  _textout(bitmap, f, s, x, y, colour, bg, "left");
}

/// 1.19.6
export function textout_centre_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
) {
  _textout(bitmap, f, s, x, y, colour, bg, "center");
}

/// 1.19.7
export function textout_right_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
) {
  _textout(bitmap, f, s, x, y, colour, bg, "right");
}

/// 1.19.8
export function textout_justify_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
) {
  _textout(bitmap, f, s, x, y, colour, bg, "center");
}

/// 1.19.9
export function textprintf_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
) {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "left");
}

/// 1.19.10
export function textprintf_centre_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
) {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "center");
}

/// 1.19.11
export function textprintf_right_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
) {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "right");
}

/// 1.19.12
export function textprintf_justify_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
) {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "center");
}

/// INTERNAL
function _textout(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number,
  text_align: "center" | "left" | "right"
) {
  if (!bitmap) {
    return;
  }

  bitmap.context.font = f.size + "px " + f.name;
  bitmap.context.textAlign = text_align;
  _fillstyle(bitmap, colour);

  if (bg !== -1) {
    const length = text_length(f, s);
    const height = text_height(f);
    switch (text_align) {
      case "center":
        rectfill(bitmap, x - length / 2, y, length, height * 1.2, bg);
        break;
      case "right":
        rectfill(bitmap, x - length, y, length, height * 1.2, bg);
        break;
      case "left":
      default:
        rectfill(bitmap, x, y, length, height * 1.2, bg);
        break;
    }
  }

  _fillstyle(bitmap, colour);
  bitmap.context.fillText(s, x, y + f.size);
}

//@}
