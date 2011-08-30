var sMain = new Object;
	sMain.canvas = new Object;
	sMain.interval;
	sMain.canvas.WIDTH = 800;
	sMain.canvas.HEIGHT = 600;
	sMain.walls = new Array;
	sMain.fps = 60;
	sMain.currentFPS = 0;
	sMain.render = false;
	//creamos una camara webgl, un gestor de rendering y la escena
	sMain.renderer = new THREE.WebGLRenderer();
	sMain.camera = new THREE.Camera(50,(sMain.canvas.WIDTH / sMain.canvas.HEIGHT),0.5,1000); 
	sMain.scene = new THREE.Scene();
	sMain.container = $('#container');
	// iniciamos la camara a cierta distancia
	sMain.camera.position.z = 600;
//	sMain.camera.position.y = -845; //vista de lado
	
	sMain.renderer.setSize(sMain.canvas.WIDTH, sMain.canvas.HEIGHT);
	$('#container').append(sMain.renderer.domElement);
	
	sMain.renderCanvas = function () {
		if (sMain.render) {
		sMain.renderer.render(sMain.scene, sMain.camera);
		sMain.currentFPS ++;
		}
	}
	
	sMain.startRendering = function () {	
		sMain.render = true;
		sMain.interval = setInterval('sMain.renderCanvas()',1000/sMain.fps);
		sMain.showFPS = setInterval('sMain.drawFPS()',1000);
	}
	sMain.drawFPS = function () {
		$("#fps").html(sMain.currentFPS);
		sMain.currentFPS = 0;
	}
	
	sMain.stopRendering = function () {
		sMain.render = false;
		clearInterval(sMain.interval);
		clearInterval(sMain.showFPS);
	}
	
	// Creamos objetos
	var sphereMaterial = new THREE.MeshLambertMaterial(	{ color: 0xFFFFFF });
	
	//variables de la esfera
	var radio = 40, segmentos = 32, anillos= 32;
	
	//creamos el mesh a partir de la geometria que vimos antes
	sMain.player = new THREE.Mesh( new THREE.SphereGeometry(radio, segmentos, anillos),sphereMaterial);
	
	//sMain.player.dynamic = true;
	// añadimos espefera a la escena
	sMain.player.position.z = 10;
	sMain.scene.addChild(sMain.player);
	
	// creamos una luz color blanca
	var light = new THREE.PointLight( 0xFFFFFF );
	// la posicionamos
	light.position.x = 0;
	light.position.y = 0;
	light.position.z = 100;
	light.intensity = 2;	
	
	
	
	//añadir suelo
	var floor = new THREE.Mesh( new THREE.CubeGeometry( 10000, 300, 10 ), 
								new THREE.MeshLambertMaterial( { color: 0xFFD700  } )
							   );
							 
	sMain.addWall = function (){ 
	var wall = new THREE.Mesh( new THREE.CubeGeometry( 20 ,100, 500 ), 
								new THREE.MeshLambertMaterial( { color: 0xFFFFFF  } )
							  );
	sMain.walls.push(wall);
	}
	
	sMain.drawWalls = function () {
		for (var i in sMain.walls) 
			sMain.scene.addChild(sMain.walls[i]);
	}
					
	// añadiendo suelo
	sMain.scene.addChild(floor);
	// añadiendo luz
	sMain.scene.addChild(light);
	// comenzamos a renderizar
	sMain.startRendering();
	// iniciamos controles
	sMain.controls = new Controls();
	sMain.controls.init(sMain.player);