# jAllegro
## A lousy javascript port of a game programming library
---
[Website](http://jallegro.sos.gd/) | [GitHub](https://github.com/TheSos/jallegro) | [Reference manual](http://jallegro.sos.gd/docs) | [Examples](http://jallegro.sos.gd/examples) | [Download](http://jallegro.sos.gd/jallegro.js)
---
### Disclaimer
This is all WIP, watch out!

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

### Who is jAllegro for?

I hope for jAllegro to be a tool prefectly suitable for absolute beginners, who never had experience using game engines, such as I was when I started in Allegro, but it is also perfectly suitable for ewxperienced Javascript developers who are looking for a ligthweight solution, game jammers seeking for a RAD game making tool, developers looking for a non-OOP tool to create games and obviously, hard core old school classic Allegro nerds who somehow prevailed and want to coem back to usign it.

### Where can I learn jAllegro?

First up, read all of this README! Then, there are several placesd you can go to get documentation
* Study example files (ex*.js) to see how to use different functions of jAllegro
* Study the demo game (demo.js) and see hwo youc an make a fully fledged game with jAllegro.
* Check the neat and pretty jAllegro function reference.
* Check out the jAllegro tutorial.

### What can jAllegro do?

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

Since the underlying system is completely different for jAllegro (Allegro used C and a bit of asembly inside too), there are a bunch of thigns that doesn't make sense for jAllegro, but there are new things that make perfect sense here, while they didn't back in the days. As I will try to keep it as close to original as possible, not to break the feel, there are bound to be discrepancies, and I'kll list them right here!

* `set_gfx_mode` takes canvas id, and pixel dimensions as arguments.
* `rotate_sprite` draws the rotated sprite centered, as opposed to top-left alignment
* all of the color modes are gone, as js has uniform standardised color format
* software 3d functions are gone, but you can still use WebGL!
* helper math functions have been added
* `END_OF_FUNCTION()` and `LOCK_` macros are no longer necessary
* game loop must be wrapped in a `loop()` function, as js doesn't support blocking code
* assets are loadded asynchronously, thus `ready()` function wrapper lets you execute code ensurign everything has beel loaded already.
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
* `play_sample` no logner supports panning

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

### What are the jAllegro licence terms?

jAllegro licence is the same old Allegro 4 gift-ware licence!

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

#### v4.0.1
* This is the first version
* lots of stuff still broken
* todo: examples
* todo: tutorial
* todo: cleanup
* todo: website
* todo: set/get_volume
* todo: fix/remvoe freq from play_sample
* todo: crunched version
* todo: reference style
* todo: credit vga.ttf
