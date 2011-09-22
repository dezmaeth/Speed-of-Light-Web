function Stage() {
	this.v = 1; /* velocidad horizontal jugador inicial segun mapa */
	this.meshs = new Object; 
	this.models = new Object;
	this.init = function () {
		//obtener recursos
		console.log("creating map");
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
	
	this.loadMeshes = function (call) {
		for (var id in sMain.resources.data.stage.models) {
				sMain.loading++;
				path = sMain.resources.data.stage.models[id].value;
				console.log("loading: "+path);
				sMain.stage.models[id] =  new THREE.JSONLoader();
				sMain.stage.models[id].load( { model: path, callback: 
				(function(id,call) {
					return function (geometry) {
					console.log("se cargo: "+id);
					sMain.stage.models[id] = geometry;
					sMain.loaded++;
						if (sMain.loading==sMain.loaded) {
							call();	
						}
					}
					})(id,call)
			});		
		}
	}	
	
	this.addMesh = function (geometry,callback) {
			geometry.materials[0][0].shading = THREE.FlatShading;
		//	geometry.materials[0][0].morphTargets = true;
			var material = new THREE.MeshFaceMaterial();
			mesh = new THREE.Mesh( geometry, material );
			mesh.scale.set(50, 50, 50);
			callback(mesh); 
	}
	
	this.addWall =  function (texture) {
		var texture = new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( texture) } );
		var material = [ texture,texture,texture,texture,texture,texture];	
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 300, 250, 4, 4, 1, material ), new THREE.MeshFaceMaterial());
		return cube;
	}
	this.addParticleSystem = function(ptclText,ptcls,str,pos) {
		sMain.particles = new THREE.Geometry();
		var particleCount = ptcls;
		var pMaterial = new THREE.ParticleBasicMaterial({
        	color: 0xFFFFFF,
        	size: 300,
        	map: THREE.ImageUtils.loadTexture(ptclText) 
    	});
		for(var p = 0; p < particleCount; p++) {
    	var pX = pos.x,
        pY = pos.y,
        pZ = pos.z,
        particle = new THREE.Vertex(
            new THREE.Vector3(pX, pY, pZ)
	     );
    	particle.dx = ((Math.random()*100) * Math.pow((-1),(parseInt(Math.random()*2)+1)));
    	particle.dy = ((Math.random()*100) * Math.pow((-1),(parseInt(Math.random()*2)+1)));
    	particle.dz = ((Math.random()*100) * Math.pow((-1),(parseInt(Math.random()*2)+1)));
    	sMain.particles.vertices.push(particle);
		}
		
		sMain.particleSystem = new THREE.ParticleSystem(
    	sMain.particles,
    	pMaterial);
		sMain.scene.addChild(sMain.particleSystem);
		
		for(var p = 0; p < particleCount; p++) {
			var par = sMain.particleSystem.geometry.vertices[p];
			par.position.x += par.dx;
			par.position.y += par.dy;
			par.position.z += par.dz;
		}
		sMain.particleSystem.sortParticles = true;
		(function explota() { 
		sMain.particleSystem.rotation.y += 0.001;
		sMain.particleSystem.rotation.x -= 0.001;
		for(var p in sMain.particleSystem.geometry.vertices) {
			var par = sMain.particleSystem.geometry.vertices[p];
			par.dist = Math.sqrt(Math.pow(par.position.x,2) + Math.pow(par.position.y,2) + Math.pow(par.position.z,2));
			par.position.x = par.position.x + par.dx * (1 + (str/par.dist));
			par.position.y = par.position.y + par.dy * (1 + (str/par.dist));
			par.position.z = par.position.z + par.dz * (1 + (str/par.dist));
		}
		//if (t)
		requestAnimationFrame(explota);
		})();
	}
	
	this.createMap = function () {
		sMain.resources.get(sMain.resources.data.stage.map,function(data) {
			console.log("map created");
			map();
		}); 
	}
}
