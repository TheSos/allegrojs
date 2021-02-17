import {
  set_gfx_mode,
  load_bmp,
  ready,
  screen,
  END_OF_MAIN,
  SCREEN_W,
  SCREEN_H,
  enable_debug,
  makecol,
  clear_to_color,
  draw_sprite,
  BITMAP,
  create_bitmap,
  abs,
  rand,
  frand,
  textout_ex,
  blit,
  font,
  rest,
  KEY_ESC,
  key,
  install_allegro,
  allegro_init,
  install_keyboard,
  GFX_AUTODETECT,
  textprintf_ex,
} from "../src/allegro.js";

let num = 0;
const x: any[] = [];
const y: any[] = [];
const vx: any[] = [];
const vy: any[] = [];
let last_time = 0;
let buffer!: BITMAP;
let bmp!: BITMAP;

async function main() {
  enable_debug("debug");
  allegro_init();
  install_keyboard();
  set_gfx_mode("stress", GFX_AUTODETECT, 640, 480, 0, 0);
  bmp = load_bmp("data/planet.png");
  buffer = create_bitmap(SCREEN_W, SCREEN_H);

  await ready();

  while (!key[KEY_ESC]) {
    clear_to_color(buffer, makecol(255, 255, 255));

    for (var c = 0; c < num; c++) {
      draw_sprite(buffer, bmp, x[c], y[c]);
      if (x[c] + vx[c] > SCREEN_W) {
        vx[c] = -abs(vx[c]);
      }
      if (y[c] + vy[c] > SCREEN_H) {
        vy[c] = -abs(vy[c]);
      }
      if (x[c] + vx[c] < -64) {
        vx[c] = abs(vx[c]);
      }
      if (y[c] + vy[c] < -64) {
        vy[c] = abs(vy[c]);
      }
      x[c] += vx[c];
      y[c] += vy[c];
    }

    x.push(rand() % SCREEN_W);
    y.push(rand() % SCREEN_H);
    vx.push(frand() * 2 - 1);
    vy.push(frand() * 2 - 1);
    num++;
    var msec = Date.now() - last_time - 1;
    textprintf_ex(
      buffer,
      font,
      20,
      20,
      makecol(0, 0, 0),
      makecol(255, 255, 255),
      "Sprites: %i took %f msec (%i fps)",
      num,
      msec,
      msec,
      (1000 / msec).toFixed()
    );
    blit(buffer, screen, 0, 0, 0, 0, SCREEN_W, SCREEN_H);
    last_time = Date.now();
    await rest(16);
  }

  return 0;
}
END_OF_MAIN(main);
