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
		var cube = sMain.stage.addCube(sMain.resources.data.stage.textures.floor);
		sMain.scene.addObject(cube);
	}
	
	
	this.startMap = function() {
		sMain.player.movement = setInterval('sMain.stage.movePlayer()',2000/sMain.fps);
	}
	
	this.movePlayer = function () {
		sMain.player.position.x += 1;
		sMain.camera.target.position
	}
	
		

}
