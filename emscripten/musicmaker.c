#include <math.h>
#include "allegro.h"

// Images
BITMAP* buffer;

// Sounds
SAMPLE* piano;

// Variables
int piano_width = 0;
int piano_height = 0;
int piano_number = 0;
int start_key = 0;
int piano_y_offset = 0;

double frequency = 0;

// Functions
void play_sequence(int note_sequence[][2]);

// Program setup
void setup() {
  // Load instruments
  piano = load_sample("data/piano.wav");

  // Width of piano tiles in px
  start_key = 50;
  piano_width = 20;
  piano_height = piano_width * 5;
  piano_number = 62;
  piano_y_offset = 10;

  // Set up screen
  set_gfx_mode(GFX_AUTODETECT_WINDOWED, piano_width * piano_number,
               piano_height + piano_y_offset, 0, 0);

  // Create buffer
  buffer = create_bitmap(SCREEN_W, SCREEN_H);
}

// Main game loop
void game() {
  // Background
  rectfill(buffer, 0, 0, SCREEN_W, SCREEN_H, makecol(0, 0, 0));

  // Draw piano
  for (int i = 0; i < piano_number; i++) {
    rectfill(buffer, i * piano_width, piano_y_offset,
             i * piano_width + piano_width, piano_y_offset + piano_height,
             makecol(0, 0, 0));
    rectfill(buffer, i * piano_width + 1, piano_y_offset,
             i * piano_width + piano_width - 1, piano_y_offset + piano_height,
             makecol(255, 255, 255));
  }

  // Change frequency depending on mouse location
  frequency =
      440 * pow(2.0, ((mouse_x / piano_width + start_key) - 69.0) / 12.0);

  // Play note
  if (mouse_b & 1) {
    // Down note
    rectfill(buffer, (mouse_x / piano_width) * piano_width + 1, piano_y_offset,
             (mouse_x / piano_width) * piano_width + piano_width - 1,
             piano_y_offset + piano_height, makecol(133, 133, 133));

    // Play note
    play_sample(piano, 255, 127, frequency, 0);
    rest(100);
  }

  // Draw frequency to screen
  textprintf_ex(buffer, font, 0, 0, makecol(0, 0, 0), makecol(255, 255, 255),
                "Frequency: %f Key Number (midi): %i", frequency,
                (mouse_x / piano_width + start_key));

  // Cursor
  rectfill(buffer, mouse_x, mouse_y, mouse_x + 4, mouse_y + 4,
           makecol(255, 0, 0));

  draw_sprite(screen, buffer, 0, 0);

  // Play song
  if (key[KEY_SPACE]) {
    int song_mary[][2] = {
        {26, 0},   {84, 500},  {82, 500},  {80, 500}, {82, 500},  {84, 400},
        {84, 400}, {84, 1000}, {82, 400},  {82, 400}, {82, 1000}, {84, 400},
        {84, 400}, {84, 1000}, {84, 500},  {82, 500}, {80, 500},  {82, 500},
        {84, 400}, {84, 400},  {84, 1000}, {82, 400}, {82, 400},  {84, 400},
        {82, 400}, {80, 1000},
    };

    int song_crazy[][2] = {
        {26, 0},   {78, 100}, {78, 100}, {80, 100}, {96, 100}, {68, 100},
        {97, 100}, {84, 100}, {48, 100}, {95, 100}, {85, 100}, {80, 100},
        {87, 100}, {86, 100}, {58, 100}, {82, 100}, {86, 100}, {82, 100},
        {87, 100}, {84, 100}, {59, 100}, {98, 100}, {82, 100}, {97, 100},
        {82, 100}, {78, 100},
    };

    play_sequence(song_crazy);
  }
}

// Play note sequences
void play_sequence(int note_sequence[][2]) {
  // Variables
  int newFrequency = 0;
  int number_of_notes = note_sequence[0][0];

  for (int i = 0; i < number_of_notes; i++) {
    newFrequency = 440 * pow(2.0, (note_sequence[i][0] - 69.0) / 12.0);
    play_sample(piano, 255, 127, newFrequency, 0);
    rest(note_sequence[i][1]);
  }
}

// MAIN
int main() {
  init_allegro_ts("canvas");

  // Makes sure allegro is running properly
  if (allegro_init() != 0) {
    return 1;
  }

  // Initializing
  install_mouse();
  install_keyboard();
  // set_palette(desktop_palette);
  set_color_depth(32);
  install_sound(DIGI_AUTODETECT, MIDI_AUTODETECT, ".");
  set_window_title("Sample Piano!");

  // Setup game
  setup();

  // Start game
  while (!key[KEY_ESC]) {
    game();
    rest(10);
  }

  allegro_exit();

  return 0;
}
END_OF_MAIN();