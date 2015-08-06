var logo,ball;
var bounce;
var size=64,speed=5;
var cx=100,cy=100;
var vx=speed,vy=speed;

function draw()
{
	stretch_blit(logo,canvas,0,0,logo.w,logo.h,0,0,SCREEN_W,SCREEN_H);
	stretch_sprite(canvas,ball,cx-size/2,cy-size/2,size,size+abs(vy));

}

function update()
{
	var bounced=false;
	cx+=vx;
	cy+=vy;
	if (cx>SCREEN_W-size/2) {vx=-speed;bounced=true;}
	if (cy>SCREEN_H-size/2) {vy=-speed*3;bounced=true;}
	if (cx<size/2) {vx=speed;bounced=true;}
	if (cy<size/2) {vy=speed;bounced=true;}
	if (bounced) play_sample(bounce);
	vy+=.3;
}

function main()
{
	enable_debug("debug");
	allegro_init_all("canvas_id", 640, 480);
	ball = load_bmp("data/planet.png");
	logo = load_bmp("data/allegro.png");
	bounce = load_sample("data/bounce.mp3");

	ready(function(){
		loop(function(){
		
			clear_to_color(canvas, makecol(255, 255, 255));

			update();

			draw();
	
		}, BPS_TO_TIMER(60));
	});

	return 0;
}
END_OF_MAIN();

 