import {
  END_OF_MAIN,
  enable_debug,
  key,
  set_gfx_mode,
  install_mouse,
  install_keyboard,
  allegro_init,
  GFX_AUTODETECT,
  KEY_ESC,
  init_allegro_ts,
  putpixel,
  mouse_x,
  mouse_y,
  makecol,
  screen,
  textout_ex,
  font,
  vline,
  hline,
  line,
  triangle,
  SCREEN_W,
  SCREEN_H,
  polygon,
  rect,
  rectfill,
  circle,
  circlefill,
  ellipse,
  ellipsefill,
  arc,
  spline,
  clear_to_color,
  keypressed,
  clear_keybuf,
  rest,
} from "../build/allegro.js";

async function main() {
  let mode = 0;

  enable_debug("debug");

  allegro_init();
  set_gfx_mode(GFX_AUTODETECT, 640, 480, 0, 0);
  install_mouse();
  install_keyboard();

  while (!key[KEY_ESC]) {
    clear_to_color(screen, makecol(0, 0, 0));

    switch (mode) {
      case 0:
        putpixel(screen, mouse_x, mouse_y, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "putpixel",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 1:
        vline(screen, mouse_x, mouse_y, 0, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "vline",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 2:
        hline(screen, mouse_x, mouse_y, 0, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "hline",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 3:
        line(screen, mouse_x, mouse_y, 0, 0, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "line",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 4:
        triangle(
          screen,
          mouse_x,
          mouse_y,
          0,
          0,
          SCREEN_W,
          SCREEN_H,
          makecol(255, 0, 0)
        );
        textout_ex(
          screen,
          font,
          "triangle",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 5:
        polygon(
          screen,
          6,
          [50, 50, 100, 100, 100, 150, 50, 200, 5, 150, mouse_x, mouse_y],
          makecol(255, 0, 0)
        );
        textout_ex(
          screen,
          font,
          "polygon",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 6:
        rect(screen, mouse_x, mouse_y, 10, 10, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "rect",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 7:
        rectfill(screen, mouse_x, mouse_y, 10, 10, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "rectfill",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 8:
        circle(screen, mouse_x, mouse_y, 10, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "circle",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 9:
        circlefill(screen, mouse_x, mouse_y, 10, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "circlefill",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 10:
        ellipse(screen, mouse_x, mouse_y, 10, 5, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "ellipse",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 11:
        ellipsefill(screen, mouse_x, mouse_y, 10, 5, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "ellipsefill",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 12:
        arc(screen, mouse_x, mouse_y, -21, 43, 50, makecol(255, 0, 0));
        textout_ex(
          screen,
          font,
          "arc",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      case 13:
        spline(
          screen,
          [1, 3, 60, 80, 70, 90, mouse_x, mouse_y],
          makecol(255, 0, 0)
        );
        textout_ex(
          screen,
          font,
          "spline",
          0,
          0,
          makecol(0, 0, 0),
          makecol(255, 255, 255)
        );
        break;
      default:
        break;
    }

    if (keypressed()) {
      mode = (mode + 1) % 14;
      clear_keybuf();
    }

    await rest(16);
  }

  return 0;
}
END_OF_MAIN();

// Start
init_allegro_ts("canvas_id", main);
