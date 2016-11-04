#include <stdlib.h>
#include <allegro.h>

BITMAP_OBJECT *clouds, *ball;

void draw(void) {
	clear_to_color(canvas(), makecol(255, 255, 255, 255));
	stretch_blit(clouds, canvas(), 0, 0, clouds->w, clouds->h, 0, 0, SCREEN_W(), SCREEN_H());

	int touch_len;
	TOUCH_OBJECT *touchp = touch(&touch_len);
	for (int c=0; c<touch_len; c++) {
		draw_sprite(canvas(), ball, touchp[c].x, touchp[c].y);
	}
}

void when_ready(void) {
	loop(draw, BPS_TO_TIMER(60));
}

int main(void) {
	enable_debug("output");

	set_gfx_mode("canvas", 640, 480, 1);
	install_touch();
	install_sound();

	ball = load_bmp("data/planet.png");
	clouds = load_bmp("data/clouds.png");

	ready(when_ready, NULL);

	return 0;
}
END_OF_MAIN()
