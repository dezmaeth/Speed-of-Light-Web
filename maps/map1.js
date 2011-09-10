var map = function () {
		//creamos el mesh player
		sMain.player = new THREE.Mesh( new THREE.SphereGeometry(40, 32, 32),new THREE.MeshLambertMaterial(	{ color: 0xFFFFFF }));
		sMain.player.position.z = 50;
	
		// añadimos espefera a la escena
		sMain.scene.addChild(sMain.player);
	
		// luz ambiente
		sMain.scene.addObject(new THREE.AmbientLight( 0x111111 ));
	
		// creamos una luz color blanca
		var light = new THREE.PointLight( 0xFFFFFF );
	// la posicionamos
		light.position.x = 0;
		light.position.y = 0;
		light.position.z = 100;
		light.intensity = 1;	
		// añadimos un mesh a la luz para poder verla
		light.mesh = Object;
		light.mesh = new THREE.Mesh(new THREE.SphereGeometry(20,16,16), new THREE.MeshLambertMaterial({ color:0xFFFFF}));
		light.mesh.position.z = 50;
		sMain.scene.addChild(light.mesh);
		
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
		sMain.stage.addMesh('models/asteroide.js','asteroid',function() { 
			//animar asteroide
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
}
