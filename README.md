# [allegro.js](http://allegrojs.net/) 
## a HTML5 game making library
---
[Website](http://allegrojs.net/) | [GitHub](https://github.com/TheSos/allegrojs) | [API reference](http://allegrojs.net/api) | [Examples](http://allegrojs.net/examples) | [Download](http://allegrojs.net/download.html) | [Tutorial](http://allegrojs.net/tutorial)
---

### What is allegro.js?

*allegro.js* is a minimal javascript port of a really popular game programming library called Allegro 4 from the first decade of our century. Allegro 4 is a simple game programming library that abstracts a set of functions in C programming language to the developer allowing for simple and rapid creation of video games, without the need to program entity systems, classes and so on. Allegro 5 is the current Allegro version, but it varies greatly in how the API works, thus alienating many hardcore Allegro users. This library aims to provide a simple wrapper for a subset of canvas operations making it look like good old Allegro.

### How do you use allegro.js?

Here's a simple Hello World code for allegro.js. Hopefully, it doesn't need much explanation.

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
		<script src="allegro.js"></script>
		<script src="exhello.js"></script>
	</head>
	<body>
		<canvas id="canvas_id" width="640" height="480"></canvas>
	</body>
</html> 

```

Where allegro.js is the library file, and exhello.js contains the aforementioned code. This is all you need to get started! allegro.js aim is to provide a dive-in experience, without worrying about complicated concepts. 

### Who is allegro.js for?

I hope for allegro.js to be a tool perfectly suitable for absolute beginners, who never had experience using game engines, such as I was when I started in Allegro, but it is also perfectly suitable for experienced Javascript developers who are looking for a lightweight solution, game jammers seeking for a RAD game making tool, developers looking for a non-OOP tool to create games and obviously, hard core old school classic Allegro nerds who somehow prevailed and want to come back to using it.

### Where can I learn allegro.js?

First up, read all of this README! Then, there are several placed you can go to get documentation
* Study [examples](http://allegrojs.net/examples) to see how to use different functions of allegro.js
* Check the neat and pretty [allegro.js function reference](http://allegrojs.net/docs)
* Check out the [allegro.js tutorial](http://allegrojs.net/tutorial).

### What can allegro.js do?

* It load and draw images, using `load_bitmap()`, `draw_sprite()`, `stretch_sprite()`, `rotate_sprite()`, `pivot_sprite()`, `rotate_scaled_sprite()`, `pivot_scaled_sprite()`, `blit()`, `stretch_blit()`
* It can load and play sounds, using `load_sample()` and `play_sample()`
* it can draw primitives, using `getpixel(), putpixel(), rect(), rectfill(), line(), vline(), hline(), triangle(), trianglefill(), polygon(), polygonfill()`
* It can load fonts and display text, using `load_font(), textout(), textout_centre(), textout_right()`
* It can have timed interrupts, using `intall_int(), intall_int_ex(), loop()`
* It can read mouse input using `mouse_x, mouse_y, mouse_z, mouse_b`
* It can read keyboard input using `key[KEY_*]`
* It can help you calculate stuff using `RAD(), DEG(), distance(), dot(), distance2(), scale(), clamp(), scaleclamp(), lerp(), abs(), sgn(), angle(), andglediff()`
* It can log stuff to console using `enable_debug(), log() and wipe_log()`
* It can wait for everything to load using `ready()` and display a progress bag using `loading_bar()`

### What are the differences between this and original Allegro?

Since the underlying system is completely different for allegro.js (Allegro used C and a bit of assembly inside too), there are a bunch of things that doesn't make sense for allegro.js, but there are new things that make perfect sense here, while they didn't back in the days. As I will try to keep it as close to original as possible, not to break the feel, there are bound to be discrepancies, and I'll list them right here!

* `set_gfx_mode` takes canvas id, and pixel dimensions as arguments.
* `rotate_sprite` draws the rotated sprite centred, as opposed to top-left alignment
* all of the colour modes are gone, as js has uniform standardised colour format
* software 3d functions are gone, but you can still use WebGL!
* helper math functions have been added
* `END_OF_FUNCTION()` and `LOCK_` macros are no longer necessary
* game loop must be wrapped in a `loop()` function, as js doesn't support blocking code
* assets are loaded asynchronously, thus `ready()` function wrapper lets you execute code ensuring everything has been loaded already.
* `ready()` can display a custom loading bar as well as a default one
* `remove_all_ints()` has been added for simplicity
* a couple of keyboard keys might not work in js
* all of keystrokes, except for F5 have `preventDefault()`, meaning that i.e. pressing backspace in game won't take you to previous website!
* hardware accelerated functions, such as `create_video_bitmap()` are all gone, everything is accelerated in js anyways
* sprite rotations take degrees as parameter instead of 0..256 fixed value
* `makecol` always produces 32bit 0xAARRGGBB value and takes 4 components with optional alpha
* `makecolf` has been added for 0..1 colors
* `arcfill`, `trainglefill` and `polygonfill` added
* `masked_blit` functions are no longer needed, sicne everythign relies on alpha channel
* `textprintf` functions are gone, since `textout` can do the same without `printf` stuff
* `textout` has a size argument now, due to all fonts being ttf
* `play_sample` no longer supports panning

### But can it really make games?

That's what it's made for! Here's exgame.js with comments stripped down. In under 50 lines of code, you can have an actual game!

```javascript

var man,apple,bg;
var munch;
var apple_x=200,apple_y=200;
var player_x=100,player_y=100;
var score = 0;

function draw()
{
	draw_sprite(canvas,bg,0,0);
	draw_sprite(canvas,man,player_x,player_y);
	draw_sprite(canvas,apple,apple_x,apple_y);
	textout(canvas,font,"Score: " + score,10,20,24,makecol(255,255,255));
}

function update()
{
	if (key[KEY_UP]) player_y-=4;
	if (key[KEY_DOWN]) player_y+=4;
	if (key[KEY_LEFT]) player_x-=4;
	if (key[KEY_RIGHT]) player_x+=4;
	if (distance(player_x,player_y,apple_x,apple_y)<20)
	{
		play_sample(munch);
		apple_x = rand()%(SCREEN_W-32);
		apple_y = rand()%(SCREEN_H-32);
		score++;
		log("Apple eaten!");
	}
}

function main()
{
	enable_debug('debug');
	allegro_init_all("canvas_id", 640, 480);
	man = load_bmp("data/man.png");
	apple = load_bmp("data/apple.png");
	bg = load_bmp("data/grass.jpg");
	munch = load_sample("data/munch.mp3");
	
	ready(function(){
		loop(function(){
			update();
			draw();
		},BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();

```

### Who made allegro.js?

allegro.js was made by me, Sos Sosowski. I always liked Allegro 4, and it felt wrong that it's gone already, so I wanted to give it a new life in form of this library. I hope that not only Allegro freaks like me, but also people new to javascript, or even game making in general will pick this up and create amazing stuff.

If you have any questions, suggestions, bug reports or would like to show me a game made with allegro.js (I'd love to know!) Drop me a line!

* You can email me at just.sos.it@gmail.com
* You can find me on Twitter as [@Sosowski](https://twitter.com/Sosowski)
* You can go to [my website](http://sos.gd/) too!


And don't forget to join the #allegrojs IRC channel at Freenode!

### What are the allegro.js licence terms?

allegro.js licence is the same old Allegro 4 gift-ware licence!

```
Allegro is gift-ware. It was created by a number of people 
working in cooperation, and is given to you freely as a gift. 
You may use, modify, redistribute, and generally hack it about 
in any way you like, and you do not have to give us anything 
in return.

However, if you like this product you are encouraged to thank us 
by making a return gift to the Allegro community. This could be 
by writing an add-on package, providing a useful bug report, 
making an improvement to the library, or perhaps just releasing 
the sources of your program so that other people can learn 
from them. If you redistribute parts of this code or make a game 
using it, it would be nice if you mentioned Allegro somewhere in 
the credits, but you are not required to do this. 
We trust you not to abuse our generosity.

By Sos Sosowski, 05 August 2015.
(originally written by Shawn Hargreaves, 18 October 1998)

DISCLAIMER: THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY 
OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE 
COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE 
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT 
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

### Changelog

#### v4.0.5
* finalised renaming
* finished website

#### v4.0.4
* changed name to allegro.js
* changed file names accordingly, watch out!
* pulled requests

#### v4.0.3
* increased version number!

#### v4.0.2
* fixed examples
* fixed volume
* rearranged code
* fixed and styled documentation
* added mouse mickeys
* started on the website!
* added mouse menu suppress option
* added show_mouse and hide_mouse
* wrote the tutorial
* fixed up missing css files
* cleaned up a bunch
* added customizable key unsuppressing
* added create_font
* added structure reference
* fixed docs

#### v4.0.1
* This is the first version
* lots of stuff still broken
* ~~todo: examples~~
* ~~todo: tutorial~~
* ~~todo: cleanup~~
* ~~todo: website~~
* ~~todo: set/get_volume~~
* ~~todo: fix/remove freq from play_sample~~
* ~~todo: crunched version~~
* ~~todo: reference style~~
* ~~todo: remove vga.ttf~~
