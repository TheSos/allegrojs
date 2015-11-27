#include <stdlib.h>
#include <allegro.h>

// bitmap objects
BITMAP_OBJECT *clouds, *ball;

// sample object
SAMPLE_OBJECT *bounce;

// size and speed of the ball
const int size=64, speed=5;

// positon of the ball
float cx=100, cy=100;

// velocity of the ball
float vx=speed, vy=speed;

// drawing function
void draw(void)
{
	// draw allegro clouds background
	stretch_blit(clouds, canvas(), 0, 0, clouds->w, clouds->h, 0, 0, SCREEN_W(), SCREEN_H());

	// draws the ball centered
	draw_sprite(canvas(), ball, cx, cy);
}

// update game logic
void update(void) {
	// did the ball bounce off the wall this turn?
	int bounced = 0;

	// if the ball is going to collide with screen bounds
	// after applying velocity, if so, reverse velocity
	// and remember that it bonced
	if (cx+vx > SCREEN_W()) { vx = -speed;   bounced=1; }
	if (cy+vy > SCREEN_H()) { vy = -speed*3; bounced=1; }
	if (cx+vx < 0) { vx = speed; bounced=1; }
	if (cy+vy < 0) { vy = speed; bounced=1; }

	// move the ball
	cx += vx;
	cy += vy;

	// if it bounced, play a sound
	if (bounced) play_sample(bounce, 1., 1., 0);

	// add gravity
	vy += .3;
}

void in_loop(void) {
	// clear screen
	clear_to_color(canvas(), makecol(255, 255, 255, 255));

	// update game logic
	update();

	// render everything
	draw();
}

void when_ready(void) {
	loop(in_loop, BPS_TO_TIMER(60));
}

// entry point of our example
int main(void) {
	// enable debugging to console element
	enable_debug("output");

	// put allegro in canvas with id="canvas"
	// make the dimesnions 640x480
	set_gfx_mode("canvas", 640, 480, 1);

	install_sound();

	// load ball image
	ball = load_bmp("data/planet.png");

	// load background image
	clouds = load_bmp("data/clouds.png");

	// load the bounce sound
	bounce = load_sample("data/bounce.mp3");

	// make sure everything has loaded
	ready(when_ready, NULL);

	// the end
	return 0;
}
END_OF_MAIN()
