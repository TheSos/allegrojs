#ifndef _ALLEGRO_JS_H
#define _ALLEGRO_JS_H
#pragma once

#include <stdarg.h>
#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Macros */
#define AL_RAND() ((rand() >> 16) & 0x7fff)

/* Types */
#ifndef TRUE
#define TRUE -1
#define FALSE 0
#endif

typedef struct RGB {
  unsigned char r, g, b;
  unsigned char filler;
} RGB;

#define PAL_SIZE 256

typedef RGB PALETTE[PAL_SIZE];

typedef struct {
  int handle;
  int w, h;
} BITMAP;

typedef int SAMPLE;

typedef int FONT;

typedef void (*procedure)(void);

/* Allegro TS Specific */
extern void init_allegro_ts(const char* canvas_id);
extern void allegro_ready(void);
extern void enable_debug(const char* id);

// 1.1.1
extern void install_allegro(int system_id, int* errno_ptr, int (*atexit_ptr)());

// 1.1.2
extern int allegro_init(void);

// 1.1.3
extern void allegro_exit(void);

// 1.1.4
#define END_OF_MAIN()

// 1.1.5
extern const char* allegro_id();
#define allegro_id allegro_id()

// 1.1.6
extern const char* allegro_error();
#define allegro_error allegro_error()

// 1.1.7
extern int ALLEGRO_VERSION();
#define ALLEGRO_VERSION ALLEGRO_VERSION()

// 1.1.8
extern int ALLEGRO_SUB_VERSION();
#define ALLEGRO_SUB_VERSION ALLEGRO_SUB_VERSION()

// 1.1.9
extern int ALLEGRO_WIP_VERSION();
#define ALLEGRO_WIP_VERSION ALLEGRO_WIP_VERSION()

// 1.1.10
extern const char* ALLEGRO_VERSION_STR();
#define ALLEGRO_VERSION_STR ALLEGRO_VERSION_STR()

// 1.1.11
extern const char* ALLEGRO_DATE_STR();
#define ALLEGRO_DATE_STR ALLEGRO_DATE_STR()

// 1.1.12
extern int ALLEGRO_DATE();
#define ALLEGRO_DATE ALLEGRO_DATE();

// 1.1.13
extern int AL_ID(int a, int b, int c, int d);

// 1.1.14
extern int MAKE_VERSION(int a, int b, int c);

// 1.1.18
extern void _allegro_message(const char* str);

// Native code needed
void allegro_message(const char* str, ...) {
  char buffer[256];
  va_list args;
  va_start(args, str);
  vsnprintf(buffer, sizeof(buffer), str, args);
  va_end(args);
  _allegro_message(buffer);
}

// 1.1.19
extern void set_window_title(const char* name);

// 1.5.1
extern int install_mouse();

// 1.5.2
extern int remove_mouse(void);

// 1.5.9
extern int mouse_b(void);
#define mouse_b mouse_b()

extern int mouse_x(void);
#define mouse_x mouse_x()

extern int mouse_y(void);
#define mouse_y mouse_y()

extern int mouse_z(void);
#define mouse_z mouse_z()

extern int mouse_w(void);
#define mouse_w mouse_w()

// 1.5.11
extern int show_mouse(BITMAP* bmp);

// 1.5.12
extern int scare_mouse(void);

// 1.7.1
extern int install_keyboard(void);

// 1.7.2
extern int remove_keyboard(void);

// 1.7.3
extern int readkey(void);

// 1.7.6
const char KEY_A = 0x41, KEY_B = 0x42, KEY_C = 0x43, KEY_D = 0x44, KEY_E = 0x45,
           KEY_F = 0x46, KEY_G = 0x47, KEY_H = 0x48, KEY_I = 0x49, KEY_J = 0x4A,
           KEY_K = 0x4B, KEY_L = 0x4C, KEY_M = 0x4D, KEY_N = 0x4E, KEY_O = 0x4F,
           KEY_P = 0x50, KEY_Q = 0x51, KEY_R = 0x52, KEY_S = 0x53, KEY_T = 0x54,
           KEY_U = 0x55, KEY_V = 0x56, KEY_W = 0x57, KEY_X = 0x58, KEY_Y = 0x59,
           KEY_Z = 0x5A, KEY_0 = 0x30, KEY_1 = 0x31, KEY_2 = 0x32, KEY_3 = 0x33,
           KEY_4 = 0x34, KEY_5 = 0x35, KEY_6 = 0x36, KEY_7 = 0x37, KEY_8 = 0x38,
           KEY_9 = 0x39, KEY_0_PAD = 0x60, KEY_1_PAD = 0x61, KEY_2_PAD = 0x62,
           KEY_3_PAD = 0x63, KEY_4_PAD = 0x64, KEY_5_PAD = 0x65,
           KEY_6_PAD = 0x66, KEY_7_PAD = 0x67, KEY_8_PAD = 0x68,
           KEY_9_PAD = 0x69, KEY_F1 = 0x70, KEY_F2 = 0x71, KEY_F3 = 0x72,
           KEY_F4 = 0x73, KEY_F5 = 0x74, KEY_F6 = 0x75, KEY_F7 = 0x76,
           KEY_F8 = 0x77, KEY_F9 = 0x78, KEY_F10 = 0x79, KEY_F11 = 0x7a,
           KEY_F12 = 0x7b, KEY_ESC = 0x1B, KEY_TILDE = 0xc0, KEY_MINUS = 0xbd,
           KEY_EQUALS = 0xbb, KEY_BACKSPACE = 0x08, KEY_TAB = 0x09,
           KEY_OPENBRACE = 0xdb, KEY_CLOSEBRACE = 0xdd, KEY_ENTER = 0x0D,
           KEY_COLON = 0xba, KEY_QUOTE = 0xde, KEY_BACKSLASH = 0xdc,
           KEY_COMMA = 0xbc, KEY_STOP = 0xbe, KEY_SLASH = 0xBF,
           KEY_SPACE = 0x20, KEY_INSERT = 0x2D, KEY_DEL = 0x2E, KEY_HOME = 0x24,
           KEY_END = 0x23, KEY_PGUP = 0x21, KEY_PGDN = 0x22, KEY_LEFT = 0x25,
           KEY_RIGHT = 0x27, KEY_UP = 0x26, KEY_DOWN = 0x28,
           KEY_SLASH_PAD = 0x6F, KEY_ASTERISK = 0x6A, KEY_MINUS_PAD = 0x6D,
           KEY_PLUS_PAD = 0x6B, KEY_ENTER_PAD = 0x0D, KEY_PRTSCR = 0x2C,
           KEY_PAUSE = 0x13, KEY_EQUALS_PAD = 0x0C, KEY_LSHIFT = 0x10,
           KEY_RSHIFT = 0x10, KEY_LCONTROL = 0x11, KEY_RCONTROL = 0x11,
           KEY_ALT = 0x12, KEY_ALTGR = 0x12, KEY_LWIN = 0x5b, KEY_RWIN = 0x5c,
           KEY_MENU = 0x5d, KEY_SCRLOCK = 0x9d, KEY_NUMLOCK = 0x90,
           KEY_CAPSLOCK = 0x14;
extern int* key(void);
#define key key()

// 1.7.8
extern int keypressed(void);

// 1.7.20
extern void clear_keybuf(void);

// 1.9.1
extern int set_color_depth(int depth);

// 1.9.7
extern int set_gfx_mode(int card, int w, int h, int v_w, int v_h);

#define SWITCH_NONE 0
#define SWITCH_PAUSE 1
#define SWITCH_AMNESIA 2
#define SWITCH_BACKGROUND 3
#define SWITCH_BACKAMNESIA 4

#define GFX_TEXT -1
#define GFX_AUTODETECT 0
#define GFX_AUTODETECT_FULLSCREEN 1
#define GFX_AUTODETECT_WINDOWED 2
#define GFX_SAFE 3

// 1.9.20
extern void vsync();

// 1.6.1
extern void install_timer(void);

#define SECS_TO_TIMER(secs) (secs * 1000)
#define MSEC_TO_TIMER(msec) (msec)
#define BPS_TO_TIMER(bps) (1000. / (float)bps)
#define BPM_TO_TIMER(bpm) (60 * 1000. / (float)bpm)

// 1.6.2
extern void remove_timer(void);

// 1.6.3
extern void install_int(procedure p, long msec);

// 1.6.4
extern void install_int_ex(procedure p, long speed);

// 1.6.8
extern void remove_int(procedure p);

// 1.6.12
extern int retrace_count();
#define retrace_count retrace_count()

// 1.6.13
extern void rest(unsigned int time);

// 1.9.13
extern int gfx_capabilities();
#define gfx_capabilities gfx_capabilities()

#define GFX_CAN_SCROLL 0x00000001
#define GFX_CAN_TRIPLE_BUFFER 0x00000002
#define GFX_HW_CURSOR 0x00000004
#define GFX_HW_HLINE 0x00000008
#define GFX_HW_HLINE_XOR 0x00000010
#define GFX_HW_HLINE_SOLID_PATTERN 0x00000020
#define GFX_HW_HLINE_COPY_PATTERN 0x00000040
#define GFX_HW_FILL 0x00000080
#define GFX_HW_FILL_XOR 0x00000100
#define GFX_HW_FILL_SOLID_PATTERN 0x00000200
#define GFX_HW_FILL_COPY_PATTERN 0x00000400
#define GFX_HW_LINE 0x00000800
#define GFX_HW_LINE_XOR 0x00001000
#define GFX_HW_TRIANGLE 0x00002000
#define GFX_HW_TRIANGLE_XOR 0x00004000
#define GFX_HW_GLYPH 0x00008000
#define GFX_HW_VRAM_BLIT 0x00010000
#define GFX_HW_VRAM_BLIT_MASKED 0x00020000
#define GFX_HW_MEM_BLIT 0x00040000
#define GFX_HW_MEM_BLIT_MASKED 0x00080000
#define GFX_HW_SYS_TO_VRAM_BLIT 0x00100000
#define GFX_HW_SYS_TO_VRAM_BLIT_MASKED 0x00200000
#define GFX_SYSTEM_CURSOR 0x00400000
#define GFX_HW_VRAM_STRETCH_BLIT 0x00800000
#define GFX_HW_VRAM_STRETCH_BLIT_MASKED 0x01000000
#define GFX_HW_SYS_STRETCH_BLIT 0x02000000
#define GFX_HW_SYS_STRETCH_BLIT_MASKED 0x04000000

// 1.9.18
extern int show_video_bitmap(BITMAP* bitmap);

// 1.10.1
extern BITMAP* screen(void);
#define screen screen()

// 1.10.2
extern int SCREEN_W(void);
#define SCREEN_W SCREEN_W()

extern int SCREEN_H(void);
#define SCREEN_H SCREEN_H()

// 1.10.4
extern BITMAP* create_bitmap(int width, int height);

// 1.10.5
extern BITMAP* create_bitmap_ex(int color_depth, int width, int height);

// 1.10.6
extern BITMAP* create_sub_bitmap(BITMAP* parent,
                                 int x,
                                 int y,
                                 int width,
                                 int height);

// 1.10.7
extern BITMAP* create_video_bitmap(int width, int height);

// 1.10.8
extern BITMAP* create_system_bitmap(int width, int height);

// 1.10.9
extern void destroy_bitmap(BITMAP* bitmap);

// 1.10.21
extern void acquire_bitmap(BITMAP* bmp);

// 1.10.22
extern void release_bitmap(BITMAP* bmp);

// 1.11.1
extern BITMAP* load_bitmap(const char* filename, PALETTE pal);

// 1.11.2
extern BITMAP* load_bmp(const char* filename, PALETTE pal);

// 1.12.3
extern void set_palette(PALETTE pal);

// 1.13.3
extern int makecol(int r, int g, int b);

// 1.13.4
extern int makecol_depth(int color_depth, int r, int g, int b);

// 1.13.9
extern char getr(int c);
extern char getg(int c);
extern char getb(int c);
extern char geta(int c);

// 1.13.10
extern char getr_depth(int color_depth, int c);
extern char getg_depth(int color_depth, int c);
extern char getb_depth(int color_depth, int c);
extern char geta_depth(int color_depth, int c);

// 1.14.1
extern void clear_bitmap(BITMAP* bitmap);

// 1.14.2
extern void clear_to_color(BITMAP* bitmap, int color);

// 1.14.3
extern void putpixel(BITMAP* bmp, int x, int y, int color);

// 1.14.4
extern void _putpixel(BITMAP* bmp, int x, int y, int color);
extern void _putpixel15(BITMAP* bmp, int x, int y, int color);
extern void _putpixel16(BITMAP* bmp, int x, int y, int color);
extern void _putpixel24(BITMAP* bmp, int x, int y, int color);
extern void _putpixel32(BITMAP* bmp, int x, int y, int color);

// 1.14.5
extern int getpixel(BITMAP* bmp, int x, int y);

// 1.14.6
extern int _getpixel(BITMAP* bmp, int x, int y);
extern int _getpixel15(BITMAP* bmp, int x, int y);
extern int _getpixel16(BITMAP* bmp, int x, int y);
extern int _getpixel24(BITMAP* bmp, int x, int y);
extern int _getpixel32(BITMAP* bmp, int x, int y);

// 1.14.7
extern void vline(BITMAP* bmp, int x, int y1, int y2, int color);

// 1.14.8
extern void hline(BITMAP* bmp, int x1, int y, int x2, int color);

// 1.14.10
extern void line(BITMAP* bmp, int x1, int y1, int x2, int y2, int color);

// 1.14.11
extern void fastline(BITMAP* bmp, int x1, int y1, int x2, int y2, int color);

// 1.14.12
extern void triangle(BITMAP* bmp,
                     int x1,
                     int y1,
                     int x2,
                     int y2,
                     int x3,
                     int y3,
                     int color);

// 1.14.13
extern void polygon(BITMAP* bmp, int vertices, const int* points, int color);

// 1.14.14
extern void rect(BITMAP* bmp, int x1, int y1, int x2, int y2, int color);

// 1.14.15
extern void rectfill(BITMAP* bmp, int x1, int y1, int x2, int y2, int color);

// 1.14.17
extern void circle(BITMAP* bmp, int x, int y, int radius, int color);

// 1.14.18
extern void circlefill(BITMAP* bmp, int x, int y, int radius, int color);

// 1.14.20
extern void ellipse(BITMAP* bmp, int x, int y, int rx, int ry, int color);

// 1.14.21
extern void ellipsefill(BITMAP* bmp, int x, int y, int rx, int ry, int color);

// 1.14.23
extern void
arc(BITMAP* bmp, int x, int y, float ang1, float ang2, int r, int color);

// 1.14.25
extern void spline(BITMAP* bmp, const int* points, int color);

// 1.14.26
extern void floodfill(BITMAP* bmp, int x, int y, int color);

// 1.15.1
extern void blit(BITMAP* source,
                 BITMAP* dest,
                 int source_x,
                 int source_y,
                 int dest_x,
                 int dest_y,
                 int width,
                 int height);

// 1.15.2
extern void stretch_blit(BITMAP* source,
                         BITMAP* dest,
                         int source_x,
                         int source_y,
                         int source_width,
                         int source_height,
                         int dest_x,
                         int dest_y,
                         int dest_width,
                         int dest_height);

// 1.15.5
extern void draw_sprite(BITMAP* bmp, BITMAP* sprite, int x, int y);

// 1.15.6
extern void stretch_sprite(BITMAP* bmp,
                           BITMAP* sprite,
                           int x,
                           int y,
                           int w,
                           int h);

// 1.15.7
extern void draw_sprite_h_flip(BITMAP* bmp, BITMAP* sprite, int x, int y);

// 1.15.12
extern void rotate_sprite(BITMAP* bmp,
                          BITMAP* sprite,
                          int x,
                          int y,
                          float angle);

// 1.15.14
extern void rotate_scaled_sprite(BITMAP* bmp,
                                 BITMAP* sprite,
                                 int x,
                                 int y,
                                 float angle,
                                 float scale);

// 1.15.16
extern void pivot_sprite(BITMAP* bmp,
                         BITMAP* sprite,
                         int x,
                         int y,
                         int cx,
                         int cy,
                         float angle);

// 1.15.18
extern void pivot_scaled_sprite(BITMAP* bmp,
                                BITMAP* sprite,
                                int x,
                                int y,
                                int cx,
                                int cy,
                                float angle,
                                float scale);

// 1.18.2
extern FONT* load_font(char* filename, PALETTE pal, void* param);

extern FONT* font(void);
#define font font()

// 1.18.3
extern void destroy_font(FONT* f);

// 1.19.5
extern void textout_ex(BITMAP* bmp,
                       FONT* f,
                       const char* s,
                       int x,
                       int y,
                       int color,
                       int bg);

// 1.19.6
extern void textout_centre_ex(BITMAP* bmp,
                              FONT* f,
                              const char* s,
                              int x,
                              int y,
                              int color,
                              int bg);

// 1.19.7
extern void textout_right_ex(BITMAP* bmp,
                             FONT* f,
                             const char* s,
                             int x,
                             int y,
                             int color,
                             int bg);

// 1.19.9
extern void _textprintf_ex(BITMAP* bmp,
                           FONT* f,
                           int x,
                           int y,
                           int color,
                           int bg,
                           const char* s);

// Native code needed
void textprintf_ex(BITMAP* bmp,
                   FONT* f,
                   int x,
                   int y,
                   int color,
                   int bg,
                   const char* s,
                   ...) {
  char buffer[256];
  va_list args;
  va_start(args, s);
  vsnprintf(buffer, sizeof(buffer), s, args);
  va_end(args);
  _textprintf_ex(bmp, f, x, y, color, bg, buffer);
}

// 1.19.10
extern void _textprintf_centre_ex(BITMAP* bmp,
                                  FONT* f,
                                  int x,
                                  int y,
                                  int color,
                                  int bg,
                                  const char* s);

// Native code needed
void textprintf_centre_ex(BITMAP* bmp,
                          FONT* f,
                          int x,
                          int y,
                          int color,
                          int bg,
                          const char* s,
                          ...) {
  char buffer[256];
  va_list args;
  va_start(args, s);
  vsnprintf(buffer, sizeof(buffer), s, args);
  va_end(args);
  _textprintf_centre_ex(bmp, f, x, y, color, bg, buffer);
}

// 1.19.11
extern void _textprintf_right_ex(BITMAP* bmp,
                                 FONT* f,
                                 int x,
                                 int y,
                                 int color,
                                 int bg,
                                 const char* s);

// Native code needed
void textprintf_right_ex(BITMAP* bmp,
                         FONT* f,
                         int x,
                         int y,
                         int color,
                         int bg,
                         const char* s,
                         ...) {
  char buffer[256];
  va_list args;
  va_start(args, s);
  vsnprintf(buffer, sizeof(buffer), s, args);
  va_end(args);
  _textprintf_right_ex(bmp, f, x, y, color, bg, buffer);
}

// 1.19.12
extern void _textprintf_justify_ex(BITMAP* bmp,
                                   FONT* f,
                                   int x,
                                   int y,
                                   int color,
                                   int bg,
                                   const char* s);

// Native code needed
void textprintf_justify_ex(BITMAP* bmp,
                           FONT* f,
                           int x,
                           int y,
                           int color,
                           int bg,
                           const char* s,
                           ...) {
  char buffer[256];
  va_list args;
  va_start(args, s);
  vsnprintf(buffer, sizeof(buffer), s, args);
  va_end(args);
  _textprintf_justify_ex(bmp, f, x, y, color, bg, buffer);
}

// 1.25.5
extern void install_sound(int digi, int midi, const char* cfg_path);

#define DIGI_AUTODETECT -1
#define DIGI_NONE 0

#define MIDI_AUTODETECT -1
#define MIDI_NONE 0
#define MIDI_DIGMID 1

// 1.25.7
extern void set_volume(float volume);

// 1.25.9
extern float get_volume(void);

// 1.27.1
extern SAMPLE* load_sample(char* filename);

// 1.27.8
extern void destroy_sample(SAMPLE* sample);

// 1.27.11
extern void play_sample(SAMPLE* spl,
                        float vol,
                        float pan,
                        float freq,
                        int loop);

// 1.27.12
extern void adjust_sample(SAMPLE* spl,
                          float vol,
                          float pan,
                          float freq,
                          int loop);

// 1.27.13
extern void stop_sample(SAMPLE* sample);

// Load png compaitibility
extern int loadpng_init();

#ifdef __cplusplus
}
#endif

#endif /* _ALLEGRO_JS_H */
