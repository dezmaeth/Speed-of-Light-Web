function Resources() {
	this.data = null;
	this.textures = Array;
	this.meshs = Array;
	this.track = new Audio;
	this.init = function(callback) {	
		$.ajax({
  			url: 'resources.json',
  			dataType: 'json',
  			success: function (data) {		
  			sMain.resources.data = data;
  			if (sMain.resources.data) {
  			console.log("resources loaded");
  			callback();
  				} else {
  			console.log("fatal error, couldn't load resources file");	
  				}
  			}
		});
	}
	this.get = function (path,callback) {
		sMain.loading++;
		console.log('loading:'+path);
		$.ajax({
  			url: path,
  			dataType: 'script',
  			success: function (data) {
  			sMain.loaded++;
  			callback(data);
  			},
  			404: function () {
  				return null;
  			}
		});
	}
	this.preloadMusic = function () {
		sMain.resources.track.src = "music/stage1/1.ogg";
		sMain.resources.track.autoplay = false;
		sMain.resources.track.load();
	}
}
