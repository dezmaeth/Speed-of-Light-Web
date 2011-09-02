var sMain = new Object;
	sMain.canvas = new Object;
	sMain.interval;
	sMain.canvas.WIDTH = 1200;
	sMain.canvas.HEIGHT = 600;
	sMain.walls = new Array;
	sMain.fps = 60;
	sMain.currentFPS = 0;
	sMain.resources = new Resources();
	sMain.stage = new Stage();
	sMain.map;
	sMain.render = false;
	//creamos una camara webgl, un gestor de rendering y la escena
	sMain.renderer = new THREE.WebGLRenderer();
	sMain.camera = new THREE.Camera(50,(sMain.canvas.WIDTH / sMain.canvas.HEIGHT),0.5,100000 ); 
	sMain.scene = new THREE.Scene();
	sMain.container = $('#container');
	sMain.controls = new Controls();
	// iniciamos la camara a cierta distancia
	sMain.camera.position.z = 1800;
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
	

	
	//variables de la esfera
	var radio = 40, segmentos = 32, anillos= 32;
	
	//creamos el mesh player
	sMain.player = new THREE.Mesh( new THREE.SphereGeometry(radio, segmentos, anillos),new THREE.MeshLambertMaterial(	{ color: 0xFFFFFF }));
	sMain.player.position.z = 10;
	
	// añadimos espefera a la escena
	sMain.scene.addChild(sMain.player);
	
	// creamos una luz color blanca
	var light = new THREE.PointLight( 0xFFFFFF );
	// la posicionamos
	light.position.x = 0;
	light.position.y = 0;
	light.position.z = 100;
	light.intensity = 2;	
	// añadimos un mesh a la luz para poder verla
	light.mesh = Object;
	light.mesh = new THREE.Mesh(new THREE.SphereGeometry(20,16,16), new THREE.MeshLambertMaterial({ color:0xFFFFF}));
	sMain.scene.addChild(light.mesh);

	// añadiendo luz
	sMain.scene.addChild(light);
	// comenzamos a renderizar
	sMain.startRendering();
	// iniciamos controles
	sMain.controls.init(sMain.player);
	// creamos el mapa
	sMain.stage.init();
	
	