// Globally declared bitmap object
var logo;

function main()
{
	// Initialises jAllegro
	allegro_init();
	
	// Installs graphics at given canvas in 640x480 resolution
	set_gfx_mode("canvas_id", 640, 480);
	
	// Loads an image into the bitmap object
	logo = load_bmp("data/allegro.png");
	
	
	// the following function will get called as soon 
	// as the image finishes loading
	ready(function(){
		// renders the loaded image on the screen
		stretch_blit(logo,canvas,0,0,logo.w,logo.h,0,0,SCREEN_W,SCREEN_H);
	});
	return 0;
}
END_OF_MAIN();

 