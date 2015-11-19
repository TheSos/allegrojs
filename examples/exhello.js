function main()
{
	// Initialising allegro.js
	allegro_init();
	
	// Selecting canvas element adn setting it up for display at 640x480
	set_gfx_mode("canvas_id", 640, 480);
	
	// Clears the screen to white
	clear_to_color(canvas,makecol(255,255,255));
	
	// Typoes 'Hello World!' message to the centre of the screen
	textout_centre(canvas,font,"Hello World!",SCREEN_W/2,SCREEN_H/2,24,makecol(0,0,0));
	
	return 0;
}
END_OF_MAIN(); 