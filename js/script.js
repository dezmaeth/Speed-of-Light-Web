var sMain = new Object;
	sMain.canvas = new Object;
	sMain.interval;
	sMain.canvas.WIDTH = 800;
	sMain.canvas.HEIGHT = 600;
	sMain.fps = 60;
	sMain.render = false;
	//creamos una camara webgl, un gestor de rendering y la escena
	sMain.renderer = new THREE.WebGLRenderer();
	sMain.camera = new THREE.Camera(45,(sMain.canvas.WIDTH / sMain.canvas.HEIGHT),0.1,10000); 
	sMain.scene = new THREE.Scene();
	sMain.container = $('#container');
	// iniciamos la camara a cierta distancia
	sMain.camera.position.z = 600;
	
	sMain.renderer.setSize(sMain.canvas.WIDTH, sMain.canvas.HEIGHT);
	$('#container').append(sMain.renderer.domElement);
	
	sMain.renderCanvas = function () {
		if (sMain.render) {
		sMain.renderer.render(sMain.scene, sMain.camera);
		}
	}
	
	sMain.startRendering = function () {	
		sMain.render = true;
		sMain.interval = setInterval('sMain.renderCanvas()',1000/sMain.fps);
	}
	
	sMain.stopRendering = function () {
		sMain.render = false;
	}
	
	// Creamos objetos
	var sphereMaterial = new THREE.MeshLambertMaterial(	{ color: 0xFFD700 });
	
	//variables de la esfera
	var radio = 20, segmentos = 16, anillos= 16;
	
	//creamos el mesh a partir de la geometria que vimos antes
	sMain.player = new THREE.Mesh( new THREE.SphereGeometry(radio, segmentos, anillos),sphereMaterial);
	
	sMain.player.dynamic = true;
	// añadimos espefera a la escena
	sMain.scene.addChild(sMain.player);
	
	// creamos una luz color blanca
	var pointLight = new THREE.PointLight( 0xFFFFFF );
	
	
	
	// la posicionamos
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 90;
	
	// la añadimos a la escena
	sMain.scene.addChild(pointLight);
	
	
	//añadir suelo
	var floor = new THREE.Mesh( new THREE.CubeGeometry( 10000, 600, 0 ), 
								new THREE.MeshLambertMaterial( { color: 0x000000 } )
							   );
	sMain.scene.addChild(floor);
	// comenzamos a renderizar
	sMain.startRendering();
	// iniciamos controles
	sMain.controls = new Controls();
	sMain.controls.init(sMain.player);