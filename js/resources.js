function Resources() {
	this.data = null;
	this.textures = Array;
	this.track = new Audio;
	this.init = function(callback) {
		$.ajax({
  			url: 'resources.json',
  			dataType: 'json',
  			success: function (data) {
  			sMain.resources.data = data;
  			callback();
  			},
  			404: function () {
  				return null;
  			}
		});
	}
	this.get = function (path,callback) {
		$.ajax({
  			url: path,
  			dataType: 'json',
  			success: function (data) {
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
