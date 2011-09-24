var sMain = new Object;
	// clases globales para el sistema.
	sMain.loading=0;
	sMain.loaded=0; 
	sMain.resources = new Resources();
	sMain.canvas = new Object;
	sMain.config = new Config();
	sMain.interval;
	sMain.render = false;
	sMain.canvas.WIDTH = sMain.config.canvasWidth;
	sMain.canvas.HEIGHT = sMain.config.canvasHeight;
	sMain.walls = new Array;
	sMain.currentFPS = 0;
	sMain.editing = false;
	sMain.stage = new Stage();
	sMain.loader = new THREE.JSONLoader();
	sMain.keyboard = new THREEx.KeyboardState();
	sMain.map;
	
	//creamos una camara webgl, un gestor de rendering y la escena
	sMain.renderer = new THREE.WebGLRenderer({ clearColor: sMain.config.clearColor,
											   clearAlpha: sMain.config.clearAlpha, 
											   antialias: sMain.config.antialias });
	sMain.renderer.id = "canv";										   
	sMain.camera = new THREE.Camera(50,(sMain.canvas.WIDTH / sMain.canvas.HEIGHT),0.5,100000 ); 
	sMain.scene = new THREE.Scene();
	sMain.container = $('#main');
	sMain.controls = new Controls();
	// iniciamos la camara a cierta distancia
	
	sMain.renderer.setSize(sMain.canvas.WIDTH, sMain.canvas.HEIGHT);
	sMain.container.append(sMain.renderer.domElement);
	
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
      	if (typeof(sMain.controls.keys) == 'function')
      	sMain.controls.keys();
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
	// comenzamos a renderizar
	sMain.startRendering();
	//cuando termine de cargar iniciamos el mapa
	sMain.stage.init();	
	