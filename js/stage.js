function Stage() {
	this.v = 1; /* velocidad horizontal jugador inicial segun mapa */
	this.meshs = new Array; 
	this.init = function () {
		//obtener recursos
		sMain.resources.init(this.createMap);
		//pre cargar musica 
		sMain.resources.preloadMusic();
	}	
	
	this.addCube =  function (texture) {
		var texture = new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( texture) } );
		var material = [ texture,texture,texture,texture,texture,texture];	
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 500, 300, 10, 4, 4, 1, material ), new THREE.MeshFaceMaterial());
		return cube;
	}
	
	this.addWall =  function (texture) {
		var texture = new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( texture) } );
		var material = [ texture,texture,texture,texture,texture,texture];	
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 300, 250, 4, 4, 1, material ), new THREE.MeshFaceMaterial());
		return cube;
	}
	this.createMap = function (){
		// suelo
		sMain.stage.meshs.push(sMain.stage.addCube(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		// suelo
		sMain.stage.meshs.push(sMain.stage.addCube(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		// suelo
		sMain.stage.meshs.push(sMain.stage.addCube(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		// 1er obstaculo
		sMain.stage.meshs.push(sMain.stage.addWall(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(sMain.stage.meshs[sMain.stage.meshs.length-1]));
		
		//2do obstaculo
		sMain.stage.meshs.push(sMain.stage.addWall(sMain.resources.data.stage.textures.floor));
		sMain.scene.addObject(sMain.stage.meshs[sMain.stage.meshs.length-1]);
		THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(sMain.stage.meshs[sMain.stage.meshs.length-1]));
		//position
		sMain.stage.meshs[1].position.x = 500;
		
		sMain.stage.meshs[2].position.y = 320;
		//
		sMain.stage.meshs[3].position.x = 600;
		sMain.stage.meshs[3].position.z = 130;
		//
		sMain.stage.meshs[4].position.x = 1200;
		sMain.stage.meshs[4].position.y = 300;
		sMain.stage.meshs[4].position.z = 130;
		//camara para este mapa
		sMain.camera.position.y = -860;
		sMain.camera.position.z = 1000;
	}
	
	this.playerCrash = function () {
		sMain.resources.track.pause();
	}
	
	this.startMap = function() {
		(function movePlayer(){
    	  	sMain.player.position.x += 2;
    	  	var ray = new THREE.Ray(sMain.player.position, new THREE.Vector3(0,0,10));
			var c = THREE.Collisions.rayCastNearest(ray);
			if (c==null) {
			sMain.camera.position.x = sMain.player.position.x;
			sMain.camera.target.position.x = sMain.player.position.x;
      		requestAnimationFrame(movePlayer);
      		} else {
			sMain.stage.playerCrash();
      		}
    	})();
    	sMain.resources.track.play();
	}
}
