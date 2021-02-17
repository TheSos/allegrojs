/// Transliterated turtle program from
/// https://github.com/alegemaate/CTurtle

import {
  allegro_init,
  BITMAP,
  clear_to_color,
  create_bitmap,
  draw_sprite,
  enable_debug,
  END_OF_MAIN,
  getb,
  getg,
  getr,
  GFX_AUTODETECT_WINDOWED,
  install_keyboard,
  key,
  KEY_ESC,
  KEY_R,
  KEY_X,
  KEY_Z,
  line,
  makecol,
  rand,
  rest,
  screen,
  SCREEN_H,
  SCREEN_W,
  set_color_depth,
  set_gfx_mode,
  set_window_title,
} from "../src/allegro.js";

enable_debug("debug");

// Struct turtle
type Turtle = {
  // Screen position
  x: number;
  y: number;

  // Angle in degrees
  angle: number;

  // Draw or naw?
  pendown: boolean;

  // Color
  pencolor: number;

  // Draw to this
  penbuffer: BITMAP;
};

// Turtle functions
// Move forward
function fd(t: Turtle, amount: number) {
  // Calc new x and y
  const new_x = Math.cos(t.angle * (Math.PI / 180)) * amount + t.x;
  const new_y = Math.sin(t.angle * (Math.PI / 180)) * amount + t.y;
  // Draw pen
  if (t.pendown == true) line(t.penbuffer, t.x, t.y, new_x, new_y, t.pencolor);
  // Move turtle to new position
  t.x = new_x;
  t.y = new_y;
}

// Backwords
function bk(t: Turtle, amount: number) {
  // Just reverse
  fd(t, -amount);
}

// Right turn
function rt(t: Turtle, amount: number) {
  t.angle += amount;
}

// Left turn
function lt(t: Turtle, amount: number) {
  rt(t, -amount);
}

// Buffer
let buffer: BITMAP;

// Draw buffer
let pen_buffer: BITMAP;

// Random
function random(min: number, max: number): number {
  // Gen
  const random_number = (rand() % (max - min)) + min;
  return random_number;
}

// Make our turtle
let turt: Turtle;

// Draws a tree with defined length
function tree(t: Turtle, length: number, precision: number, scale: number) {
  t.pencolor = makecol(
    (getr(t.pencolor) + 1) % 255,
    (getg(t.pencolor) + 1) % 255,
    (getb(t.pencolor) + 1) % 255
  );
  if (length >= precision) {
    fd(t, length * scale);
    rt(t, 20);
    tree(t, length - 4, precision, scale);
    lt(t, 40);
    tree(t, length - 4, precision, scale);
    rt(t, 20);
    bk(t, length);
  }
}

// Draws a binary tree with defined length
function binary_tree(
  t: Turtle,
  length: number,
  precision: number,
  scale: number
) {
  t.pencolor = makecol(
    (getr(t.pencolor) + 1) % 255,
    (getg(t.pencolor) + 1) % 255,
    (getb(t.pencolor) + 1) % 255
  );
  if (length >= precision) {
    fd(t, length * scale);
    rt(t, 90);
    binary_tree(t, length * 0.7, precision, scale);
    lt(t, 180);
    binary_tree(t, length * 0.7, precision, scale);
    rt(t, 90);
    bk(t, length);
  }
}

// Init
function init() {
  // Allegro
  allegro_init();
  install_keyboard();

  // Screen
  set_color_depth(32);
  set_gfx_mode("canvas_id", GFX_AUTODETECT_WINDOWED, 640, 480, 0, 0);

  // Window title
  set_window_title("Koch Curve");

  // Buffer
  buffer = create_bitmap(SCREEN_W, SCREEN_H);

  // Pen buffer (for turtles)
  pen_buffer = create_bitmap(SCREEN_W, SCREEN_H);
  clear_to_color(pen_buffer, 0x000000);

  // Setup our turtle
  turt = {
    x: SCREEN_W / 2,
    y: SCREEN_H - SCREEN_H / 8,
    angle: -90,
    pendown: true,
    penbuffer: pen_buffer,
    pencolor: 0xff2255,
  };
}

// Update
function update() {
  turt.pencolor = makecol(random(0, 255), random(0, 255), random(0, 255));

  if (key[KEY_R]) {
    clear_to_color(pen_buffer, 0x000000);
  }
  if (key[KEY_Z]) {
    binary_tree(turt, 200, 3, 1);
  }
  if (key[KEY_X]) {
    tree(turt, 50, 1, 1);
  }
}

// Draw
function draw() {
  // Fill screen
  clear_to_color(buffer, 0x000000);

  // Draw turtle buffer
  draw_sprite(buffer, pen_buffer, 0, 0);

  // Draw buffer
  draw_sprite(screen, buffer, 0, 0);
}

// Main
async function main() {
  init();

  while (!key[KEY_ESC]) {
    update();
    draw();
    await rest(16);
  }

  return 0;
}
END_OF_MAIN(main);
