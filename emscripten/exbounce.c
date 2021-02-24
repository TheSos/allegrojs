#include <stdlib.h>

#ifdef __EMSCRIPTEN__
#include "allegrots.h"
#else
#include <allegro.h>
#include <loadpng.h>
#endif

// bitmap oobjects
BITMAP* clouds;
BITMAP* ball;

// sample object
SAMPLE* bounce;

// size and speed of the ball
float speed = 5.0;

// positon of the ball
float cx = 100;
float cy = 100;

// velocity of the ball
float vx = 5.0;
float vy = 5.0;

// drawing function
void draw() {
  // draw allegro clouds background
  stretch_blit(clouds, screen, 0, 0, clouds->w, clouds->h, 0, 0, SCREEN_W,
               SCREEN_H);

  // draws the ball centered
  draw_sprite(screen, ball, cx, cy);
}

// update game logic
void update() {
  // did the ball bounce off the wall this turn?
  int bounced = 0;

  // if the ball is going to collide with screen bounds
  // after applying velocity, if so, reverse velocity
  // and remember that it bonced
  if (cx + vx > SCREEN_W) {
    vx = -speed;
    bounced = 1;
  }
  if (cy + vy > SCREEN_H) {
    vy = -speed * 3;
    bounced = 1;
  }
  if (cx + vx < 0) {
    vx = speed;
    bounced = 1;
  }
  if (cy + vy < 0) {
    vy = speed;
    bounced = 1;
  }

  // move the ball
  cx += vx;
  cy += vy;

  // if it bounced, play a sound
  if (bounced) {
    play_sample(bounce, 255, 127, 1000, 0);
  }

  // add gravity
  vy += 0.3;
}

// entry point of our example
int main(void) {
// Start
#ifdef __EMSCRIPTEN__
  init_allegro_ts("canvas");
#endif

  allegro_init();
  set_color_depth(32);

  // put allegro in canvas with id="canvas_id"
  // make the dimesnions 640x480
  set_gfx_mode(GFX_AUTODETECT, 640, 480, 0, 0);

  install_sound(DIGI_AUTODETECT, DIGI_AUTODETECT, NULL);

  install_keyboard();

  loadpng_init();

  // load ball image
  ball = load_bitmap("data/planet.png", NULL);

  // load background image
  clouds = load_bitmap("data/clouds.png", NULL);

  // load the bounce sound
  bounce = load_sample("data/piano.wav");

  // make sure everything has loaded
#ifdef __EMSCRIPTEN__
  allegro_ready();
#endif

  // repeat this game loop
  while (!key[KEY_ESC]) {
    // clear screen
    clear_to_color(screen, makecol(255, 255, 255));

    // update game logic
    update();

    // render everything
    draw();

    // all this happens 60 times per second
    rest(16);
  }

  // the end
  return 0;
}
END_OF_MAIN()
