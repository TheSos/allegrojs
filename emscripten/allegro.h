/**
	I'm the C header, #include me!
**/

#ifndef _ALLEGRO_JS_H
#define _ALLEGRO_JS_H
#pragma once

#ifdef __cplusplus
extern "C" {
#endif

/* CONFIGURATION ROUTINES */
extern void install_allegro(void);
extern void allegro_init(void);
#define END_OF_MAIN()

/* MOUSE ROUTINES */
extern int mouse_b(void);
extern int mouse_pressed(void);
extern int mouse_released(void);
extern int mouse_x(void);
extern int mouse_y(void);
extern int mouse_z(void);
extern int mouse_mx(void);
extern int mouse_my(void);
extern int mouse_mz(void);

extern int install_mouse(int menu);
extern int remove_mouse(void);
extern int show_mouse(void);
extern int hide_mouse(void);

/* TOUCH ROUTINES */
typedef struct {
	int x, y, mx, my, px, py, sx, sy, id, age, dead;
} TOUCH_OBJECT;
extern TOUCH_OBJECT* touch(int *len);
extern TOUCH_OBJECT* touch_pressed(int *len);
extern TOUCH_OBJECT* touch_released(int *len);
extern void install_touch(void);
extern void remove_touch(void);

/* TIMER ROUTINES */
#define SECS_TO_TIMER(secs) ( secs*1000 )
#define MSEC_TO_TIMER(msec) ( msec )
#define  BPS_TO_TIMER(bps)  (    1000./(float)bps )
#define  BPM_TO_TIMER(bpm)  ( 60*1000./(float)bpm )
typedef void (*procedure)(void);
typedef void (*bar)(float progress);
extern void install_timer(void);
extern long altime(void);
extern void install_int(procedure p, long msec);
extern void install_int_ex(procedure p, long speed);
extern void loop(procedure p, long speed);
extern void loading_bar(float progress);
extern void allegro_ready(procedure p, bar b);
extern void remove_int(procedure p);
extern void remove_all_ints(void);

/* KEYBOARD ROUTINES */
const char KEY_A = 0x41, KEY_B = 0x42, KEY_C = 0x43, KEY_D = 0x44, KEY_E = 0x45, KEY_F = 0x46, KEY_G = 0x47,
           KEY_H = 0x48, KEY_I = 0x49, KEY_J = 0x4A, KEY_K = 0x4B, KEY_L = 0x4C, KEY_M = 0x4D, KEY_N = 0x4E,
           KEY_O = 0x4F, KEY_P = 0x50, KEY_Q = 0x51, KEY_R = 0x52, KEY_S = 0x53, KEY_T = 0x54, KEY_U = 0x55,
           KEY_V = 0x56, KEY_W = 0x57, KEY_X = 0x58, KEY_Y = 0x59, KEY_Z = 0x5A,
           KEY_0 = 0x30, KEY_1 = 0x31, KEY_2 = 0x32, KEY_3 = 0x33, KEY_4 = 0x34, KEY_5 = 0x35, KEY_6 = 0x36,
           KEY_7 = 0x37, KEY_8 = 0x38, KEY_9 = 0x39,
           KEY_0_PAD = 0x60, KEY_1_PAD = 0x61, KEY_2_PAD = 0x62, KEY_3_PAD = 0x63, KEY_4_PAD = 0x64, KEY_5_PAD = 0x65,
           KEY_6_PAD = 0x66, KEY_7_PAD = 0x67, KEY_8_PAD = 0x68, KEY_9_PAD = 0x69,
           KEY_F1 = 0x70, KEY_F2 = 0x71, KEY_F3  = 0x72, KEY_F4  = 0x73, KEY_F5  = 0x74, KEY_F6 = 0x75, KEY_F7 = 0x76,
           KEY_F8 = 0x77, KEY_F9 = 0x78, KEY_F10 = 0x79, KEY_F11 = 0x7a, KEY_F12 = 0x7b,
           KEY_ESC = 0x1B, KEY_TILDE = 0xc0, KEY_MINUS = 0xbd, KEY_EQUALS = 0xbb, KEY_BACKSPACE = 0x08, KEY_TAB = 0x09,
           KEY_OPENBRACE = 0xdb, KEY_CLOSEBRACE = 0xdd, KEY_ENTER = 0x0D, KEY_COLON = 0xba, KEY_QUOTE = 0xde,
           KEY_BACKSLASH = 0xdc, KEY_COMMA = 0xbc, KEY_STOP = 0xbe, KEY_SLASH = 0xBF, KEY_SPACE = 0x20,
           KEY_INSERT = 0x2D, KEY_DEL = 0x2E, KEY_HOME = 0x24, KEY_END = 0x23, KEY_PGUP = 0x21, KEY_PGDN = 0x22,
           KEY_LEFT = 0x25, KEY_RIGHT = 0x27, KEY_UP = 0x26, KEY_DOWN = 0x28, KEY_SLASH_PAD = 0x6F, KEY_ASTERISK = 0x6A,
           KEY_MINUS_PAD = 0x6D, KEY_PLUS_PAD = 0x6B, KEY_ENTER_PAD = 0x0D, KEY_PRTSCR = 0x2C, KEY_PAUSE = 0x13,
           KEY_EQUALS_PAD = 0x0C, KEY_LSHIFT = 0x10, KEY_RSHIFT = 0x10, KEY_LCONTROL = 0x11, KEY_RCONTROL = 0x11,
           KEY_ALT = 0x12, KEY_ALTGR = 0x12, KEY_LWIN = 0x5b, KEY_RWIN = 0x5c, KEY_MENU = 0x5d, KEY_SCRLOCK = 0x9d,
           KEY_NUMLOCK = 0x90, KEY_CAPSLOCK = 0x14;
extern int* key(void);
extern int* pressed(void);
extern int* released(void);
extern int install_keyboard(const int *enable_keys, int enable_keys_len);
extern int remove_keyboard(void);

/* BITMAP ROUTINES */
typedef struct {
	int handle;
	int w, h;
} BITMAP;
extern BITMAP* create_bitmap(int width, int height);
extern BITMAP* load_bitmap(const char *filename);
extern BITMAP* load_bmp(const char *filename);

/* GRAPHICS MODES */
extern BITMAP* screen(void);
extern int SCREEN_W(void);
extern int SCREEN_H(void);
extern int set_gfx_mode(const char *canvas_id, int card, int w, int h, int v_w, int v_h);

/* DRAWING PRIMITIVES */
#define   PI = 3.14159265
#define  PI2 = 6.2831853
#define PI_2 = 1.570796325
#define PI_3 = 1.04719755
#define PI_4 = 0.7853981625
#define RAD(d) ( -d*PI/180.0 )
#define DEG(r) ( -r*180.0/PI )
extern int makecol(char r, char g, char b, char a);
extern int makecolf(float r, float g, float b, float a);
extern char getr(int colour);
extern char getg(int colour);
extern char getb(int colour);
extern char geta(int colour);
extern float getrf(int colour);
extern float getgf(int colour);
extern float getbf(int colour);
extern float getaf(int colour);
extern int getpixel(BITMAP *bitmap, int x, int y);
extern void putpixel(BITMAP *bitmap, int x, int y, int colour);
extern void clear_bitmap(BITMAP *bitmap);
extern void clear_to_color(BITMAP *bitmap, int colour);
extern void line(BITMAP *bitmap, int x1, int y1, int x2, int y2, int colour, int width);
extern void vline(BITMAP *bitmap, int x, int y1, int y2, int colour, int width);
extern void hline(BITMAP *bitmap, int x1, int y, int x2, int colour, int width);
extern void triangle(BITMAP *bitmap, int x1, int y1, int x2, int y2, int x3, int y3, int colour, int width);
extern void trianglefill(BITMAP *bitmap, int x1, int y1, int x2, int y2, int x3, int y3, int colour);
extern void polygon(BITMAP *bitmap, int vertices, const int *points, int colour, int width);
extern void polygonfill(BITMAP *bitmap, int vertices, const int *points, int colour);
extern void rect(BITMAP *bitmap, int x, int y, int w, int h, int colour, int width);
extern void rectfill(BITMAP *bitmap, int x, int y, int w, int h, int colour);
extern void circle(BITMAP *bitmap, int x, int y, int radius, int colour, int width);
extern void circlefill(BITMAP *bitmap, int x, int y, int radius, int colour);
extern void arc(BITMAP *bitmap, int x, int y, float ang1, float ang2, int radius, int colour, int width);
extern void arcfill(BITMAP *bitmap, int x, int y, float ang1, float ang2, int radius, int colour);

/* BLITTING AND SPRITES */
extern void draw_sprite(BITMAP *bmp, BITMAP *sprite, int x, int y);
extern void scaled_sprite(BITMAP *bmp, BITMAP *sprite, int x, int y, float sx, float sy);
extern void rotate_sprite(BITMAP *bmp, BITMAP *sprite, int x, int y, float angle);
extern void pivot_sprite(BITMAP *bmp, BITMAP *sprite, int x, int y, int cx, int cy, float angle);
extern void rotate_scaled_sprite(BITMAP *bmp, BITMAP *sprite, int x, int y, float angle, float sx, float sy);
extern void pivot_scaled_sprite(BITMAP *bmp, BITMAP *sprite, int x, int y, int cx, int cy, float angle, float sx, float sy);
extern void blit(BITMAP *source, BITMAP *dest, int sx, int sy, int dx, int dy, int w, int h);
extern void simple_blit(BITMAP *source, BITMAP *dest, int x, int y);
extern void stretch_blit(BITMAP *source, BITMAP *dest, int sx, int sy, int sw, int sh, int dx, int dy, int dw, int dh);

/* TEXT OUTPUT */
typedef int FONT_OBJECT;
extern FONT_OBJECT* font(void);
extern FONT_OBJECT* load_base64_font(char *data);
extern FONT_OBJECT* load_font(char *filename);
extern FONT_OBJECT* create_font(char *family);
extern void textout(BITMAP *bitmap, FONT_OBJECT *font, const char *string, int x, int y, int size, int colour, int outline, int width);
extern void textout_centre(BITMAP *bitmap, FONT_OBJECT *font, const char *string, int x, int y, int size, int colour, int outline, int width);
extern void textout_right(BITMAP *bitmap, FONT_OBJECT *font, const char *string, int x, int y, int size, int colour, int outline, int width);

/* SOUND ROUTINES */
typedef int SAMPLE_OBJECT;
extern void install_sound(void);
extern void set_volume(float volume);
extern float get_volume(void);
extern SAMPLE_OBJECT* load_sample(char *filename);
extern void destroy_sample(char *filename);
extern void play_sample(SAMPLE_OBJECT *sample, float vol, float freq, int loop);
extern void adjust_sample(SAMPLE_OBJECT *sample, float vol, float freq, int loop);
extern void stop_sample(SAMPLE_OBJECT *sample);
extern void pause_sample(SAMPLE_OBJECT *sample);

/* HELPER MATH FUNCTIONS */
extern unsigned short rand16(void);
extern int rand32(void);
extern float frand(void);
#define abs(a) ( (a<0)?(-a):(a) )
extern float length(float x, float y);
extern float distance(float x1, float y1, float x2, float y2);
extern float distance2(float x1, float y1, float x2, float y2);
extern float linedist(float ex1, float ey1, float ex2, float ey2, float x, float y);
extern float lerp(float from, float to, float progress);
extern float dot(float x1, float y1, float x2, float y2);
extern int   sgn(float a);
extern float angle(float x1, float y1, float x2, float y2);
extern float anglediff(float a, float b);
extern float clamp(float value, float min, float max);
extern float scale(float value, float min, float max, float min2, float max2);
extern float scaleclamp(float value, float min, float max, float min2, float max2);

/* DEBUG FUNCTIONS */
extern int ALLEGRO_CONSOLE;
extern void enable_debug(const char *id);
extern void logmsg(const char *string);
extern void wipe_log(void);

#ifdef __cplusplus
}
#endif

#endif /* _ALLEGRO_JS_H */
