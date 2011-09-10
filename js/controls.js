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
	}
	

		
	

	this.key_event = function(evt)
	{
		//console.log(evt.keyCode);
		if (evt.keyCode==38)
			sMain.player.position.y += 10;
		if (evt.keyCode==40)
			sMain.player.position.y -= 10; 
		if (evt.keyCode==36) 
			sMain.camera.position.y -= 10;
		if (evt.keyCode==46) 
			sMain.camera.position.y += 10;
		if (evt.keyCode==34) 
			sMain.camera.position.z -= 10;
		if (evt.keyCode==33) {
			sMain.camera.position.z += 10;
		}
		if (evt.keyCode==80)
			sMain.stage.startMap();	
	}
}
