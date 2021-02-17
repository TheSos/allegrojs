/*
 *    Example program for the Allegro library, by Shawn Hargreaves.
 *
 *    This program demonstrates how to use an offscreen part of
 *    the video memory to store source graphics for a hardware
 *    accelerated graphics driver. The example loads the `mysha.pcx'
 *    file and then blits it several times on the screen. Depending
 *    on whether you have enough video memory and Allegro supports
 *    the hardware acceleration features of your card, your success
 *    running this example may be none at all, sluggish performance
 *    due to software emulation, or flicker free smooth hardware
 *    accelerated animation.
 */

import {
  acquire_bitmap,
  allegro_init,
  allegro_message,
  blit,
  clear_bitmap,
  create_video_bitmap,
  destroy_bitmap,
  END_OF_MAIN,
  font,
  install_keyboard,
  install_timer,
  SCREEN_H,
  SCREEN_W,
  set_gfx_mode,
  BITMAP,
  load_bitmap,
  AL_RAND,
  RGB,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  keypressed,
  readkey,
  KEY_ESC,
  show_video_bitmap,
  release_bitmap,
  textout_ex,
  textprintf_ex,
  GFX_HW_FILL,
  gfx_capabilities,
  GFX_HW_VRAM_BLIT,
  enable_debug,
  ready,
  GFX_AUTODETECT,
  GFX_TEXT,
  allegro_error,
  rest,
  set_palette,
} from "../src/allegro.js";

enable_debug("debug");

const MAX_IMAGES = 256;

/* structure to hold the current position and velocity of an image */
type IMAGE = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

/* initialises an image structure to a random position and velocity */
function init_image(image: IMAGE) {
  image.x = AL_RAND() % 704;
  image.y = AL_RAND() % 568;
  image.dx = ((AL_RAND() % 255) - 127) / 32.0;
  image.dy = ((AL_RAND() % 255) - 127) / 32.0;
}

/* called once per frame to bounce an image around the screen */
function update_image(image: IMAGE) {
  image.x += image.dx;
  image.y += image.dy;

  if ((image.x < 0 && image.dx < 0) || (image.x > 703 && image.dx > 0))
    image.dx *= -1;

  if ((image.y < 0 && image.dy < 0) || (image.y > 567 && image.dy > 0))
    image.dy *= -1;
}

async function main() {
  const buf = "data/mysha.png";
  let pal: RGB = { r: 0, b: 0, g: 0 };
  let image: BITMAP;
  const page: BITMAP[] = [];
  let vimage: BITMAP;

  const images: IMAGE[] = [];
  let num_images = 4;
  let page_num = 1;
  let done = false;
  let i: number;

  if (allegro_init() != 0) return 1;
  install_keyboard();
  install_timer();

  /* see comments in exflip.c */
  if (
    set_gfx_mode("canvas_id", GFX_AUTODETECT, 1024, 768, 0, 2 * 768 + 200) != 0
  ) {
    set_gfx_mode("", GFX_TEXT, 0, 0, 0, 0);
    allegro_message("Error setting graphics mode\n%s\n", allegro_error);
    return 1;
  }

  /* read in the source graphic */
  image = load_bitmap(buf, pal);
  if (!image) {
    set_gfx_mode("", GFX_TEXT, 0, 0, 0, 0);
    allegro_message("Error reading %s!\n", buf);
    return 1;
  }

  await ready();

  set_palette(pal);

  /* initialise the images to random positions */
  for (i = 0; i < MAX_IMAGES; i++) {
    const new_image: IMAGE = { x: 0, y: 0, dx: 0, dy: 0 };
    init_image(new_image);
    images.push(new_image);
  }

  /* create two video memory bitmaps for page flipping */
  page[0] = create_video_bitmap(SCREEN_W, SCREEN_H);
  page[1] = create_video_bitmap(SCREEN_W, SCREEN_H);

  /* create a video memory bitmap to store our picture */
  vimage = create_video_bitmap(image.w, image.h);

  if (!page[0] || !page[1] || !vimage) {
    set_gfx_mode("", GFX_TEXT, 0, 0, 0, 0);
    allegro_message(
      "Not enough video memory (need two 1024x768 pages and a 320x200 image)\n"
    );
    return 1;
  }

  /* copy the picture into offscreen video memory */
  blit(image, vimage, 0, 0, 0, 0, image.w, image.h);

  while (!done) {
    acquire_bitmap(page[page_num]);

    /* clear the screen */
    clear_bitmap(page[page_num]);

    /* draw onto it */
    for (i = 0; i < num_images; i++) {
      blit(
        vimage,
        page[page_num],
        0,
        0,
        images[i]?.x ?? 0,
        images[i]?.y ?? 0,
        vimage.w,
        vimage.h
      );
    }

    textprintf_ex(
      page[page_num],
      font,
      0,
      0,
      255,
      -1,
      "Images: %d (arrow keys to change)",
      num_images
    );

    /* tell the user which functions are being done in hardware */
    if (gfx_capabilities & GFX_HW_FILL)
      textout_ex(
        page[page_num],
        font,
        "Clear: hardware accelerated",
        0,
        16,
        255,
        -1
      );
    else
      textout_ex(
        page[page_num],
        font,
        "Clear: software (urgh, this is not good!)",
        0,
        16,
        255,
        -1
      );

    if (gfx_capabilities & GFX_HW_VRAM_BLIT)
      textout_ex(
        page[page_num],
        font,
        "Blit: hardware accelerated",
        0,
        32,
        255,
        -1
      );
    else
      textout_ex(
        page[page_num],
        font,
        "Blit: software (urgh, this program will run too sloooooowly without hardware acceleration!)",
        0,
        32,
        255,
        -1
      );

    release_bitmap(page[page_num]);

    /* page flip */
    show_video_bitmap(page[page_num]);
    page_num = 1 - page_num;

    /* deal with keyboard input */
    while (keypressed()) {
      const val = (await readkey()) >> 8;
      switch (val) {
        case KEY_UP:
        case KEY_RIGHT:
          if (num_images < MAX_IMAGES) num_images++;
          break;

        case KEY_DOWN:
        case KEY_LEFT:
          if (num_images > 0) num_images--;
          break;

        case KEY_ESC:
          done = true;
          break;
      }
    }

    /* bounce the images around the screen */
    images.forEach((image) => update_image(image));

    await rest(16);
  }

  destroy_bitmap(image);
  destroy_bitmap(vimage);
  destroy_bitmap(page[0]);
  destroy_bitmap(page[1]);

  return 0;
}
END_OF_MAIN(main);
