const _color_depth = 32;

/// 1.13.1
export function makecol8(r: number, g: number, b: number) {
  return makecol32(r, g, b);
}

export function makecol15(r: number, g: number, b: number) {
  return makecol32(r, g, b);
}

export function makecol16(r: number, g: number, b: number) {
  return makecol32(r, g, b);
}

export function makecol24(r: number, g: number, b: number) {
  return makecol32(r, g, b);
}

export function makecol32(r: number, g: number, b: number) {
  return (r << 0) | (g << 8) | (b << 16);
}

/// 1.13.2
export function makeacol32(r: number, g: number, b: number, a: number) {
  return (r << 0) | (g << 8) | (b << 16) | (a << 24);
}

/// 1.13.3 Creates a 0xAARRGGBB from values
/// Overdrive is not permitted, so values over 255 (0xff) will get clipped.
/// @param r red component in 0-255 range
/// @param g green component in 0-255 range
/// @param b blue  component in 0-255 range
/// @param a alpha component in 0-255 range, defaults to 255 (fully opaque)
/// @return colour in 0xAARRGGBB format
export function makecol(r: number, g: number, b: number): number {
  return makecol_depth(_color_depth, r, g, b);
}

/// 1.13.4
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

/// 1.13.5
/// Overdrive is not permitted, so values over 255 (0xff) will get clipped.
/// @param r red component in 0-255 range
/// @param g green component in 0-255 range
/// @param b blue  component in 0-255 range
/// @param a alpha component in 0-255 range
/// @return colour in 0xAARRGGBB format
export function makeacol(r: number, g: number, b: number, a: number): number {
  return makeacol_depth(_color_depth, r, g, b, a);
}

/// 1.13.6
export function makecol15_dither(
  r: number,
  g: number,
  b: number,
  x: number,
  y: number
) {
  void x;
  void y;
  return makecol32(r, g, b);
}

/// 1.13.7
// Red
export function getr8(c: number) {
  return getr32(c);
}

export function getr15(c: number) {
  return getr32(c);
}

export function getr16(c: number) {
  return getr32(c);
}

export function getr24(c: number) {
  return getr32(c);
}

export function getr32(c: number) {
  return (c >> 0) & 0xff;
}

// Green
export function getg8(c: number) {
  return getg32(c);
}

export function getg15(c: number) {
  return getg32(c);
}

export function getg16(c: number) {
  return getg32(c);
}

export function getg24(c: number) {
  return getg32(c);
}

export function getg32(c: number) {
  return (c >> 8) & 0xff;
}

// Blue
export function getb8(c: number) {
  return getb32(c);
}

export function getb15(c: number) {
  return getb32(c);
}

export function getb16(c: number) {
  return getb32(c);
}

export function getb24(c: number) {
  return getb32(c);
}

export function getb32(c: number) {
  return (c >> 16) & 0xff;
}

/// 1.13.8
export function geta32(c: number) {
  return (c >> 24) & 0xff;
}

/// 1.13.9 Gets red bits from 0xRRGGBB
/// This one does clip.
/// @param colour colour in 0xAARRGGBB format
/// @return red component in 0-255 range
export function getr(c: number) {
  return getr_depth(_color_depth, c);
}

/// Gets red bits from 0xRRGGBB
/// This one too.
/// @param colour colour in 0xAARRGGBB format
/// @return green component in 0-255 range
export function getg(c: number) {
  return getg_depth(_color_depth, c);
}

/// Gets red bits from 0xRRGGBB
/// This one clips as well.
/// @param colour colour in 0xAARRGGBB format
/// @return blue component in 0-255 range
export function getb(c: number) {
  return getb_depth(_color_depth, c);
}

/// Gets alpha bits from 0xAARRGGBB
/// This one doesn't.
/// @param colour colour in 0xAARRGGBB format
/// @return alpha component in 0-255 range
export function geta(c: number) {
  return geta_depth(_color_depth, c);
}

/// 1.13.10
export function getr_depth(color_depth: number, c: number) {
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

export function getg_depth(color_depth: number, c: number) {
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

export function getb_depth(color_depth: number, c: number) {
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

export function geta_depth(color_depth: number, c: number) {
  if (color_depth === 32) return geta32(c);
  return 0;
}
