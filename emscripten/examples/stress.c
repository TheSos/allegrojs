#include <stdlib.h>
#include <stdio.h>
#include <allegro.h>

#define SPRITE_MAX 65536

int num = 0, speed = 3;
float x[SPRITE_MAX], y[SPRITE_MAX], vx[SPRITE_MAX], vy[SPRITE_MAX];
long last_time = 0;
BITMAP_OBJECT *bmp;

void in_loop(void) {
	clear_to_color(canvas(), makecol(255,255,255,255));

	for(int c=0; c<num; c++) {
		draw_sprite(canvas(), bmp, x[c], y[c]);
		if (x[c]+vx[c] > SCREEN_W()) vx[c] = -abs(vx[c]);
		if (y[c]+vy[c] > SCREEN_H()) vy[c] = -abs(vy[c]);
		if (x[c]+vx[c] < -64)        vx[c] =  abs(vx[c]);
		if (y[c]+vy[c] < -64)        vy[c] =  abs(vy[c]);
		x[c] += vx[c];
		y[c] += vy[c];
	}

	if (num < SPRITE_MAX) {
		x[num]  = rand16() % SCREEN_W();
		y[num]  = rand16() % SCREEN_H();
		vx[num] = frand()*2 -1;
		vy[num] = frand()*2 -1;
		num++;
	}
	long msec = (altime()-last_time)-1;

	char str[256];
	snprintf(str, 256, "Sprites: %d took %ld msec ( %ld fps)", num, msec, 1000/msec);
	textout(canvas(), font(), str, 20, 30, 24, makecol(255,255,255,255), makecol(0,0,0,255), 1);

	last_time = altime();
}

void when_ready(void) {
	loop(in_loop, MSEC_TO_TIMER(1));
}

int main(void) {
	enable_debug("output");
	set_gfx_mode("canvas", 640, 480, 1);
	bmp = load_bmp("data/planet.png");

	ready(when_ready, NULL);
	return 0;
}
END_OF_MAIN()
