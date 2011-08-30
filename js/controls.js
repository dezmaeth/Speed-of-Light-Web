function Controls(player) {
	this.mouseX = 0; 
	this.mouseY = 0;
	this.init =  function() {
	 document.onkeydown = this.key_event;
     document.onkeypress = this.key_event;
     document.addEventListener( 'mousemove', this.mousemove, false );
	}
	
	this.mousemove = function ( event ) { 
				this.mouseX = event.clientX;
				this.mouseY = event.clientY;
				pointLight.position.x = this.mouseX;
				pointLight.position.y = this.mouseY;
	}
	this.key_event = function(evt)
	{
		if (evt.keyCode==38)
			sMain.player.position.y -= 10;
		if (evt.keyCode==40)
			sMain.player.position.y += 10; 
	}
}
