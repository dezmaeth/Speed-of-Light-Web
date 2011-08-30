/**
 * @author Francisco Javier Henseleit Palma
 * Development Group : MCAST Game Studios
 */


var sMain = new Object;
sMain.player = new Object;
sMain.ptcls = new Array;
sMain.container = new Object;
sMain.numPtcl = 10;
sMain.render = false;
sMain.p = 1;
sMain.fps = 10;
sMain.container.w = 800;
sMain.container.h = 600;
sMain.constructor = function(key) {
	if (key == "thereuare") { 
 		var canvas = document.createElement('canvas');
 		canvas.width = sMain.container.w;
 		canvas.height = sMain.container.h;
 		ctx = canvas.getContext('2d');
 		document.getElementById('main').appendChild(canvas);		
		/* init */	
		sMain.spawnPlayer();
		sMain.spawnPtcls();
		sMain.startRendering();		
 	}
}

sMain.startRendering = function() {
	sMain.render = true;
	sMain.t=setInterval("sMain.drawFrame()",(1000/sMain.fps));	
}

sMain.drawFrame = function() {
	if (sMain.render) {
	    console.log("draw");
		//ctx.fillRect(0,0,sMain.container.w,sMain.container.h);
		sMain.updatePtcl();
		sMain.renderParticles();
		
	}	
}

sMain.stopRendering = function() {
	clearInterval(sMain.t);
	sMain.render = false;
}

sMain.renderParticles = function () {
	for (var i in sMain.ptcls) {
		ctx.drawImage(sMain.ptcls[i].img,sMain.ptcls[i].x,sMain.ptcls[i].y);
	}
}
sMain.updatePtcl = function() {
	for (var i in sMain.ptcls) {
		x = sMain.ptcls[i].x;
		y = sMain.ptcls[i].y;
		a = 100;
		b = 200;
		sMain.ptcls[i].x = (sMain.player.x + sMain.p) * sMain.ptcls[i].d;//(Math.sqrt(Math.pow(a,2)*Math.pow(b,2)-Math.pow(y,2)*Math.pow(a,2))/b);
		sMain.ptcls[i].y = sMain.player.y + ((Math.sqrt(Math.pow(a,2)*Math.pow(b,2)+Math.pow(x,2)*Math.pow(b,2))/a));
		console.log(sMain.ptcls[i].x);
		console.log(sMain.ptcls[i].y);
	}
	sMain.p+= 5;
}

sMain.createPtcl = function(i) {
		/* ptcl init */
		sMain.ptcls[i] = new Object;
		if((i % 2) == 0) 
		sMain.ptcls[i].d = -1;
		else 
		sMain.ptcls[i].d = 1;
 		sMain.ptcls[i].x = sMain.player.x;
		sMain.ptcls[i].y = sMain.player.y;
		sMain.ptcls[i].vx = 1;
		sMain.ptcls[i].vy = 1;
		sMain.ptcls[i].w = 10;
		sMain.ptcls[i].h = 10;
		sMain.ptcls[i].t = 0; 
		/* resource */
		img = new Image;
		img.src= "img/star_mini_ani.gif";
		sMain.ptcls[i].img = img;
}

sMain.spawnPlayer = function() {
	sMain.player.x = 100;
	sMain.player.y = 10;
}

sMain.spawnPtcls = function() {
	for (i=0;i<sMain.numPtcl;i++) {
		sMain.createPtcl(i);	
	} 	
}

$(document).ready(function() { 
	sMain.constructor("thereuare");
});