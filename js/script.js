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
sMain.fps = 15;
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
		ctx.fillRect(0,0,sMain.container.w,sMain.container.h);
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
		sMain.ptcls[i].x += 2;
		if (sMain.ptcls[i].x>(sMain.player.x+50))
		sMain.ptcls[i].y += (Math.floor(Math.random()*5)*sMain.ptcls[i].d);
		else 
		sMain.ptcls[i].y += (Math.floor(Math.random()*5)*(sMain.ptcls[i].d));
	}
}

sMain.createPtcl = function(i) {
		/* ptcl init */
		sMain.ptcls[i] = new Object;
		if((i % 2) == 0) 
		sMain.ptcls[i].d = -1;
		else 
		sMain.ptcls[i].d = 1;
 		sMain.ptcls[i].x = sMain.player.x+(i*10);
		sMain.ptcls[i].y = sMain.player.y;
		sMain.ptcls[i].v = 1;
		sMain.ptcls[i].w = 10;
		sMain.ptcls[i].h = 10;
		/* resource */
		img = new Image;
		img.src= "img/star_mini_ani.gif";
		sMain.ptcls[i].img = img;
}

sMain.spawnPlayer = function() {
	sMain.player.x = 100;
	sMain.player.y = 300;
}

sMain.spawnPtcls = function() {
	for (i=0;i<sMain.numPtcl;i++) {
		sMain.createPtcl(i);	
	} 	
}

$(document).ready(function() { 
	sMain.constructor("thereuare");
});