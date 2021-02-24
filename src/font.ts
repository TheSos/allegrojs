import { _fillstyle, rectfill } from "./primitives";
import { BITMAP, FONT, RGB } from "./types";
import { vsprintf } from "./sprintf";
import { create_bitmap } from "./bitmap";

let _text_len_canvas: BITMAP | null = null;

let _num_fonts = 0;

/**
 * Register font file type
 *
 * @remarks
 * Not implemented
 *
 * @param ext - string extension
 * @param load - callback to handle loading
 *
 * @allegro 1.18.1
 *
 * @alpha
 */
export function register_font_file_type(
  ext: string,
  load: (filename: string, pal: RGB, param: string) => void
): void {
  void ext;
  void load;
}

/**
 * Loads font from file.
 *
 * @remarks
 * This actually creates a style element, puts code inside and appends it to class.
 * I heard it works all the time most of the time. Note that this function won't make ready() wait,
 * as it's not possible to consistently tell if a font has been loaded in js,
 * thus load your fonts first thing, and everything should be fine.
 *
 * @param filename - Font file URL
 * @returns font object
 *
 * @allegro 1.18.2
 */
export function load_font(filename: string, size = 12): FONT {
  const s = document.createElement("style");
  _num_fonts += 1;
  const fontname = `font${_num_fonts}`;
  s.id = fontname;
  s.type = "text/css";
  document.head.appendChild(s);
  s.textContent = `@font-face { font-family: ${fontname}; src:url('${filename}');}`;
  return { element: s, file: filename, name: fontname, size, type: "fnt" };
}

/**
 * Destroy font
 *
 * @remarks
 * Not implementing
 *
 * @param f - Font to destroy
 *
 * @allegro 1.18.3
 */
export function destroy_font(f: FONT): void {
  void f;
}

/**
 * Make transparent font
 *
 * @remarks
 * Not implemented
 *
 * @param f - Font to make transparent
 *
 * @allegro 1.18.4
 */
export function make_trans_font(f: FONT): void {
  void f;
}

/**
 * Is color font
 *
 * @remarks
 * Not implemented
 *
 * @param f - Font to check
 * @returns true if is color, otherwise false
 *
 * @allegro 1.18.5
 */
export function is_color_font(f: FONT): boolean {
  void f;
  return true;
}

/**
 * Is mono font
 *
 * @remarks
 * Not implemented
 *
 * @param f - Font to check
 * @returns true if monospace, else false
 *
 * @allegro 1.18.6
 */
export function is_mono_font(f: FONT): boolean {
  void f;
  return false;
}

/**
 * Is compatible font
 *
 * @remarks
 * Not implementing
 *
 * @param f - Font to check
 * @returns true if compatible, false otherwise
 *
 * @allegro 1.18.7
 */
export function is_compatible_font(f: FONT): boolean {
  void f;
  return true;
}

/**
 * Get font ranges
 *
 * @remarks
 * Not impemented
 *
 * @param f - Font to check
 * @returns Range of font
 *
 * @allegro 1.18.8
 */
export function get_font_ranges(f: FONT): number {
  void f;
  return 1;
}

/**
 * Get font range begin
 *
 * @remarks
 * Find index of first character in font range
 *
 * @param f - Font to check
 * @param range - Range
 * @returns being point
 *
 * @allegro 1.18.9
 */
export function get_font_range_begin(f: FONT, range: number): number {
  void f;
  void range;
  return 1;
}

/**
 * Get font range end
 *
 * @remarks
 * Find index of last character in font range
 *
 * @param f - Font to check
 * @param range - Range
 * @returns end point
 *
 * @allegro 1.18.10
 */
export function get_font_range_end(f: FONT, range: number): number {
  void f;
  void range;
  return 1;
}

/**
 * Extract font range
 *
 * @remarks
 * Extract a range of characters from a font and creates a new font from them
 *
 * @param f - Font to splice
 * @param begin - Start character index
 * @param end - End character index
 *
 * @allegro 1.18.11
 */
export function extract_font_range(f: FONT, begin: number, end: number): FONT {
  void begin;
  void end;
  return f;
}

/**
 * Transpose font
 *
 * @remarks
 * This function transposes all characters in a font.
 *
 * @param f - Font to transpose
 * @param drange - Transpose amount
 * @returns 0 on success, -1 on fail
 *
 * @allegro 1.18.12
 */
export function transpose_font(f: FONT, drange: number): FONT {
  void drange;
  return f;
}

/**
 * Merge fonts
 *
 * @remarks
 * Merge two fonts together, returning the merged version
 *
 * @param f1 - Font 1
 * @param f2 - Font 2
 * @returns new merged font
 *
 * @allegro 1.18.13
 */
export function merge_fonts(f1: FONT, f2: FONT): FONT {
  void f2;
  return f1;
}

/**
 * Allegro 404 Character
 *
 * @remarks
 * When allegro cant find a glyph, it outputs this character.
 *
 * @allegro 1.19.2
 */
export const allegro_404_char = "^";

/**
 * Text Length
 *
 * @remarks
 * Calculate length of text. Uses a temp canvas internally for calculations.
 *
 * @param f - Font to use in calculation
 * @param str - String to check length of
 * @returns length of text in pixels
 *
 * @allegro 1.19.3
 */
export function text_length(f: FONT, str: string): number {
  if (!_text_len_canvas) {
    _text_len_canvas = create_bitmap(0, 0);
  }
  _text_len_canvas.context.font = `${f.size}px ${f.name}`;
  const metrics = _text_len_canvas.context.measureText(str);
  return metrics.width;
}

/**
 * Text height
 *
 * @remarks
 * Calculate height of a font. Just uses size internally.
 *
 * @param f - Font to check height of
 * @returns height of font.
 *
 * @allegro 1.19.4
 */
export function text_height(f: FONT): number {
  return f.size;
}

/**
 * Textout
 *
 * @remarks
 * Print text left justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param s - String to draw
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 *
 * @allegro 1.19.5
 */
export function textout_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
): void {
  _textout(bitmap, f, s, x, y, colour, bg, "left");
}

/**
 * Textout centre
 *
 * @remarks
 * Print text centre justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param s - String to draw
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 *
 * @allegro 1.19.6
 */
export function textout_centre_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
): void {
  _textout(bitmap, f, s, x, y, colour, bg, "center");
}

/**
 * Textout right
 *
 * @remarks
 * Print text right justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param s - String to draw
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 *
 * @allegro 1.19.7
 */
export function textout_right_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
): void {
  _textout(bitmap, f, s, x, y, colour, bg, "right");
}

/**
 * Textout justify
 *
 * @remarks
 * Print text justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param s - String to draw
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 *
 * @allegro 1.19.8
 */
export function textout_justify_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number
): void {
  _textout(bitmap, f, s, x, y, colour, bg, "center");
}

/**
 * Textprintf
 *
 * @remarks
 * Print formatted text left justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 * @param s - String to draw
 * @param args - Additional arguments
 *
 * @allegro 1.19.9
 */
export function textprintf_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
): void {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "left");
}

/**
 * Textprintf centre
 *
 * @remarks
 * Print formatted text centre justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 * @param s - String to draw
 * @param args - Additional arguments
 *
 * @allegro 1.19.10
 */
export function textprintf_centre_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
): void {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "center");
}

/**
 * Textprintf right
 *
 * @remarks
 * Print formatted text right justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 * @param s - String to draw
 * @param args - Additional arguments
 *
 * @allegro 1.19.11
 */
export function textprintf_right_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
): void {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "right");
}

/**
 * Textprintf justify
 *
 * @remarks
 * Print formatted text justified to screen
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 * @param s - String to draw
 * @param args - Additional arguments
 *
 * @allegro 1.19.12
 */
export function textprintf_justify_ex(
  bitmap: BITMAP | undefined,
  f: FONT,
  x: number,
  y: number,
  colour: number,
  bg: number,
  s: string,
  ...args: (number | string)[]
): void {
  _textout(bitmap, f, vsprintf(s, args), x, y, colour, bg, "center");
}

/**
 * Internal Textout
 *
 * @remarks
 * Internal textout used by all text fns
 *
 * @param bitmap - Bitmap to draw to
 * @param f - Font to use
 * @param s - String to draw
 * @param x - X position to draw to
 * @param y - Y position to draw to
 * @param colour - Colour of text
 * @param bg - Colour of background
 * @param text_align - Alignment of text
 *
 * @internal
 */
function _textout(
  bitmap: BITMAP | undefined,
  f: FONT,
  s: string,
  x: number,
  y: number,
  colour: number,
  bg: number,
  text_align: "center" | "left" | "right"
): void {
  if (!bitmap) {
    return;
  }

  bitmap.context.font = `${f.size}px ${f.name}`;
  bitmap.context.textAlign = text_align;
  _fillstyle(bitmap, colour);

  if (bg !== -1) {
    const length = text_length(f, s);
    const height = text_height(f);
    switch (text_align) {
      case "center":
        rectfill(
          bitmap,
          x - length / 2,
          y,
          x - length / 2 + length,
          y + height * 1.2,
          bg
        );
        break;
      case "right":
        rectfill(
          bitmap,
          x - length,
          y,
          x - length + length,
          y + height * 1.2,
          bg
        );
        break;
      case "left":
      default:
        rectfill(bitmap, x, y, x + length, y + height * 1.2, bg);
        break;
    }
  }

  _fillstyle(bitmap, colour);
  bitmap.context.fillText(s, x, y + f.size);
}
