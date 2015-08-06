# [jAllegro](http://jallegro.sos.gd/) tutorial
 
## Getting started
jAllegro aims to be the easiest HTML5 thing around, but that doesn't mean you can get away without a bunch of tools to help you out. Firstly, you are going to need a text editor. Fancy new text editors support syntax highlighting, so that your code will look much prettier. For Windows I suggest [Notepad++](https://notepad-plus-plus.org/) as it's free and does the job. I don't know about Mac, but if you use Linux, you probably don't need a text editor suggestion. You will also need a browser, but you probably have that already. Most browsers have built-in developer tools under F12 button. Press F12 now to see if it works! Personally, I recommend [Firefox](https://www.mozilla.org/en-US/firefox/desktop/) browser with [FireBug](http://getfirebug.com/) plugin for development.

### [Read on GitHub for cool syntax highlighting!](https://github.com/TheSos/jallegro/tree/master/tutorial)

## Setting up!
* Create an empty directory
* Download following files into the directory:
	-	[index.html](http://jallegro.sos.gd/tutorial/project/index.html) - this is the base website that will display out game
	-	[jallegro.js](http://jallegro.sos.gd/jallegro.js) - this is the jAllegro library
	-	[game.js](http://jallegro.sos.gd/tutorial/project/game.js) - this is our game code
	-	[style.css](http://jallegro.sos.gd/tutorial/project/style.css) - this is a style sheet to make it look good
* Double click `index.html` file to see if everything works correctly! If it does, you should see a 'Hello World' message.

## Making the magic happen
jAllegro draws stuff on a canvas, which is a html element like any other. Canvas is the white window that says 'Hello World!'. The yellowish box below that is our debug console. It is not needed for playing the games, but it helps a lot when making them. You can check if everything works correctly in real time thanks to that.

Now open `game.js` file in your editor. If you installed Notepad++, you can right-click it and select _Edit with Notepad++_ from the context menu.

```javascript
var x = 100,y = 100;

function draw()
{
	textout(canvas,font,"Hello World!",x,y,24,makecol(0,0,0));
}

function update()
{
	
}

function main()
{
	enable_debug('debug');
	allegro_init_all("game_canvas", 640, 480);
	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(255,255,255));
			update();
			draw();
		},BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();

 
```

* `main()` is the main game function, this is where our game starts. 
* First up, we call `enable_debug()` function to be able to see what happens during jAllegro initialisation. the _'debug'_ argument is the id property of a html <div> element that will be used for debugging. In our example 'debug' element is the yellow box below the game screen.
* `allegro_init_all()` initialises allegro and installs all of the subsystems, graphics, mouse, sounds, timers and keyboards. It takes the same arguments as `set_gfx_mode()`, which are a canvas element id, and pixel dimensions. In  our example, canvas is the white box above the debugging console.
* `ready()` takes function as an argument and executes it only after every image loaded with `load_bitmap()` has loaded and every sample loaded with `load_sample()` is ready to play. If you load a graphics file in jAllegro, you will not be able to use it or access its properties right away, as it needs to load first. when the `ready()` handler executes, everything that has been scheduled for download before calling `ready()` is already loaded and you can both use the assets and access their properties.
* `loop()` takes the main game loop function as an argument. There can be only one `loop()` and you can specify the refresh rate as well. In this example we are using 60 BPS as our loop interval. This equals to 60 frames per second. Thus, `clear_to_color()`, `draw()` and `update()` will all be called 60 times per second, but only after everything has been loaded.
* `return 0;` is completely unnecessary, but I wrote it automatically and it looks nice, so let it be there. In original Allegro, which used C, `main()` function was an actual default entry point of applications, that could accept command-line arguments and return error level. 0 stands for no error.
* `END_OF_MAIN();` macro sets up an event waiting for the entire website html code to load, to make sure that our functions can fish for canvas and debug elements/
* `var x = 100,y = 100;` are global variables. They will be accessible and consistent from every single function of our game code
* `draw()` function renders stuff on the screen. Currently it draws 'Hello World!' text at `x,y` coordinates at default game screen , represented by `canvas` variable, using default font, called `font`;
* `update()` function is for updating game logic. It is generally a good practice to keep those two separated, but the world will not explode if you mix things up!

### Adding an enemy

* Download [buzz.png](http://jallegro.sos.gd/tutorial/project/buzz.png) and put it in your folder.
* Add a variable to hold the bitmap object. Put `var buzz;` above `var x=100,y=100;` in the code;
* To load the image. put `buzz=load_bmp('buzz.png');` in `main()` function before `ready()`
* Comment out the `textout()` call from `draw()` by putting `//` in front of it.
* Add `draw_sprite(canvas,buzz,x-32,y-32);` call to `draw()` This one will render the fly centred at `x,y` coordinates.
* Now let's add some simple, random movement. Add the following two lines to `update()`:
```
	x += rand()%5-2;
	y += rand()%5-2;
```
	Each frame a random value from -2 to 2 inclusive will be added to both x and y coordinates of our fly.
* Save the file and refresh the website in browser to see the results. If something doesn't work, examine the debug console, or press F12 to enable browser's built-in developer console and examine the output for any errors.
* You should now have funny little fly flying around the screen.

### Killing the enemy
* Just below where you loaded the fly sprite, load another with this: `splat = load_bmp('splat.png');` and make sure you declare 'splat' variable the same way you declared 'buzz', or even, in one line, using 'var buzz,splat';
* Just below where you load 'splat' we will create an empty bitmap. Paste this: `deaths = create_bitmap(SCREEN_W,SCREEN_H);` and make sure to declare `deaths` as well. This is an empty bitmap that we will use to draw dead flies too, so that we don't have to redraw them every frame, since that would be slow after killing 1000 of them.
* In `draw()`, just before you draw the fly sprite, type this in: `draw_sprite(canvas,deaths,0,0);` This will draw our death map on screen before drawing the enemy, so that it doesn't get covered.
* Go to `update()` function and paste this:
```javascript
	if (mouse_pressed)
	{
		if (distance(x,y,mouse_x,mouse_y)<50)
		{
			rotate_sprite(deaths,splat,x,y,rand()%360);
			x = rand()%SCREEN_W;
			y = rand()%SCREEN_H;
		}
	}
```
* This way, when you press the mouse, the game will check if your mouse is close to the fly,. and if so, it will "kill" it by drawing a splatted fly image onto the background, and move the fly away, to new random coordinates, making it look as if a new one appeared. The splatted image will be drawn rotated to a random angle, so that splatted f,lies will look different from each other.
* Now save everything and see if it works. Click the fly to splat it!

### Weapon of mass splatting

* Now let's add a fly splatter to the mix. Download [weapon.png](http://jallegro.sos.gd/tutorial/project/weapon.png) and put it in your game project. Then add `weapon  = load_bmp('weapon.png');` to `main()` and declare `weapon` as a global variable, just like other bitmap objects.
* Since we don't need system mouse cursor any more, you can add `hide_mouse();` to `main()` after you load all the files.
* Let's render the splatter at mouse coordinates by adding `draw_sprite(canvas,weapon,mouse_x-16,mouse_y-16);` to `draw()`
* Now save and see if it works!

### Sounds of agony

* Now for some sounds. Download [hit.mp3](http://jallegro.sos.gd/tutorial/project/hit.mp3) and [miss.mp3](http://jallegro.sos.gd/tutorial/project/miss.mp3) and put them in your project folder
* Declare `var miss,hit;` on top of your code.
* Load the samples by putting `miss = load_sample("miss.mp3");` and `hit = load_sample("hit.mp3");` in `main()`
* Alter `update()` function to make it look like this:
```javascript
function update()
{
	x += rand()%5-2;
	y += rand()%5-2;
	if (mouse_pressed)
	{
		if (distance(x,y,mouse_x,mouse_y)<50)
		{
			rotate_sprite(deaths,splat,x,y,rand()%360);
			x = rand()%SCREEN_W;
			y = rand()%SCREEN_H;
			play_sample(hit);
		} else {
			play_sample(miss);
		}
	}
}
```
* Whenever we hit the bug, `hit.mp3` will play, otherwise, we'll get a lousy `miss.mp3`.
* Save everything and refresh the website to check out the sounds!

### Simple animation
* Download [weapon2.png](http://jallegro.sos.gd/tutorial/project/weapon2.png) into the project folder
* In `draw()` alter the splatter-rendering function to make it look like this `draw_sprite(canvas,(mouse_b ? weapon2 : weapon),mouse_x-16,mouse_y-16);` This inline contraption is called _ternary operator_ and it means that if mouse_b is not zero, `weapon2` will be rendered, otherwise it will be `weapon`. So if we hold down the mouse button, we get to see a different sprite.
* Declare `weapon2` on top of the code and add `weapon2  = load_bmp('weapon2.png');` to `main()`
* Save the file and enjoy!

### Finishing touches
* To make it look way better, let's add a background image. 
* Download [window.png](http://jallegro.sos.gd/tutorial/project/window.png) and put it in your project file.
* Look for a line that says `deaths = create_bitmap(SCREEN_W,SCREEN_H);` and replace it with `deaths = load_bmp("project/window.png");`
* Save and refresh, and voilà! Instead of an empty splat screen, we now have a window loaded by default to which we are blitting images of dead insect.

## Finished product
After you are done, your code should look like this:
```javascript
var buzz,splat,deaths,weapon,weapon2;
var miss,hit;
var x = 100,y = 100;

function draw()
{
	//textout(canvas,font,"Hello World!",x,y,24,makecol(0,0,0));
	draw_sprite(canvas,deaths,0,0);
	draw_sprite(canvas,buzz,x-32,y-32);
	draw_sprite(canvas,(mouse_b ? weapon2 : weapon),mouse_x-16,mouse_y-16);
}

function update()
{
	x += rand()%5-2;
	y += rand()%5-2;
	if (mouse_pressed)
	{
		if (distance(x,y,mouse_x,mouse_y)<50)
		{
			rotate_sprite(deaths,splat,x,y,rand()%360);
			x = rand()%SCREEN_W;
			y = rand()%SCREEN_H;
			play_sample(hit);
		} else {
			play_sample(miss);
		}
	}
}

function main()
{
	enable_debug('debug');
	allegro_init_all("game_canvas", 640, 480);
	buzz = load_bmp('buzz.png');
	splat = load_bmp('splat.png');
	weapon  = load_bmp('weapon.png');
	weapon2  = load_bmp('weapon2.png');
	miss = load_sample("miss.mp3");
	hit = load_sample("hit.mp3");
	deaths = load_bmp("window.png");
	hide_mouse();
	ready(function(){
		loop(function(){
			clear_to_color(canvas,makecol(255,255,255));
			update();
			draw();
		},BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();
```

## The game

### [Read on the website to play the ready game!](http://jallegro.sos.gd/tutorial)
