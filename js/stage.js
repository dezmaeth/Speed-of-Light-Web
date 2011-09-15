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
	
	this.addMesh = function (mesh,callback) {
		console.log("loading:"+mesh);
		sMain.loading++;
		sMain.loader.load( { model: mesh, callback: function(geometry) {
			geometry.materials[0][0].shading = THREE.FlatShading;
		//	geometry.materials[0][0].morphTargets = true;
			var material = new THREE.MeshFaceMaterial();
			mesh = new THREE.Mesh( geometry, material );
			mesh.scale.set(50, 50, 50);
			sMain.loaded++;
			callback(mesh);
			} 
		} );
	}
	
	this.addWall =  function (texture) {
		var texture = new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( texture) } );
		var material = [ texture,texture,texture,texture,texture,texture];	
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 300, 250, 4, 4, 1, material ), new THREE.MeshFaceMaterial());
		return cube;
	}
	this.addParticleSystem = function () {
		sMain.particles = new THREE.Geometry();
		var particleCount = 1800,
    		pMaterial = new THREE.ParticleBasicMaterial({
        	color: 0xFFFFFF,
        	size: 20
    	});

		for(var p = 0; p < particleCount; p++) {

    	var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vertex(
            new THREE.Vector3(pX, pY, pZ)
	     );
    
    	sMain.particles.vertices.push(particle);
		}
		sMain.particleSystem = new THREE.ParticleSystem(
    	sMain.particles,
    	pMaterial);
		
		sMain.scene.addChild(sMain.particleSystem);
	}
	
	this.createMap = function () {
		sMain.resources.get(sMain.resources.data.stage.map,function(data) {
			map();
		}); 
	}
}
