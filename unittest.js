var page1,page2,active_page,logo;
var tim=0;
var size=64,speed=3;
var cx=0,cy=0;
var vx=speed,vy=speed;


var stage=26;
var delay=0;
var title = "jAllegro unit test";
var subtitle = "press space";

var timercolor = makecol(192,168,1,254);
var timers = false;
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
	}  else if (stage==6)
	{
		title = "pivot_sprite";
		pivot_sprite(canvas,logo,rand()%SCREEN_W,rand()%SCREEN_H,rand()%logo.w,rand()%logo.h,rand()%360);
	}  else if (stage==7)
	{
		title = "rotate_scaled_sprite";
		rotate_scaled_sprite(canvas,logo,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360,rand()%3);
	}  else if (stage==8)
	{
		title = "pivot_scaled_sprite";
		pivot_scaled_sprite(canvas,logo,rand()%SCREEN_W,rand()%SCREEN_H,rand()%logo.w,rand()%logo.h,rand()%360,rand()%3);
	}  else if (stage==9)
	{
		title = "textout";
		textout(canvas,font,"Hello World!",rand()%SCREEN_W,rand()%SCREEN_H,rand()%48+8,makecol(rand()%255,rand()%255,rand()%255));
	}   else if (stage==10)
	{
		title = "textout_centre";
		textout_centre(canvas,font,"Hello World!",rand()%SCREEN_W,rand()%SCREEN_H,rand()%48+8,makecol(rand()%255,rand()%255,rand()%255));
	}   else if (stage==11)
	{
		title = "textout_right";
		textout_right(canvas,font,"Hello World!",rand()%SCREEN_W,rand()%SCREEN_H,rand()%48+8,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==12)
	{
		title = "getpixel";
		var x = rand()%SCREEN_W;
		var y = rand()%SCREEN_H;
		textout(canvas,font,getpixel(canvas,x,y).toString(16),x,y,24,getpixel(canvas,x,y));
		//_debug(getpixel(canvas,x,y).toString(16));
	}  else if (stage==13)
	{
		title = "putpixel";
		putpixel(canvas,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	} else if (stage==14)
	{
		title = "clear_to_color";
		clear_to_color(canvas,makecol(rand()%255,rand()%255,rand()%255));
	} else if (stage==15)
	{
		title = "line";
		line(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==16)
	{
		title = "vline";
		vline(canvas,rand()%SCREEN_W,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==17)
	{
		title = "hline";
		hline(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==18)
	{
		title = "triangle";
		triangle(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==19)
	{
		title = "trianglefill";
		trianglefill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==20)
	{
		title = "polygon";
		var n = rand()%10+3;
		var p = [];
		for (var c=0;c<n;c++)
		{
			p.push(rand()%SCREEN_W);
			p.push(rand()%SCREEN_H);
		}
		polygon(canvas,n,p,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==21)
	{
		title = "polygonfill";
		var n = rand()%10+3;
		var p = [];
		for (var c=0;c<n;c++)
		{
			p.push(rand()%SCREEN_W);
			p.push(rand()%SCREEN_H);
		}
		polygonfill(canvas,n,p,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==22)
	{
		title = "rect";
		rect(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==23)
	{
		title = "rectfill";
		rectfill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==24)
	{
		title = "circle";
		circle(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==25)
	{
		title = "circlefill";
		circlefill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%100,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==26)
	{
		title = "arc";
		arc(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360,rand()%360,rand()%100,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==27)
	{
		title = "arcfill";
		arcfill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360,rand()%360,rand()%SCREEN_W,makecol(rand()%255,rand()%255,rand()%255));
	}   else if (stage==28)
	{
		title = "mouse";
		putpixel(canvas,mouse_x,mouse_y,makecol(255,255,255));
		if (mouse_b&1) circlefill(canvas,mouse_x,mouse_y,20,makecol(0,0,255));
		if (mouse_b&2) circlefill(canvas,mouse_x,mouse_y,20,makecol(255,0,0));
		if (mouse_b&4) circlefill(canvas,mouse_x,mouse_y,20,makecol(0,255,0));
		if (mouse_b) _debug(mouse_b);
	}    else if (stage==29)
	{
		title = "keyboard";
		for (var c=0;c<0x7f;c++)
		{
			if (key[c])
			{
				rectfill(canvas,(c>>3)*24,(c&0xf)*24,20,20,makecol(255,255,0));
			} else {
				rectfill(canvas,(c>>3)*24,(c&0xf)*24,20,20,makecol(255,0,0));
			}
		}
	
	}  else if (stage==30)
	{
		title = "timer";
		if (!timers)
		{
		timers=true;
		install_int_ex(function(){
			circlefill(canvas,100,100,100,makecol(rand()%255,rand()%255,rand()%255));
		},SECS_TO_TIMER(1));
		
		install_int_ex(function(){
			circlefill(canvas,200,100,100,makecol(rand()%255,rand()%255,rand()%255));
		},MSEC_TO_TIMER(500));
		
		install_int_ex(function(){
			circlefill(canvas,300,100,100,makecol(rand()%255,rand()%255,rand()%255));
		},BPS_TO_TIMER(3));
		
			install_int_ex(function(){
			circlefill(canvas,400,100,100,makecol(rand()%255,rand()%255,rand()%255));
		},BPM_TO_TIMER(60));
		
			install_int(function(){
			circlefill(canvas,500,100,100,makecol(rand()%255,rand()%255,rand()%255));
		},1500);
		}
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

