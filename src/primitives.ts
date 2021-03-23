import { geta, getb, getg, getr } from "./color";
import { PI2, fix_to_rad } from "./math";
import { BITMAP } from "./types";

/**
 * Clear Bitmap
 *
 * @remarks
 * Clears bitmap to transparent black.
 * Fills the entire bitmap with 0 value, which represents transparent black.
 *
 * @param bitmap - bitmap to be cleared
 *
 * @allegro 1.14.1
 */
export function clear_bitmap(bitmap: BITMAP | undefined): void {
  clear_to_color(bitmap, 0x000000);
}

/**
 * Clear to color
 *
 * @remarks
 * Clears bitmap to specified colour.
 * Fills the entire bitmap with colour value.
 *
 * @param bitmap - bitmap to be cleared
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.2
 */
export function clear_to_color(
  bitmap: BITMAP | undefined,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  bitmap.context.clearRect(0, 0, bitmap.w, bitmap.h);
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(0, 0, bitmap.w, bitmap.h);
}

/**
 * Gets pixel colour from bitmap
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 *
 * @param bmp - bitmap object to update
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @param c - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.3
 */
export function putpixel(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
): void {
  if (!bmp) {
    return;
  }
  _fillstyle(bmp, c);
  bmp.context.fillRect(x, y, 1, 1);
}

/**
 * Put pixel fast
 *
 * @remarks
 * Since we dont have access to speedy c routines, this just calls put pixel
 *
 * @param bmp - bitmap object to update
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @param c - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.4
 */
export function _putpixel(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
): void {
  putpixel(bmp, x, y, c);
}

/**
 * Put pixel fast 15 bit
 *
 * @remarks
 * Since we dont have access to color modes, this just calls put pixel
 *
 * @param bmp - bitmap object to update
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @param c - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.4
 */
export function _putpixel15(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
): void {
  putpixel(bmp, x, y, c);
}

/**
 * Put pixel fast 16 bit
 *
 * @remarks
 * Since we dont have access to color modes, this just calls put pixel
 *
 * @param bmp - bitmap object to update
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @param c - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.4
 */
export function _putpixel16(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
): void {
  putpixel(bmp, x, y, c);
}

/**
 * Put pixel fast 24 bit
 *
 * @remarks
 * Since we dont have access to color modes, this just calls put pixel
 *
 * @param bmp - bitmap object to update
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @param c - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.4
 */
export function _putpixel24(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
): void {
  putpixel(bmp, x, y, c);
}

/**
 * Put pixel fast 32 bit
 *
 * @remarks
 * Since we dont have access to color modes, this just calls put pixel
 *
 * @param bmp - bitmap object to update
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @param c - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.4
 */
export function _putpixel32(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  c: number
): void {
  putpixel(bmp, x, y, c);
}

/**
 * Gets pixel colour from bitmap
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 *
 * @param bmp - bitmap object to poll
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 *
 * @returns colour in 0xAARRGGBB format or -1 if it is out of bounds
 *
 * @allegro 1.14.5
 */
export function getpixel(
  bmp: BITMAP | undefined,
  x: number,
  y: number
): number {
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

/**
 * Fast gets pixel colour from bitmap
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 * This is not actually fast
 *
 * @param bmp - bitmap object to poll
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @returns colour in 0xAARRGGBB format or -1 if it is out of bounds
 *
 * @allegro 1.14.5
 */
export function _getpixel(
  bmp: BITMAP | undefined,
  x: number,
  y: number
): number {
  return getpixel(bmp, x, y);
}

/**
 * Fast gets pixel 15 bit
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 * This is not actually fast
 *
 * @param bmp - bitmap object to poll
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @returns colour in 0xAARRGGBB format or -1 if it is out of bounds
 *
 * @allegro 1.14.5
 */
export function _getpixel15(
  bmp: BITMAP | undefined,
  x: number,
  y: number
): number {
  return getpixel(bmp, x, y);
}

/**
 * Fast gets pixel 16 bit
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 * This is not actually fast
 *
 * @param bmp - bitmap object to poll
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @returns colour in 0xAARRGGBB format or -1 if it is out of bounds
 *
 * @allegro 1.14.5
 */
export function _getpixel16(
  bmp: BITMAP | undefined,
  x: number,
  y: number
): number {
  return getpixel(bmp, x, y);
}

/**
 * Fast gets pixel 24 bit
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 * This is not actually fast
 *
 * @param bmp - bitmap object to poll
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @returns colour in 0xAARRGGBB format or -1 if it is out of bounds
 *
 * @allegro 1.14.5
 */
export function _getpixel24(
  bmp: BITMAP | undefined,
  x: number,
  y: number
): number {
  return getpixel(bmp, x, y);
}

/**
 * Fast gets pixel 32 bit
 *
 * @remarks
 * Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
 * This is not actually fast
 *
 * @param bmp - bitmap object to poll
 * @param x - x coordinate of pixel
 * @param y - y coordinate of pixel
 * @returns colour in 0xAARRGGBB format or -1 if it is out of bounds
 *
 * @allegro 1.14.5
 */
export function _getpixel32(
  bmp: BITMAP | undefined,
  x: number,
  y: number
): number {
  return getpixel(bmp, x, y);
}

/**
 * Draws a vertical line.
 *
 * @remarks
 * Draws a vertical line from one point to another using given colour. Probably slightly faster than line() method, since this one uses rectfill() to draw the line.
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - column to draw the line to
 * @param y1 - line end 1
 * @param y2 - line end 2
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.7
 */
export function vline(
  bitmap: BITMAP | undefined,
  x: number,
  y1: number,
  y2: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(x - 1 / 2, y1, 1, y2 - y1);
}

/**
 * Draws a horizontal line.
 *
 * @remarks
 * Draws a horizontal line from one point to another using given colour. Probably slightly faster than line() method, since this one uses rectfill() to draw the line.
 *
 * @param bitmap - bitmap to be drawn to
 * @param y - row to draw the line to
 * @param x1 - line endpoint 1
 * @param x2 - line endpoint 2
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.8
 */
export function hline(
  bitmap: BITMAP | undefined,
  x1: number,
  y: number,
  x2: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(x1, y - 1 / 2, x2 - x1, 1);
}

/**
 * Do line
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.14.9
 *
 * @alpha
 */
export function do_line(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
): void {
  void bitmap;
  void x1;
  void y1;
  void x2;
  void y2;
  void d;
  void proc;
}

/**
 * Draws a line.
 *
 * @remarks
 * Draws a line from one point to another using given colour.
 *
 * @param bitmap - bitmap to be drawn to
 * @param x1 - start x
 * @param y1 - start y
 * @param x2 - end x
 * @param y2 - end y
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.10
 */
export function line(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.moveTo(x1, y1);
  bitmap.context.lineTo(x2, y2);
  bitmap.context.stroke();
}

/**
 * Draws a line quickly
 *
 * @remarks
 * Just calls line
 *
 * @param bitmap - bitmap to be drawn to
 * @param x1 - start x
 * @param y1 - start y
 * @param x2 - end x
 * @param y2 - end y
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.11
 */
export function fastline(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colour: number
): void {
  line(bitmap, x1, y1, x2, y2, colour);
}
/**
 * Draws a triangle
 *
 * @remarks
 * Draws a triangle using three coordinates. The triangle is not filled.
 *
 * @param bitmap - bitmap to be drawn to
 * @param x1 - point 1 x
 * @param y1 - point 1 y
 * @param x2 - point 2 x
 * @param y2 - point 2 y
 * @param x2 - point 2 x
 * @param y2 - point 2 y
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.12
 */
export function triangle(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  colour: number
): void {
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

/**
 * Draws a polygon
 *
 * @remarks
 * Draws a polygon using three coordinates. The polygon is not filled.
 *
 * @param bitmap - bitmap to be drawn to
 * @param vertices - number of vertices to draw
 * @param points - array containing vertices*2 elements of polygon coordinates in [x1,y1,x2,y2,x3...] format
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.13
 */
export function polygon(
  bitmap: BITMAP | undefined,
  vertices: number,
  points: number[],
  colour: number
): void {
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

/**
 * Draws a rectangle.
 *
 * @remarks
 * Draws a rectangle from one point to another using given colour.
 *
 * @param bitmap - bitmap to be drawn to
 * @param x1 - point 1 x
 * @param y1 - point 1 y
 * @param x2 - point 2 x
 * @param y2 - point 2 y
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.14
 */
export function rect(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

/**
 * Draws a filled rectangle.
 *
 * @remarks
 * Draws a rectangle from one point to another using given colour.
 *
 * @param bitmap - bitmap to be drawn to
 * @param x1 - point 1 x
 * @param y1 - point 1 y
 * @param x2 - point 2 x
 * @param y2 - point 2 y
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.15
 */
export function rectfill(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.fillRect(x1, y1, x2 - x1, y2 - y1);
}

/**
 * Do Circle
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.14.16
 *
 * @alpha
 */
export function do_circle(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  radius: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
): void {
  void bmp;
  void x;
  void y;
  void radius;
  void d;
  void proc;
}

/**
 * Draws a circle.
 *
 * @remarks
 * Draws a circle at specified centre point and radius. The circle is not filled
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param radius - circle radius
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.17
 */
export function circle(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  radius: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.arc(x, y, radius, 0, PI2);
  bitmap.context.stroke();
}

/**
 * Draws a filled circle
 *
 * @remarks
 * Draws a circle at specified centre point and radius. The circle is filled
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param radius - circle radius
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.18
 */
export function circlefill(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  radius: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _fillstyle(bitmap, colour);
  bitmap.context.beginPath();
  bitmap.context.arc(x, y, radius, 0, PI2);
  bitmap.context.fill();
}

/**
 * Do Ellipse
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param rx - radius in y direction
 * @param ry - radius in x direction
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.19
 *
 * @alpha
 */
export function do_ellipse(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  rx: number,
  ry: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
): void {
  void bitmap;
  void x;
  void y;
  void rx;
  void ry;
  void d;
  void proc;
}

/**
 * Draws an ellipse
 *
 * @remarks
 * Draws an ellipse at specified centre point and radius. The ellipse is not filled
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param rx - radius in y direction
 * @param ry - radius in x direction
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.20
 */
export function ellipse(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  rx: number,
  ry: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.save();
  bitmap.context.translate(x, y);
  bitmap.context.scale(rx, ry);
  bitmap.context.beginPath();
  bitmap.context.arc(0, 0, 1, 0, PI2);
  bitmap.context.restore();
  bitmap.context.stroke();
}

/**
 * Draws an filled ellipse
 *
 * @remarks
 * Draws an filled ellipse at specified centre point and radius. The ellipse is not filled
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param rx - radius in y direction
 * @param ry - radius in x direction
 * @param colour - colour in 0xAARRGGBB format
 *
 * @allegro 1.14.20
 */
export function ellipsefill(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  rx: number,
  ry: number,
  colour: number
): void {
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

/**
 * Do Arc
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param a1 - angle 1 of arc
 * @param a2 - angle 2 of arc
 * @param r - radius of arc
 * @param d - parameter to pass to proc
 * @param proc - procedure to call per point
 *
 * @allegro 1.14.22
 *
 * @alpha
 */
export function do_arc(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  a1: number,
  a2: number,
  r: number,
  d: number,
  proc: (bmp: BITMAP, x: number, y: number, d: number) => void
): void {
  void bitmap;
  void x;
  void y;
  void a1;
  void a2;
  void r;
  void d;
  void proc;
}

/**
 * Draws a arc.
 *
 * @remarks
 * Draws a circular arc with centre x, y and radius r, in an anticlockwise direction
 * starting from the angle a1 and ending when it reaches a2. These values are specified
 * in 16.16 fixed point format, with 256 equal to a full circle, 64 a right angle, etc.
 * Zero is to the right of the centre point, and larger values rotate anticlockwise from there.
 *
 * @param bitmap - bitmap to be drawn to
 * @param x - centre point x coordinates
 * @param y - centre point y coordinates
 * @param ang1 - angle 1 of arc from 0-256
 * @param ang2 - angle 2 of arc from 0-256
 * @param r - radius of arc
 * @param colour - colour of arc
 *
 * @allegro 1.14.23
 */
export function arc(
  bitmap: BITMAP | undefined,
  x: number,
  y: number,
  ang1: number,
  ang2: number,
  r: number,
  colour: number
): void {
  if (!bitmap) {
    return;
  }
  _strokestyle(bitmap, colour);
  bitmap.context.beginPath();
  if (ang1 > ang2) {
    bitmap.context.arc(x, y, r, fix_to_rad(ang1), fix_to_rad(ang2), true);
  } else {
    bitmap.context.arc(x, y, r, fix_to_rad(ang1), fix_to_rad(ang2), true);
  }
  bitmap.context.stroke();
}

/**
 * Calc spline
 *
 * @remarks
 * Not implemented
 *
 * @param points - Points on spline
 * @param npts - Number of points on spline (length of points)
 * @param x - X position
 * @param y - Y position
 *
 * @allegro 1.14.24
 *
 * @alpha
 */
export function calc_spline(
  points: number[],
  npts: number,
  x: number,
  y: number
): void {
  void points;
  void npts;
  void x;
  void y;
}

/**
 * Draw bezier spline
 *
 * @remarks
 * This may not be the correct calculation.
 * Will have to compare vs allegro 4
 *
 * @param bmp - Bitmap to draw to
 * @param points - Points on spline (must be 8)
 * @param color - Color of spline
 *
 * @allegro 1.14.25
 */
export function spline(
  bmp: BITMAP | undefined,
  points: number[],
  color: number
): void {
  if (!bmp || points.length !== 8) {
    return;
  }

  _strokestyle(bmp, color);
  bmp.context.beginPath();

  // Move through points
  for (let i = 0; i < points.length - 1; i += 2) {
    const x_mid = ((points[i] ?? 0) + (points[i + 2] ?? 0)) / 2;
    const y_mid = ((points[i + 1] ?? 0) + (points[i + 3] ?? 0)) / 2;
    const cp_x1 = (x_mid + (points[i] ?? 0)) / 2;
    const cp_x2 = (x_mid + (points[i + 2] ?? 0)) / 2;
    bmp.context.quadraticCurveTo(cp_x1, points[i + 1] ?? 0, x_mid, y_mid);
    bmp.context.quadraticCurveTo(
      cp_x2,
      points[i + 3] ?? 0,
      points[i + 2] ?? 0,
      points[i + 3] ?? 0
    );
  }

  bmp.context.stroke();
}

/**
 * Flood fill area
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - Bitmap to draw to
 * @param x - X position to start fill
 * @param y - Y position to start fill
 * @param color - Color of fill
 *
 * @allegro 1.14.26
 *
 * @alpha
 */
export function floodfill(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  color: number
): void {
  void bmp;
  void x;
  void y;
  void color;
}

/**
 * Fill Style Helper
 *
 * @remarks
 * A function that handles canvas filling on a bitmap
 *
 * @param bitmap - Bitmap to draw to
 * @param colour - Colour of fill
 *
 */
export function _fillstyle(bitmap: BITMAP | undefined, colour: number): void {
  if (!bitmap) {
    return;
  }
  bitmap.context.fillStyle = `rgba(${getr(colour)},${getg(colour)},${getb(
    colour
  )},${(255 - geta(colour)) / 255})`;
}

/**
 * Stroke Style Helper
 *
 * @remarks
 * A function that handles canvas stroke on a bitmap
 *
 * @param bitmap - Bitmap to draw to
 * @param colour - Colour of fill
 * @param width - Width of stroke (usually 1)
 *
 */
export function _strokestyle(
  bitmap: BITMAP | undefined,
  colour: number,
  width = 1
): void {
  if (!bitmap) {
    return;
  }
  bitmap.context.lineWidth = width;
  bitmap.context.strokeStyle = `rgba(${getr(colour)},${getg(colour)},${getb(
    colour
  )},${(255 - geta(colour)) / 255})`;
}
