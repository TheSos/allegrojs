var page1,page2,active_page,logo;
var tim=0;
var size=64,speed=3;
var cx=0,cy=0;
var vx=speed,vy=speed;


function draw()
{
	stretch_blit(logo,canvas,0,0,logo.w,logo.h,0,0,SCREEN_W,SCREEN_H);
	circlefill(canvas,cx,cy,size,makecol(255,255,255,255));
	//stretch_sprite(canvas,logo,cx-size/2,cy-size/2,size,size);
}

function update()
{
	cx+=vx;
	cy+=vy;
	if (cx>SCREEN_W-size/2) vx=-speed;
	if (cy>SCREEN_H-size/2) vy=-speed;
	if (cx<size/2) vx=speed;
	if (cy<size/2) vy=speed;
}

function main()
{
	allegro_init();
	set_gfx_mode("unittest", 640, 480);
	install_keyboard();
	install_timer();
	install_mouse();
	install_sound();
	logo = load_bmp("allegro.png");
	
	active_page = page2;

	install_int_ex(function()
	{
		clear_to_color(canvas, makecol(255, 255, 255));

		update();

		draw();
	
  }, BPS_TO_TIMER(60));

	return 0;
}
END_OF_MAIN();

