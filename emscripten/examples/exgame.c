#include <stdlib.h>
#include <stdio.h>
#include <allegro.h>

//bitmap objects
BITMAP_OBJECT *man, *apple, *bg;

// munching soudn evffect
SAMPLE_OBJECT *munch;

// apple position
float apple_x = 200, apple_y = 200;

// player position
float player_x = 100, player_y = 100;

// score
int score = 0;

// rendering function
void draw(void) {
	// draw background
	simple_blit(bg, canvas(), 0, 0);

	// draw player
	draw_sprite(canvas(), man, player_x, player_y);

	// draw the apple
	draw_sprite(canvas(), apple, apple_x, apple_y);

	// print out current score
	char str[25];
	snprintf(str, 25, "Score: %d", score);
	textout(canvas(), font(), str, 10, 30, 24, makecol(255,255,255,255), makecol(0,0,0,255), 1);
}

// update game logic
void update(void) {
	// check for keypresses and move the player accordingly
	if (key()[KEY_UP])    player_y -= 4;
	if (key()[KEY_DOWN])  player_y += 4;
	if (key()[KEY_LEFT])  player_x -= 4;
	if (key()[KEY_RIGHT]) player_x += 4;

	// if player is touching the apple...
	if (distance(player_x, player_y, apple_x, apple_y) < 20)
	{
		// play muching sound
		play_sample(munch, 1., 1., 0);

		// move apple to a new spot, making it look like it's
		// a breand new apple
		apple_x = rand16() % (SCREEN_W()-32);
		apple_y = rand16() % (SCREEN_H()-32);

		// increase score
		score++;

		// log success to console
		logmsg("Apple eaten!");
	}
}

void in_loop(void) {
	update();
	draw();
}

void when_ready(void) {
	loop(in_loop, BPS_TO_TIMER(60));
}

int main(void) {
	enable_debug("output");
	allegro_init_all("canvas", 640, 480, 0, NULL, 0);
	man = load_bmp("data/man.png");
	apple = load_bmp("data/apple.png");
	bg = load_bmp("data/grass.jpg");
	munch = load_sample("data/munch.mp3");

	ready(when_ready, NULL);

	return 0;
}
END_OF_MAIN()
