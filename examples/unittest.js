var clouds,ball;
var beep;

var stage=-1;
var delay=0;
var title = "allegro.js test";
var subtitle = "press space";

var timercolor = makecol(192,168,1,254);
var timers = false;
var width = 13;
function draw()
{
	
	if (stage==0)
	{
		title = "progress_bar"
		loading_bar(delay/200);
	} else if (stage==1)
	{
		title = "blit";
		blit(ball,canvas,0,0,rand()%SCREEN_W,rand()%SCREEN_H,rand()%ball.w+1,rand()%ball.h+1);
	} else if (stage==2)
	{
		title = "stretch_blit";
		stretch_blit(ball,canvas,0,0,rand()%ball.w+1,rand()%ball.h+1,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W+1,rand()%SCREEN_H+1);
	} else if (stage==3)
	{
		title = "draw_sprite";
		draw_sprite(canvas,ball,rand()%SCREEN_W,rand()%SCREEN_H);
	}  else if (stage==4)
	{
		title = "scaled_sprite";
		scaled_sprite(canvas,ball,rand()%SCREEN_W,rand()%SCREEN_H,frand()*2+.1,frand()*2+.1);
	}  else if (stage==5)
	{
		title = "rotate_sprite";
		rotate_sprite(canvas,ball,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360);
	}  else if (stage==6)
	{
		title = "pivot_sprite";
		pivot_sprite(canvas,ball,rand()%SCREEN_W,rand()%SCREEN_H,rand()%ball.w,rand()%ball.h,rand()%360);
	}  else if (stage==7)
	{
		title = "rotate_scaled_sprite";
		rotate_scaled_sprite(canvas,ball,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360,frand()*2+.1,frand()*2+.1);
	}  else if (stage==8)
	{
		title = "pivot_scaled_sprite";
		pivot_scaled_sprite(canvas,ball,rand()%SCREEN_W,rand()%SCREEN_H,rand()%ball.w,rand()%ball.h,rand()%360,frand()*2+.1,frand()*2+.1);
	}  else if (stage==9)
	{
		title = "textout";
		textout(canvas,font,"Hello World!",rand()%SCREEN_W,rand()%SCREEN_H,rand()%48+8,makecol(rand()%255,rand()%255,rand()%255),makecol(rand()%255,rand()%255,rand()%255),1+rand()%5);
	}   else if (stage==10)
	{
		title = "textout_centre";
		textout_centre(canvas,font,"Hello World!",rand()%SCREEN_W,rand()%SCREEN_H,rand()%48+8,makecol(rand()%255,rand()%255,rand()%255),makecol(rand()%255,rand()%255,rand()%255),1+rand()%5);
	}   else if (stage==11)
	{
		title = "textout_right";
		textout_right(canvas,font,"Hello World!",rand()%SCREEN_W,rand()%SCREEN_H,rand()%48+8,makecol(rand()%255,rand()%255,rand()%255),makecol(rand()%255,rand()%255,rand()%255),1+rand()%5);
	}  else if (stage==12)
	{
		title = "getpixel";
		var x = rand()%SCREEN_W;
		var y = rand()%SCREEN_H;
		textout(canvas,font,getpixel(canvas,x,y).toString(16),x,y,24,getpixel(canvas,x,y));
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
		line(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
	}  else if (stage==16)
	{
		title = "vline";
		vline(canvas,rand()%SCREEN_W,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
	}  else if (stage==17)
	{
		title = "hline";
		hline(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
	}  else if (stage==18)
	{
		title = "triangle";
		triangle(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
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
		polygon(canvas,n,p,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
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
		rect(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
	}  else if (stage==23)
	{
		title = "rectfill";
		rectfill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,rand()%SCREEN_H,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==24)
	{
		title = "circle";
		circle(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%SCREEN_W,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
	}  else if (stage==25)
	{
		title = "circlefill";
		circlefill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%100,makecol(rand()%255,rand()%255,rand()%255));
	}  else if (stage==26)
	{
		title = "arc";
		arc(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360,rand()%360,rand()%100,makecol(rand()%255,rand()%255,rand()%255),1+rand()%8);
	}  else if (stage==27)
	{
		title = "arcfill";
		arcfill(canvas,rand()%SCREEN_W,rand()%SCREEN_H,rand()%360,rand()%360,rand()%100,makecol(rand()%255,rand()%255,rand()%255));
	}   else if (stage==28)
	{
		title = "mouse";
		line(canvas,mouse_x,mouse_y,mouse_x-mouse_mx,mouse_y-mouse_my,makecol(255,255,235),width);
		if (mouse_b&1) circlefill(canvas,mouse_x,mouse_y,20,makecol(0,0,255));
		if (mouse_b&2) circlefill(canvas,mouse_x,mouse_y,20,makecol(255,0,0));
		if (mouse_b&4) circlefill(canvas,mouse_x,mouse_y,20,makecol(0,255,0));
		
		if (mouse_pressed&1) circlefill(canvas,mouse_x,mouse_y,20,makecol(0,255,255));
		if (mouse_pressed&2) circlefill(canvas,mouse_x,mouse_y,20,makecol(255,255,0));
		if (mouse_pressed&4) circlefill(canvas,mouse_x,mouse_y,20,makecol(0,255,255));
		
		if (mouse_released&1) circlefill(canvas,mouse_x,mouse_y,20,makecol(128,255,255));
		if (mouse_released&2) circlefill(canvas,mouse_x,mouse_y,20,makecol(255,255,128));
		if (mouse_released&4) circlefill(canvas,mouse_x,mouse_y,20,makecol(128,255,255));
		width+=mouse_mz;
	}    else if (stage==29)
	{
		title = "keyboard";
		for (var c=0;c<0x7f;c++)
		{
			
			if (pressed[c])
			{
				rectfill(canvas,(c>>3)*24,(c&0xf)*24,20,20,makecol(255,255,255));
			} else if (released[c])
			{
				rectfill(canvas,(c>>3)*24,(c&0xf)*24,20,20,makecol(255,255,0));
			} else if (key[c])
			{
				rectfill(canvas,(c>>3)*24,(c&0xf)*24,20,20,makecol(255,0,0));
			} else {
				rectfill(canvas,(c>>3)*24,(c&0xf)*24,20,20,makecol(0,0,0));
			}
			
		}
	
	}  else if (stage==30)
	{
		title = "timer";
		stage=31;	
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
		 
	} else if (stage==31)
	{
		title = "timer";
	
	}   else if (stage==32)
	{
		stage=33;
		title = "sound";
		remove_all_ints();
		install_int_ex(function(){
			play_sample(beep,Math.random(),Math.random()+.5,0);
			circlefill(canvas,SCREEN_W/2,SCREEN_H/2,200,makecol(rand()%255,rand()%255,rand()%255));
		},SECS_TO_TIMER(2));
	} else if (stage==33)
	{
		title = "sound";
	
	}   else if (stage==34)
	{
		title = "The End";
		remove_all_ints();
		stage++;
	}  
	textout_centre(canvas,font,title,SCREEN_W/2,80,64,makecol(255,255,255),makecol(0,0,0),2);
	textout(canvas,font,subtitle,10,SCREEN_H-10,24,makecol(255,255,255),makecol(0,0,0),1);
	delay++;
	if (key[KEY_SPACE] && delay>10)
	{
		stretch_blit(clouds,canvas,0,0,clouds.w,clouds.h,0,0,SCREEN_W,SCREEN_H);
		stage++;
		delay=0;
	}
}

function main()
{
	enable_debug('debug');
	allegro_init_all("unittest", 640, 480);
	clouds = load_bmp("data/clouds.png");
	ball = load_bmp("data/planet.png");
	beep = load_sample("data/dtmf.mp3");

	ready(function(){
		stretch_blit(clouds,canvas,0,0,clouds.w,clouds.h,0,0,SCREEN_W,SCREEN_H);
		loop(function()
		{
			draw();		
		}, BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();

