////////////////////////////////////////////
/// @name BLITTING AND SPRITES
//@{

import { RAD } from "./math.js";
import { BITMAP } from "./types.js";

/// 1.15.1 Blit
/// This is how you draw backgrounds and stuff. masked_ versions are omitted, since everything is 32-bit RGBA anyways. The source and dest parameters are swapped compared to draw_sprite for historical, 20 year old reasons that must stay the same no matter what.
/// @param source source bitmap
/// @param dest destination bitmap
/// @param sx,sy source origin
/// @param dx,dy top-left bitmap corner coordinates in target bitmap
/// @param w,h blit size
/// @todo make rotated versions of this
/// @todo tell everyone that blitting to itself is slower than the other thing (requires copy?)
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

/// 1.15.2 Scaled blit
/// Draws a scaled chunk of an image on a bitmap. It's not slower.
/// @param source source bitmap
/// @param dest destination bitmap
/// @param sx,sy source origin
/// @param sw,sh source dimensions
/// @param dx,dy top-left bitmap corner coordinates in target bitmap
/// @param dw,dh destination dimensions
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

/// 1.15.3
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

/// 1.15.4
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

/// 1.15.5 Draws a sprite
/// This is probably the fastest method to get images on screen. The image will be centered. Opposed to traditional allegro approach, sprite is drawn centered.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the top left corder of the image center
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

/// 1.15.6 Draws a stretched sprite
/// Draws a sprite stretching it to given width and height. The sprite will be centered. You can omit sy value for uniform scaling. YOu can use negative scale for flipping. Scaling is around the center.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the top left corder of the image
/// @param sx horizontal scale , 1.0 is unscaled
/// @param sy vertical scale (defaults to sx)
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

/// 1.15.7
export function draw_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  draw_sprite(bmp, sprite, x, y);
}

/// 1.15.8
export function draw_trans_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number
) {
  draw_sprite(bmp, sprite, x, y);
}

/// 1.15.9
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

/// 1.15.10
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

/// 1.15.11
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

/// 1.15.12
/// Draws a rotated sprite
/// Draws a sprite rotating it around its centre point. The sprite will be centred and rotated around its centre.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the centre of the image
/// @param angle angle of rotation in degrees
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
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-u, -v);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/// 1.15.13
export function rotate_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number
) {
  void bmp;
  void sprite;
  void x;
  void y;
  void angle;
}

/// 1.15.14 Draws a rotated sprite and scales it
/// Draws a sprite rotating it around its centre point. The sprite is also scaled. You can omit sy value for uniform scaling. YOu can use negative scale for flipping. Scaling is around the center. The sprite will be centred and rotated around its centre.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the centre of the image
/// @param angle angle of rotation in degrees
/// @param sx horizontal scale, 1.0 is unscaled
/// @param sy vertical scale (defaults to sx)
export function rotate_scaled_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number,
  sx: number,
  sy?: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = (sx * sprite.w) / 2;
  const v = ((sy ?? sx) * sprite.h) / 2;
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-u, -v);
  bmp.context.scale(sx, sy ?? sx);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/// 1.15.15
export function rotate_sprite_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  angle: number,
  scale: number
) {
  void bmp;
  void sprite;
  void x;
  void y;
  void angle;
  void scale;
}

/// 1.15.16 Draws a sprite rotated around an arbitrary point
/// Draws a sprite rotating it around a given point. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y target coordinates of the pivot point
/// @param cx,cy pivot point coordinates
/// @param angle angle of rotation in degrees
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

/// 1.15.17
export function pivot_sprite_v_flip(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number
) {
  void bmp;
  void sprite;
  void x;
  void y;
  void cx;
  void cy;
  void angle;
}

/// 1.15.18 Draws a sprite rotated around an arbitrary point and scaled
/// Draws a sprite rotating it around a given point. The sprite is also scaled. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image  before scaling. You can omit sy value for uniform scaling. You can use negative scale for flipping.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y target coordinates of the pivot point
/// @param cx,cy pivot point coordinates
/// @param angle angle of rotation in degrees
/// @param sx horizontal scale , 1.0 is unscaled
/// @param sy vertical scale (defaults to sx)
export function pivot_scaled_sprite(
  bmp: BITMAP | undefined,
  sprite: BITMAP | undefined,
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number,
  sx: number,
  sy?: number
) {
  if (!bmp || !sprite) {
    return;
  }
  const u = sx * cx;
  const v = (sy ?? sx) * cy;
  bmp.context.save();
  bmp.context.translate(x, y);
  bmp.context.rotate(RAD(angle));
  bmp.context.translate(-u, -v);
  bmp.context.scale(sx, sy ?? sx);
  bmp.context.drawImage(sprite.canvas, 0, 0);
  bmp.context.restore();
}

/// 1.15.19
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
  void bmp;
  void sprite;
  void x;
  void y;
  void cx;
  void cy;
  void angle;
  void scale;
}

//@}
