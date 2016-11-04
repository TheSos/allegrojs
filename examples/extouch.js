var clouds,ball;

function draw()
{
	clear_to_color(canvas, makecol(255, 255, 255));
	stretch_blit(clouds,canvas,0,0,clouds.w,clouds.h,0,0,SCREEN_W,SCREEN_H);

	for (var c=0; c<touch.length; c++)
	{
		draw_sprite(canvas,ball,touch[c].x,touch[c].y);
	}
}

function main()
{
	enable_debug("debug");

	set_gfx_mode("canvas_id", 640, 480);
	install_touch();
	install_sound();

	ball = load_bmp("data/planet.png");
	clouds = load_bmp("data/clouds.png");

	ready(function(){
		loop(function(){
			draw();
		}, BPS_TO_TIMER(60));
	});

	return 0;
}
END_OF_MAIN();
