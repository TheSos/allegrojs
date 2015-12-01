var num=0,speed=3;
var x=[],y=[],vx=[],vy=[];
var last_time = 0;
var buffer;
function main()
{
	
	enable_debug('debug');
	set_gfx_mode("stress", 640, 480,true);
	bmp = load_bmp("data/planet.png");
	buffer = create_bitmap(SCREEN_W,SCREEN_H);
	ready(function(){
		loop(function(){
			clear_to_color(buffer,makecol(255,255,255));
			
			for(var c=0;c<num;c++)
			{
				draw_sprite(buffer,bmp,x[c],y[c]);
				if (x[c]+vx[c]>SCREEN_W) {vx[c]=-abs(vx[c]);}
				if (y[c]+vy[c]>SCREEN_H) {vy[c]=-abs(vy[c]);}
				if (x[c]+vx[c]<-64) {vx[c]=abs(vx[c]);}
				if (y[c]+vy[c]<-64) {vy[c]=abs(vy[c]);}
				x[c]+=vx[c];
				y[c]+=vy[c];
			}
			
			x.push(rand()%SCREEN_W);
			y.push(rand()%SCREEN_H);
			vx.push(frand()*2-1);
			vy.push(frand()*2-1);
			num++;
			var msec = (time()-last_time)-1;
			textout(buffer,font,"Sprites: " + num + " took " + msec + " msec ( " + (1000/msec).toFixed() + " fps)",20,20,24,makecol(255,255,255)); 
			simple_blit(buffer,canvas,0,0);
			last_time = time();
		},MSEC_TO_TIMER(1));
	});
	return 0;
}
END_OF_MAIN();

 