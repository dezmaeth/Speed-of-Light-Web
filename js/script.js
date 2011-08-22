/**
 * @author Francisco Javier Henseleit Palma
 * Development Group : MCAST Game Studios
 */


var sMain = new Object;
sMain.ptcls = new Array;
sMain.container = new Object;
sMain.numPtcl = 10;
sMain.render = false;
sMain.fps = 30;
sMain.container.w = 800;
sMain.container.h = 600;
sMain.constructor = function(key) {
	if (key == "thereuare") { 
 		var canvas = document.createElement('canvas');
 		canvas.width = sMain.container.w;
 		canvas.height = sMain.container.h;
 		ctx = canvas.getContext('2d');
 		document.getElementById('main').appendChild(canvas);		
		/* create ptcls */
		for (i=0;i<sMain.numPtcl;i++) {
		sMain.createPtcl(i);	
		} 		
 	}
}

sMain.startRendering = function() {
	sMain.t=setInterval("sMain.drawFrame()",(1000/sMain.fps));	
}

sMain.drawFrame = function() {
	    console.log("draw");
		ctx.fillRect(0,0,sMain.container.w,sMain.container.h);
		sMain.updatePtcl();
		sMain.renderParticles();	
}

sMain.stopRendering = function() {
	clearInterval(sMain.t);
}

sMain.renderParticles = function () {
	for (var i in sMain.ptcls) {
		ctx.drawImage(sMain.ptcls[i].img,sMain.ptcls[i].x,sMain.ptcls[i].y);
	}
}
sMain.updatePtcl = function() {
	for (var i in sMain.ptcls) {
		sMain.ptcls[i].x = Math.random()*sMain.container.w; 
		sMain.ptcls[i].y = Math.random()*sMain.container.h; 
	}
}

sMain.createPtcl = function(i) {
		/* ptcl init */
		sMain.ptcls[i] = new Object;
 		sMain.ptcls[i].x = Math.random()*sMain.container.w;
		sMain.ptcls[i].y = Math.random()*sMain.container.h;
		sMain.ptcls[i].v = 1;
		sMain.ptcls[i].w = 10;
		sMain.ptcls[i].h = 10;
		/* resource */
		img = new Image;
		img.src= "img/star_mini.png";
		sMain.ptcls[i].img = img;
}


$(document).ready(function() { 
	sMain.constructor("thereuare");
});