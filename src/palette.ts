import { PALETTE, RGB } from "./types";

/**
 * Set palette
 *
 * @remarks
 * This does nothing since we dont support palette routines
 *
 * @param pal - Palette to set
 *
 * @allegro 1.12.3
 */
export function set_palette(pal: PALETTE | RGB) {
  void pal;
}

/**
 * Desktop palette
 *
 * @remarks
 * This does nothing, added for completeness
 *
 * @allegro 1.12.21
 */
export const desktop_palette: PALETTE = [
  { r: 63, g: 63, b: 63 } /*White*/,
  { r: 63, g: 0, b: 0 } /*Red*/,
  { r: 0, g: 63, b: 0 } /*Green*/,
  { r: 63, g: 63, b: 0 } /*Yellow*/,
  { r: 0, g: 0, b: 63 } /*Blue*/,
  { r: 63, g: 0, b: 63 } /*Pink*/,
  { r: 0, g: 63, b: 63 } /*Cyan*/,
  { r: 16, g: 16, b: 16 } /*Gray*/,
  { r: 31, g: 31, b: 31 } /* Light gray*/,
  { r: 63, g: 31, b: 31 } /* Light red*/,
  { r: 31, g: 63, b: 31 } /* Light green*/,
  { r: 63, g: 63, b: 31 } /* Light yellow*/,
  { r: 31, g: 31, b: 63 } /* Light blue*/,
  { r: 63, g: 31, b: 63 } /* Light pink*/,
  { r: 31, g: 63, b: 63 } /* Light cyan*/,
  { r: 0, g: 0, b: 0 } /* Black */,
];
