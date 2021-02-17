////////////////////////////////////////////
/// @name BITMAP | undefined OBJECTS
//@{

import { _downloadables } from "./core.js";
import { log } from "./debug.js";
import { BITMAP, PACKFILE, RGB } from "./types.js";

/// 1.10.1
/// Screen bitmap
/// This is the bitmap object representing the main drawing canvas. Drawing anything on the screen bitmap displays it.
export const screen: BITMAP = {
  w: 0,
  h: 0,
  canvas: (null as unknown) as HTMLCanvasElement,
  context: (null as unknown) as CanvasRenderingContext2D,
  ready: false,
  type: "bmp",
};

/// 1.10.4 Creates empty bitmap.
/// Creates a bitmap object of given dimensions and returns it.
/// @param width bitmap width
/// @param height bitmap height
/// @return bitmap object
export function create_bitmap(width: number, height: number): BITMAP {
  log("Creating bitmap at " + width + " x " + height + "!");
  const cv = document.createElement("canvas");
  cv.width = width;
  cv.height = height;
  const ctx = cv.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get context");
  }

  return {
    w: width,
    h: height,
    canvas: cv,
    context: ctx,
    ready: true,
    type: "bmp",
  };
}

/// 1.10.5 Creates empty bitmap.
/// Creates a bitmap object of given dimensions and returns it.
/// @param width bitmap width
/// @param height bitmap height
/// @return bitmap object
export function create_bitmap_ex(
  color_depth: number,
  width: number,
  height: number
): BITMAP {
  void color_depth;
  return create_bitmap(width, height);
}

/// 1.10.6
export function create_sub_bitmap(
  parent: BITMAP | undefined,
  x: number,
  y: number,
  width: number,
  height: number
): BITMAP {
  void parent;
  void x;
  void y;
  return create_bitmap(width, height);
}

/// 1.10.7
export function create_video_bitmap(width: number, height: number): BITMAP {
  return create_bitmap(width, height);
}

/// 1.10.8
export function create_system_bitmap(width: number, height: number): BITMAP {
  return create_bitmap(width, height);
}

/// 1.10.9
export function destroy_bitmap(bitmap: BITMAP | undefined) {
  void bitmap;
}

/// 1.10.10
export function lock_bitmap(bitmap: BITMAP | undefined) {
  void bitmap;
}

/// 1.10.11
export function bitmap_color_depth(bmp: BITMAP | undefined) {
  void bmp;
  return 32;
}

/// 1.10.12
export function bitmap_mask_color(bmp: BITMAP | undefined) {
  void bmp;
  return 0;
}

/// 1.10.13
export function is_same_bitmap(
  bmp1: BITMAP | undefined,
  bmp2: BITMAP | undefined
) {
  return bmp1 === bmp2;
}

/// 1.10.14
export function is_planar_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.15
export function is_linear_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.16
export function is_memory_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.17
export function is_screen_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.18
export function is_video_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.19
export function is_system_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.20
export function is_sub_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/// 1.10.21 Its a noop
export function acquire_bitmap(bmp: BITMAP | undefined) {
  void bmp;
}

/// 1.10.22 Its a noop
export function release_bitmap(bmp: BITMAP | undefined) {
  void bmp;
}

/// 1.10.23
export function acquire_screen() {
  acquire_bitmap(screen);
}

/// 1.10.24
export function release_screen() {
  release_bitmap(screen);
}

/// 1.10.25
export function set_clip_rect(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  void bitmap;
  void x1;
  void y1;
  void x2;
  void y2;
}

/// 1.10.26
export function get_clip_rect(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  void bitmap;
  void x1;
  void y1;
  void x2;
  void y2;
}

/// 1.10.27
export function add_clip_rect(
  bitmap: BITMAP | undefined,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  void bitmap;
  void x1;
  void y1;
  void x2;
  void y2;
}

/// 1.10.28
export function set_clip_state(bitmap: BITMAP | undefined, state: number) {
  void bitmap;
  void state;
}

/// 1.10.30
export function is_inside_bitmap(
  bmp: BITMAP | undefined,
  x: number,
  y: number,
  clip: number
) {
  void bmp;
  void x;
  void y;
  void clip;
  return false;
}

/// 1.11.1 Loads bitmap from file
/// Loads image from file asynchronously. This means that the execution won't stall for the image, and it's data won't be accessible right off the start. You can check for bitmap object's 'ready' member to see if it has loaded, but you probably should avoid stalling execution for that, as JS doesn't really like that.
/// @param filename URL of image
/// @return bitmap object, or -1 on error
export function load_bitmap(filename: string, pal?: RGB): BITMAP {
  void pal;

  log("Loading bitmap " + filename + "...");
  const img = new Image();
  img.src = filename;
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");

  if (!ctx) {
    throw new Error("Context not defined");
  }

  const bmp: BITMAP = {
    canvas: cv,
    context: ctx,
    w: -1,
    h: -1,
    ready: false,
    type: "bmp",
  };

  _downloadables.push(bmp);
  img.onload = () => {
    log(
      "Bitmap " +
        filename +
        " loaded, size: " +
        img.width +
        " x " +
        img.height +
        "!"
    );
    bmp.canvas.width = img.width;
    bmp.canvas.height = img.height;
    bmp.context.drawImage(img, 0, 0);
    bmp.w = img.width;
    bmp.h = img.height;
    bmp.ready = true;
  };

  return bmp;
}

/// 1.11.2 Wrapper for load_bitmap
export function load_bmp(filename: string): BITMAP {
  return load_bitmap(filename);
}

/// 1.11.3
export function load_bmp_pf(f: PACKFILE, pal: RGB) {
  void f;
  void pal;
}

/// 1.11.4
export function load_lbm(filename: string, pal: RGB) {
  void filename;
  void pal;
}

/// 1.11.5
export function load_pcx(filename: string, pal: RGB) {
  void filename;
  void pal;
}

/// 1.11.6
export function load_pcx_pf(f: PACKFILE, pal: RGB) {
  void f;
  void pal;
}

/// 1.11.7
export function load_tga(filename: string, pal?: RGB) {
  return load_bitmap(filename, pal);
}

/// 1.11.8
export function load_tga_pf(f: PACKFILE, pal: RGB) {
  void f;
  void pal;
}

/// 1.11.9
export function save_bitmap(
  filename: string,
  bmp: BITMAP | undefined,
  pal: RGB
) {
  void filename;
  void bmp;
  void pal;
}

/// 1.11.10
export function save_bmp(filename: string, bmp: BITMAP | undefined, pal: RGB) {
  save_bitmap(filename, bmp, pal);
}

/// 1.11.11
export function save_bmp_pf(f: PACKFILE, bmp: BITMAP | undefined, pal: RGB) {
  void f;
  void bmp;
  void pal;
}

/// 1.11.12
export function save_pcx(filename: string, bmp: BITMAP | undefined, pal: RGB) {
  save_bitmap(filename, bmp, pal);
}

/// 1.11.13
export function save_pcx_pf(f: PACKFILE, bmp: BITMAP | undefined, pal: RGB) {
  void f;
  void bmp;
  void pal;
}

/// 1.11.14
export function save_tga(filename: string, bmp: BITMAP | undefined, pal: RGB) {
  save_bitmap(filename, bmp, pal);
}

/// 1.11.15
export function save_tga_pf(f: PACKFILE, bmp: BITMAP | undefined, pal: RGB) {
  void f;
  void bmp;
  void pal;
}

/// 1.11.16
export function register_bitmap_file_type(
  ext: string,
  load: (filename: string, pal?: RGB) => BITMAP | undefined,
  save: (filename: string, pal?: RGB) => number
) {
  void ext;
  void load;
  void save;
}

/// 1.11.17
export function set_color_conversion(mode: number) {
  void mode;
}

//@}
