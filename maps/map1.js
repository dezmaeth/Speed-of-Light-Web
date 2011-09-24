var map = function () {
		var models = sMain.resources.data.stage.models;
		var textures = sMain.resources.data.stage.textures;		
		$("#status").html('Loading...');
		//preload
		sMain.stage.loadMeshes(function() { 
			

		$("#status").fadeOut('slow');
		//camara para este mapa
		sMain.camera.position.y = -860;
		sMain.camera.position.z = 3800;
	
	
		//creamos el mesh player		
		sMain.stage.addMesh(sMain.stage.models.star,'player',function(mesh) {
			sMain.player = mesh;
			sMain.player.speed  = 20;
			sMain.player.position.z = 0;
			sMain.player.rotation.y = 0;
			sMain.player.rotation.z = 0;
			sMain.scene.addChild(sMain.player);
		});
		
	
		// luz ambiente
	//	sMain.scene.addObject(new THREE.AmbientLight( 0x111111 ));
	
		// creamos una luz color blanca
		sMain.player.light = new THREE.PointLight( 0xFFFFFF );
		// la posicionamos
		sMain.player.light.dynamic = true;
		sMain.player.light.position.x = sMain.player.position.x;
		sMain.player.light.position.y = sMain.player.position.y;
		sMain.player.light.position.z = 40;
		sMain.player.light.intensity = 2;	
		
		// añadiendo luz
		sMain.scene.addChild(sMain.player.light);
		

	sMain.stage.asteroide = function(far){
			sMain.stage.addMesh(sMain.stage.models.asteroid,'asteroid',function(asteroid) {
			//añadir asteroide a escena
			sMain.scene.addObject(asteroid);
			THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(asteroid));
			//animar asteroide
			asteroid.position.x = sMain.player.position.x + far;
			asteroid.position.y = Math.random() * 1200 * Math.pow((-1),(parseInt(Math.random()*2)+1));
			asteroid.move = function() {
				this.rotation.y += 1/60;
      			this.rotation.x += 1/60;
      			this.position.x -= 10;
      		}
		});
	}
	
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
					sMain.player.light.position.x = sMain.player.position.x;
					sMain.player.light.position.y = sMain.player.position.y;
      				requestAnimationFrame(movePlayer);
      			} else {
					sMain.stage.playerCrash();	
      			}
    		})();
    //		sMain.resources.track.play();
			count = 0;
			(function mechanics() { 
			count ++;
			if (count>180)  {
			sMain.stage.asteroide(3000);	
			count = 0;
			}		
			requestAnimationFrame(mechanics);
		})();
		
		
		}
	
		
		
	//controles mapa
	sMain.controls.keys = function()
		{
			if( sMain.keyboard.pressed("shift+P") ) {
				sMain.scene.removeChild(sMain.player);
				sMain.stage.addParticleSystem(textures.part,10000,1000,sMain.player.position);
			}
			
			if (sMain.keyboard.pressed("W")) {
				sMain.player.position.y += 20;				
			}
			if (sMain.keyboard.pressed("S")) {
				sMain.player.position.y -= 20;				
			}
			
			
			
	/*	//console.log(evt.keyCode);
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
				sMain.stage.asteroide(1200);
				}
			if (evt.keyCode==80) {
				for (var i in sMain.stage.meshs) {
				sMain.scene.removeChild(sMain.stage.meshs[i]);	
				}
				
				//sMain.stage.startMap();
			}*/	
		}
	
	// iniciamos controles
	sMain.controls.init(sMain.player);
	});
}
