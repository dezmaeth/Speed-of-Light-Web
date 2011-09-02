function Resources() {
	this.data = null;
	this.textures = Array;
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

	
	
}