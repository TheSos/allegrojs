#include <stdlib.h>
#include <time.h>

#include "allegro.h"

float frand() {
  return (float)rand() / ((float)RAND_MAX);
}

int main(void) {
  int MAX_NUM = 10000;
  int num = 0;
  int x[MAX_NUM];
  int y[MAX_NUM];
  int vx[MAX_NUM];
  int vy[MAX_NUM];
  int last_time = 0;
  BITMAP* bmp = NULL;

  // Start
  init_allegro_ts("canvas");

  allegro_init();
  install_keyboard();
  enable_debug("debug");
  set_gfx_mode(GFX_AUTODETECT, 640, 480, 0, 0);
  bmp = load_bmp("data/planet.png");

  allegro_ready();

  while (!key[KEY_ESC]) {
    clear_to_color(screen, makecol(255, 255, 255));

    for (int c = 0; c < num; c++) {
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

    if (num < MAX_NUM) {
      x[num] = rand() % SCREEN_W;
      y[num] = rand() % SCREEN_H;
      vx[num] = frand() * 2 - 1;
      vy[num] = frand() * 2 - 1;
      num++;
    }
    int msec = time(0) - last_time - 1;
    textprintf_ex(screen, font, 20, 30, makecol(255, 255, 255),
                  makecol(0, 0, 0), "Sprites: %i", num);
    last_time = time(0);
    rest(16);
  }

  return 0;
}
END_OF_MAIN();
