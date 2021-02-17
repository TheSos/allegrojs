import {
  set_gfx_mode,
  load_bmp,
  ready,
  screen,
  END_OF_MAIN,
  stretch_blit,
  SCREEN_W,
  SCREEN_H,
  play_sample,
  enable_debug,
  BPS_TO_TIMER,
  makecol,
  clear_to_color,
  install_sound,
  load_sample,
  draw_sprite,
  BITMAP,
  SAMPLE,
  rest,
  KEY_ESC,
  key,
  install_keyboard,
  DIGI_AUTODETECT,
} from "../src/allegro.js";

// bitmap oobjects
let clouds!: BITMAP;
let ball!: BITMAP;

// sample object
var bounce!: SAMPLE;

// size and speed of the ball
var speed = 5;

// positon of the ball
var cx = 100,
  cy = 100;

// velocity of the ball
var vx = speed,
  vy = speed;

// drawing function
function draw() {
  // draw allegro clouds background
  stretch_blit(
    clouds,
    screen,
    0,
    0,
    clouds.w,
    clouds.h,
    0,
    0,
    SCREEN_W,
    SCREEN_H
  );

  // draws the ball centered
  draw_sprite(screen, ball, cx, cy);
}

// update game logic
function update() {
  // did the ball bounce off the wall this turn?
  var bounced = false;

  // if the ball is going to collide with screen bounds
  // after applying velocity, if so, reverse velocity
  // and remember that it bonced
  if (cx + vx > SCREEN_W) {
    vx = -speed;
    bounced = true;
  }
  if (cy + vy > SCREEN_H) {
    vy = -speed * 3;
    bounced = true;
  }
  if (cx + vx < 0) {
    vx = speed;
    bounced = true;
  }
  if (cy + vy < 0) {
    vy = speed;
    bounced = true;
  }

  // move the ball
  cx += vx;
  cy += vy;

  // if it bounced, play a sound
  if (bounced) play_sample(bounce);

  // add gravity
  vy += 0.3;
}

// entry point of our example
async function main() {
  // enable debugging to console element
  enable_debug("debug");

  // put allegro in canvas with id="canvas_id"
  // make the dimesnions 640x480
  set_gfx_mode("canvas_id", 1, 640, 480, 0, 0);

  install_sound(DIGI_AUTODETECT, DIGI_AUTODETECT, null);

  install_keyboard();

  // load ball image
  ball = load_bmp("data/planet.png");

  // load background image
  clouds = load_bmp("data/clouds.png");

  // load the bounce sound
  bounce = load_sample("data/bounce.mp3");

  // make sure everything has loaded
  await ready();

  // repeat this game loop
  while (!key[KEY_ESC]) {
    // clear screen
    clear_to_color(screen, makecol(255, 255, 255));

    // update game logic
    update();

    // render everything
    draw();

    // all this happens 60 times per second
    await rest(16);
  }

  // the end
  return 0;
}
// make sure that main() gets called as soon as the wesbite has loaded
END_OF_MAIN(main);
