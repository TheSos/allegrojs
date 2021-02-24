#include <math.h>
#include <stdlib.h>
#include <sys/time.h>

#ifdef __EMSCRIPTEN__
#include "allegrots.h"
#else
#include <allegro.h>
#include <loadpng.h>
#endif

long long current_timestamp() {
  struct timeval te;
  gettimeofday(&te, NULL);
  long long milliseconds = te.tv_sec * 1000LL + te.tv_usec / 1000;
  return milliseconds;
}

int main(void) {
  int MAX_NUM = 10000;
  int num = 0;
  float x[MAX_NUM];
  float y[MAX_NUM];
  float vx[MAX_NUM];
  float vy[MAX_NUM];
  long long last_time = 0;
  BITMAP* bmp = NULL;
  BITMAP* buffer = NULL;

  // Start
#ifdef __EMSCRIPTEN__
  init_allegro_ts("canvas");
#endif

  allegro_init();
  install_keyboard();
  loadpng_init();
  set_color_depth(32);
  set_gfx_mode(GFX_AUTODETECT_WINDOWED, 640, 480, 0, 0);
  bmp = load_bitmap("data/planet.png", NULL);
  buffer = create_bitmap(SCREEN_W, SCREEN_H);

#ifdef __EMSCRIPTEN__
  allegro_ready();
#endif

  while (!key[KEY_ESC]) {
    clear_to_color(buffer, makecol(255, 255, 255));

    for (int c = 0; c < num; c++) {
      draw_sprite(buffer, bmp, x[c], y[c]);
      if (x[c] + vx[c] > SCREEN_W) {
        vx[c] = -fabsf(vx[c]);
      }
      if (y[c] + vy[c] > SCREEN_H) {
        vy[c] = -fabsf(vy[c]);
      }
      if (x[c] + vx[c] < -64) {
        vx[c] = fabsf(vx[c]);
      }
      if (y[c] + vy[c] < -64) {
        vy[c] = fabsf(vy[c]);
      }
      x[c] += vx[c];
      y[c] += vy[c];
    }

    if (num < MAX_NUM) {
      x[num] = rand() % SCREEN_W;
      y[num] = rand() % SCREEN_H;
      vx[num] = ((float)rand() / (float)(RAND_MAX)) * 2 - 1;
      vy[num] = ((float)rand() / (float)(RAND_MAX)) * 2 - 1;
      num++;
    }
    unsigned int msec = current_timestamp() - last_time;
    textprintf_ex(buffer, font, 20, 20, makecol(0, 0, 0),
                  makecol(255, 255, 255), "Sprites: %i took %i msec (%.1f fps)",
                  num, msec, 1000.0f / msec);
    blit(buffer, screen, 0, 0, 0, 0, SCREEN_W, SCREEN_H);
    last_time = current_timestamp();
    rest(16);
  }

  return 0;
}
END_OF_MAIN()
