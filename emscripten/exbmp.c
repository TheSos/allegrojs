#include <stdlib.h>
#include "allegro.h"

// Globally declared bitmap object
BITMAP* logo;

int main(void) {
  // Setup canvas
  init_allegro_ts("canvas");

  // Initialises allegro.js
  allegro_init();

  // Installs graphics at given canvas in 640x480 resolution
  set_gfx_mode(0, 640, 480, 0, 0);

  // Loads an image into the bitmap object
  logo = load_bmp("data/allegro.png", NULL);

  // Wait for allegro to be ready
  allegro_ready();

  // Loop
  while (!key[KEY_ESC]) {
    stretch_blit(logo, screen, 0, 0, logo->w, logo->h, 0, 0, SCREEN_W,
                 SCREEN_H);
    rest(1000);
  }

  return 0;
}
END_OF_MAIN()
