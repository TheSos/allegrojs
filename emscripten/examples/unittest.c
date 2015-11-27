#include <stdlib.h>
#include <stdio.h>
#include <allegro.h>

BITMAP_OBJECT *clouds, *ball;
SAMPLE_OBJECT *beep;

int stage = -1;
float delay = 0;
char *title = "allegro.js test";
const char *subtitle = "press space";

int timercolor;
int timers = 0;
int width = 13;

void callback1(void) {
	circlefill(canvas(), 100, 100, 100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
}

void callback2(void) {
	circlefill(canvas(), 200, 100, 100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
}

void callback3(void) {
	circlefill(canvas(), 300, 100, 100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
}

void callback4(void) {
	circlefill(canvas(), 400, 100, 100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
}

void callback5(void) {
	circlefill(canvas(), 500, 100, 100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
}

void sound_callback(void) {
	play_sample(beep, frand(), frand()+.5, 0);
	circlefill(canvas(), SCREEN_W()/2, SCREEN_H()/2, 200, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
}

void draw(void) {

	if (stage==0) {
		title = "progress_bar";
		loading_bar(delay/200.);
	}
	else if (stage==1) {
		title = "blit";
		blit(ball, canvas(), 0, 0, rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%ball->w+1, rand16()%ball->h+1);
	}
	else if (stage==2) {
		title = "stretch_blit";
		stretch_blit(ball, canvas(), 0, 0, rand16()%ball->w+1, rand16()%ball->h+1, rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W()+1, rand16()%SCREEN_H()+1);
	}
	else if (stage==3) {
		title = "draw_sprite";
		draw_sprite(canvas(), ball, rand16()%SCREEN_W(), rand16()%SCREEN_H());
	}
	else if (stage==4) {
		title = "scaled_sprite";
		scaled_sprite(canvas(), ball, rand16()%SCREEN_W(), rand16()%SCREEN_H(), frand()*2+.1, frand()*2+.1);
	}
	else if (stage==5) {
		title = "rotate_sprite";
		rotate_sprite(canvas(), ball, rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%360);
	}
	else if (stage==6) {
		title = "pivot_sprite";
		pivot_sprite(canvas(), ball, rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%ball->w, rand16()%ball->h, rand16()%360);
	}
	else if (stage==7) {
		title = "rotate_scaled_sprite";
		rotate_scaled_sprite(canvas(), ball, rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%360, frand()*2+.1, frand()*2+.1);
	}
	else if (stage==8) {
		title = "pivot_scaled_sprite";
		pivot_scaled_sprite(canvas(), ball, rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%ball->w, rand16()%ball->h, rand16()%360, frand()*2+.1, frand()*2+.1);
	}
	else if (stage==9) {
		title = "textout";
		textout(canvas(), font(), "Hello World!", rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%48+8, makecol(rand16()%255, rand16()%255, rand16()%255, 255), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%5);
	}
	else if (stage==10) {
		title = "textout_centre";
		textout_centre(canvas(), font(), "Hello World!", rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%48+8, makecol(rand16()%255, rand16()%255, rand16()%255, 255), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%5);
	}
	else if (stage==11) {
		title = "textout_right";
		textout_right(canvas(), font(), "Hello World!", rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%48+8, makecol(rand16()%255, rand16()%255, rand16()%255, 255), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%5);
	}
	else if (stage==12) {
		title = "getpixel";
		int x = rand16()%SCREEN_W();
		int y = rand16()%SCREEN_H();
		char str[16];
		snprintf(str, 16, "%d", getpixel(canvas(), x, y));
		textout(canvas(), font(), str, x, y, 24, getpixel(canvas(), x, y), 0, 0);
	}
	else if (stage==13) {
		title = "putpixel";
		putpixel(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==14) {
		title = "clear_to_color";
		clear_to_color(canvas(), makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==15) {
		title = "line";
		line(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==16) {
		title = "vline";
		vline(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==17) {
		title = "hline";
		hline(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==18) {
		title = "triangle";
		triangle(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==19) {
		title = "trianglefill";
		trianglefill(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==20) {
		title = "polygon";
		int n = rand16()%10+3;
		int p[30];
		for (int c=0; c<n; c+=2)
		{
			p[c]   = rand16()%SCREEN_W();
			p[c+1] = rand16()%SCREEN_H();
		}
		polygon(canvas(), n, p, makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==21) {
		title = "polygonfill";
		int n = rand16()%10+3;
		int p[30];
		for (int c=0; c<n; c+=2)
		{
			p[c]   = rand16()%SCREEN_W();
			p[c+1] = rand16()%SCREEN_H();
		}
		polygonfill(canvas(), n, p, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==22) {
		title = "rect";
		rect(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==23) {
		title = "rectfill";
		rectfill(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==24) {
		title = "circle";
		circle(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%SCREEN_W(), makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==25) {
		title = "circlefill";
		circlefill(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==26) {
		title = "arc";
		arc(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%360, rand16()%360, rand16()%100, makecol(rand16()%255, rand16()%255, rand16()%255, 255), 1+rand16()%8);
	}
	else if (stage==27) {
		title = "arcfill";
		arcfill(canvas(), rand16()%SCREEN_W(), rand16()%SCREEN_H(), rand16()%360, rand16()%360, rand16()%100, makecol(rand16()%255, rand16()%255, rand16()%255, 255));
	}
	else if (stage==28) {
		title = "mouse";
		line(canvas(), mouse_x(), mouse_y(), mouse_x()-mouse_mx(), mouse_y()-mouse_my(), makecol(255, 255, 235, 255), width);
		if (mouse_b()&1) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(0, 0, 255, 255));
		if (mouse_b()&2) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(255, 0, 0, 255));
		if (mouse_b()&4) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(0, 255, 0, 255));

		if (mouse_pressed()&1) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(0, 255, 255, 255));
		if (mouse_pressed()&2) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(255, 255, 0, 255));
		if (mouse_pressed()&4) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(0, 255, 255, 255));

		if (mouse_released()&1) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(128, 255, 255, 255));
		if (mouse_released()&2) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(255, 255, 128, 255));
		if (mouse_released()&4) circlefill(canvas(), mouse_x(), mouse_y(), 20, makecol(128, 255, 255, 255));
		width+=mouse_mz();
	}
	else if (stage==29) {
		title = "keyboard";
		for (int c=0; c<0x7f; c++) {
			if (pressed()[c]) {
				rectfill(canvas(), (c>>3)*24, (c&0xf)*24, 20, 20, makecol(255, 255, 255, 255));
			}
			else if (released()[c]) {
				rectfill(canvas(), (c>>3)*24, (c&0xf)*24, 20, 20, makecol(255, 255, 0, 255));
			}
			else if (key()[c]) {
				rectfill(canvas(), (c>>3)*24, (c&0xf)*24, 20, 20, makecol(255, 0, 0, 255));
			}
			else {
				rectfill(canvas(), (c>>3)*24, (c&0xf)*24, 20, 20, makecol(0, 0, 0, 255));
			}
		}
	}
	else if (stage==30) {
		title = "timer";
		stage=31;
		timers=1;
		install_int_ex(callback1, SECS_TO_TIMER(1));
		install_int_ex(callback2, MSEC_TO_TIMER(500));
		install_int_ex(callback3, BPS_TO_TIMER(3));
		install_int_ex(callback4, BPM_TO_TIMER(60));
		install_int(callback5, 1500);
	}
	else if (stage==31) {
		title = "timer";
	}
	else if (stage==32) {
		stage=33;
		title = "sound";
		remove_all_ints();
		install_int_ex(sound_callback, SECS_TO_TIMER(2));
	}
	else if (stage==33) {
		title = "sound";
	}
	else if (stage==34) {
		title = "The End";
		remove_all_ints();
		stage++;
	}

	textout_centre(canvas(), font(), title, SCREEN_W()/2, 64, 64, makecol(255, 255, 255, 255), makecol(0, 0, 0, 255), 2);
	textout(canvas(), font(), subtitle, 10, SCREEN_H()-10, 24, makecol(255, 255, 255, 255), makecol(0, 0, 0, 255), 1);
	delay++;
	if (key()[KEY_SPACE] && delay>10)
	{
		stretch_blit(clouds, canvas(), 0, 0, clouds->w, clouds->h, 0, 0, SCREEN_W(), SCREEN_H());
		stage++;
		delay=0;
	}
}

void in_loop(void) {
	draw();
}

void when_ready(void) {
	stretch_blit(clouds, canvas(), 0, 0, clouds->w, clouds->h, 0, 0, SCREEN_W(), SCREEN_H());
	loop(in_loop, BPS_TO_TIMER(60));
}

int main(void) {
	enable_debug("output");
	allegro_init_all("canvas", 640, 480, 0, NULL, 0);
	timercolor = makecol(192, 168, 1, 254);
	clouds = load_bmp("data/clouds.png");
	ball = load_bmp("data/planet.png");
	beep = load_sample("data/dtmf.mp3");

	ready(when_ready, NULL);
	return 0;
}
END_OF_MAIN()
