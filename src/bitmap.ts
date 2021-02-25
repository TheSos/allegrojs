import { makecol } from "./color";
import { _downloadables } from "./core";
import { log } from "./debug";
import { blit } from "./sprites";
import { BITMAP, CLIPPING_RECTANGLE, PACKFILE, RGB } from "./types";

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
  clipping: false,
  clipping_rect: { x1: 0, y1: 0, x2: 0, y2: 0 },
  is_screen: true,
  mem_type: "video",
  parent: null,
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
  log(`Creating bitmap at ${width} x ${height}!`);
  const cv = document.createElement("canvas");
  cv.width = width;
  cv.height = height;
  const ctx = cv.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get context");
  }

  ctx.imageSmoothingEnabled = false;

  return {
    w: width,
    h: height,
    canvas: cv,
    context: ctx,
    ready: true,
    type: "bmp",
    clipping: true,
    clipping_rect: {
      x1: 0,
      y1: 0,
      x2: width,
      y2: height,
    },
    is_screen: false,
    mem_type: "memory",
    parent: null,
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
 */
export function create_sub_bitmap(
  parent: BITMAP | undefined,
  x: number,
  y: number,
  width: number,
  height: number
): BITMAP | null {
  if (!parent) {
    return null;
  }
  const new_bmp = create_bitmap(width, height);
  blit(new_bmp, parent, x, y, 0, 0, width, height);
  new_bmp.parent = parent;
  return new_bmp;
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
  const bmp = create_bitmap(width, height);
  bmp.mem_type = "video";
  return bmp;
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
  const bmp = create_bitmap(width, height);
  bmp.mem_type = "system";
  return bmp;
}

/**
 * Destroys a bitmap
 *
 * @remarks
 * Removes the canvas and removes ready state
 *
 * @param bitmap - BITMAP to delete
 *
 * @allegro 1.10.9
 */
export function destroy_bitmap(bitmap: BITMAP | undefined): void {
  if (!bitmap) {
    return;
  }
  bitmap.canvas.remove();
  bitmap.ready = false;
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
export function lock_bitmap(bitmap: BITMAP | undefined): void {
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
export function bitmap_color_depth(bmp: BITMAP | undefined): number {
  void bmp;
  return 32;
}

/**
 * Get bitmap mask depth
 *
 * @remarks
 * Returns magic pink
 *
 * @param bitmap - BITMAP to check mask color of
 *
 * @allegro 1.10.12
 */
export function bitmap_mask_color(bmp: BITMAP | undefined): number {
  void bmp;
  return makecol(255, 0, 255);
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
 */
export function is_same_bitmap(
  bmp1: BITMAP | undefined,
  bmp2: BITMAP | undefined
): boolean {
  if (!bmp1 || !bmp2) {
    return false;
  }
  return (
    bmp1 === bmp2 ||
    (typeof bmp1.parent !== "undefined" && bmp1.parent === bmp2.parent)
  );
}

/**
 * Check if bitmap is planar
 *
 * @remarks
 * We dont support planar bitmaps, return false
 *
 * @param bmp - BITMAP to check planar-ness
 *
 * @allegro 1.10.14
 */
export function is_planar_bitmap(bmp: BITMAP | undefined): boolean {
  void bmp;
  return false;
}

/**
 * Check if bitmap is linear
 *
 * @remarks
 * All bitmaps can be treated as linear bitmaps, so we reutrn true
 *
 * @param bmp - BITMAP to check linear-ness
 *
 * @allegro 1.10.15
 */
export function is_linear_bitmap(bmp: BITMAP | undefined): boolean {
  void bmp;
  return true;
}

/**
 * Check if bitmap is memory bitmap
 *
 * @remarks
 * Checks if is screen flag is set
 *
 * @param bmp - BITMAP to check if memory
 *
 * @allegro 1.10.16
 */
export function is_memory_bitmap(bmp: BITMAP | undefined): boolean {
  if (!bmp) {
    return false;
  }
  return !bmp.is_screen;
}

/**
 * Check if bitmap is screen bitmap
 *
 * @remarks
 * Checks if screen flag is set
 *
 * @param bmp - BITMAP to check if screen
 *
 * @allegro 1.10.17
 */
export function is_screen_bitmap(bmp: BITMAP | undefined): boolean {
  if (!bmp) {
    return false;
  }
  return bmp.is_screen;
}

/**
 * Check if bitmap is video bitmap
 *
 * @remarks
 * Checks if screen or created with create_video_bitmap
 *
 * @param bmp - BITMAP to check if video bitmap
 *
 * @allegro 1.10.18
 */
export function is_video_bitmap(bmp: BITMAP | undefined): boolean {
  if (!bmp) {
    return false;
  }
  return bmp.mem_type === "video";
}

/**
 * Check if bitmap is system bitmap
 *
 * @remarks
 * Checks if bitmap was created using create_system_bitmap
 *
 * @param bmp - BITMAP to check if system bitmap
 *
 * @allegro 1.10.19
 */
export function is_system_bitmap(bmp: BITMAP | undefined): boolean {
  if (!bmp) {
    return false;
  }
  return bmp.mem_type === "system";
}

/**
 * Check if bitmap is sub bitmap
 *
 * @remarks
 * Check if created using create_sub_bitmap
 *
 * @param bmp - BITMAP to check if sub bitmap
 *
 * @allegro 1.10.20
 */
export function is_sub_bitmap(bmp: BITMAP | undefined): boolean {
  if (!bmp) {
    return false;
  }
  return Boolean(bmp.parent);
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
export function acquire_bitmap(bmp: BITMAP | undefined): void {
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
export function release_bitmap(bmp: BITMAP | undefined): void {
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
export function acquire_screen(): void {
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
export function release_screen(): void {
  release_bitmap(screen);
}

/**
 * Set clip rect
 *
 * @remarks
 * Overrite bitmap clipping rectangle
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
): void {
  if (!bitmap) {
    return;
  }
  bitmap.clipping_rect = {
    x1,
    y1,
    x2,
    y2,
  };
}

/**
 * Get clip rect
 *
 * @remarks
 * Returns clipping rectangle or null.
 * Since we can not assign parameter pointers, this differs from actual allegro
 * behaviour in that it returns an object.
 *
 * @param bitmap - BITMAP to get clipping
 *
 * @allegro 1.10.26
 */
export function get_clip_rect(
  bitmap: BITMAP | undefined
): CLIPPING_RECTANGLE | null {
  if (!bitmap) {
    return null;
  }
  return bitmap.clipping_rect;
}

/**
 * Add clip rect
 *
 * @remarks
 * Sets the clipping rectangle of the specified bitmap as the intersection
 * of its current clipping rectangle and the rectangle described by the four coordinates.
 *
 * Currently just sets it
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
): void {
  if (!bitmap) {
    return;
  }
  bitmap.clipping_rect = {
    x1,
    y1,
    x2,
    y2,
  };
}

/**
 * Set clip state
 *
 * @remarks
 * Enables or disables clipping
 *
 * @param bitmap - BITMAP to modify clip state
 * @param state - clip state
 *
 * @allegro 1.10.28
 */
export function set_clip_state(
  bitmap: BITMAP | undefined,
  state: boolean
): void {
  if (!bitmap) {
    return;
  }
  bitmap.clipping = state;
}

/**
 * Get clip state
 *
 * @remarks
 * Simply checks bitmaps clipping rectangles
 *
 * @param bitmap - BITMAP to check clip state of
 * @returns non zero if clipping enabled, otherwise zero
 *
 * @allegro 1.10.29
 */
export function get_clip_state(bitmap: BITMAP | undefined): number {
  if (!bitmap) {
    return 0;
  }
  return bitmap.clipping ? 1 : 0;
}

/**
 * Check if inside bitmap
 *
 * @remarks
 * Returns non-zero if point (x, y) lies inside the bitmap.
 * If ‘clip’ is non-zero, the function compares the coordinates with the
 * clipping rectangle, that is it returns non-zero if the point lies
 * inside the clipping rectangle or if clipping is disabled for the bitmap.
 * If ‘clip’ is zero, the function compares the coordinates with the actual
 * dimensions of the bitmap.
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
): boolean {
  if (!bmp) {
    return false;
  }
  // Check bitmap
  if (clip === 0) {
    return x >= 0 && y >= 0 && x < bmp.w && y < bmp.h;
  }
  // Check if clipping
  return (
    !bmp.clipping ||
    (x >= bmp.clipping_rect.x1 &&
      y >= bmp.clipping_rect.y1 &&
      x < bmp.clipping_rect.x2 &&
      y < bmp.clipping_rect.x2)
  );
}

/**
 * Loads bitmap from file
 *
 * @remarks
 * Loads image from file asynchronously. This means that the execution won't stall for the image,
 * and it's data won't be accessible right off the start. You can check for bitmap object's 'ready'
 * member to see if it has loaded, but you probably should avoid stalling execution for that,
 * as JS doesn't really like that.
 *
 * @param filename - URL of image
 * @returns bitmap object, or -1 on error
 *
 * @allegro 1.11.1
 */
export function load_bitmap(filename: string, pal?: RGB): BITMAP {
  void pal;

  log(`Loading bitmap ${filename}...`);
  const img = new Image();
  img.src = filename;
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");

  if (!ctx) {
    throw new Error("Context not defined");
  }

  ctx.imageSmoothingEnabled = false;

  const bmp: BITMAP = {
    canvas: cv,
    context: ctx,
    w: -1,
    h: -1,
    ready: false,
    type: "bmp",
    clipping: true,
    clipping_rect: { x1: 0, y1: 0, x2: 0, y2: 0 },
    is_screen: false,
    mem_type: "memory",
    parent: null,
  };

  _downloadables.push(bmp);
  img.onload = (): void => {
    log(`Bitmap ${filename} loaded, size: ${img.width} x ${img.height}!`);
    bmp.canvas.width = img.width;
    bmp.canvas.height = img.height;
    bmp.context.drawImage(img, 0, 0);
    bmp.w = img.width;
    bmp.h = img.height;
    bmp.clipping_rect = {
      x1: 0,
      y1: 0,
      x2: bmp.w,
      y2: bmp.h,
    };

    // Replace magic pink
    const imageData = bmp.context.getImageData(
      0,
      0,
      bmp.canvas.width,
      bmp.canvas.height
    );
    for (let i = 0; i < imageData.data.length; i += 4) {
      // MAGIC PINK DETECTED!
      if (
        imageData.data[i] === 255 &&
        imageData.data[i + 1] === 0 &&
        imageData.data[i + 2] === 255 &&
        imageData.data[i + 3] === 255
      ) {
        // Alpha hack
        imageData.data[i + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);

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
export function load_bmp_pf(f: PACKFILE, pal?: RGB): void {
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
export function load_lbm(filename: string, pal?: RGB): BITMAP {
  return load_bitmap(filename, pal);
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
export function load_pcx(filename: string, pal?: RGB): BITMAP {
  return load_bitmap(filename, pal);
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
export function load_pcx_pf(f: PACKFILE, pal?: RGB): void {
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
export function load_tga(filename: string, pal?: RGB): BITMAP {
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
export function load_tga_pf(f: PACKFILE, pal?: RGB): void {
  void f;
  void pal;
}

/**
 * Save BITMAP to file
 *
 * @remarks
 * Save a bitmap by simulating a click on a dataurl link
 *
 * @param filename - File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.9
 */
export function save_bitmap(
  filename: string,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
  if (!bmp) {
    return;
  }
  void pal;
  const image = bmp.canvas.toDataURL("image/png", 1.0);
  const a = document.createElement("a");
  a.href = image;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
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
 */
export function save_bmp(
  filename: string,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
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
export function save_bmp_pf(
  f: PACKFILE,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
  void f;
  void bmp;
  void pal;
}

/**
 * Save PCX to file
 *
 * @remarks
 * Alias of save_bitmap
 *
 * @param filename - File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.12
 */
export function save_pcx(
  filename: string,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
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
export function save_pcx_pf(
  f: PACKFILE,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
  void f;
  void bmp;
  void pal;
}

/**
 * Save TGA to file
 *
 * @remarks
 * Alias of save_bitmap
 *
 * @param filename- File to save to
 * @param bmp - BITMAP to save
 * @param pal - PALETTE to use when saving
 *
 * @allegro 1.11.14
 */
export function save_tga(
  filename: string,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
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
export function save_tga_pf(
  f: PACKFILE,
  bmp: BITMAP | undefined,
  pal?: RGB
): void {
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
): void {
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
export function set_color_conversion(mode: number): void {
  void mode;
}

/**
 * Stub for compatibility with libloadpng
 *
 * @remarks
 * Does nothing since we have png support
 */
export function loadpng_init(): number {
  return 1;
}
