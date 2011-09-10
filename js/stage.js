function Stage() {
	this.v = 1; /* velocidad horizontal jugador inicial segun mapa */
	this.meshs = new Object; 
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
	
	this.addMesh = function (mesh,key,callback) {
		sMain.loader.load( { model: mesh, callback: function(geometry) {
			geometry.materials[0][0].shading = THREE.FlatShading;
		//	geometry.materials[0][0].morphTargets = true;
			var material = new THREE.MeshFaceMaterial();
			mesh = new THREE.Mesh( geometry, material );
			mesh.scale.set(50, 50, 50);
			sMain.stage.meshs[key] = mesh;
			sMain.scene.addObject(sMain.stage.meshs[key]);
			callback();
			} 
		} );
	}
	
	this.addWall =  function (texture) {
		var texture = new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( texture) } );
		var material = [ texture,texture,texture,texture,texture,texture];	
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 300, 250, 4, 4, 1, material ), new THREE.MeshFaceMaterial());
		return cube;
	}
	this.createMap = function () {
		console.log("getting");
		console.log(sMain.resources.data.stage.map);
		sMain.resources.get(sMain.resources.data.stage.map,function(data) {
			map();
		}); 
	}
	
	this.playerCrash = function () {
		sMain.resources.track.pause();
	}
	
	this.startMap = function() {
		(function movePlayer(){
    	  	sMain.player.position.x += 2;
    	  	var ray = new THREE.Ray(sMain.player.position, new THREE.Vector3(0,0,10));
			var c = THREE.Collisions.rayCastNearest(ray);
			if (!c) { //test
			sMain.camera.position.x = sMain.player.position.x;
			sMain.camera.target.position.x = sMain.player.position.x;
			sMain.scene.lights[0].position.x = sMain.player.position.x;
			sMain.scene.lights[0].position.y = sMain.player.position.y;
      		requestAnimationFrame(movePlayer);
      		} else {
			sMain.stage.playerCrash();
      		}
    	})();
    	sMain.resources.track.play();
	}
}
