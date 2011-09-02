function Controls(player) {
	this.mouseX = 0; 
	this.mouseY = 0;
	this.canvasMinX = 0;
	this.canvasMinY = 0;
	this.canvasMaxX = 0;
	this.canvasMaxY = 0;
	this.init =  function() {
	 document.onkeydown = this.key_event;
     document.onkeypress = this.key_event;
     document.addEventListener( 'mousemove', this.onMouseMove, false );
	}
	

	this.onMouseMove = function(evt) {
		evt.preventDefault();
		this.canvasMinX = $("canvas").offset().left;
  		this.canvasMinY = $("canvas").offset().top;
  		this.canvasMaxX = this.canvasMinX + sMain.canvas.WIDTH;
  		this.canvasMaxY = this.canvasMinY + sMain.canvas.HEIGHT;
  		// checkeo que este dentro del canvas
  		if (evt.pageX > this.canvasMinX && evt.pageX < this.canvasMaxX && evt.pageY > this.canvasMinY && evt.pageY < this.canvasMaxY) {
	  		// mueve luz dentro del stage (esto es opcional)
	    	light.position.x = (evt.pageX - (this.canvasMinX + (sMain.canvas.WIDTH/2)));
			light.position.y = (evt.pageY - (this.canvasMinY + (sMain.canvas.HEIGHT/2)))*-1;
			light.mesh.position.x = (evt.pageX - ((sMain.canvas.WIDTH/2)));
			light.mesh.position.y = (evt.pageY - ((sMain.canvas.HEIGHT/2)))*-1;
	  	}	  		
	}
	
	

	this.key_event = function(evt)
	{
		if (evt.keyCode==38)
			sMain.player.position.y -= 10;
		if (evt.keyCode==40)
			sMain.player.position.y += 10; 
		if (evt.keyCode==34)
			sMain.camera.position.z -= 5;
			sMain.camera.position.y += 5;
			
	}
}
