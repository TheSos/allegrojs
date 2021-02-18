import { RAD } from "./math.js";
import { BITMAP } from "./types.js";

/**
 * Blit
 *
 * @remarks
 * Map sprite to screen
 *
 * @param source - source bitmap
 * @param dest - destination bitmap
 * @param sx - source origin x
 * @param sy - source origin y
 * @param dx - destination origin x
 * @param dy - destination origin y
 * @param w - width of sprite
 * @param h - height of sprite
 *
 * @allegro 1.15.1
 */
export function blit(
  source: BITMAP | undefined,
  dest: BITMAP | undefined,
  sx: number,
  sy: number,
  dx: number,
  dy: number,
  w: number,
  h: number
) {
  if (!source || !dest) {
    return;
  }
  dest.context.drawImage(
    source.canvas,
    sx,
    sy,
    source.w,
    source.h,
    dx,
    dy,
    w,
    h
  );
}

/**
 * Scaled blit
 *
 * @remarks
 * Draws a scaled chunk of an image on a bitmap. It's not slower.
 *
 * @param source - source bitmap
 * @param dest - destination bitmap
 * @param sx - source origin x
 * @param sy - source origin y
 * @param sw - source width
 * @param sh - source height
 * @param dx - destination origin x
 * @param dy - destination origin y
 * @param dw - destination width
 * @param dh - destination height
 *
 * @allegro 1.15.2
 */
export function stretch_blit(
  source: BITMAP | undefined,
  dest: BITMAP | undefined,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number
) {
  if (!source || !dest) {
    return;
  }
  dest.context.drawImage(source.canvas, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * Masked blit
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.15.3
 *
 * @alpha
 */
export function masked_blit(
  sprite: BITMAP | undefined,
  dest: BITMAP | undefined,
  source_x: number,
  source_y: number,
  dest_x: number,
  dest_y: number,
  width: number,
  height: number
) {
  void sprite;
  void dest;
  void source_x;
  void source_y;
  void dest_x;
  void dest_y;
  void width;
  void height;
}

/**
 * Masked streth blit
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.15.4
 *
 * @alpha
 */
export function masked_stretch_blit(
  sprite: BITMAP | undefined,
  dest: BITMAP | undefined,
  source_x: number,
  source_y: number,
  source_w: number,
  source_h: number,
  dest_x: number,
  dest_y: number,
  dest_w: number,
  dest_h: number
) {
  void sprite;
  void dest;
  void source_x;
  void source_y;
  void source_w;
  void source_h;
  void dest_x;
  void dest_y;
  void dest_w;
  void dest_h;
}

/**
 * Draws a sprite
 *
 * @remarks
 * This is probably the fastest method to get images on screen.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 *
 * @allegro 1.15.5
 */
export function draw_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  if (!sprite || !bmp) {
    return;
  }
  bmp.context.drawImage(sprite.canvas, x, y);
}

/**
 * Draws a stretched sprite
 *
 * @remarks
 * Stretch sprite
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param w - width
 * @param h - height
 *
 * @allegro 1.15.6
 */
export function stretch_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  w: number,
  h: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = (w * sprite.w) / 2;
  const v = (h * sprite.h) / 2;
  bmp.context.save();
  bmp.context.translate(x - u, y - v);
  bmp.context.scale(w, h);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/**
 * Draw sprite vertical flip
 *
 * @remarks
 * Flip a sprite vertically
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 *
 * @allegro 1.15.7
 */
export function draw_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  if (!bmp || !sprite) {
    return;
  }
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.scale(-1, 1);
  bmp.context.translate(-x - sprite.w, -y);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Draw sprite horizontal flip
 *
 * @remarks
 * Flip a sprite horizontal
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 *
 * @allegro 1.15.7
 */
export function draw_sprite_h_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  if (!bmp || !sprite) {
    return;
  }
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.scale(1, -1);
  bmp.context.translate(-x, -y - sprite.h);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Draw sprite horizontal and vertical flip
 *
 * @remarks
 * Flip a sprite horizontal and vertical
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 *
 * @allegro 1.15.7
 */
export function draw_sprite_vh_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  if (!bmp || !sprite) {
    return;
  }
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.scale(-1, -1);
  bmp.context.translate(-x - sprite.w, -y - sprite.h);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Draw transparent sprite
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 *
 * @allegro 1.15.8
 *
 * @alpha
 */
export function draw_trans_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  draw_sprite(bmp, sprite, x, y);
}

/**
 * Draw lit sprite
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param color - color tint
 *
 * @allegro 1.15.9
 *
 * @alpha
 */
export function draw_lit_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  color: number
) {
  void color;
  draw_sprite(bmp, sprite, x, y);
}

/**
 * Draw gouraud sprite
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param c1 - color 1
 * @param c2 - color 2
 * @param c3 - color 3
 * @param c4 - color 4
 *
 * @allegro 1.15.10
 *
 * @alpha
 */
export function draw_gouraud_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  c1: number,
  c2: number,
  c3: number,
  c4: number
) {
  void c1;
  void c2;
  void c3;
  void c4;
  draw_sprite(bmp, sprite, x, y);
}

/**
 * Draw character ex
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.15.11
 *
 * @alpha
 */
export function draw_character_ex(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  color: number,
  bg: number
) {
  void color;
  void bg;
  draw_sprite(bmp, sprite, x, y);
}

/**
 * Rotate sprite
 *
 * @remarks
 * Draws a rotated sprite
 * Draws a sprite rotating it around its centre point.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param angle - angle of rotation in degrees
 *
 * @allegro 1.15.12
 */
export function rotate_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = sprite.w / 2;
  const v = sprite.h / 2;
  bmp.context.save();
  bmp.context.translate(x + u, y + v);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-x - u, -y - v);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Rotate sprite with vertical flip
 *
 * @remarks
 * Rotates sprite around its origin and flips it
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param angle - angle of rotation in degrees
 *
 * @allegro 1.15.13
 */
export function rotate_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = sprite.w / 2;
  const v = sprite.h / 2;
  bmp.context.save();
  bmp.context.translate(x + u, y + v);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-x - u, -y - v);
  bmp.context.translate(x, y);
  bmp.context.scale(-1, 1);
  bmp.context.translate(-x - sprite.w, -y);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Draws a rotated sprite and scales it
 *
 * @remarks
 * Draws a sprite rotating it around its centre point. The sprite is also scaled. You can omit sy value for uniform scaling. YOu can use negative scale for flipping. Scaling is around the center. The sprite will be centred and rotated around its centre.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param angle - angle of rotation in degrees
 * @param sx - horizontal scale, 1.0 is unscaled
 * @param sy - vertical scale, 1.0 is unscaled
 *
 * @allegro 1.15.14
 */
export function rotate_scaled_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number,
  sx: number,
  sy: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = sprite.w / 2;
  const v = sprite.h / 2;
  bmp.context.save();
  bmp.context.translate(x + u, y + v);
  bmp.context.rotate(RAD(angle));
  bmp.context.scale(sx, sy);
  bmp.context.translate(-x - u, -y - v);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Rotate scaled sprite with vertical flip
 *
 * @remarks
 * Rotates a scaled sprite and vertically flips it
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param angle - angle of rotation in degrees
 * @param scale - scale of sprite
 *
 * @allegro 1.15.15
 */
export function rotate_scaled_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number,
  scale: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = sprite.w / 2;
  const v = sprite.h / 2;
  bmp.context.save();
  bmp.context.translate(x + u, y + v);
  bmp.context.rotate(RAD(angle));
  bmp.context.scale(scale, scale);
  bmp.context.translate(-x - u, -y - v);
  bmp.context.translate(x, y);
  bmp.context.scale(-1, 1);
  bmp.context.translate(-x - sprite.w, -y);
  bmp.context.drawImage(sprite.canvas, x, y);
  bmp.context.restore();
}

/**
 * Draws a sprite rotated around an arbitrary point
 *
 * @remarks
 * Draws a sprite rotating it around a given point. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param cx - Pivot point x
 * @param cy - Pivot point y
 * @param angle - angle of rotation in degrees
 *
 * @allegro 1.15.16
 */
export function pivot_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number
) {
  if (!bmp || !sprite) {
    return;
  }
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-cx, -cy);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/**
 * Pivot sprite with vertical flip
 *
 * @remarks
 * Draws a sprite rotating it around a given point.
 * Then flips it.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param cx - Pivot point x
 * @param cy - Pivot point y
 * @param angle - angle of rotation in degrees
 *
 * @allegro 1.15.17
 */
export function pivot_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number
) {
  if (!bmp || !sprite) {
    return;
  }
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-cx, -cy);
  bmp.context.translate(x, y);
  bmp.context.scale(-1, 1);
  bmp.context.translate(-x - sprite.w, -y);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/**
 * Draws a sprite rotated around an arbitrary point and scaled
 *
 * @remarks
 * Draws a sprite rotating it around a given point. The sprite is also scaled. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image  before scaling. You can omit sy value for uniform scaling. You can use negative scale for flipping.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param cx - Pivot point x
 * @param cy - Pivot point y
 * @param angle - angle of rotation in degrees
 * @param sx - scale x
 * @param xy - scale y
 *
 * @allegro 1.15.18
 */
export function pivot_scaled_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number,
  sx: number,
  sy: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = sx * cx;
  const v = sy * cy;
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-u, -v);
  bmp.context.scale(sx, sy);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/**
 * Draws a sprite rotated around an arbitrary point and scaled and flipped.
 *
 * @remarks
 * Draws a sprite rotating it around a given point. The sprite is also scaled. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image  before scaling. You can omit sy value for uniform scaling. You can use negative scale for flipping.
 *
 * @param bmp - target bitmap
 * @param sprite - sprite bitmap
 * @param x - x position
 * @param y - y position
 * @param cx - Pivot point x
 * @param cy - Pivot point y
 * @param angle - angle of rotation in degrees
 * @param scale - scale amount
 *
 * @allegro 1.15.19
 */
export function pivot_scaled_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number,
  scale: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = scale * cx;
  const v = scale * cy;
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-u, -v);
  bmp.context.scale(scale, scale);
  bmp.context.translate(x, y);
  bmp.context.scale(-1, 1);
  bmp.context.translate(-x - sprite.w, -y);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}
