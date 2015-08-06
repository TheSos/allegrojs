// bitmap oobjects
var logo,ball;

// sample object
var bounce;

// size and speed of the ball
var size=64,speed=5;

// positon of the ball
var cx=100,cy=100;

// velocity of the ball
var vx=speed,vy=speed;

// drawing function
function draw()
{
	// draw allegro logo background
	stretch_blit(logo,canvas,0,0,logo.w,logo.h,0,0,SCREEN_W,SCREEN_H);
	
	// draws the ball resized to size*size, centered
	// stretch it a bit vertically according to velocity
	stretch_sprite(canvas,ball,cx-size/2,cy-size/2,size,size+abs(vy));
}

// update game logic
function update()
{
	// did the ball bounce off the wall this turn?
	var bounced=false;

	
	// if the ball is going to collide with screen bounds
	// after applying velocity, if so, reverse velocity
	// and remember that it bonced
	if (cx+vx>SCREEN_W-size/2) {vx=-speed;bounced=true;}
	if (cy+vy>SCREEN_H-size/2) {vy=-speed*3;bounced=true;}
	if (cx+vx<size/2) {vx=speed;bounced=true;}
	if (cy+vy<size/2) {vy=speed;bounced=true;}
		
	// move the ball
	cx+=vx;
	cy+=vy;
	
	// if it bounced, play a sound
	if (bounced) play_sample(bounce);
	
	// add gravity
	vy+=.3;
}

// entry point of our example
function main()
{
	// enable debugging to console element
	enable_debug("debug");
	
	// init all subsystems, put allegro in canvas with id="canvas_id"
	// make the dimesnions 640x480
	allegro_init_all("canvas_id", 640, 480);
	
	// load ball image
	ball = load_bmp("data/planet.png");
	
	// load background image
	logo = load_bmp("data/allegro.png");
	
	// load the bounce sound
	bounce = load_sample("data/bounce.mp3");

	// make sure everything has loaded
	ready(function(){
		
		// repeat this game loop
		loop(function(){
			
			// clear screen
			clear_to_color(canvas, makecol(255, 255, 255));

			// update game logic
			update();

			// render everything
			draw();
	
		// all this happens 60 times per second
		}, BPS_TO_TIMER(60));
	});
	
	// the end
	return 0;
}
// make sure that main() gets called as soon as the wesbite has loaded
END_OF_MAIN();
