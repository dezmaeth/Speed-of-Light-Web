var sMain = new Object;
	// clases globales para el sistema. 
	sMain.resources = new Resources();
	sMain.canvas = new Object;
	sMain.config = new Config();
	sMain.interval;
	sMain.render = false;
	sMain.canvas.WIDTH = sMain.config.canvasWidth;
	sMain.canvas.HEIGHT = sMain.config.canvasHeight;
	sMain.walls = new Array;
	sMain.currentFPS = 0;
	sMain.stage = new Stage();
	sMain.map;
	
	//creamos una camara webgl, un gestor de rendering y la escena
	sMain.renderer = new THREE.WebGLRenderer({ clearColor: sMain.config.clearColor,
											   clearAlpha: sMain.config.clearAlpha, 
											   antialias: sMain.config.antialias });
											   
	sMain.camera = new THREE.Camera(50,(sMain.canvas.WIDTH / sMain.canvas.HEIGHT),0.5,100000 ); 
	sMain.scene = new THREE.Scene();
	sMain.container = $('#container');
	sMain.controls = new Controls();
	// iniciamos la camara a cierta distancia
	sMain.camera.position.y = -420;
	sMain.camera.position.z = 1000;
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
		(function render(){
      	sMain.renderCanvas();
      	requestAnimationFrame(render);
    	})();
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
	light.intensity = 2;	
	// añadimos un mesh a la luz para poder verla
	light.mesh = Object;
	light.mesh = new THREE.Mesh(new THREE.SphereGeometry(20,16,16), new THREE.MeshLambertMaterial({ color:0xFFFFF}));
	light.mesh.position.z = 50;
	sMain.scene.addChild(light.mesh);

	// añadiendo luz
	sMain.scene.addChild(light);
	// comenzamos a renderizar
	sMain.startRendering();
	// iniciamos controles
	sMain.controls.init(sMain.player);
	// creamos el mapa
	sMain.stage.init();
	
	