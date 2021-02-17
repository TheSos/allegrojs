import {
  load_bmp,
  ready,
  screen,
  END_OF_MAIN,
  SCREEN_W,
  SCREEN_H,
  play_sample,
  enable_debug,
  makecol,
  load_sample,
  draw_sprite,
  BITMAP,
  SAMPLE,
  textout_ex,
  blit,
  key,
  distance,
  rand,
  log,
  set_gfx_mode,
  install_mouse,
  install_sound,
  font,
  install_keyboard,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  allegro_init,
  GFX_AUTODETECT,
  rest,
  KEY_ESC,
  DIGI_AUTODETECT,
  MIDI_AUTODETECT,
} from "../src/allegro.js";

//bitmap objects
let man!: BITMAP;
let apple!: BITMAP;
let bg!: BITMAP;

// munching soudn evffect
let munch!: SAMPLE;

// apple position
let apple_x = 200,
  apple_y = 200;

// player position
let player_x = 100,
  player_y = 100;

// score
let score = 0;

// rendering function
function draw() {
  // draw background
  blit(bg, screen, 0, 0, 0, 0, SCREEN_W, SCREEN_H);

  // draw player
  draw_sprite(screen, man, player_x, player_y);

  // draw the apple
  draw_sprite(screen, apple, apple_x, apple_y);

  // print out current score
  textout_ex(
    screen,
    font,
    "Score: " + score,
    10,
    30,
    makecol(255, 255, 255),
    makecol(0, 0, 0)
  );
}

// update gaem logic
function update() {
  // check for keypresses and move the player accordingly
  if (key[KEY_UP]) player_y -= 4;
  if (key[KEY_DOWN]) player_y += 4;
  if (key[KEY_LEFT]) player_x -= 4;
  if (key[KEY_RIGHT]) player_x += 4;

  // if player is touching the apple...
  if (distance(player_x, player_y, apple_x, apple_y) < 20) {
    // play muching sound
    play_sample(munch);

    // move apple to a new spot, making it look like it's
    // a breand new apple
    apple_x = rand() % (SCREEN_W - 32);
    apple_y = rand() % (SCREEN_H - 32);

    // increase score
    score++;

    // log success to console
    log("Apple eaten!");
  }
}

async function main() {
  enable_debug("debug");

  allegro_init();
  set_gfx_mode("canvas_id", GFX_AUTODETECT, 640, 480, 0, 0);
  install_mouse();
  install_keyboard();
  install_sound(DIGI_AUTODETECT, MIDI_AUTODETECT, null);

  man = load_bmp("data/man.png");
  apple = load_bmp("data/apple.png");
  bg = load_bmp("data/grass.jpg");
  munch = load_sample("data/munch.mp3");

  await ready();

  while (!key[KEY_ESC]) {
    update();
    draw();
    await rest(16);
  }

  return 0;
}
END_OF_MAIN(main);
