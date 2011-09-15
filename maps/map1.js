var map = function () {
		//creamos el mesh player
		sMain.stage.addMesh(sMain.resources.data.stage.models.star,function(mesh) {
		sMain.player = mesh;
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
		sMain.stage.meshs.floor1 = sMain.stage.addCube(sMain.resources.data.stage.textures.floor);
		sMain.scene.addObject(sMain.stage.meshs.floor1);
		// suelo
		sMain.stage.meshs.floor2 = sMain.stage.addCube(sMain.resources.data.stage.textures.floor);
		sMain.scene.addObject(sMain.stage.meshs.floor2);
		// suelo
		sMain.stage.meshs.floor3 = sMain.stage.addCube(sMain.resources.data.stage.textures.floor);
		sMain.scene.addObject(sMain.stage.meshs.floor3);
		// 1er obstaculo
		sMain.stage.meshs.wall = sMain.stage.addWall(sMain.resources.data.stage.textures.wall);
		sMain.scene.addObject(sMain.stage.meshs.wall);
		THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(sMain.stage.meshs.wall));
		
		//2do obstaculo
		sMain.stage.meshs.wall2 = sMain.stage.addWall(sMain.resources.data.stage.textures.floor);
		sMain.scene.addObject(sMain.stage.meshs.wall2);
		THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(sMain.stage.meshs.wall2));
		
		// 1er modelo TARARAAAANNN!!!
		sMain.stage.addMesh(sMain.resources.data.stage.models.asteroid,function(mesh) { 
			//animar asteroide
			sMain.stage.meshs.asteroid = mesh;
			sMain.scene.addObject(sMain.stage.meshs.asteroid);
			sMain.stage.meshs.asteroid.position.y = 800;
			(function rotateAsteroids(){
      		sMain.stage.meshs.asteroid.rotation.y += 1/60;
      		sMain.stage.meshs.asteroid.rotation.x += 1/60;
      		requestAnimationFrame(rotateAsteroids);
    		})();	
		});
		
		
		//position
		sMain.stage.meshs.floor2.position.x = 500;
		
		sMain.stage.meshs.floor2.position.y = 320;
		//
		sMain.stage.meshs.wall.position.x = 600;
		sMain.stage.meshs.wall.position.z = 130;
		//
		sMain.stage.meshs.wall2.position.x = 1200;
		sMain.stage.meshs.wall2.position.y = 300;
		sMain.stage.meshs.wall2.position.z = 130;
		//camara para este mapa
		sMain.camera.position.y = -860;
		sMain.camera.position.z = 1000;
		
		
		
		
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
		this.playerCrash = function () {
			//sMain.render = false;
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
    		//sMain.resources.track.play();
		}
		
		//controles mapa
		
		
		
		
}
