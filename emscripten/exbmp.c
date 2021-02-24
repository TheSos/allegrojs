#include <stdlib.h>

#ifdef __EMSCRIPTEN__
#include "allegrots.h"
#else
#include <allegro.h>
#include <loadpng.h>
#endif

// Globally declared bitmap object
BITMAP* logo;

int main(void) {
// Setup canvas
#ifdef __EMSCRIPTEN__
  init_allegro_ts("canvas");
#endif

  // Initialises allegro.js
  allegro_init();
  set_color_depth(32);

  // Installs graphics at given canvas in 640x480 resolution
  set_gfx_mode(0, 640, 480, 0, 0);
  install_keyboard();

  loadpng_init();

  // Loads an image into the bitmap object
  logo = load_bitmap("data/allegro.png", NULL);

  // Wait for allegro to be ready
#ifdef __EMSCRIPTEN__
  allegro_ready();
#endif

  // Loop
  while (!key[KEY_ESC]) {
    stretch_blit(logo, screen, 0, 0, logo->w, logo->h, 0, 0, SCREEN_W,
                 SCREEN_H);
    rest(1000);
  }

  return 0;
}
END_OF_MAIN()
