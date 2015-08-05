function main()
{
	allegro_init();
	set_gfx_mode("canvas_id", 640, 480);
	clear_to_color(canvas,makecol(255,255,255));
	textout_centre(canvas,font,"Hello World!",SCREEN_W/2,SCREEN_H/2,24,makecol(0,0,0));
	return 0;
}
END_OF_MAIN();