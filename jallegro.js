/// \file jallegro.js
/// Allegro 4 minimal subset for javascript.
/// Written by Sos Sosowski



////////////////////////////////////////////
// INTERNAL STUFF

/// Set this to 1 to get debug messages
var ALLEGRO_DEBUG = 1;


/// Fatal error displays alert and logs to console
function _error(string)
{
	if (!ALLEGRO_DEBUG) return;
	console.log("[ERROR] " + string);
	alert(string);
}

/// Logs to console
function log(string)
{
	if (!ALLEGRO_DEBUG) return;
	console.log(string);
}

/// Logs to console
function _debug(string)
{
	if (!ALLEGRO_DEBUG) return;
	log(string);
}

////////////////////////////////////////////
// HELPER MATH FUNCTIONS

function rand()
{
	return Math.floor(Math.random()*65536);
}

////////////////////////////////////////////
// CONFIGURATION ROUTINES

/// Installs allegro.
/// This function must be called before anything else, even though it does nothing.
function install_allegro()
{
	
}

/// Wrapper for install_allegro.
function allegro_init()
{

}

/// Macro to be placed after the end of main()
/// Calls main()
function END_OF_MAIN()
{
		window.addEventListener("load", main);
}

////////////////////////////////////////////
// MOUSE ROUTINES

/// Mouse button bitmask.
/// Each bit in the mask represents a seoparate mouse button state. If right mouse button is down, mouse_b value would be 4, 00100 in binary. Each bit represents one mouse button. use something like if (mouse_b&1) to check for separate buttons.
/// * Button 0 is LMB.
/// * Button 1 is MMB / wheel.
/// * Button 2 is RMB.
/// * Button 3 is Forward.
/// * Button 4 is Back.
var mouse_b = 0;

/// Mouse X position within the canvas.
var mouse_x = -1;

/// Mouse Y position within the canvas
var mouse_y = -1;

/// Mouse wheel position.
var mouse_z = -1;

/// Mouse mickey, X position since last move.
var mouse_mx = 0;

/// Mouse mickey, Y position since last move.
var mouse_my = 0;

/// Mouse mickey, wheel position since last move.
var mouse_mz = 0;

/// Checks if mouse was installed
var _mouse_installed = false;


/// Installs mouse handlers.
/// Must be called after set_gfx_mode() to be able to determine mouse position within the given canvas!
function install_mouse()
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
	_mouse_installed = true;
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
	_canvas.canvas.removeEventListener('mouseup',_mouseup);
	_canvas.canvas.removeEventListener('mousedown',_mousedown);
	_canvas.canvas.removeEventListener('mousemove',_mousemove);
	_mouse_installed = false;
	return 0;
}

/// Shows mouse within canvas
/// \todo: this function
function show_mouse(show)
{

}

/// mouseup event handler
function _mouseup(e)
{
	mouse_b = mouse_b&~(1<<(e.which-1));
}

/// mousedown event handler
function _mousedown(e)
{
	mouse_b = mouse_b|(1<<(e.which-1));
}

/// mousemove event handler
function _mousemove(e)
{
	mouse_x = e.offsetX;
	mouse_y = e.offsetY;
	mouse_mx = e.movementX;
	mouse_my = e.movementY;
}

////////////////////////////////////////////
// TIMER ROUTINES

var _installed_timers = [];

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
/// @return value converted to miliseconds
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
/// \todo: remove
function install_timer()
{
	
}

function time()
{
	return new Date().getTime();
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
/// * MSEC_TO_TIMER(msec) - miliseconds (1/1000th)
/// * BPS_TO_TIMER(bps) - beats per second
/// * BPM_TO_TIMER(bpm) - beats per minute
/// @param procedure function to be called
/// @param speed execution interval
function install_int_ex(procedure,speed)
{
	var timer_id = window.setInterval(procedure,speed);
	_installed_timers.push({timer:procedure,id:timer_id});
}

function loop(procedure,speed)
{
	var timer_id = window.setInterval(procedure,speed);
	//_installed_timers.push({timer:procedure,id:timer_id});
}

/// Removes interrupt
/// @param procedure interrupt procedure to be removed
function remove_int(procedure)
{
	for(var c=0;c<_installed_timers.length;c++)
	{
		if (_installed_timers[c].timer == _installed_timers)
		{
			window.clearInterval(_installed_timers[c].id);
			_installed_timers.splice(c,1);
			return;
		}
	}
}

/// Removes  all interrupts
function remove_all_ints()
{
	for(var c=0;c<_installed_timers.length;c++)
	{
			window.clearInterval(_installed_timers[c].id);
	}
	_installed_timers = [];
}

////////////////////////////////////////////
// KEYBOARD ROUTINES

const KEY_A = 0x41, KEY_B = 0x42, KEY_C = 0x43, KEY_D = 0x44, KEY_E = 0x45, KEY_F = 0x46, KEY_G = 0x47, KEY_H = 0x48, KEY_I = 0x49, KEY_J = 0x50, KEY_K = 0x51, KEY_L = 0x52, KEY_M = 0x53, KEY_N = 0x54, KEY_O = 0x55, KEY_P = 0x56, KEY_Q = 0x57, KEY_R = 0x58, KEY_S = 0x59, KEY_T = 0x50, KEY_U = 0x51, KEY_V = 0x52, KEY_W = 0x53, KEY_X = 0x54, KEY_Y = 0x55, KEY_Z = 0x56, KEY_0 = 0x30, KEY_1 = 0x31, KEY_2 = 0x32, KEY_3 = 0x33, KEY_4 = 0x34, KEY_5 = 0x35, KEY_6 = 0x36, KEY_7 = 0x37, KEY_8 = 0x38, KEY_9 = 0x39, KEY_0_PAD = 0x60, KEY_1_PAD = 0x61, KEY_2_PAD = 0x62, KEY_3_PAD = 0x63, KEY_4_PAD = 0x64, KEY_5_PAD = 0x65, KEY_6_PAD = 0x66, KEY_7_PAD = 0x67, KEY_8_PAD = 0x68, KEY_9_PAD = 0x69, KEY_F1 = 0x70, KEY_F2 = 0x71, KEY_F3 = 0x72, KEY_F4 = 0x73, KEY_F5 = 0x74, KEY_F6 = 0x75, KEY_F7 = 0x76, KEY_F8 = 0x77, KEY_F9 = 0x78, KEY_F10 = 0x79, KEY_F11 = 0x7a, KEY_F12 = 0x7b, KEY_ESC = 0x1B, KEY_TILDE = 0xc0, KEY_MINUS = 0xbd, KEY_EQUALS = 0xbb, KEY_BACKSPACE = 0x08, KEY_TAB = 0x09, KEY_OPENBRACE = 0xdb, KEY_CLOSEBRACE = 0xdd, KEY_ENTER = 0x0D, KEY_COLON = 0xba, KEY_QUOTE = 0xde, KEY_BACKSLASH = 0xdc, KEY_COMMA = 0xbc, KEY_STOP = 0xbe, KEY_SLASH = 0xBF, KEY_SPACE = 0x20, KEY_INSERT = 0x2D, KEY_DEL = 0x2E, KEY_HOME = 0x24, KEY_END = 0x23, KEY_PGUP = 0x21, KEY_PGDN = 0x22, KEY_LEFT = 0x25, KEY_RIGHT = 0x27, KEY_UP = 0x26, KEY_DOWN = 0x28, KEY_SLASH_PAD = 0x6F, KEY_ASTERISK = 0x6A, KEY_MINUS_PAD = 0x6D, KEY_PLUS_PAD = 0x6B, KEY_ENTER_PAD = 0x0D, KEY_PRTSCR = 0x2C, KEY_PAUSE = 0x13, KEY_EQUALS_PAD = 0x0C, KEY_LSHIFT = 0x10, KEY_RSHIFT = 0x10, KEY_LCONTROL = 0x11, KEY_RCONTROL = 0x11, KEY_ALT = 0x12, KEY_ALTGR = 0x12, KEY_LWIN = 0x5b, KEY_RWIN = 0x5c, KEY_MENU = 0x5d, KEY_SCRLOCK = 0x9d, KEY_NUMLOCK = 0x90, KEY_CAPSLOCK = 0x14;

/// Array of flags indicating state of each key. 
/// Available keyboard scancodes are as follows:
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

var _keyboard_installed = false;
var _pressed = false;

/// Installs keyboard handlers
/// Unlike mouse, keyboard can be installed before initialising graphics, and the handlers will function over the entire website, as opposed to canvas only. After this call, the key[] array can be used to check state of each key.
function install_keyboard()
{
	if (_keyboard_installed)
	{
		_allog("Keyboard already installed");
		return -1;
	}
	for (var c=0;c<0x7f;c++) key[c] = false;
	window.addEventListener('keyup',_keyup);
	window.addEventListener('keydown',_keydown);
	_keyboard_installed = true;
}

/// Uninstalls keyboard
function remove_keyboard()
{
	if (!_keyboard_installed)
	{
		_allog("Keyboard not installed");
		return -1;
	}
	window.removeEventListener('keyup',_keyup);
	window.removeEventListener('keydown',_keydown);
	_keyboard_installed = false;
}

/// keydown event handler
function _keydown(e)
{
	key[e.keyCode] = true;
	_pressed = true;
}

/// keyup event handler
function _keyup(e)
{
	key[e.keyCode] = false;
}

////////////////////////////////////////////
// JOYSTICK ROUTINES

////////////////////////////////////////////
// SENSOR ROUTINES

////////////////////////////////////////////
// TOUCH ROUTINES

////////////////////////////////////////////
// BITMAP OBJECTS


/// Creates empty bitmap.
/// Creates a bitmap object of given dimensions and returns it.
/// @param width bitmap width
/// @param height bitmap height
/// @return bitmap object
function create_bitmap(width,height)
{
	var cv = document.createElement('canvas');
	cv.width = width;
	cv.height = height;
	var ctx = cv.getContext("2d");
	return {w:width,h:height,canvas:cv,context:ctx};
}

/// Loads bitmap from file
/// Loads image from file and stalls execution until image is fully loaded.
/// @param filename URL of image
/// @return bitmap object, or -1 on error
function load_bitmap(filename)
{
	var img = new Image();
	img.src = filename;
	var now = time();
	/*
	while(!img.complete)
	{
		if (time()-now>10)
		{
			log("Loading " + filename + " 10s timeout!");
			//return -1;
		}
	}
	*/
	
	
	var bmp = {canvas:-1,context:-1,w:-1,h:-1};
	img.onload = function(){
		var cv = document.createElement('canvas');
		cv.width = img.width;
		cv.height = img.height;
		var ctx = cv.getContext("2d");
		ctx.drawImage(img,0,0);
		bmp.context = ctx;
		bmp.canvas = cv;
		bmp.w = img.width;
		bmp.h = img.height;
	};
	
	return bmp;
}

/// Wrapper for load_bitmap
function load_bmp(filename)
{
	return load_bitmap(filename);
}

////////////////////////////////////////////
// GRAPHICS MODES

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
/// This function should be before calling any other graphics routines.
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
	//_debug(ctx);
	SCREEN_W = width;
	SCREEN_H = height;
	canvas = {w:width,h:height,canvas:cv,context:ctx};
	font = load_font('vga.ttf');
	_gfx_installed = true;
	
	return 0;
}


////////////////////////////////////////////
// DRAWING PRIMITIVES


/// Pi
const PI = 3.14159265;

/// Pi * 2
const PI2 = 2*3.14159265;

/// Pi / 2
const PI_2 = 3.14159265/2;

/// Pi / 3
const PI_3 = 3.14159265/3;

/// Pi / 4
const PI_4 = 3.14159265/4;

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
function _fillstyle(bitmap,color)
{
	bitmap.context.fillStyle = 'rgba('+ getr(color) + ',' + getg(color) + ',' + getb(color) + ',' + getaf(color) + ')';
	//_debug(getaf(color));
}

/// Helper for setting stroke style
function _strokestyle(bitmap,color)
{
	bitmap.context.strokeStyle = 'rgba('+ getr(color) + ',' + getg(color) + ',' + getb(color) + ',' + getaf(color) + ')';
}

/// Creates a 0xAARRGGBB from values
/// Overdrive is not permitted, so values over 255 (0xff) will get clipped. Feel free to add it to bugtracker if it's bothering you! I might change it! Adds alpha to colors. I have no idea which one is JS's language, but makecol() will always represent the default one. Also, endians? This is not C anymore, right? Do I have to know my endians?
/// @param r red component in 0-255 range
/// @param g green component in 0-255 range
/// @param b blue  component in 0-255 range
/// @param a alpha component in 0-255 range, defaults to 255 (fully opaque)
/// @return color in 0xAARRGGBB format
function makecol(r,g,b,a)
{
	if (!a) a=255;
	return (a<<24)|((r&0xff)<<16)|((g&0xff)<<8)|((b&0xff));
}

/// Creates 0xAARRGGBB from values
/// This is a float version of makecol, where all components should be in 0.0-1.0 range.
/// @param r red component in 0.0-1.0 range
/// @param g green component in 0.0-1.0 range
/// @param b blue  component in 0.0-1.0 range
/// @param a alpha component in 0.0-1.0 range, defaults to 1.0 (fully opaque)
/// @return color in 0xAARRGGBB format
function makecolf(r,g,b,a)
{
		if (!a) a=1.0;
	return makecol(r*255,g*255,b*255,a*255);
}

/// Gets red bits from 0xRRGGBB
/// This one does clip.
/// @param color color in 0xAARRGGBB format
/// @return red component in 0-255 range
function getr(color)
{
	return (color>>16)&0xff;
}

/// Gets red bits from 0xRRGGBB
/// This one too.
/// @param color color in 0xAARRGGBB format
/// @return green component in 0-255 range
function getg(color)
{
	return (color>>8)&0xff;
}

/// Gets red bits from 0xRRGGBB
/// This one clips as well.
/// @param color color in 0xAARRGGBB format
/// @return blue component in 0-255 range
function getb(color)
{
	return color&0xff;
}

/// Gets alpha bits from 0xAARRGGBB
/// This one doesn't.
/// @param color color in 0xAARRGGBB format
/// @return alpha component in 0-255 range
function geta(color)
{
	return color>>>24;
}

/// Float (0.0-1.0) version of getr()
/// @param color color in 0xAARRGGBB format
/// @return red component in 0.0-1.0 range
function getrf(color)
{
	return (color>>16)&0xff;
}

/// Float (0.0-1.0) version of getg()
/// @param color color in 0xAARRGGBB format
/// @return green component in 0.0-1.0 range
function getgf(color)
{
	return (color>>8)&0xff;
}

/// Float (0.0-1.0) version of getb()
/// @param color color in 0xAARRGGBB format
/// @return blue component in 0.0-1.0 range
function getbf(color)
{
	return color&0xff;
}

/// Float (0.0-1.0) version of geta()
/// @param color color in 0xAARRGGBB format
/// @return alpha component in 0.0-1.0 range
function getaf(color)
{
	return (color>>>24)/255.0;
}

/// Gets pixel color from bitmap
/// Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
/// @param bitmap biotmap object to poll
/// @param x x coordinate of pixel
/// @param y y coordinate of pixel
/// @return color in 0xAARRGGBB format
function getpixel(bitmap,x,y)
{
	var data = bitmap.context.getImageData(x,y,1,1).data;
	return (data[3]<<24)|((data[0]&0xff)<<16)|((data[1]&0xff)<<8)|((data[2]&0xff));
}

/// Gets pixel color from bitmap
/// Reads pixel from bitmap at given coordinates. This is probably super slow, and shouldn't be used inside loops.
/// @param bitmap bitmap object to update
/// @param x x coordinate of pixel
/// @param y y coordinate of pixel
/// @param color color in 0xAARRGGBB format
function putpixel(bitmap,x,y,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.fillRect(x,y,1,1);
}

/// Clears bitmap to transparent black.
/// Fills the entire bitmap with 0 value, which represents transparent black.
/// @param bitmap bitmap to be cleared
function clear_bitmap(bitmap)
{
	_fillstyle(bitmap,0);
	bitmap.context.fillRect(0,0,bitmap.w,bitmap.h);
}

/// Clears bitmap to specified color.
/// Fills the entire bitmap with color value.
/// @param bitmap bitmap to be cleared
/// @param color color in 0xAARRGGBB format
function clear_to_color(bitmap,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.fillRect(0,0,bitmap.w,bitmap.h);
}

/// Draws a line.
/// Draws a line from one point to another using given color.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param x2,y2 end point coordinates
/// @param color color in 0xAARRGGBB format
function line(bitmap,x1,y1,x2,y2,color)
{
	_strokestyle(bitmap,color);
	bitmap.context.beginPath();
	bitmap.context.moveTo(x1,y1);
	bitmap.context.lineTo(x2,y2);
	bitmap.context.stroke();
}

/// Draws a vertical line.
/// Draws a vertical line from one point to another using given color. Probably slightly faster than line() method, since this one uses rectfill to draw the line.
/// @param bitmap to be drawn to
/// @param x column to draw the line to
/// @param y1,y2 line endpoints
/// @param color color in 0xAARRGGBB format
function vline(bitmap,x,y1,y2,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.fillRect(x,y1,1,y2-y1);
}

/// Draws a horizontal line.
/// Draws a horizontal line from one point to another using given color. Probably slightly faster than line() method, since this one uses rectfill to draw the line.
/// @param bitmap to be drawn to
/// @param y row to draw the line to
/// @param x1,x2 line endpoints
/// @param color color in 0xAARRGGBB format
function hline(bitmap,x1,y,x2,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.fillRect(x1,y,x2-x1,1);
}

/// Draws a triangle.
/// Draws a triangle using three coordinates. The triangle is not filled.
/// @param bitmap to be drawn to
/// @param x1,y1 first point coordinates
/// @param x2,y2 second point coordinates
/// @param x3,y3 third point coordinates
/// @param color color in 0xAARRGGBB format
function triangle(bitmap,x1,y1,x2,y2,x3,y3,color)
{
	_strokestyle(bitmap,color);
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
/// @param color color in 0xAARRGGBB format
function trianglefill(bitmap,x1,y1,x2,y2,x3,y3,color)
{
	_fillstyle(bitmap,color);
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
/// @param color color in 0xAARRGGBB format
function polygon(bitmap,vertices,points,color)
{
	_strokestyle(bitmap,color);
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
/// @param color color in 0xAARRGGBB format
function polygonfill(bitmap,vertices,points,color)
{
	_fillstyle(bitmap,color);
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
/// Draws a rectangle from one point to another using given color. The rect is not filled.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param x2,y2 end point coordinates
/// @param color color in 0xAARRGGBB format
function rect(bitmap,x1,y1,x2,y2,color)
{
	_strokestyle(bitmap,color);
	bitmap.context.strokeRect(x1,y1,x2,y2);
}

/// Draws a rectangle.
/// Draws a rectangle from one point to another using given color. The rect is filled.
/// @param bitmap to be drawn to
/// @param x1,y1 start point coordinates
/// @param x2,y2 end point coordinates
/// @param color color in 0xAARRGGBB format
function rectfill(bitmap,x1,y1,x2,y2,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.fillRect(x1,y1,x2,y2);
}

/// Draws a circle.
/// Draws a circle at specified center poitn and radius. The circle is not filled
/// @param bitmap to be drawn to
/// @param x,y center point coordinates
/// @param r circle radius
/// @param color color in 0xAARRGGBB format
function circle(bitmap,x,y,radius,color)
{
	_strokestyle(bitmap,color);
	bitmap.context.beginPath();
	bitmap.context.arc(x,y,radius,0,PI2);
	bitmap.context.stroke();
}

/// Draws a circle.
/// Draws a circle at specified center poitn and radius. The circle is filled
/// @param bitmap to be drawn to
/// @param x,y center point coordinates
/// @param r circle radius
/// @param color color in 0xAARRGGBB format
function circlefill(bitmap,x,y,radius,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.beginPath();
	bitmap.context.arc(x,y,radius,0,PI2);
	bitmap.context.fill();
}

/// Draws a arc.
/// Draws a circle at specified center poitn and radius. The arc is not filled
/// @param bitmap to be drawn to
/// @param x,y center point coordinates
/// @param ang1,ang2 angles to draw the arc between measured anticlockwise from the positive x axis in degrees
/// @param r radius
/// @param color color in 0xAARRGGBB format
function arc(bitmap,x,y,ang1,ang2,r,color)
{
//_debug(ang1 +" "+ ang2 +" "+ r);
	_strokestyle(bitmap,color);
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
/// Draws a circle at specified center poitn and radius. The arc is filled
/// @param bitmap to be drawn to
/// @param x,y center point coordinates
/// @param ang1,ang2 angles to draw the arc between measured anticlockwise from the positive x axis in degrees
/// @param r radius
/// @param color color in 0xAARRGGBB format
function arcfill(bitmap,x,y,ang1,ang2,r,color)
{
	_fillstyle(bitmap,color);
	bitmap.context.beginPath();
	if (ang1>ang2)
	{
		bitmap.context.arc(x,y,r,RAD(ang1),RAD(ang2));
	} else {
		bitmap.context.arc(x,y,r,RAD(ang1),RAD(ang2));
	}
	bitmap.context.fill();
}


////////////////////////////////////////////
// BLITTING AND SPRITES

/// Draws a sprite
/// This is probably the fastest method to get images on screen. 
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the top left corder of the image
function draw_sprite(bmp,sprite,x,y)
{
	bmp.context.drawImage(sprite.canvas,x,y);
}

/// Draws a stretched sprite
/// Draws a sprite stretching it to given width and height
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the top left corder of the image
/// @param w,h size the sprite will be stretched to
function stretch_sprite(bmp,sprite,x,y,w,h)
{
	bmp.context.drawImage(sprite.canvas,0,0,sprite.w,sprite.h,x,y,w,h);
}

/// Draws a rotated sprite
/// Draws a sprite rotating it around its centre point. Opposed to traditional allegro approach, sprite is drawn centered.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the centre of the image
/// @param angle angle of rotation in degrees
function rotate_sprite(bmp,sprite,x,y,angle)
{
	bmp.context.save();
	bmp.context.translate(x,y);
  bmp.context.rotate(RAD(angle));
	bmp.context.translate(-sprite.w/2,-sprite.h/2);
  bmp.context.drawImage(sprite.canvas,0,0);
  bmp.context.restore();
}

/// Draws a sprite rotated around an arbitrary point
/// Draws a sprite rotating it around a given point. Opposed to traditional allegro approach, sprite is drawn with the pivot point at origin.
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
/// Draws a sprite rotating it around its centre point. Opposed to traditional allegro approach, sprite is drawn centered. The  sprite is also scaled.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y coordinates of the centre of the image
/// @param angle angle of rotation in degrees
/// @param scale 1.0 is unscaled
function rotate_scaled_sprite(bmp,sprite,x,y,angle,scale)
{
	bmp.context.save();
	bmp.context.translate(x,y);
  bmp.context.rotate(RAD(angle)); 
	bmp.context.translate(-scale*sprite.w/2,-scale*sprite.h/2);
  bmp.context.drawImage(sprite.canvas,0,0,sprite.w,sprite.h,x,y,sprite.w*scale,sprite.h*scale);
  bmp.context.restore(); 
}
/// Draws a sprite rotated around an arbitrary point and scaled
/// Draws a sprite rotating it around a given point. Opposed to traditional allegro approach, sprite is drawn with the pivot point at origin. The  sprite is also scaled.
/// @param bmp target bitmap
/// @param sprite sprite bitmap
/// @param x,y target coordinates of the pivot point
/// @param cx,cy pivot point coordinates
/// @param angle angle of rotation in degrees
/// @param scale 1.0 is unscaled
function pivot_scaled_sprite(bmp,sprite,x,y,cx,cy,angle,scale)
{
	bmp.context.save(); 
	bmp.context.translate(x,y);
  bmp.context.rotate(RAD(angle));
	bmp.context.translate(-scale*cx,-scale*cy);
  bmp.context.drawImage(sprite.canvas,0,0,sprite.w,sprite.h,x,y,sprite.w*scale,sprite.h*scale);
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
/// @todo tell everyone that blitting to itself is slower than youn thing (requires copy?)
function blit(source,dest,sx,sy,dx,dy,w,h)
{
	//_debug(dest);
	 dest.context.drawImage(source.canvas,sx,sy,w,h,dx,dy,w,h);
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

////////////////////////////////////////////
// TEXT OUTPUT
// TEXT OUTPUT

var _num_fonts = 0;

/// Loads font from file.
/// This actually creates a style element, puts code isnide and appends it to class. I heard it works all the time most of the time.
/// @param filename Font file URL
/// @return font object
function load_font(filename)
{
	var s = document.createElement('style');
	var fontname = "font" + (_num_fonts++);
	//_debug(fontname);
	s.id = fontname;
	s.type = "text/css";
	document.head.appendChild(s);
	s.textContent = "@font-face { font-family: " + fontname + "; src:url('" + filename + "');}";
	return {element:s,file:filename,name:fontname};
}

/// Draws text on bitmap.
/// This draws text using given font, size and color. You can also specify outline, or make it -1 to disable outline.
/// @param bitmap target bitmap
/// @param f font object
/// @param s text string
/// @param x,w position of the text
/// @param size font size in pixels, this not always reflects the actual glyph dimensions
/// @param color text color
/// @param outline outline color, or omit for no outline
function textout(bitmap,f,s,x,y,size,color,outline)
{
	bitmap.context.font = size.toFixed() + 'px ' + f.name ;
	//_debug(bitmap.context.font );
	bitmap.context.textAlign = "left";
	_fillstyle(bitmap,color);
	bitmap.context.fillText(s,x,y);
	if (outline) 
	{
		_strokestyle(bitmap,outline);
		bitmap.context.strokeText(s,x,y);
	}
}

/// Draws centered text on bitmap.
/// This draws centered text using given font, size and color. You can also specify outline, or make it -1 to disable outline.
/// @param bitmap target bitmap
/// @param f font object
/// @param s text string
/// @param x,w position of the text
/// @param size font size in pixels, this not always reflects the actual glyph dimensions
/// @param color text color
/// @param outline outline color, or -1 for no outline
function textout_centre(bitmap,f,s,x,y,size,color,outline)
{
	bitmap.context.font = size.toFixed() + 'px ' + f.name;
	bitmap.context.textAlign = "center";
	_fillstyle(bitmap,color);
	bitmap.context.fillText(s,x,y);
	if (outline) 
	{
		_strokestyle(bitmap,outline);
		bitmap.context.strokeText(s,x,y);
	}
}

/// Draws right-aligned text on bitmap.
/// This draws right-aligned text using given font, size and color. You can also specify outline, or make it -1 to disable outline.
/// @param bitmap target bitmap
/// @param f font object
/// @param s text string
/// @param x,w position of the text
/// @param size font size in pixels, this not always reflects the actual glyph dimensions
/// @param color text color
/// @param outline outline color, or -1 for no outline
function textout_right(bitmap,f,s,x,y,size,color,outline)
{
	bitmap.context.font = size.toFixed() + 'px ' + f.name;
	bitmap.context.textAlign = "right";
	_fillstyle(bitmap,color);
	bitmap.context.fillText(s,x,y);
	if (outline) 
	{
		_strokestyle(bitmap,color);
		bitmap.context.strokeText(s,x,y);
	}
}

////////////////////////////////////////////
// SOUND ROUTINES

var _volume = 1.0;

/// Install sound
/// @todo: stuff here? AudioContext? comaptibility first!
function install_sound()
{

}

/// Doesn't set global volume at all, since it does nothing.
/// @todo: this
function set_volume(volume)
{
	
}

/// Doesn't get global volume at all, since it does nothing.
/// @todo: this too
function get_volume()
{

}

/// Loads a sample from file
/// Loads a sample from file and returns it. Doesn't stall for loading.
/// @param filename name of the audio file
/// @return sample object
function load_sample(filename)
{
	var audio = document.createElement('audio');
	audio.src = filename;
	return {element:audio,file:filename};
}


/// Does noithing.
/// @todo: something that happens here
function destroy_sample(filename)
{
	
}

/// Plays given sample.
/// Plays a sample object using given values. Note how pan is left out, as it doesn't seem to have a js counterpart. freq will prolly not work everywhere too!
/// @param sample sample to be played
/// @param vol playback volume
/// @param freq speed, 1.0 is normal
/// @param loop loop or not to loop
function play_sample(sample,vol,freq,loop)
{
	adjust_sample(sample,vol,freq,loop)
	//sample.element.fastSeek(0);
	sample.element.play();
}

/// Adjust sample during playback
/// Adjusts sample data Note how pan is left out, as it doesn't seem to have a js counterpart. freq will prolly not work everywhere too!
/// @param sample sample 
/// @param vol playback volume
/// @param freq speed, 1.0 is normal
/// @param loop loop or not to loop
function adjust_sample(sample,vol,freq,loop)
{
	sample.element.volume = vol;
	sample.element.loop = loop;
	sample.element.playbackRate = freq;
}

/// Stops playing
/// Also resets position.
/// @param sample sample to be stopped
function stop_sample(sample)
{
	sample.element.pause();
 	//sample.element.fastSeek(0);
}

