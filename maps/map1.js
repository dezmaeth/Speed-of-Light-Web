var map = function () {
		var models = sMain.resources.data.stage.models;
		var textures = sMain.resources.data.stage.textures;
		//preload
		sMain.stage.loadMeshes(function() { 
		//camara para este mapa
		sMain.camera.position.y = -860;
		sMain.camera.position.z = 3800;
	
	
		//creamos el mesh player		
		sMain.stage.addMesh(sMain.stage.models.star,function(mesh) {
		sMain.player = mesh;
		sMain.player.speed  = 20;
		sMain.player.position.z = 50;
		sMain.player.rotation.y = 0;
		sMain.player.rotation.z = 0;
		sMain.scene.addChild(sMain.player);
		});
		
	
		// luz ambiente
		sMain.scene.addObject(new THREE.AmbientLight( 0x111111 ));
		sMain.scene.addObject(new THREE.AmbientLight( 0x111111 ));
	
		// creamos una luz color blanca
		var light = new THREE.PointLight( 0xFFFFFF );
		// la posicionamos
		light.position.x = 0;
		light.position.y = 0;
		light.position.z = 100;
		light.intensity = 1;	
		
		// añadiendo luz
		sMain.scene.addChild(light);
		
		// suelo
	//	sMain.stage.meshs.floor1 = sMain.stage.addCube(sMain.resources.data.stage.textures.floor);
		//sMain.scene.addObject(sMain.stage.meshs.floor1);
		// suelo
	
		//2do obstaculo
/*		sMain.stage.meshs.wall2 = sMain.stage.addWall(sMain.resources.data.stage.textures.floor);
		sMain.scene.addObject(sMain.stage.meshs.wall2);
		THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(sMain.stage.meshs.wall2));*/
		
		sMain.stage.asteroide = function(far){ 
				sMain.stage.addMesh(sMain.stage.models.asteroid,function(mesh) { 
				//animar asteroide
				sMain.stage.meshs.asteroide = mesh;
				sMain.scene.addObject(sMain.stage.meshs.asteroide);
				THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(sMain.stage.meshs.asteroide));
				sMain.stage.meshs.asteroide.position.x = sMain.player.position.x + 2000;
				(function rotateAsteroides(){
      				sMain.stage.meshs.asteroide.rotation.y += 1/60;
      				sMain.stage.meshs.asteroide.rotation.x += 1/60;
      				sMain.stage.meshs.asteroide.position.x -= 10;
      				requestAnimationFrame(rotateAsteroides); // fix a multiples
    			})();	
			});
		};

		
		
		
		
		//interacción mouse
		document.addEventListener( 'mousemove', this.onMouseMove, false );
		onMouseMove = function(evt) {
		evt.preventDefault();
		this.canvasMinX = $("canvas").offset().left;
  		this.canvasMinY = $("canvas").offset().top;
  		this.canvasMaxX = this.canvasMinX + sMain.canvas.WIDTH;
  		this.canvasMaxY = this.canvasMinY + sMain.canvas.HEIGHT;
  		// checkeo que este dentro del canvas
  			if (evt.pageX > this.canvasMinX && evt.pageX < this.canvasMaxX && evt.pageY > this.canvasMinY && evt.pageY < this.canvasMaxY) {
	  			// mueve luz dentro del stage (esto es opcional)
	    		light.position.x = sMain.player.position.x+(evt.pageX - ((sMain.canvas.WIDTH/2)));
				light.position.y = sMain.player.position.y+(evt.pageY - ((sMain.canvas.HEIGHT/2)))*-1;
				light.mesh.position.x = sMain.player.position.x+(evt.pageX - ((sMain.canvas.WIDTH/2)));
				light.mesh.position.y = sMain.player.position.y+(evt.pageY - ((sMain.canvas.HEIGHT/2)))*-1;
	  		}	  		
		}
		
		//mecanicas
		sMain.stage.playerCrash = function () {
			sMain.scene.removeChild(sMain.player);
			sMain.resources.track.pause();
			sMain.stage.addParticleSystem(textures.part,100,1000,sMain.player.position);
			//sMain.render = false;
		}
	
		sMain.stage.startMap = function() {
			(function movePlayer(){
    	  		sMain.player.position.x += sMain.player.speed;
				var x = THREE.Collisions.rayCastNearest(new THREE.Ray(sMain.player.position, new THREE.Vector3(0,0,1)));
				if (!x) {
					sMain.camera.position.x = sMain.player.position.x;
					sMain.camera.target.position.x = sMain.player.position.x;
					sMain.scene.lights[0].position.x = sMain.player.position.x;
					sMain.scene.lights[0].position.y = sMain.player.position.y;
      				requestAnimationFrame(movePlayer);
      			} else {
					sMain.stage.playerCrash();	
      			}
    		})();
    //		sMain.resources.track.play();
		}
		
		//controles mapa
		
	sMain.controls.key_event = function(evt)
		{
		console.log(evt.keyCode);
			if (evt.keyCode==38)
				sMain.player.position.y += 20;
			if (evt.keyCode==40)
				sMain.player.position.y -= 20; 
			if (evt.keyCode==36) 
				sMain.camera.position.y -= 10;
			if (evt.keyCode==46) 
				sMain.camera.position.y += 10;
			if (evt.keyCode==34) 
				sMain.camera.position.z -= 10;
			if (evt.keyCode==33) {
				sMain.camera.position.z += 10;
				}
			if (evt.keyCode==82) {
				sMain.stage.asteroide();
				}
			if (evt.keyCode==80) {
				for (var i in sMain.stage.meshs) {
				sMain.scene.removeChild(sMain.stage.meshs[i]);	
				}
				sMain.scene.removeChild(sMain.player);
				sMain.stage.addParticleSystem(textures.part,10000,1000,sMain.player.position);
				//sMain.stage.startMap();
			}	
		}
	
	// iniciamos controles
	sMain.controls.init(sMain.player);
	});
}
