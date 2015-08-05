function main()
{
	allegro_init();
	set_gfx_mode("unittest", 640, 480);
	logo = load_bmp("allegro.png");
	
	ready(function(){
		stretch_blit(logo,canvas,0,0,logo.w,logo.h,0,0,SCREEN_W,SCREEN_H);
	});
	return 0;
}
END_OF_MAIN();

