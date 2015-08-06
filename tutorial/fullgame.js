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
	buzz = load_bmp('project/buzz.png');
	splat = load_bmp('project/splat.png');
	weapon  = load_bmp('project/weapon.png');
	weapon2  = load_bmp('project/weapon2.png');
	miss = load_sample("project/miss.mp3");
	hit = load_sample("project/hit.mp3");
	deaths = create_bitmap(SCREEN_W,SCREEN_H);
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

 