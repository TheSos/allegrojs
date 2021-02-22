// Internal color depth set to 32
const _color_depth = 32;

/**
 * Create packed color format from rgb in 8bit
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.1
 */
export function makecol8(r: number, g: number, b: number): number {
  return makecol32(r, g, b);
}

/**
 * Create packed color format from rgb in 15 bit
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.1
 */
export function makecol15(r: number, g: number, b: number): number {
  return makecol32(r, g, b);
}

/**
 * Create packed color format from rgb in 16 bit
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.1
 */
export function makecol16(r: number, g: number, b: number): number {
  return makecol32(r, g, b);
}

/**
 * Create packed color format from rgb in 24 bit
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.1
 */
export function makecol24(r: number, g: number, b: number): number {
  return makecol32(r, g, b);
}

/**
 * Create packed color format from rgb in 32 bit
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.1
 */
export function makecol32(r: number, g: number, b: number): number {
  return (r << 0) | (g << 8) | (b << 16);
}

/**
 * Make packed color with alpha from rgba
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @param a - alpha component in 0-255 range
 *
 * @allegro 1.13.2
 */
export function makeacol32(r: number, g: number, b: number, a: number): number {
  return (r << 0) | (g << 8) | (b << 16) | (a << 24);
}

/**
 * Create packed color format from rgb
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.3
 */
export function makecol(r: number, g: number, b: number): number {
  return makecol_depth(_color_depth, r, g, b);
}

/**
 * Makecol at depth
 *
 * @remarks
 * Select correct makecol for set color depth
 *
 * @allegro 1.13.4
 */
export function makecol_depth(
  color_depth: number,
  r: number,
  g: number,
  b: number
): number {
  switch (color_depth) {
    case 8:
      return makecol8(r, g, b);
    case 15:
      return makecol15(r, g, b);
    case 16:
      return makecol16(r, g, b);
    case 24:
      return makecol24(r, g, b);
    case 32:
      return makecol32(r, g, b);
    default:
      return 0;
  }
}

/**
 * Makecol at depth with alpha
 *
 * @remarks
 * Select correct makecol for set color depth
 *
 * @allegro 1.13.4
 */
export function makeacol_depth(
  color_depth: number,
  r: number,
  g: number,
  b: number,
  a: number
): number {
  switch (color_depth) {
    case 8:
      return makecol8(r, g, b);
    case 15:
      return makecol15(r, g, b);
    case 16:
      return makecol16(r, g, b);
    case 24:
      return makecol24(r, g, b);
    case 32:
      return makeacol32(r, g, b, a);
    default:
      return 0;
  }
}

/**
 * Create packed color format from rgba
 *
 * @remarks
 * Overdrive is not permitted, so values over 255 (0xff) will get clipped.
 *
 * @param r - red component in 0-255 range
 * @param g - green component in 0-255 range
 * @param b - blue component in 0-255 range
 * @param a - alpha component in 0-255 range
 * @returns colour in 0xAARRGGBB format
 *
 * @allegro 1.13.5
 */
export function makeacol(r: number, g: number, b: number, a: number): number {
  return makeacol_depth(_color_depth, r, g, b, a);
}

/**
 * Make dithered colour
 *
 * @remarks
 * Currently does not dither
 *
 * @allegro 1.13.6
 *
 * @alpha
 */
export function makecol15_dither(
  r: number,
  g: number,
  b: number,
  x: number,
  y: number
): number {
  void x;
  void y;
  return makecol32(r, g, b);
}

/**
 * Get red 8 bit
 *
 * @allegro 1.13.7
 */
export function getr8(c: number): number {
  return getr32(c);
}

/**
 * Get red 15 bit
 *
 * @allegro 1.13.7
 */
export function getr15(c: number): number {
  return getr32(c);
}

/**
 * Get red 16 bit
 *
 * @allegro 1.13.7
 */
export function getr16(c: number): number {
  return getr32(c);
}

/**
 * Get red 24 bit
 *
 * @allegro 1.13.7
 */
export function getr24(c: number): number {
  return getr32(c);
}

/**
 * Get red 32 bit
 *
 * @allegro 1.13.7
 */
export function getr32(c: number): number {
  return (c >> 0) & 0xff;
}

/**
 * Get green 8 bit
 *
 * @allegro 1.13.7
 */
export function getg8(c: number): number {
  return getg32(c);
}

/**
 * Get green 15 bit
 *
 * @allegro 1.13.7
 */
export function getg15(c: number): number {
  return getg32(c);
}

/**
 * Get green 16 bit
 *
 * @allegro 1.13.7
 */
export function getg16(c: number): number {
  return getg32(c);
}

/**
 * Get green 24 bit
 *
 * @allegro 1.13.7
 */
export function getg24(c: number): number {
  return getg32(c);
}

/**
 * Get green 32 bit
 *
 * @allegro 1.13.7
 */
export function getg32(c: number): number {
  return (c >> 8) & 0xff;
}

/**
 * Get blue 8 bit
 *
 * @allegro 1.13.7
 */
export function getb8(c: number): number {
  return getb32(c);
}

/**
 * Get blue 15 bit
 *
 * @allegro 1.13.7
 */
export function getb15(c: number): number {
  return getb32(c);
}

/**
 * Get blue 16 bit
 *
 * @allegro 1.13.7
 */
export function getb16(c: number): number {
  return getb32(c);
}

/**
 * Get blue 24 bit
 *
 * @allegro 1.13.7
 */
export function getb24(c: number): number {
  return getb32(c);
}

/**
 * Get blue 32 bit
 *
 * @allegro 1.13.7
 */
export function getb32(c: number): number {
  return (c >> 16) & 0xff;
}

/**
 *
 *
 * @remarks
 *
 * @allegro 1.13.8
 */
export function geta32(c: number): number {
  return (c >> 24) & 0xff;
}

/**
 * Gets red bits from 0xRRGGBB
 *
 * @remarks
 *
 * @param colour - colour in 0xAARRGGBB format
 * @returns red - component in 0-255 range
 *
 * @allegro 1.13.9
 */
export function getr(c: number): number {
  return getr_depth(_color_depth, c);
}

/**
 * Gets green bits from 0xRRGGBB
 *
 * @remarks
 *
 * @param colour - colour in 0xAARRGGBB format
 * @returns green - component in 0-255 range
 *
 * @allegro 1.13.9
 */
export function getg(c: number): number {
  return getg_depth(_color_depth, c);
}

/**
 * Gets blue bits from 0xRRGGBB
 *
 * @remarks
 *
 * @param colour - colour in 0xAARRGGBB format
 * @returns blue - component in 0-255 range
 *
 * @allegro 1.13.9
 */
export function getb(c: number): number {
  return getb_depth(_color_depth, c);
}

/**
 * Gets alpha bits from 0xRRGGBB
 *
 * @remarks
 *
 * @param colour - colour in 0xAARRGGBB format
 * @returns alpha - component in 0-255 range
 *
 * @allegro 1.13.9
 */
export function geta(c: number): number {
  return geta_depth(_color_depth, c);
}

/**
 * Get red pixel at depth
 *
 * @allegro 1.13.10
 */
export function getr_depth(color_depth: number, c: number): number {
  switch (color_depth) {
    case 8:
      return getr8(c);
    case 15:
      return getr15(c);
    case 16:
      return getr16(c);
    case 24:
      return getr24(c);
    case 32:
      return getr32(c);
    default:
      return 0;
  }
}

/**
 * Get green pixel at depth
 *
 * @allegro 1.13.10
 */
export function getg_depth(color_depth: number, c: number): number {
  switch (color_depth) {
    case 8:
      return getg8(c);
    case 15:
      return getg15(c);
    case 16:
      return getg16(c);
    case 24:
      return getg24(c);
    case 32:
      return getg32(c);
    default:
      return 0;
  }
}

/**
 * Get blue pixel at depth
 *
 * @allegro 1.13.10
 */
export function getb_depth(color_depth: number, c: number): number {
  switch (color_depth) {
    case 8:
      return getb8(c);
    case 15:
      return getb15(c);
    case 16:
      return getb16(c);
    case 24:
      return getb24(c);
    case 32:
      return getb32(c);
    default:
      return 0;
  }
}

export function geta_depth(color_depth: number, c: number): number {
  if (color_depth === 32) return geta32(c);
  return 0;
}

/**
 * Palette color
 *
 * @remarks
 * Does nothing, added for completeness
 *
 * @allegro 1.13.10
 */
export const palette_color: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
