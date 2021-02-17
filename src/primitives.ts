////////////////////////////////////////////
/// @name DRAWING PRIMITIVES
// @{

import { getr, getg, getb, geta } from "./color.js";
import { PI2, RAD } from "./math.js";
import { BITMAP } from "./types.js";

/// 1.14.1
/// Clears bitmap to transparent black.
/// Fills the entire bitmap with 0 value, which represents transparent black.
/// @param bitmap bitmap to be cleared
export function clear_bitmap(bitmap: BITMAP | undefined) {
  clear_to_color(bitmap, 0x000000);
}

/// 1.14.2
/// Clears bitmap to specified colour.
/// Fills the entire bitmap with colour value.
/// @param bitmap bitmap to be cleared
/// @param colour colour in 0xAARRGGBB format
export function clear_to_color(bitmap: BITMAP | undefined, colour: number) {
  if (!bitmap) {
    return;
  }
  bitmap.context.clearRect(0, 0, bitmap.w, bitmap.h);
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(0, 0, bitmap.w, bitmap.h);
}

/// 1.14.3 Gets pixel colour from bitmap
/// Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
/// @param bitmap bitmap object to update
/// @param x x coordinate of pixel
/// @param y y coordinate of pixel
/// @param colour colour in 0xAARRGGBB format
export function putpixel(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
) {
  if (!bmp) {
    return;
  }
  _fillstyle(bmp, c);
  bmp.context.fillRect(x, y, 1, 1);
}

/// 1.14.4
export function _putpixel(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
) {
  return putpixel(bmp, x, y, c);
}

export function _putpixel15(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
) {
  return putpixel(bmp, x, y, c);
}

export function _putpixel16(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
) {
  return putpixel(bmp, x, y, c);
}

export function _putpixel24(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
) {
  return putpixel(bmp, x, y, c);
}

export function _putpixel32(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
) {
  return putpixel(bmp, x, y, c);
}

/// 1.14.5 Gets pixel colour from bitmap
/// Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
/// @param bitmap bitmap object to poll
/// @param x x coordinate of pixel
/// @param y y coordinate of pixel
/// @return colour in 0xAARRGGBB format
export function getpixel(bmp: BITMAP | undefined, x: number, y: number) {
  if (!bmp || x < 0 || y < 0 || x >= bmp.w || y >= bmp.h) {
    return -1;
  }
  const { data } = bmp.context.getImageData(x, y, 1, 1);

  return (
    ((data[3] ?? 0) << 24) |
    (((data[0] ?? 0) & 0xff) << 16) |
    (((data[1] ?? 0) & 0xff) << 8) |
    ((data[2] ?? 0) & 0xff)
  );
}

export function _getpixel(bmp: BITMAP | undefined, x: number, y: number) {
  return getpixel(bmp, x, y);
}

export function _getpixel15(bmp: BITMAP | undefined, x: number, y: number) {
  return getpixel(bmp, x, y);
}

export function _getpixel16(bmp: BITMAP | undefined, x: number, y: number) {
  return getpixel(bmp, x, y);
}

export function _getpixel24(bmp: BITMAP | undefined, x: number, y: number) {
  return getpixel(bmp, x, y);
}

export function _getpixel32(bmp: BITMAP | undefined, x: number, y: number) {
  return getpixel(bmp, x, y);
}

/// 1.14.7 Draws a vertical line.
/// Draws a vertical line from one point to another using given colour. Probably slightly faster than line() method, since this one uses rectfill() to draw the line.
/// @param bitmap to be drawn to
/// @param x column to draw the line to
/// @param y1,y2 line endpoints
/// @param colour colour in 0xAARRGGBB format
/// @param width line width (defaults to 1)
export function vline(
  bitmap: BITMAP | undefined,
  x: number,
  y1: number,
  y2: number,
  colour: number,
  width = 1
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(x - width / 2, y1, width, y2 - y1);
}

/// 1.14.8 Draws a horizontal line.
/// Draws a horizontal line from one point to another using given colour. Probably slightly faster than line() method, since this one uses rectfill() to draw the line.
/// @param bitmap to be drawn to
/// @param y row to draw the line to
/// @param x1,x2 line endpoints
/// @param colour colour in 0xAARRGGBB format
/// @param width line width (defaults to 1)
export function hline(
  bitmap: BITMAP | undefined,
  x1: number,
  y: number,
  x2: number,
  colour: number,
  width = 1
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(x1, y - width / 2, x2 - x1, width);
}

/// 1.14.9
export function do_line(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
) {
  void bitmap;
  void x1;
  void y1;
  void x2;
  void y2;
  void d;
  void proc;
}

/// 1.14.10 Draws a line.
/// Draws a line from one point to another using given colour.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param x2,y2 end point coordinates
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function line(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.moveTo(x1, y1);
  bitmap.context.lineTo(x2, y2);
  bitmap.context.stroke();
}

/// 1.14.11
export function fastline(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colour: number
) {
  line(bitmap, x1, y1, x2, y2, colour);
}

/// 1.14.12 Draws a triangle.
/// Draws a triangle using three coordinates. The triangle is not filled.
/// @param bitmap to be drawn to
/// @param x1,y1 first point coordinates
/// @param x2,y2 second point coordinates
/// @param x3,y3 third point coordinates
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function triangle(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.moveTo(x1, y1);
  bitmap.context.lineTo(x2, y2);
  bitmap.context.lineTo(x3, y3);
  bitmap.context.closePath();
  bitmap.context.fill();
}

/// 1.14.13 Draws a polygon.
/// Draws a polygon using three coordinates. The polygon is not filled.
/// @param bitmap to be drawn to
/// @param vertices number of vertices to draw
/// @param points array containing vertices*2 elements of polygon coordinates in [x1,y1,x2,y2,x3...] format
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function polygon(
  bitmap: BITMAP | undefined,
  vertices: number,
  points: number[],
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.beginPath();
  for (let c = 0; c < vertices; c += 1) {
    if (c) bitmap.context.lineTo(points[c * 2] ?? 0, points[c * 2 + 1] ?? 0);
    else bitmap.context.moveTo(points[c * 2] ?? 0, points[c * 2 + 1] ?? 0);
  }
  bitmap.context.closePath();
  bitmap.context.fill();
}

/// 1.14.14 Draws a rectangle.
/// Draws a rectangle from one point to another using given colour. The rectangle is not filled. Opposed to traditional allegro approach, width and height have to be provided, not an end point.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param w,h width and height
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function rect(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  w: number,
  h: number,
  colour: number,
  width: number
) {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour, width);
  bitmap.context.strokeRect(x1, y1, w, h);
}

/// 1.14.15 Draws a filled ectangle.
/// Draws a rectangle from one point to another using given colour. The rectangle is filled. Opposed to traditional allegro approach, width and height have to be provided, not an end point.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param w,h width and height
/// @param colour colour in 0xAARRGGBB format
export function rectfill(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  w: number,
  h: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(x1, y1, w, h);
}

/// 1.14.16
export function do_circle(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  radius: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
) {
  void bmp;
  void x;
  void y;
  void radius;
  void d;
  void proc;
}

/// 1.14.17 Draws a circle.
/// Draws a circle at specified centre point and radius. The circle is not filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param r circle radius
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function circle(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  radius: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.arc(x, y, radius, 0, PI2);
  bitmap.context.stroke();
}

/// 1.14.18 Draws a circle.
/// Draws a circle at specified centre point and radius. The circle is filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param r circle radius
/// @param colour colour in 0xAARRGGBB format
export function circlefill(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  radius: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.arc(x, y, radius, 0, PI2);
  bitmap.context.fill();
}

/// 1.14.19
export function do_ellipse(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  rx: number,
  ry: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
) {
  void bitmap;
  void x;
  void y;
  void rx;
  void ry;
  void d;
  void proc;
}

/// 1.14.20

/// Draws an ellipse.
/// Draws an ellipse at specified centre point and radius. The ellipse is not filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param rx,ry ellipse radius in x and y
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function ellipse(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  rx: number,
  ry: number,
  colour: number,
  width: number
) {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour, width);
  bitmap.context.save();
  bitmap.context.translate(x, y);
  bitmap.context.scale(rx, ry);
  bitmap.context.beginPath();
  bitmap.context.arc(0, 0, 1, 0, PI2);
  bitmap.context.restore();
  bitmap.context.stroke();
}

/// 1.14.21 Draws an ellipse.
/// Draws an ellipse at specified centre point and radius. The ellipse is filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param rx,ry ellipse radius in x and y
/// @param colour colour in 0xAARRGGBB format
export function ellipsefill(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  rx: number,
  ry: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.save();
  bitmap.context.translate(x, y);
  bitmap.context.scale(rx, ry);
  bitmap.context.beginPath();
  bitmap.context.arc(0, 0, 1, 0, PI2);
  bitmap.context.restore();
  bitmap.context.fill();
}

/// 1.14.22
export function do_arc(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  ang1: number,
  ang2: number,
  r: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
) {
  void bitmap;
  void x;
  void y;
  void ang1;
  void ang2;
  void r;
  void d;
  void proc;
}

/// 1.14.23 Draws a arc.
/// Draws a circle at specified centre point and radius. The arc is not filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param ang1,ang2 angles to draw the arc between measured anticlockwise from the positive x axis in degrees
/// @param r radius
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
export function arc(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  ang1: number,
  ang2: number,
  r: number,
  colour: number
) {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour, 1);
  bitmap.context.beginPath();
  if (ang1 > ang2) {
    bitmap.context.arc(x, y, r, RAD(ang1), RAD(ang2));
  } else {
    bitmap.context.arc(x, y, r, RAD(ang1), RAD(ang2));
  }
  bitmap.context.stroke();
}

/// 1.14.24
export function calc_spline(
  points: number[],
  npts: number,
  x: number,
  y: number
) {
  void points;
  void npts;
  void x;
  void y;
}

/// 1.14.25
export function spline(
  bmp: BITMAP | undefined,
  points: number[],
  color: number
) {
  void bmp;
  void points;
  void color;
}

/// 1.14.26
export function floodfill(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  color: number
) {
  void bmp;
  void x;
  void y;
  void color;
}

/// INTERNAL
/// Helper for setting fill style
export function _fillstyle(bitmap: BITMAP | undefined, colour: number) {
  if (!bitmap) {
    return;
  }
  bitmap.context.fillStyle =
    "rgba(" +
    getr(colour) +
    "," +
    getg(colour) +
    "," +
    getb(colour) +
    "," +
    (255 - geta(colour)) / 255 +
    ")";
}

/// Helper for setting stroke style
export function _strokestyle(
  bitmap: BITMAP | undefined,
  colour: number,
  width = 1
) {
  if (!bitmap) {
    return;
  }
  bitmap.context.lineWidth = width;
  bitmap.context.strokeStyle =
    "rgba(" +
    getr(colour) +
    "," +
    getg(colour) +
    "," +
    getb(colour) +
    "," +
    (255 - geta(colour)) / 255 +
    ")";
}

//@}
