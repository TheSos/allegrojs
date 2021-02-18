import { _downloadables } from "./core.js";
import { log } from "./debug.js";
import { BITMAP, PACKFILE, RGB } from "./types.js";

/**
 * Global screen poiner
 *
 * @remarks
 * Stores the canvas bitmap object for drawing to screen
 *
 * @allegro 1.10.1
 */
export const screen: BITMAP = {
  w: 0,
  h: 0,
  canvas: (null as unknown) as HTMLCanvasElement,
  context: (null as unknown) as CanvasRenderingContext2D,
  ready: false,
  type: "bmp",
};

/**
 * Creates empty bitmap
 *
 * @remarks
 * Creates a bitmap object of given dimensions and returns it.
 *
 * @param width - - bitmap width
 * @param height - - bitmap height
 * @returns bitmap object
 *
 * @allegro 1.10.4
 */
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

/**
 * Creates empty bitmap
 *
 * @remarks
 * Creates a bitmap object of given dimensions and color depth and returns it.
 * Note: We only support 32 bit color depth, color_depth does nothing
 *
 * @param width - bitmap width
 * @param height - bitmap height
 * @returns bitmap object
 *
 * @allegro 1.10.5
 */
export function create_bitmap_ex(
  color_depth: number,
  width: number,
  height: number
): BITMAP {
  void color_depth;
  return create_bitmap(width, height);
}

/**
 * Creates a sub bitmap
 *
 * @remarks
 * Creates a sub bitmap object from an existing bitmap.
 *
 * @param parent - BITMAP object to create sub bitmap from
 * @param x - leftmost bound to create bitmap from
 * @param y - topmost bound to create bitmap from
 * @param width - bitmap width
 * @param height - bitmap height
 * @returns bitmap object
 *
 * @allegro 1.10.6
 *
 * @alpha
 */
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

/**
 * Creates empty video bitmap
 *
 * @remarks
 * Creates a bitmap object of given dimensions and returns it.
 * Since all bitmaps are video bitmaps, this just maps to create_bitmap
 *
 * @param width - bitmap width
 * @param height - bitmap height
 * @returns bitmap object
 *
 * @allegro 1.10.7
 */
export function create_video_bitmap(width: number, height: number): BITMAP {
  return create_bitmap(width, height);
}

/**
 * Creates empty system bitmap
 *
 * @remarks
 * Creates a bitmap object of given dimensions and returns it.
 * This just maps to create_bitmap since.
 *
 * @param width - bitmap width
 * @param height - bitmap height
 * @returns bitmap object
 *
 * @allegro 1.10.8
 */
export function create_system_bitmap(width: number, height: number): BITMAP {
  return create_bitmap(width, height);
}

/**
 * Destroys a bitmap
 *
 * @remarks
 * Since JS has a garbage collector this currently does nothing.
 * Probably should delete bitmap.
 *
 * @param bitmap - BITMAP to delete
 *
 * @allegro 1.10.9
 */
export function destroy_bitmap(bitmap: BITMAP | undefined): void {
  void bitmap;
}

/**
 * Lock a bitmap
 *
 * @remarks
 * This is a NOOP since locking bitmaps is not neccisary
 *
 * @param bitmap - BITMAP to lock
 *
 * @allegro 1.10.10
 */
export function lock_bitmap(bitmap: BITMAP | undefined) {
  void bitmap;
}

/**
 * Get bitmap color depth
 *
 * @remarks
 * This just returns 32 since we only support 32 bit color depth
 *
 * @param bitmap - BITMAP to check color depth of
 *
 * @allegro 1.10.11
 */
export function bitmap_color_depth(bmp: BITMAP | undefined) {
  void bmp;
  return 32;
}

/**
 * Get bitmap mask depth
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - BITMAP to check mask color of
 *
 * @allegro 1.10.12
 *
 * @alpha
 */
export function bitmap_mask_color(bmp: BITMAP | undefined) {
  void bmp;
  return 0;
}

/**
 * Checks if bitmaps are the same
 *
 * @remarks
 * Simply returns bitmap equality. Should also find out if they are sub bitmaps...
 *
 * @param bmp1 - first BITMAP
 * @param bmp2 - second BITMAP
 *
 * @allegro 1.10.13
 *
 * @alpha
 */
export function is_same_bitmap(
  bmp1: BITMAP | undefined,
  bmp2: BITMAP | undefined
) {
  return bmp1 === bmp2;
}

/**
 * Check if bitmap is planar
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check planar-ness
 *
 * @allegro 1.10.14
 *
 * @alpha
 */
export function is_planar_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/**
 * Check if bitmap is linear
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check linear-ness
 *
 * @allegro 1.10.15
 *
 * @alpha
 */
export function is_linear_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/**
 * Check if bitmap is memory bitmap
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check if memory
 *
 * @allegro 1.10.16
 *
 * @alpha
 */
export function is_memory_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/**
 * Check if bitmap is screen bitmap
 *
 * @remarks
 * Simply compares bitmap with global screen bitmap. Does not check if it is a sub bitmap.
 *
 * @param bmp - BITMAP to check if screen
 *
 * @allegro 1.10.17
 *
 * @alpha
 */
export function is_screen_bitmap(bmp: BITMAP | undefined) {
  return bmp === screen;
}

/**
 * Check if bitmap is video bitmap
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check if video bitmap
 *
 * @allegro 1.10.18
 *
 * @alpha
 */
export function is_video_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/**
 * Check if bitmap is system bitmap
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check if system bitmap
 *
 * @allegro 1.10.19
 *
 * @alpha
 */
export function is_system_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/**
 * Check if bitmap is sub bitmap
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check if sub bitmap
 *
 * @allegro 1.10.20
 *
 * @alpha
 */
export function is_sub_bitmap(bmp: BITMAP | undefined) {
  void bmp;
  return false;
}

/**
 * Acquire video bitmap
 *
 * @remarks
 * NOOP since this is not needed in browser
 *
 * @param bmp - BITMAP to acquire
 *
 * @allegro 1.10.21
 */
export function acquire_bitmap(bmp: BITMAP | undefined) {
  void bmp;
}

/**
 * Release video bitmap
 *
 * @remarks
 * NOOP since this is not needed in browser
 *
 * @param bmp - BITMAP to release
 *
 * @allegro 1.10.22
 */
export function release_bitmap(bmp: BITMAP | undefined) {
  void bmp;
}

/**
 * Acquire screen
 *
 * @remarks
 * Calls acquire_bitmap on global screen object
 *
 * @allegro 1.10.23
 */
export function acquire_screen() {
  acquire_bitmap(screen);
}

/**
 * Release screen
 *
 * @remarks
 * Calls release_bitmap on global screen object
 *
 * @allegro 1.10.24
 */
export function release_screen() {
  release_bitmap(screen);
}

/**
 * Set clip rect
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - BITMAP to set clip on
 * @param x1 - left bound
 * @param y1 - top bound
 * @param x2 - right bound
 * @param y2 - bottom bound
 *
 * @allegro 1.10.25
 */
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

/**
 * Get clip rect
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - BITMAP to get clipping
 * @param x1 - left bound
 * @param y1 - top bound
 * @param x2 - right bound
 * @param y2 - bottom bound
 *
 * @allegro 1.10.26
 */
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

/**
 * Add clip rect
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - BITMAP to add clipping
 * @param x1 - left bound
 * @param y1 - top bound
 * @param x2 - right bound
 * @param y2 - bottom bound
 *
 * @allegro 1.10.27
 */
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

/**
 * Set clip state
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - BITMAP to modify clip state
 * @param state - clip state
 *
 * @allegro 1.10.28
 */
export function set_clip_state(bitmap: BITMAP | undefined, state: number) {
  void bitmap;
  void state;
}

/**
 * Get clip state
 *
 * @remarks
 * Not implemented
 *
 * @param bitmap - BITMAP to check clip state of
 * @returns clip state of bitmap
 *
 * @allegro 1.10.29
 */
export function get_clip_state(bitmap: BITMAP | undefined) {
  void bitmap;
  return 0;
}

/**
 * Check if inside bitmap
 *
 * @remarks
 * Not implemented
 *
 * @param bmp - BITMAP to check if point is inside
 * @param x - x position of point
 * @param y - y position of point
 * @param clip - Bitmap clipping
 * @returns true if inside bitmap, otherwise false
 *
 * @allegro 1.10.30
 */
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

/**
 * Loads bitmap from file
 *
 * @remarks
 * Loads image from file asynchronously. This means that the execution won't stall for the image, and it's data won't be accessible right off the start. You can check for bitmap object's 'ready' member to see if it has loaded, but you probably should avoid stalling execution for that, as JS doesn't really like that.
 *
 * @param filename - URL of image
 * @returns bitmap object, or -1 on error
 *
 * @allegro 1.11.1
 */
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

/**
 * Load Bitmap Alias
 *
 * @remarks
 * See load_bitmap
 *
 * @param filename - Path to file to load
 *
 * @allegro 1.11.2
 */
export function load_bmp(filename: string): BITMAP {
  return load_bitmap(filename);
}

/**
 * Load BMP from packfile
 *
 * @remarks
 * Not implemented
 *
 * @param f - PACKFILE to load from
 * @param pal - PALETTE to use when loading
 *
 * @allegro 1.11.3
 */
export function load_bmp_pf(f: PACKFILE, pal: RGB) {
  void f;
  void pal;
}

/**
 * Load LBM from file
 *
 * @remarks
 * Not implemented
 *
 * @param filename - File to load from
 * @param pal - PALETTE to use when loading
 *
 * @allegro 1.11.4
 */
export function load_lbm(filename: string, pal: RGB) {
  void filename;
  void pal;
}

/**
 * Load PCX from file
 *
 * @remarks
 * Not implemented
 *
 * @param filename - File to load from
 * @param pal - PALETTE to use when loading
 *
 * @allegro 1.11.5
 */
export function load_pcx(filename: string, pal: RGB) {
  void filename;
  void pal;
}

/**
 * Load PCX from packfile
 *
 * @remarks
 * Not implemented
 *
 * @param f - PACKFILE to load from
 * @param pal - PALETTE to use when loading
 *
 * @allegro 1.11.6
 */
export function load_pcx_pf(f: PACKFILE, pal: RGB) {
  void f;
  void pal;
}

/**
 * Load TGA from file
 *
 * @remarks
 * Not implemented
 *
 * @param filename - File to load from
 * @param pal - PALETTE to use when loading
 *
 * @allegro 1.11.7
 */
export function load_tga(filename: string, pal?: RGB) {
  return load_bitmap(filename, pal);
}

/**
 * Load TGA from packfile
 *
 * @remarks
 * Not implemented
 *
 * @param f - PACKFILE to load from
 * @param pal - PALETTE to use when loading
 *
 * @allegro 1.11.8
 */
export function load_tga_pf(f: PACKFILE, pal: RGB) {
  void f;
  void pal;
}

/**
 * Save BITMAP to file
 *
 * @remarks
 * Not implemented
 *
 * @param filename - File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.9
 *
 * @alpha
 */
export function save_bitmap(
  filename: string,
  bmp: BITMAP | undefined,
  pal: RGB
) {
  void filename;
  void bmp;
  void pal;
}

/**
 * Save BITMAP to file
 *
 * @remarks
 * Alias for save_bitmap
 *
 * @param filename - File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.10
 *
 * @alpha
 */
export function save_bmp(filename: string, bmp: BITMAP | undefined, pal: RGB) {
  save_bitmap(filename, bmp, pal);
}

/**
 * Save BITMAP to packfile
 *
 * @remarks
 * Not implemented
 *
 * @param f - PACKFILE to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.11
 *
 * @alpha
 */
export function save_bmp_pf(f: PACKFILE, bmp: BITMAP | undefined, pal: RGB) {
  void f;
  void bmp;
  void pal;
}

/**
 * Save PCX to file
 *
 * @remarks
 * Not implemented
 *
 * @param filename - File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.12
 *
 * @alpha
 */
export function save_pcx(filename: string, bmp: BITMAP | undefined, pal: RGB) {
  save_bitmap(filename, bmp, pal);
}

/**
 * Save PCX to packfile
 *
 * @remarks
 * Not implemented
 *
 * @param f - PACKFILE to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.13
 *
 * @alpha
 */
export function save_pcx_pf(f: PACKFILE, bmp: BITMAP | undefined, pal: RGB) {
  void f;
  void bmp;
  void pal;
}

/**
 * Save TGA to file
 *
 * @remarks
 * Not implemented
 *
 * @param filename- File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.14
 *
 * @alpha
 */
export function save_tga(filename: string, bmp: BITMAP | undefined, pal: RGB) {
  save_bitmap(filename, bmp, pal);
}

/**
 * Save TGA to Packfile
 *
 * @remarks
 * Not implemented
 *
 * @param f - PACKFILE to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.15
 *
 * @alpha
 */
export function save_tga_pf(f: PACKFILE, bmp: BITMAP | undefined, pal: RGB) {
  void f;
  void bmp;
  void pal;
}

/**
 * Register Bitmap File Type
 *
 * @remarks
 * Not implemented
 *
 * @param ext - String containg file extension
 * @param load - Callback for handling loading of file
 * @param save - Callback for saving file
 *
 * @allegro 1.11.16
 *
 * @alpha
 */
export function register_bitmap_file_type(
  ext: string,
  load: (filename: string, pal?: RGB) => BITMAP | undefined,
  save: (filename: string, pal?: RGB) => number
) {
  void ext;
  void load;
  void save;
}

/**
 * Set Color Conversion
 *
 * @remarks
 * Not implemented
 *
 * @param mode - Set color conversion mode
 *
 * @allegro 1.11.17
 *
 * @alpha
 */
export function set_color_conversion(mode: number) {
  void mode;
}
