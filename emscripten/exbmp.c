#include <stdlib.h>
#include "allegro.h"

// Globally declared bitmap object
BITMAP *logo;

void when_ready(void) {
	// Renders the loaded image on the screen
	stretch_blit(logo, screen(), 0, 0, logo->w, logo->h, 0, 0, SCREEN_W(), SCREEN_H());
}

int main(void) {
	// Initialises allegro.js
	allegro_init();

	// Installs graphics at given canvas in 640x480 resolution
	set_gfx_mode("canvas", 0, 640, 480, 0, 0);

	// Loads an image into the bitmap object
	logo = load_bmp("data/allegro.png");

 	allegro_ready(when_ready, NULL);

	return 0;
}
//END_OF_MAIN()