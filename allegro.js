/// \file allegro.js

////////////////////////////////////////////
/// @name CONFIGURATION ROUTINES
//@{

/// Installs allegro.
/// This function must be called before anything else. It makes sure Date.now() exists.
function install_allegro()
{
	if (!Date.now)
		Date.now = function now() { return new Date().getTime(); };
	log("Allegro installed!");
}

/// Wrapper for install_allegro.
function allegro_init()
{
	install_allegro();
}

/// Inits Allegro and installs all subsystems.
/// Calls install_allegro(), install_mouse(), install_timer(), install_keyboard(), install_sound() and set_gfx_mode() with provided parameters
/// @param id drawing canvas id
/// @param w screen width in pixels
/// @param h screen height in pixels
/// @param menu set this to true to enable context menu
function allegro_init_all(id,w,h,menu,enable_keys)
{
	install_allegro();
	set_gfx_mode(id,w,h);
	install_mouse(menu);
	install_keyboard(enable_keys);
	install_sound();
}

/// Macro to be placed after the end of main()
/// Calls main()
function END_OF_MAIN()
{
		window.addEventListener("load", main);
}

//@}
////////////////////////////////////////////
/// @name MOUSE ROUTINES
//@{

/// Mouse button bitmask.
/// Each bit in the mask represents a separate mouse button state. If right mouse button is down, mouse_b value would be 4, 00100 in binary. Each bit represents one mouse button. use something like if (mouse_b&1) to check for separate buttons.
/// * Button 0 is LMB. (mouse_b&1)
/// * Button 1 is MMB / wheel. (mouse_b&2)
/// * Button 2 is RMB. (mouse_b&4)
var mouse_b = 0;

/// Same as mouse_b but only checks if a button was pressed last frame
/// Note that this only works inside loop()
var mouse_pressed = 0;

/// Same as mouse_b but only checks if a button was released last frame
/// Note that this only works inside loop()
var mouse_released = 0;

/// Mouse X position within the canvas.
var mouse_x = -1;

/// Mouse Y position within the canvas
var mouse_y = -1;

/// Mouse wheel position.
/// This might not work consistently across all browsers!
var mouse_z = -1;

/// Mouse mickey, X position since last loop().
/// Only works inside loop()
var mouse_mx = 0;

/// Mouse mickey, Y position since last loop().
/// Only works inside loop()
var mouse_my = 0;

/// Mouse mickey, wheel position since last loop().
/// Only works inside loop()
var mouse_mz = 0;

/// Checks if mouse was installed
var _mouse_installed = false;

/// last mouse x position 
var _last_mouse_x = -1;

/// last mouse y position 
var _last_mouse_y = -1;

/// last mouse wheel position 
var _last_mouse_z = -1;

/// is context menu enabled?
var _menu = false;

/// Installs mouse handlers.
/// Must be called after set_gfx_mode() to be able to determine mouse position within the given canvas!
/// @param menu If true, context menu will be available on right click on canvas. Default is false.
function install_mouse(menu)
{
	if (!canvas)
	{
		_error("You must call set_gfx_mode before install_mouse");
		return -1;
	}
	if (_mouse_installed)
	{
		_allog("Mouse already installed");
		return -1;
	}
	canvas.canvas.addEventListener('mouseup',_mouseup);
	canvas.canvas.addEventListener('mousedown',_mousedown);
	canvas.canvas.addEventListener('mousemove',_mousemove);
	canvas.canvas.addEventListener('wheel',_mousewheel);
	if (menu) 
	{
		_menu_supress=true;
	} else {
		canvas.canvas.addEventListener('contextmenu',_mousemenu);
		_menu_supress=false;
	}
	_mouse_installed = true;
	log("Mouse installed!");
	return 0;
}

/// Removes mouse handlers.
function remove_mouse()
{
	if (!_mouse_installed)
	{
		_error("You must call install_mouse before remove_mouse");
		return -1;
	}
	canvas.canvas.removeEventListener('mouseup',_mouseup);
	canvas.canvas.removeEventListener('mousedown',_mousedown);
	canvas.canvas.removeEventListener('mousemove',_mousemove);
	canvas.canvas.removeEventListener('wheel',_mousewheel);
	if (_menu_supress) canvas.canvas.removeEventListener('contextmenu',_mousemenu);
	_mouse_installed = false;
	log("Mouse removed!");
	return 0;
}

/// Enables showing system mouse cursor over canvas
function show_mouse()
{
	if (!_mouse_installed)
	{
		_error("You must call install_mouse before show_mouse");
		return -1;
	}
	canvas.canvas.style.cursor = "auto";
	return 0;
}

/// Disables system mouse cursor over canvas.
/// Use this if you would like to provide your own cursor bitmap
function hide_mouse()
{
	if (!_mouse_installed)
	{
		_error("You must call install_mouse before hide_mouse");
		return -1;
	}
	canvas.canvas.style.cursor = "none";
	return 0;
}

/// Mouse context menu suppressor
function _mousemenu(e)
{
	e.preventDefault();
}

/// mouse up event handler
function _mouseup(e)
{
	mouse_b = mouse_b&~(1<<(e.which-1));
	mouse_released = mouse_released|(1<<(e.which-1));
	e.preventDefault();
}

/// mouse down event handler
function _mousedown(e)
{
	mouse_b = mouse_b|(1<<(e.which-1));
	mouse_pressed = mouse_pressed|(1<<(e.which-1));
	e.preventDefault();
}

/// mouse move event handler
function _mousemove(e)
{
	mouse_x = e.offsetX;
	mouse_y = e.offsetY;
	e.preventDefault();
}

/// mouse wheel event handler
function _mousewheel(e)
{
	mouse_z += e.deltaY;
	e.preventDefault();
}

//@}
////////////////////////////////////////////
/// @name TIMER ROUTINES
//@{

/// All downloadable objects
var _downloadables = [];

/// holds all currently installed timers
var _installed_timers = [];

/// looks up a timer by it's function on the list
function _timer_lookup(proc)
{
	for(var c=0;c<_installed_timers.length;c++)
	{
		if (_installed_timers[c].timer==proc) return _installed_timers[c];
	}
	return -1;
}

/// Converts seconds to install_int_ex interval units
/// @param secs number of seconds
/// @return value converted to milliseconds
function SECS_TO_TIMER(secs) {return secs*1000;}

/// Converts milliseconds to install_int_ex interval units
/// @param msec number of milliseconds
/// @return value converted to milliseconds
function MSEC_TO_TIMER(msec) {return msec;}

/// Converts beats-per-second to install_int_ex interval units
/// @param bps number of beats per second
/// @return value converted to milliseconds
function BPS_TO_TIMER(bps) {return 1000/bps;}

/// Converts beats-per-minute to install_int_ex interval units
/// @param bpm number of beats per minute
/// @return value converted to milliseconds
function BPM_TO_TIMER(bpm) {return 60*1000/bpm;}

/// Does nothing.
function install_timer()
{
	
}

/// Unix time stamp!
/// Returns number of milliseconds since 1970 started.
function time()
{
	return Date.now();
}

/// Installs interrupt function.
/// Installs a user timer handler, with the speed given as the number of milliseconds between ticks. This is the same thing as install_int_ex(proc, MSEC_TO_TIMER(speed)). Calling again this routine with the same timer handler as parameter allows you to adjust its speed.
/// @param procedure function to be called
/// @param speed execution interval in msec
function install_int(procedure,msec)
{
	return install_int_ex(procedure,MSEC_TO_TIMER(msec));
}

/// Installs interrupt function.
/// With this one, you must use helper functions to set the interval in the second argument. The lowest interval is 1 msec, but you probably don't want to go below 17 msec. Suggested values are BPS_TO_TIMER(30) or BPS_TO_TIMER(60). It cannot be used to alter previously installed interrupt function as well.
/// * SECS_TO_TIMER(secs) - seconds
/// * MSEC_TO_TIMER(msec) - milliseconds (1/1000th)
/// * BPS_TO_TIMER(bps) - beats per second
/// * BPM_TO_TIMER(bpm) - beats per minute
/// @param procedure function to be called
/// @param speed execution interval
function install_int_ex(procedure,speed)
{
	var timer_id = window.setInterval(procedure,speed);
	_installed_timers.push({timer:procedure,id:timer_id});
	log("Added insterrupt #" + timer_id + " at " + speed + "msec isntervals!");
}

/// registered loop procedure
var _loopproc;

/// Performs some loop tasks, such as cleaning up pressed[] and released[]
function _uberloop()
{
	if (_mouse_installed)
	{
		mouse_mx = mouse_x - _last_mouse_x;
		mouse_my = mouse_y - _last_mouse_y;
		mouse_mz = mouse_z - _last_mouse_z;	
	}
	_loopproc();
	if (_keyboard_installed)
	{
		for (var c=0;c<0x80;c++)
		{
			pressed[c] = false;
			released[c] = false;
		}
	}
	if (_mouse_installed)
	{
		mouse_pressed = 0;
		mouse_released = 0;
		mouse_mx = 0;
		mosue_my = 0;
		mouse_mz = 0;
		_last_mouse_x = mouse_x;
		_last_mouse_y = mouse_y;
		_last_mouse_z = mouse_z;
	}
}

/// Game loop interrupt
/// Loop is the same as interrupt, except, it cannot be stopped once it's started. It's meant for game loop. remove_int() and remove_all_ints() have no effect on this. Since JS can't have blocking (continuously executing) code and realise on events and timers, you cannot have your game loop inside a while or for argument. Instead, you should use this to create your game loop to be called at given interval. There should only be one loop() function! Note that mouse mickeys (mouse_mx, etc.), and pressed indicators (pressed[] and mouse_pressed) will only work inside loop()
/// @param procedure function to be looped, preferably inline, but let's not talk coding styles here
/// @param speed speed in the same format as install_int_ex()
function loop(procedure,speed)
{
	_loopproc = procedure;
	var timer_id = window.setInterval(_uberloop,speed);
	log("Game loop initialised!");
	//_installed_timers.push({timer:procedure,id:timer_id});
}

/// time when ready() was called
var _loader_init_time;

/// Holds the download complete handler function
var _ready_proc;

/// Holds the download complete handler function
var _bar_proc;

/// checks if everything has downloaded in intervals
function _progress_check()
{ 
	var num_assets = 0;
	var num_loaded = 0;
	for (var c=0;c<_downloadables.length;c++)
	{
		num_assets++;
		if (_downloadables[c].type=="snd")
		{
				if (_downloadables[c].element.readyState>=_downloadables[c].element.HAVE_FUTURE_DATA) _downloadables[c].ready=true;			
		} 
		if (_downloadables[c].ready) num_loaded++;
	}
	if (_bar_proc) _bar_proc(num_assets/num_loaded);
	if (num_loaded<num_assets)
	{
		window.setTimeout(_progress_check,100);
	}
	else 
	{
		log("Loading complete! Took " + ((time()-_loader_init_time)/1000).toFixed(1) + " seconds!");
		_ready_proc();
	}
}

/// Default loading bar rendering
/// This function is used by ready() to display a simple loading bar on screen. You need to manually specify a dummy function if you don't want loading screen.
/// @param progress loading progress in 0.0 - 1.0 range
function loading_bar(progress)
{
	rectfill(canvas,5,SCREEN_H-55,SCREEN_W-10,50,makecol(0,0,0));
	rectfill(canvas,10,SCREEN_H-50,SCREEN_W-20,40,makecol(255,255,255));
	rectfill(canvas,15,SCREEN_H-45,SCREEN_W-30,30,makecol(0,0,0));
	rectfill(canvas,20,SCREEN_H-40,scaleclamp(progress,0,1,0,(SCREEN_W-40)),20,makecol(255,255,255));
}

/// Installs a handler to check if everything has downloaded. 
/// You should always wrap your loop() function around it, unless there is nothing external you need. load_bitmap() and load_sample() all require some time to process and the execution cannot be stalled for that, so all code you wrap in this hander will only get executed after everything has loaded making sure you can access bitmap properties and data and play samples right away.  Note that load_font() does not affect ready(), so you should always load your fonts first.
/// @param procedure function to be called when everything has loaded.
/// @param bar loading bar callback function, if omitted, equals to loading_bar() and renders a simple loading bar. it must accept one parameter, that is loading progress in 0.0-1.0 range.
function ready(procedure,bar)
{
	_loader_init_time = time();
	_ready_proc = procedure;
	log("Loader initialised!");
	if (bar) _bar_proc = bar; else _bar_proc = loading_bar;
	window.setTimeout(_progress_check,100);
}

/// Removes interrupt
/// @param procedure interrupt procedure to be removed
function remove_int(procedure)
{
	for(var c=0;c<_installed_timers.length;c++)
	{
		if (_installed_timers[c].timer == _installed_timers)
		{
			log("Removing interrupt " + _installed_timers[c].id + "!");
			window.clearInterval(_installed_timers[c].id);
			_installed_timers.splice(c,1);
			return;
		}
	}
}

/// Removes all interrupts
function remove_all_ints()
{
	for(var c=0;c<_installed_timers.length;c++)
	{
			window.clearInterval(_installed_timers[c].id);
	}
	_installed_timers = [];
	log("Removed all interrupts!");
}

//@}
////////////////////////////////////////////
/// @name KEYBOARD ROUTINES
//@{

var KEY_A = 0x41, KEY_B = 0x42, KEY_C = 0x43, KEY_D = 0x44, KEY_E = 0x45, KEY_F = 0x46, KEY_G = 0x47, KEY_H = 0x48, KEY_I = 0x49, KEY_J = 0x4A, KEY_K = 0x4B, KEY_L = 0x4C, KEY_M = 0x4D, KEY_N = 0x4E, KEY_O = 0x4F, KEY_P = 0x50, KEY_Q = 0x51, KEY_R = 0x52, KEY_S = 0x53, KEY_T = 0x54, KEY_U = 0x55, KEY_V = 0x56, KEY_W = 0x57, KEY_X = 0x58, KEY_Y = 0x59, KEY_Z = 0x5A, KEY_0 = 0x30, KEY_1 = 0x31, KEY_2 = 0x32, KEY_3 = 0x33, KEY_4 = 0x34, KEY_5 = 0x35, KEY_6 = 0x36, KEY_7 = 0x37, KEY_8 = 0x38, KEY_9 = 0x39, KEY_0_PAD = 0x60, KEY_1_PAD = 0x61, KEY_2_PAD = 0x62, KEY_3_PAD = 0x63, KEY_4_PAD = 0x64, KEY_5_PAD = 0x65, KEY_6_PAD = 0x66, KEY_7_PAD = 0x67, KEY_8_PAD = 0x68, KEY_9_PAD = 0x69, KEY_F1 = 0x70, KEY_F2 = 0x71, KEY_F3 = 0x72, KEY_F4 = 0x73, KEY_F5 = 0x74, KEY_F6 = 0x75, KEY_F7 = 0x76, KEY_F8 = 0x77, KEY_F9 = 0x78, KEY_F10 = 0x79, KEY_F11 = 0x7a, KEY_F12 = 0x7b, KEY_ESC = 0x1B, KEY_TILDE = 0xc0, KEY_MINUS = 0xbd, KEY_EQUALS = 0xbb, KEY_BACKSPACE = 0x08, KEY_TAB = 0x09, KEY_OPENBRACE = 0xdb, KEY_CLOSEBRACE = 0xdd, KEY_ENTER = 0x0D, KEY_COLON = 0xba, KEY_QUOTE = 0xde, KEY_BACKSLASH = 0xdc, KEY_COMMA = 0xbc, KEY_STOP = 0xbe, KEY_SLASH = 0xBF, KEY_SPACE = 0x20, KEY_INSERT = 0x2D, KEY_DEL = 0x2E, KEY_HOME = 0x24, KEY_END = 0x23, KEY_PGUP = 0x21, KEY_PGDN = 0x22, KEY_LEFT = 0x25, KEY_RIGHT = 0x27, KEY_UP = 0x26, KEY_DOWN = 0x28, KEY_SLASH_PAD = 0x6F, KEY_ASTERISK = 0x6A, KEY_MINUS_PAD = 0x6D, KEY_PLUS_PAD = 0x6B, KEY_ENTER_PAD = 0x0D, KEY_PRTSCR = 0x2C, KEY_PAUSE = 0x13, KEY_EQUALS_PAD = 0x0C, KEY_LSHIFT = 0x10, KEY_RSHIFT = 0x10, KEY_LCONTROL = 0x11, KEY_RCONTROL = 0x11, KEY_ALT = 0x12, KEY_ALTGR = 0x12, KEY_LWIN = 0x5b, KEY_RWIN = 0x5c, KEY_MENU = 0x5d, KEY_SCRLOCK = 0x9d, KEY_NUMLOCK = 0x90, KEY_CAPSLOCK = 0x14;

/// Array of flags indicating state of each key. 
/// Available keyboard scan codes are as follows:
/// *     KEY_A ... KEY_Z,
/// *     KEY_0 ... KEY_9,
/// *     KEY_0_PAD ... KEY_9_PAD,
/// *     KEY_F1 ... KEY_F12,
/// *     KEY_ESC, KEY_TILDE, KEY_MINUS, KEY_EQUALS, KEY_BACKSPACE, KEY_TAB, KEY_OPENBRACE, KEY_CLOSEBRACE, KEY_ENTER, KEY_COLON, KEY_QUOTE, KEY_BACKSLASH, KEY_COMMA, KEY_STOP, KEY_SLASH, KEY_SPACE,
/// *     KEY_INSERT, KEY_DEL, KEY_HOME, KEY_END, KEY_PGUP, KEY_PGDN, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN,
/// *     KEY_SLASH_PAD, KEY_ASTERISK, KEY_MINUS_PAD, KEY_PLUS_PAD, KEY_DEL_PAD, KEY_ENTER_PAD,
/// *     KEY_PRTSCR, KEY_PAUSE,
/// *     KEY_LSHIFT, KEY_RSHIFT, KEY_LCONTROL, KEY_RCONTROL, KEY_ALT, KEY_ALTGR, KEY_LWIN, KEY_RWIN, KEY_MENU, KEY_SCRLOCK, KEY_NUMLOCK, KEY_CAPSLOCK
/// *     KEY_EQUALS_PAD, KEY_BACKQUOTE, KEY_SEMICOLON, KEY_COMMAND
var key = [];

/// Array of flags indicating in a key was just pressed since last loop()
/// Note that this will only work inside loop()
var pressed = [];

/// Array of flags indicating in a key was just released since last loop()
/// Note that this will only work inside loop()
var released = [];

/// Is keyboard even installed
var _keyboard_installed = false;

/// default keys to not suppress
var _default_enabled_keys = [KEY_F1,KEY_F2,KEY_F3,KEY_F4,KEY_F5,KEY_F6,KEY_F7,KEY_F8,KEY_F9,KEY_F10,KEY_F11,KEY_F12];


/// array of prevent default avoiders
var _enabled_keys = [];


/// Installs keyboard handlers
/// Unlike mouse, keyboard can be installed before initialising graphics, and the handlers will function over the entire website, as opposed to canvas only. After this call, the key[] array can be used to check state of each key. All keys will have their default action disabled, unless specified in the enable_keys array. This means that i.e. backspace won't go back, arrows won't scroll. By default, function keys  (KEY_F1..KEY_F12) are the only ones not suppressed
/// @param enable_keys array of keys that are not going to have their default action prevented, i.e. [KEY_F5] will enable reloading the website. By default, if this is omitted, function keys are the only ones on the list.
function install_keyboard(enable_keys)
{
	if (_keyboard_installed)
	{
		_allog("Keyboard already installed");
		return -1;
	}
	if (enable_keys)
	{
		_enabled_keys = enable_keys;
	} else {
		_enabled_keys = _default_enabled_keys;
	}
	for (var c=0;c<0x80;c++) 
	{
		key[c] = false;
		pressed[c] = false;
		released[c] = false;
	}
	document.addEventListener('keyup',_keyup);
	document.addEventListener('keydown',_keydown);
	_keyboard_installed = true;
	log("Keyboard installed!");
	return 0;
}

/// Uninstalls keyboard
function remove_keyboard()
{
	if (!_keyboard_installed)
	{
		_allog("Keyboard not installed");
		return -1;
	}
	document.removeEventListener('keyup',_keyup);
	document.removeEventListener('keydown',_keydown);
	_keyboard_installed = false;
	log("Keyboard removed!");
	return 0;
}

/// key down event handler
function _keydown(e)
{
	if (!key[e.keyCode]) pressed[e.keyCode] = true;
	key[e.keyCode] = true;
	if (_enabled_keys.indexOf(e.keyCode)==-1) e.preventDefault();
}

/// key up event handler
function _keyup(e)
{
	key[e.keyCode] = false;
	released[e.keyCode] = true;
	if (_enabled_keys.indexOf(e.keyCode)==-1) e.preventDefault();
}

//@}
////////////////////////////////////////////
// JOYSTICK ROUTINES

////////////////////////////////////////////
// SENSOR ROUTINES

////////////////////////////////////////////
// TOUCH ROUTINES

////////////////////////////////////////////
/// @name BITMAP OBJECTS
//@{

/// Bitmap object, This is not a function.
/// This is not a function, it's the structure of bitmap object returned from load_bitmap() and create_bitmap(). For every bitmap laoded or created, a canvas element is created. Loaded images are then drawn onto the canvas, so that you can easily manipulate images and everything is consistent. You can also load a single file two times and modify it differently for each instance.
/// @param w bitmap width
/// @param h bitmap height
/// @param canvas underlying canvas element, used to draw the bitmap onto stuff
/// @param context canvas' rendering context, used to draw stuff onto this bitmap
/// @param ready flags whether loading of the bitmap is complete
/// @param type object type, "bmp" in this case
function BITMAP_OBJECT(w,h,canvas,context,ready,type) {}

/// Creates empty bitmap.
/// Creates a bitmap object of given dimensions and returns it.
/// @param width bitmap width
/// @param height bitmap height
/// @return bitmap object
function create_bitmap(width,height)
{
	log("Creating bitmap at " + width + " x " + height + "!");
	var cv = document.createElement('canvas');
	cv.width = width;
	cv.height = height;
	var ctx = cv.getContext("2d");
	return {w:width,h:height,canvas:cv,context:ctx,ready:true,type:"bmp"};
}

/// Loads bitmap from file
/// Loads image from file asynchronously. This means that the execution won't stall for the image, and it's data won't be accessible right off the start. You can check for bitmap object's 'ready' member to see if it has loaded, but you probably should avoid stalling execution for that, as JS doesn't really like that.
/// @param filename URL of image
/// @return bitmap object, or -1 on error
function load_bitmap(filename)
{
	log("Loading bitmap " + filename + "...");
	var img = new Image();
	img.src = filename;
	var now = time();
	var cv = document.createElement('canvas');
	var ctx = cv.getContext("2d");
	var bmp = {canvas:cv,context:ctx,w:-1,h:-1,ready:false,type:"bmp"};
	_downloadables.push(bmp);
	img.onload = function(){
		log("Bitmap " + filename + " loaded, size: " + img.width + " x " + img.height + "!");
		bmp.canvas.width = img.width;
		bmp.canvas.height = img.height;
		bmp.context.drawImage(img,0,0);
		bmp.w = img.width;
		bmp.h = img.height;
		bmp.ready=true;
	};
	return bmp;
}

/// Wrapper for load_bitmap
function load_bmp(filename)
{
	return load_bitmap(filename);
}

//@}
////////////////////////////////////////////
/// @name GRAPHICS MODES
//@{

/// Screen bitmap
/// This is the bitmap object representing the main drawing canvas. Drawing anything on the screen bitmap displays it.
var canvas;

var _gfx_installed = false;

/// Screen bitmap width in pixels
var SCREEN_W = 0;

/// Screen bitmap height in pixels
var SCREEN_H = 0;

/// default font
var font;

/// Enables graphics.
/// This function should be before calling any other graphics routines. It selects the canvas element for rendering and sets the resolution. It also loads the default font.
/// @param canvas_id id attribute of canvas to be used for drawing.
/// @param width canvas width in pixels
/// @param height canvas height in pixels
/// @return 0 on success or -1 on error
function set_gfx_mode(canvas_id,width,height)
{
	var cv = document.getElementById(canvas_id);
	if (!cv)
	{
		_error("Can't find canvas with id " + canvas_id);
		return -1;
	}
	cv.width = width;
	cv.height = height;
	var ctx = cv.getContext("2d");
	SCREEN_W = width;
	SCREEN_H = height;
	canvas = {w:width,h:height,canvas:cv,context:ctx,ready:true};
	font = load_base64_font(_cartoon_woff);
	_gfx_installed = true;
	
	return 0;
}

//@}
////////////////////////////////////////////
/// @name DRAWING PRIMITIVES
// @{

/// Pi
var PI = 3.14159265;

/// Pi * 2
var PI2 = 2*3.14159265;

/// Pi / 2
var PI_2 = 3.14159265/2;

/// Pi / 3
var PI_3 = 3.14159265/3;

/// Pi / 4
var PI_4 = 3.14159265/4;

/// Converts degrees to radians. 
/// Also, changes clockwise to anticlockwise.
/// @param d value in degrees to be converted
/// @return -d*PI/180.0f
function RAD(d) { return -d*PI/180.0;}

/// Converts radians to degrees. 
/// Also, changes anticlockwise to clockwise.
/// @param r value in radians to be converted
/// @return -r*180.0f/PI
function DEG(r) { return -r*180.0/PI;}

/// Helper for setting fill style
function _fillstyle(bitmap,colour)
{
	bitmap.context.fillStyle = 'rgba('+ getr(colour) + ',' + getg(colour) + ',' + getb(colour) + ',' + getaf(colour) + ')';
}

/// Helper for setting stroke style
function _strokestyle(bitmap,colour,width)
{
	if (!width) width=1;
	bitmap.context.lineWidth = width;
	bitmap.context.strokeStyle = 'rgba('+ getr(colour) + ',' + getg(colour) + ',' + getb(colour) + ',' + getaf(colour) + ')';
}

/// Creates a 0xAARRGGBB from values
/// Overdrive is not permitted, so values over 255 (0xff) will get clipped.
/// @param r red component in 0-255 range
/// @param g green component in 0-255 range
/// @param b blue  component in 0-255 range
/// @param a alpha component in 0-255 range, defaults to 255 (fully opaque)
/// @return colour in 0xAARRGGBB format
function makecol(r,g,b,a)
{
	a = typeof a !== 'undefined' ?  a : 255;
	return (a<<24)|((r&0xff)<<16)|((g&0xff)<<8)|((b&0xff));
}

/// Creates 0xAARRGGBB from values
/// This is a float version of makecol, where all components should be in 0.0-1.0 range.
/// @param r red component in 0.0-1.0 range
/// @param g green component in 0.0-1.0 range
/// @param b blue  component in 0.0-1.0 range
/// @param a alpha component in 0.0-1.0 range, defaults to 1.0 (fully opaque)
/// @return colour in 0xAARRGGBB format
function makecolf(r,g,b,a)
{
	a = typeof a !== 'undefined' ?  a : 1.0;
	return makecol(r*255,g*255,b*255,a*255);
}

/// Gets red bits from 0xRRGGBB
/// This one does clip.
/// @param colour colour in 0xAARRGGBB format
/// @return red component in 0-255 range
function getr(colour)
{
	return (colour>>16)&0xff;
}

/// Gets red bits from 0xRRGGBB
/// This one too.
/// @param colour colour in 0xAARRGGBB format
/// @return green component in 0-255 range
function getg(colour)
{
	return (colour>>8)&0xff;
}

/// Gets red bits from 0xRRGGBB
/// This one clips as well.
/// @param colour colour in 0xAARRGGBB format
/// @return blue component in 0-255 range
function getb(colour)
{
	return colour&0xff;
}

/// Gets alpha bits from 0xAARRGGBB
/// This one doesn't.
/// @param colour colour in 0xAARRGGBB format
/// @return alpha component in 0-255 range
function geta(colour)
{
	return colour>>>24;
}

/// Float (0.0-1.0) version of getr()
/// @param colour colour in 0xAARRGGBB format
/// @return red component in 0.0-1.0 range
function getrf(colour)
{
	return (colour>>16)&0xff/255.0;
}

/// Float (0.0-1.0) version of getg()
/// @param colour colour in 0xAARRGGBB format
/// @return green component in 0.0-1.0 range
function getgf(colour)
{
	return (colour>>8)&0xff/255.0;
}

/// Float (0.0-1.0) version of getb()
/// @param colour colour in 0xAARRGGBB format
/// @return blue component in 0.0-1.0 range
function getbf(colour)
{
	return colour&0xff/255.0;
}

/// Float (0.0-1.0) version of geta()
/// @param colour colour in 0xAARRGGBB format
/// @return alpha component in 0.0-1.0 range
function getaf(colour)
{
	return (colour>>>24)/255.0;
}

/// Gets pixel colour from bitmap
/// Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
/// @param bitmap bitmap object to poll
/// @param x x coordinate of pixel
/// @param y y coordinate of pixel
/// @return colour in 0xAARRGGBB format
function getpixel(bitmap,x,y)
{
	var data = bitmap.context.getImageData(x,y,1,1).data;
	return (data[3]<<24)|((data[0]&0xff)<<16)|((data[1]&0xff)<<8)|((data[2]&0xff));
}

/// Gets pixel colour from bitmap
/// Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
/// @param bitmap bitmap object to update
/// @param x x coordinate of pixel
/// @param y y coordinate of pixel
/// @param colour colour in 0xAARRGGBB format
function putpixel(bitmap,x,y,colour)
{
	_fillstyle(bitmap,colour);
	bitmap.context.fillRect(x,y,1,1);
}

/// Clears bitmap to transparent black.
/// Fills the entire bitmap with 0 value, which represents transparent black.
/// @param bitmap bitmap to be cleared
function clear_bitmap(bitmap)
{
	bitmap.context.clearRect(0,0,bitmap.w, bitmap.h);
}

/// Clears bitmap to specified colour.
/// Fills the entire bitmap with colour value.
/// @param bitmap bitmap to be cleared
/// @param colour colour in 0xAARRGGBB format
function clear_to_color(bitmap,colour)
{
	bitmap.context.clearRect(0,0,bitmap.w, bitmap.h);
	_fillstyle(bitmap,colour);
	bitmap.context.fillRect(0,0,bitmap.w,bitmap.h);
}

/// Draws a line.
/// Draws a line from one point to another using given colour.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param x2,y2 end point coordinates
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
function line(bitmap,x1,y1,x2,y2,colour,width)
{
	_strokestyle(bitmap,colour,width);
	bitmap.context.beginPath();
	bitmap.context.moveTo(x1,y1);
	bitmap.context.lineTo(x2,y2);
	bitmap.context.stroke();
}

/// Draws a vertical line.
/// Draws a vertical line from one point to another using given colour. Probably slightly faster than line() method, since this one uses rectfill() to draw the line.
/// @param bitmap to be drawn to
/// @param x column to draw the line to
/// @param y1,y2 line endpoints
/// @param colour colour in 0xAARRGGBB format
/// @param width line width (defaults to 1)
function vline(bitmap,x,y1,y2,colour,width)
{
	width = typeof width !== 'undefined' ?  width : 1;
	_fillstyle(bitmap,colour);
	bitmap.context.fillRect(x-width/2,y1,width,y2-y1);
}

/// Draws a horizontal line.
/// Draws a horizontal line from one point to another using given colour. Probably slightly faster than line() method, since this one uses rectfill() to draw the line.
/// @param bitmap to be drawn to
/// @param y row to draw the line to
/// @param x1,x2 line endpoints
/// @param colour colour in 0xAARRGGBB format
/// @param width line width (defaults to 1)
function hline(bitmap,x1,y,x2,colour,width)
{
	width = typeof width !== 'undefined' ?  width : 1;
	_fillstyle(bitmap,colour);
	bitmap.context.fillRect(x1,y-width/2,x2-x1,width);
}

/// Draws a triangle.
/// Draws a triangle using three coordinates. The triangle is not filled.
/// @param bitmap to be drawn to
/// @param x1,y1 first point coordinates
/// @param x2,y2 second point coordinates
/// @param x3,y3 third point coordinates
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
function triangle(bitmap,x1,y1,x2,y2,x3,y3,colour,width)
{
	_strokestyle(bitmap,colour,width);
	bitmap.context.beginPath();
	bitmap.context.moveTo(x1,y1);
	bitmap.context.lineTo(x2,y2);
	bitmap.context.lineTo(x3,y3);
	bitmap.context.closePath();
	bitmap.context.stroke();
}

/// Draws a triangle.
/// Draws a triangle using three coordinates. The triangle is filled.
/// @param bitmap to be drawn to
/// @param x1,y1 first point coordinates
/// @param x2,y2 second point coordinates
/// @param x3,y3 third point coordinates
/// @param colour colour in 0xAARRGGBB format
function trianglefill(bitmap,x1,y1,x2,y2,x3,y3,colour)
{
	_fillstyle(bitmap,colour);
	bitmap.context.beginPath();
	bitmap.context.moveTo(x1,y1);
	bitmap.context.lineTo(x2,y2);
	bitmap.context.lineTo(x3,y3);
	bitmap.context.closePath();
	bitmap.context.fill();
}

/// Draws a polygon.
/// Draws a polygon using three coordinates. The polygon is not filled.
/// @param bitmap to be drawn to
/// @param vertices number of vertices to draw
/// @param points array containing vertices*2 elements of polygon coordinates in [x1,y1,x2,y2,x3...] format
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
function polygon(bitmap,vertices,points,colour,width)
{
	_strokestyle(bitmap,colour,width);
	bitmap.context.beginPath();
	for (var c=0;c<vertices;c++)
	{
		if (c) bitmap.context.lineTo(points[c*2],points[c*2+1]);
		else bitmap.context.moveTo(points[c*2],points[c*2+1]);
	}
	bitmap.context.closePath();
  bitmap.context.stroke();
}

/// Draws a polygon.
/// Draws a polygon using three coordinates. The polygon is filled.
/// @param bitmap to be drawn to
/// @param vertices number of vertices to draw
/// @param points array containing vertices*2 elements of polygon coordinates in [x1,y1,x2,y2,x3...] format
/// @param colour colour in 0xAARRGGBB format
function polygonfill(bitmap,vertices,points,colour)
{
	_fillstyle(bitmap,colour);
	bitmap.context.beginPath();
	for (var c=0;c<vertices;c++)
	{
		if (c) bitmap.context.lineTo(points[c*2],points[c*2+1]);
		else bitmap.context.moveTo(points[c*2],points[c*2+1]);
	}
	bitmap.context.closePath();
  bitmap.context.fill();
}

/// Draws a rectangle.
/// Draws a rectangle from one point to another using given colour. The rectangle is not filled. Opposed to traditional allegro approach, width and height have to be provided, not an end point.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param w,h width and height
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
function rect(bitmap,x1,y1,w,h,colour,width)
{
	_strokestyle(bitmap,colour,width);
	bitmap.context.strokeRect(x1,y1,w,h);
}

/// Draws a rectangle.
/// Draws a rectangle from one point to another using given colour. The rectangle is filled. Opposed to traditional allegro approach, width and height have to be provided, not an end point.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param w,h width and height
/// @param colour colour in 0xAARRGGBB format
function rectfill(bitmap,x1,y1,w,h,colour)
{
	_fillstyle(bitmap,colour);
	bitmap.context.fillRect(x1,y1,w,h);
}

/// Draws a circle.
/// Draws a circle at specified centre point and radius. The circle is not filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param r circle radius
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
function circle(bitmap,x,y,radius,colour,width)
{
	_strokestyle(bitmap,colour,width);
	bitmap.context.beginPath();
	bitmap.context.arc(x,y,radius,0,PI2);
	bitmap.context.stroke();
}

/// Draws a circle.
/// Draws a circle at specified centre point and radius. The circle is filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param r circle radius
/// @param colour colour in 0xAARRGGBB format
function circlefill(bitmap,x,y,radius,colour)
{
	_fillstyle(bitmap,colour);
	bitmap.context.beginPath();
	bitmap.context.arc(x,y,radius,0,PI2);
	bitmap.context.fill();
}

/// Draws a arc.
/// Draws a circle at specified centre point and radius. The arc is not filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param ang1,ang2 angles to draw the arc between measured anticlockwise from the positive x axis in degrees
/// @param r radius
/// @param colour colour in 0xAARRGGBB format
/// @param width line width
function arc(bitmap,x,y,ang1,ang2,r,colour,width)
{
	_strokestyle(bitmap,colour,width);
	bitmap.context.beginPath();
	if (ang1>ang2)
	{
		bitmap.context.arc(x,y,r,RAD(ang1),RAD(ang2));
	} else {
		bitmap.context.arc(x,y,r,RAD(ang1),RAD(ang2));
	}
	bitmap.context.stroke();
}

/// Draws a arc.
/// Draws a circle at specified centre point and radius. The arc is filled
/// @param bitmap to be drawn to
/// @param x,y centre point coordinates
/// @param ang1,ang2 angles to draw the arc between measured anticlockwise from the positive x axis in degrees
/// @param r radius
/// @param colour colour in 0xAARRGGBB format
function arcfill(bitmap,x,y,ang1,ang2,r,colour)
{
	_fillstyle(bitmap,colour);
	bitmap.context.beginPath();
	if (ang1>ang2)
	{
		bitmap.context.arc(x,y,r,RAD(ang1),RAD(ang2));
	} else {
		bitmap.context.arc(x,y,r,RAD(ang1),RAD(ang2));
	}
	bitmap.context.fill();
}

//@}
////////////////////////////////////////////
/// @name BLITTING AND SPRITES
//@{

/// Draws a sprite
/// This is probably the fastest method to get images on screen. The image will be centered. Opposed to traditional allegro approach, sprite is drawn centered.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the top left corder of the image center
function draw_sprite(bmp,sprite,x,y)
{
	bmp.context.drawImage(sprite.canvas,x-sprite.w/2,y-sprite.h/2);
}

/// Draws a stretched sprite
/// Draws a sprite stretching it to given width and height. The sprite will be centered. You can omit sy value for uniform scaling. YOu can use negative scale for flipping. Scaling is around the center.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the top left corder of the image
/// @param sx horizontal scale , 1.0 is unscaled
/// @param sy vertical scale (defaults to sx)
function scaled_sprite(bmp,sprite,x,y,sx,sy)
{
	sy = typeof sy !== 'undefined' ?  sy : sx;
	var u = sx*sprite.w/2;
	var v = sy*sprite.h/2;
	bmp.context.save();
	bmp.context.translate(x-u,y-v);
	bmp.context.scale(sx,sy);
	bmp.context.drawImage(sprite.canvas,0,0);
	bmp.context.restore(); 
}

/// Draws a rotated sprite
/// Draws a sprite rotating it around its centre point. The sprite will be centred and rotated around its centre.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the centre of the image
/// @param angle angle of rotation in degrees
function rotate_sprite(bmp,sprite,x,y,angle)
{
	var u = sprite.w/2;
	var v = sprite.h/2;
	bmp.context.save();
	bmp.context.translate(x,y);
	bmp.context.rotate(RAD(angle));
	bmp.context.translate(-u,-v);
	bmp.context.drawImage(sprite.canvas,0,0);
	bmp.context.restore();
}

/// Draws a sprite rotated around an arbitrary point
/// Draws a sprite rotating it around a given point. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y target coordinates of the pivot point
/// @param cx,cy pivot point coordinates
/// @param angle angle of rotation in degrees
function pivot_sprite(bmp,sprite,x,y,cx,cy,angle)
{
	bmp.context.save();
	bmp.context.translate(x,y);
	bmp.context.rotate(RAD(angle));
	bmp.context.translate(-cx,-cy);
	bmp.context.drawImage(sprite.canvas,0,0);
	bmp.context.restore();
}

/// Draws a rotated sprite and scales it
/// Draws a sprite rotating it around its centre point. The sprite is also scaled. You can omit sy value for uniform scaling. YOu can use negative scale for flipping. Scaling is around the center. The sprite will be centred and rotated around its centre.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the centre of the image
/// @param angle angle of rotation in degrees
/// @param sx horizontal scale, 1.0 is unscaled
/// @param sy vertical scale (defaults to sx)
function rotate_scaled_sprite(bmp,sprite,x,y,angle,sx,sy)
{
	sy = typeof sy !== 'undefined' ?  sy : sx;
	var u = sx*sprite.w/2;
	var v = sy*sprite.h/2;
	bmp.context.save();
	bmp.context.translate(x,y);
	bmp.context.rotate(RAD(angle));
	bmp.context.translate(-u,-v);
	bmp.context.scale(sx,sy);
	bmp.context.drawImage(sprite.canvas,0,0);
	bmp.context.restore(); 
}

/// Draws a sprite rotated around an arbitrary point and scaled
/// Draws a sprite rotating it around a given point. The sprite is also scaled. Sprite is drawn centered to the pivot point. The pivot point is relative to top-left corner of the image  before scaling. You can omit sy value for uniform scaling. You can use negative scale for flipping.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y target coordinates of the pivot point
/// @param cx,cy pivot point coordinates
/// @param angle angle of rotation in degrees
/// @param sx horizontal scale , 1.0 is unscaled
/// @param sy vertical scale (defaults to sx)
function pivot_scaled_sprite(bmp,sprite,x,y,cx,cy,angle,sx,sy)
{
	sy = typeof sy !== 'undefined' ?  sy : sx;
	var u = sx*cx;
	var v = sy*cy;
	bmp.context.save(); 
	bmp.context.translate(x,y);
	bmp.context.rotate(RAD(angle));
	bmp.context.translate(-u,-v);
	bmp.context.scale(sx,sy);
	bmp.context.drawImage(sprite.canvas,0,0);
	bmp.context.restore(); 
}

/// Blit
/// This is how you draw backgrounds and stuff. masked_ versions are omitted, since everything is 32-bit RGBA anyways. The source and dest parameters are swapped compared to draw_sprite for historical, 20 year old reasons that must stay the same no matter what.
/// @param source source bitmap
/// @param dest destination bitmap
/// @param sx,sy source origin
/// @param dx,dy top-left bitmap corner coordinates in target bitmap
/// @param w,h blit size
/// @todo make rotated versions of this
/// @todo tell everyone that blitting to itself is slower than the other thing (requires copy?)
function blit(source,dest,sx,sy,dx,dy,w,h)
{
	 dest.context.drawImage(source.canvas,sx,sy,w,h,dx,dy,w,h);
}

/// Simple Blit
/// Simplified version of blit, works pretty much like draw_sprite but draws from the corner
/// @param source source bitmap
/// @param dest destination bitmap
/// @param x,y top-left bitmap corner coordinates in target bitmap
/// @todo make rotated versions of this
/// @todo tell everyone that blitting to itself is slower than the other thing (requires copy?)
function simple_blit(source,dest,x,y)
{
	 dest.context.drawImage(source.canvas,x,y);
}

/// Scaled blit
/// Draws a scaled chunk of an image on a bitmap. It's not slower.
/// @param source source bitmap
/// @param dest destination bitmap
/// @param sx,sy source origin
/// @param sw,sh source dimensions
/// @param dx,dy top-left bitmap corner coordinates in target bitmap
/// @param dw,dh destination dimensions
function stretch_blit(source,dest,sx,sy,sw,sh,dx,dy,dw,dh)
{
	dest.context.drawImage(source.canvas,sx,sy,sw,sh,dx,dy,dw,dh);
}

//@}
////////////////////////////////////////////
/// @name TEXT OUTPUT
//@{

var _cartoon_woff="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";

var _num_fonts = 0;

/// Font object, this is not a function.
/// This is not a function but a reference entry for font object returned by load_font() and create_cont(). 
/// @param element <style> element containing the font-face declaration. Not available for create_font() fonts and default font object.
/// @param file font file name, empty string for default font and create_font() typefaces.
/// @param name font-family name
/// @param type object type, "fnt" in this case
function FONT_OBJECT(element,file,name,type) {}

/// Loads font from file.
/// This actually creates a style element, puts code inside and appends it to class. I heard it works all the time most of the time. AS ready() won't wait for fonts to load, this will allow you to have a font straight away with base64 data. Data should be WOFF converted to base64 without line breaks.
/// @param data base64 string of a WOFF file
/// @return font object
function load_base64_font(data)
{
	var s = document.createElement('style');
	var fontname = "font" + (_num_fonts++);
	s.id = fontname;
	s.type = "text/css";
	document.head.appendChild(s);
	s.textContent = "@font-face { font-family: " + fontname + "; src:url('data:application/font-woff;base64," + data + "') format('woff');}";
	return {element:s,file:"",name:fontname,type:"fnt"};
}

/// Loads font from file.
/// This actually creates a style element, puts code inside and appends it to class. I heard it works all the time most of the time. Note that this function won't make ready() wait, as it's not possible to consistently tell if a font has been loaded in js, thus load your fonts first thing, and everything should be fine.
/// @param filename Font file URL
/// @return font object
function load_font(filename)
{
	var s = document.createElement('style');
	var fontname = "font" + (_num_fonts++);
	s.id = fontname;
	s.type = "text/css";
	document.head.appendChild(s);
	s.textContent = "@font-face { font-family: " + fontname + "; src:url('" + filename + "');}";
	return {element:s,file:filename,name:fontname,type:"fnt"};
}

/// Creates a font objects from font-family
/// This creates a font element using an existing font-family name.
/// @param family font-family property, can be 'serif', 'sans-serif' or anything else that works
/// @return font object
function create_font(family)
{
	return {element:null,file:"",name:family,type:"fnt"};
}

/// Draws text on bitmap.
/// This draws text using given font, size and colour. You can also specify outline, or make it -1 to disable outline.
/// @param bitmap target bitmap
/// @param f font object
/// @param s text string
/// @param x,w position of the text
/// @param size font size in pixels, this not always reflects the actual glyph dimensions
/// @param colour text colour
/// @param outline outline colour, or omit for no outline
/// @param width outline width
function textout(bitmap,f,s,x,y,size,colour,outline,width)
{
	bitmap.context.font = size.toFixed() + 'px ' + f.name ;
	bitmap.context.textAlign = "left";
	_fillstyle(bitmap,colour);
	bitmap.context.fillText(s,x,y);
	if (outline) 
	{
		_strokestyle(bitmap,outline,width);
		bitmap.context.strokeText(s,x,y);
	}
}

/// Draws centred text on bitmap.
/// This draws centred text using given font, size and colour. You can also specify outline, or make it -1 to disable outline.
/// @param bitmap target bitmap
/// @param f font object
/// @param s text string
/// @param x,w position of the text
/// @param size font size in pixels, this not always reflects the actual glyph dimensions
/// @param colour text colour
/// @param outline outline colour, or omit for no outline
/// @param width outline width
function textout_centre(bitmap,f,s,x,y,size,colour,outline,width)
{
	bitmap.context.font = size.toFixed() + 'px ' + f.name;
	bitmap.context.textAlign = "center";
	_fillstyle(bitmap,colour);
	bitmap.context.fillText(s,x,y);
	if (outline) 
	{
		_strokestyle(bitmap,outline,width);
		bitmap.context.strokeText(s,x,y);
	}
}

/// Draws right-aligned text on bitmap.
/// This draws right-aligned text using given font, size and colour. You can also specify outline, or make it -1 to disable outline.
/// @param bitmap target bitmap
/// @param f font object
/// @param s text string
/// @param x,w position of the text
/// @param size font size in pixels, this not always reflects the actual glyph dimensions
/// @param colour text colour
/// @param outline outline colour, or omit for no outline
/// @param width outline width
function textout_right(bitmap,f,s,x,y,size,colour,outline,width)
{
	bitmap.context.font = size.toFixed() + 'px ' + f.name;
	bitmap.context.textAlign = "right";
	_fillstyle(bitmap,colour);
	bitmap.context.fillText(s,x,y);
	if (outline) 
	{
		_strokestyle(bitmap,outline,width);
		bitmap.context.strokeText(s,x,y);
	}
}

//@}
////////////////////////////////////////////
/// @name SOUND ROUTINES
//@[

var _volume = 1.0;

/// Loaded samples
var _samples = [];

/// Sample object, this is not a function.
/// This is not a function. This is a sample object structure returned by load_sample().
/// @param element HTML <audio> element containing the sound properties
/// @param file sample file name
/// @param volume sample volume, this is combined with global volume
/// @param ready loaded indicator flag
/// @param type object type, "snd" in this case
function SAMPLE_OBJECT(element,file,volume,ready,type) {}

/// Install sound
/// @todo: stuff here? AudioContext? compatibility first!
function install_sound()
{

}

/// Sets global volume
function set_volume(volume)
{
	_volume = volume;
	for(var c=0;c<_samples.length;c++)
	{
		_samples[c].element.volume = _samples[c].volume*_volume;
	}
}

/// Gets global volume
function get_volume()
{
	return _volume;
}

/// Loads a sample from file
/// Loads a sample from file and returns it. Doesn't stall for loading, use ready() to make sure your samples are loaded! Note that big files, such as music jingles, will most probably get streamed instead of being fully loaded into memory, meta data should be accessible tho.
/// @param filename name of the audio file
/// @return sample object
function load_sample(filename)
{
	var audio = document.createElement('audio');
	audio.src = filename;
	var sample = {element:audio,file:filename,volume:1.0,ready:false,type:"snd"};
	_downloadables.push(sample);
	_samples.push(sample);
	log("Loading sample " + filename + "...");
	audio.onloadeddata = function()
	{
		if (!sample.ready)
		{
			sample.ready=true;
			log("Sample " + filename + " loaded!");
		}
	}
	return sample;
}

/// Does nothing.
/// @todo: something that happens here
function destroy_sample(filename)
{
	
}

/// Plays given sample.
/// Plays a sample object using given values. Note how pan is left out, as it doesn't seem to have a js counterpart. Freq will probably not work everywhere too!
/// @param sample sample to be played
/// @param vol playback volume
/// @param freq speed, 1.0 is normal
/// @param loop loop or not to loop
function play_sample(sample,vol,freq,loop)
{
	vol = typeof vol !== 'undefined' ?  vol : 1.0;
	freq = typeof freq !== 'undefined' ?  vol : 1.0;
	loop = typeof loop !== 'undefined' ?  loop : false;
	adjust_sample(sample,vol,freq,loop)
	sample.element.currentTime = 0;
	sample.element.play();
}

/// Adjust sample during playback
/// Adjusts sample data Note how pan is left out, as it doesn't seem to have a js counterpart. freq will probably not work everywhere too!
/// @param sample sample 
/// @param vol playback volume
/// @param freq speed, 1.0 is normal
/// @param loop loop or not to loop
function adjust_sample(sample,vol,freq,loop)
{
	sample.volume = vol;
	sample.element.volume = sample.volume*_volume;
	sample.element.loop = loop;
	sample.element.playbackRate = freq;
}

/// Stops playing
/// Also resets position.
/// @param sample sample to be stopped
function stop_sample(sample)
{
	sample.element.pause();
	sample.element.currentTime = 0;
}

/// Pauses playing
/// Also doesn't reset position. Use play_sample() to resume.
/// @param sample sample to be stopped
function pause_sample(sample)
{
	sample.element.pause();
}

//@}
////////////////////////////////////////////
/// @name HELPER MATH FUNCTIONS
//@{ 

/// Returns a random number from 0 to 65535
/// Result is always integer. Use modulo (%) operator to create smaller values i.e. rand()%256 will return a random number from 0 to 255 inclusive.
/// @return a random number in 0-65535 inclusive range
function rand()
{
	return Math.floor(65536 * Math.random());
}

/// Returns a random number from -2147483648 to 2147483647
/// Result is always integer. Use abs() if you only want positive values.
/// @return a random number in -2147483648-2147483648 inclusive range
function rand32()
{
	return rand()|(rand()<<16);
}

/// Returns a random number from 0.0 to 1.0
/// This one is float. Use multiply (*) operator to get higher values. i.e. frand()*10 will return a value from 0.0 to 10.0
/// @return a random floating point value from 0.0 to 1.0
function frand()
{
	return Math.random();
}

/// Returns absolute value of a
/// Removes minus sign from the value, should there be any.
/// @param a value to be absoluted
/// @return absolute value of a
function abs(a) {return (a<0)?(-a):(a);}

/// Returns length of a vector
/// @param x,y vector coordinates
/// @return length of the vector
function length(x,y)
{
	return Math.sqrt(x*x-y*y);
}

/// Calculates distance between two points
/// @param x1,x2 first point
/// @param x2,y2 second point
/// @return distance between the points
function distance(x1,y1,x2,y2)
{
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

/// Calculates squared distance between two points
/// This version is just a tad faster
/// @param x1,x2 first point
/// @param x2,y2 second point
/// @return distance between the points
function distance2(x1,y1,x2,y2)
{
	return (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1);
}

/// Distance between a point  and a line segment
/// @param ex1,ey1 first end of line segment
/// @param ex2,ey2 second end of line segment
/// @param x,y point coordinates
/// @return distance of point x,y from line ex1,ey1-ex2,ey2
function linedist(ex1,ey1,ex2,ey2,x,y)
{
	var px = ex2-ex1;
	var py = ey2-ey1;
	var u = ((x - ex1) * px + (y - ey1) * py) / (px*px + py*py);
	if (u > 1)
		u = 1;
	else if (u < 0)
		u = 0;

	var dx = ex1 + u * px - x;
	var dy = ey1 + u * py - y;
	return Math.sqrt(dx*dx + dy*dy);
}

/// Linear interpolation between two values
/// Returns a value midway between from and to specified by progress
/// @param from number to lerp from
/// @param to number to lerp to
/// @param progress amount of lerp
/// @return lerped value
function lerp(from,to,progress)
{
	return from+(to-from)*progress;
}

/// Returns a dot product of two vectors
/// Dot product is equal to cosine of angle between two vectors times their lengths. With normalised, length 1.0, vectors, the value would be 1.0 if vectors are the same, 0.0 if they are perpendicular, and -1.0 if they point the opposite direction. It helps to determine angle differences.
/// @param x1,y1 vector one, won't be normalised
/// @param x2,y2 vector two, won't be normalised
/// @return dot product of the vectors
function dot(x1,y1,x2,y2)
{
	return x1*x2+y1*y2;
}

/// Returns sign of value
/// Will return -1 if it's negative, 1 if positive and 0 if zero
/// @param a value
/// @return sign of a
function sgn(a)
{
	return a < 0 ? -1 : (a > 0 ? 1 : 0);
}


/// Returns an angle between two vectors
/// @param x1,y1 vector one
/// @param x2,y2 vector two
/// @return angle in degrees, snapped to 0-360
function angle(x1,y1,x2,y2)
{
	var a = DEG(Math.atan2(y2 - y1, x2 - x1));
	return a < 0 ? a + 360 : a;
}

/// Returns a difference between angles
/// @param a,b, angles
/// @return angle difference, in -180 to 180 range
function anglediff(a,b)
{
	var diff = b - a;
	diff /= 360; 
	diff = (diff - floor(diff))*360
	if (diff > 180) { diff -= 360; }
	return diff;
}

/// Clamps a value
/// Min doesn't really have to be smaller than max
/// @param value value to be clamped
/// @param min,max values to clam between
/// @return clamped value
function clamp(value,min,max)
{
	if (max > min)
	{
		if (value < min) return min;
		else if (value > max) return max;
		else return value;
	} else {
		if (value < max) return max;
		else if (value > min) return min;
		else return value;
	}
}

/// Scales a value from one range to another
/// @param value value to be scaled
/// @param min,max bounds to scale from
/// @param min2,max2 bounds to scale to
/// @return scaled value
function scale(value,min,max,min2,max2)
{
	return min2 + ((value - min) / (max - min)) * (max2 - min2);
}

/// Scales value from one range to another and clamps it down
/// @param value value to be scaled
/// @param min,max bounds to scale from
/// @param min2,max2 bounds to scale and clamp to
/// @return scaled and clamped value
function scaleclamp(value,min,max,min2,max2)
{
	value = min2 + ((value - min) / (max - min)) * (max2 - min2);
	if (max2 > min2)
	{
		value = value < max2 ? value : max2;
		return value > min2 ? value : min2;
	}
	value = value < min2 ? value : min2;
	return value > max2 ? value : max2;
}


//@}
////////////////////////////////////////////
/// @name DEBUG FUNCTIONS
//@{

var _debug_enabled = false;
var _debug_element;

/// Set this to true if you want to debug to browser console.
/// Setting this will make log() log to browser debugger console using console.log().
var ALLEGRO_CONSOLE = false;

/// Fatal error displays alert and logs to console
function _error(string)
{
	log("[ERROR] " + string);
	alert(string);
}

/// Enables debugging to a console.
/// 'console' can be any html element that can accept text, preferably a <div>
/// @param id id of the element to be the console
function enable_debug(id)
{
	_debug_element = document.getElementById(id);
	if (_debug_element) _debug_enabled = true;
}

/// Logs to console
/// Only works after enable_debug() has been called. Will append <br/> newline tag. You can use html inside your logs too.
/// @param string text to log
function log(string)
{
	if (ALLEGRO_CONSOLE && console) console.log(string);
	if (!_debug_enabled) return;
	_debug_element.innerHTML = _debug_element.innerHTML + string + "<br/>";
}

/// Wipes the debug console
/// Clears the debug element of any text. Useful if you want to track changing values in real time without clogging the browser. Just call it at the beginning every loop()!
function wipe_log()
{
	if (!_debug_enabled) return;
	_debug_element.innerHTML = "";
}

//@}
