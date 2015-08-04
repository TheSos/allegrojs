var page1,page2,active_page,logo;
var tim=0;
var size=64,speed=3;
var cx=0,cy=0;
var vx=speed,vy=speed;


var stage=0;
var delay=0;
var title = "jAllegro unit test";
var subtitle = "press space";
function draw()
{
	
	if (stage==0)
	{
		
	} else if (stage==1)
	{
		title = "blit";
		blit(logo,canvas,0,0,rand()%SCREEN_W,rand()%SCREEN_H,rand()%logo.w,rand()%logo.h);
	} else if (stage==2)
	{
		title = "stretch_blit";
		stretch_blit(logo,canvas,0,0,rand()%logo.w,rand()%logo.h,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H);
	} else if (stage==3)
	{
		title = "draw_sprite";
		draw_sprite(canvas,logo,rand()%SCREEN_W,rand()%SCREEN_H);
	}  else if (stage==4)
	{
		title = "stretch_sprite";
		stretch_sprite(canvas,logo,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H);
	}  else if (stage==5)
	{
		title = "rotate_sprite";
		rotate_sprite(canvas,logo,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360);
	}
	
	
	//
	//circlefill(canvas,cx,cy,size,makecol(255,255,255,255));
	
	textout_centre(canvas,font,title,SCREEN_W/2,64,64,makecol(255,0,0));
	textout(canvas,font,subtitle,10,SCREEN_H-10,24,makecol(255,0,0));
	delay++;
	if (key[KEY_SPACE] && delay>10)
	{
		//stretch_sprite(canvas,logo,cx-size/2,cy-size/2,size,size);
		stretch_blit(logo,canvas,0,0,logo.w,logo.h,0,0,SCREEN_W,SCREEN_H);
		stage++;
		delay=0;
		//subtitle="";
	}
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
		//clear_to_color(canvas, makecol(255, 255, 255));

		update();
		draw();
	
  }, BPS_TO_TIMER(60));

	return 0;
}
END_OF_MAIN();

