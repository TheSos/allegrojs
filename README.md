# jAlllegro
## A lousy javascript port of a game programming library
---
### What is jAllegro?
*jAllegro* is a minimal javascript port of a really popular gaem programming library called Allegro 4 from the first decade of our century. Allegro 4 is a simpel game programming library that abstracts a set of functions in C programming language to the developer allowing for simple and rapid creation of video games, without the need to program entity systems, classes and so on. Allegro 5 is the current Allegro version, but it varies greatly in how the API works, thus alienating many hardcore Allegro users. This library aims to provide a simple wrapper for a subset of canvas operations making it look like good old Allegro.
### How do you use jAllegro?
Here's a simple Hello World code for jAllegro. Hopefully, it doesn't need much explanation.
```javascript
function main()
{
	allegro_init();
	set_gfx_mode("canvas_id", 640, 480);
	clear_to_color(canvas,makecol(255,255,255));
	textout_centre(canvas,font,"Hello World!",SCREEN_W/2,SCREEN_H/2,24,makecol(0,0,0));
	return 0;
}
END_OF_MAIN(); 
```
And here is the html code you need to provide to launch this.
```html
<!doctype html>
<html>
	<head>
		<script src="jallegro.js"></script>
		<script src="exhello.js"></script>
	</head>
	<body>
		<canvas id="canvas_id" width="640" height="480"></canvas>
	</body>
</html>
```
Where jallegro.js is the jAllegro library file, and exhello.js contains the aforementioned code. This is all you need to get started! jAllegro aim is to provide a dive-in experience, without worrying about complicated concepts. 
### What can jAllegro do?
* It load and draw images, using load_bitmap(), draw_sprite(), stretch_sprite(), rotate_sprite(), pivot_sprite(), rotate_scaled_sprite(), pivot_scaled_sprite(), blit(), stretch_blit()
* It can load and play sounds, using load_sample() and play_sample()
* it can draw primitives, using getpixel(), putpixel(), rect(), rectfill(), line(), vline(), hline(), triangle(), trianglefill(), polygon(), polygonfill()
* It can load fonts and display text, using load_font(), textout(), textout_centre(), textout_right()
* It can have timed interrupts, using intall_int(), intall_int_ex(), loop()
* It can read mouse input using mouse_x, mouse_y, mouse_z, mouse_b
* It can read keyboard input using key[KEY_*]
* It can help you calculate stuff using RAD(), DEG(), distance(), dot(), distance2(), scale(), clamp(), scaleclamp(), lerp(), abs(), sgn(), angle(), andglediff()
* It can log stuff to console using enable_debug(), log() and wipe_log()
* It can wait for everything to load using ready() and display a progress bag using loading_bar()
