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
  abs,
  rand,
  frand,
  textout_ex,
  MSEC_TO_TIMER,
  font,
  rest,
  KEY_ESC,
  key,
  allegro_init,
  install_keyboard,
  GFX_AUTODETECT,
} from "../src/allegro.js";

let num = 0;
const x: any[] = [];
const y: any[] = [];
const vx: any[] = [];
const vy: any[] = [];
let last_time = 0;
let bmp!: BITMAP;

async function main() {
  allegro_init();
  install_keyboard();
  enable_debug("debug");
  set_gfx_mode("stress", GFX_AUTODETECT, 640, 480, 0, 0);
  bmp = load_bmp("data/planet.png");

  await ready();

  while (!key[KEY_ESC]) {
    clear_to_color(screen, makecol(255, 255, 255));

    for (var c = 0; c < num; c++) {
      draw_sprite(screen, bmp, x[c], y[c]);
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
    textout_ex(
      screen,
      font,
      "Sprites: " +
        num +
        " took " +
        msec +
        " msec ( " +
        (1000 / msec).toFixed() +
        " fps)",
      20,
      30,
      makecol(255, 255, 255),
      makecol(0, 0, 0)
    );
    last_time = Date.now();
    await rest(16);
  }
  return 0;
}
END_OF_MAIN(main);
