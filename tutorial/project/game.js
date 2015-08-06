var x = 100,y = 100;

function draw()
{
	textout(canvas,font,"Hello World!",x,y,24,makecol(0,0,0));
}

function update()
{
	
}

function main()
{
	enable_debug('debug');
	allegro_init_all("game_canvas", 640, 480);
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

 