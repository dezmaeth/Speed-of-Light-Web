function Stage() {
	this.v = 1; /* velocidad horizontal jugador inicial segun mapa */
	this.meshs = new Array; 
	this.init = function () {
		//obtener recursos
		sMain.resources.init(this.createMap); 
	}	
	
	this.addCube =  function (texture) {
		var texture = new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( texture) } );
		var material = [ texture,texture,texture,texture,texture,texture];	
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 500, 300, 10, 4, 4, 1, material ), new THREE.MeshFaceMaterial());
		return cube;
	}
	
	this.createMap = function (){
		sMain.stage.meshs.push(sMain.stage.addCube(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		
		sMain.stage.meshs.push(sMain.stage.addCube(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		
		sMain.stage.meshs.push(sMain.stage.addCube(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		
		//position
		sMain.stage.meshs[1].position.x = 500;
		
		sMain.stage.meshs[2].position.y = 320
		
	}
	
	
	this.startMap = function() {
		(function movePlayer(){
    	  	sMain.player.position.x += 2;
			sMain.camera.position.x = sMain.player.position.x;
			sMain.camera.target.position.x = sMain.player.position.x;
      		requestAnimationFrame(movePlayer);
    	})();
	}

}
