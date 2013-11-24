var app = {
	init: function() {
		$('#satPic').hide();

		google.maps.event.addListener(map, 'click', function(ev) {
			if (app.vars.getImage)
				app.getCoords(ev);
			else
				return;

		});

		$('#getImage').click(app.activateRetrieve);
	},

	activateRetrieve: function() {
		app.vars.getImage = true;

		app.mapCursor('default');
	},

	getCoords: function(ev) {
		app.vars.coords.lat = ev.latLng.lat();
		app.vars.coords.lng = ev.latLng.lng();

		app.setImage();
	},

	setImage: function() {
		var $satPic = $('#satPic');

		app.mapCursor('progress');
		$satPic.css('background-image', 'url("http://dev1.tomnod.com/chip_api/chip/lat/' + app.vars.coords.lat + '/lng/' + app.vars.coords.lng + '")');

		//Using setTimeout to allow the image to load before showing it
		setTimeout(function() { 
			$satPic.show('scale');
			app.mapCursor('-webkit-grab');
		}, 7000);

		app.vars.getImage = false;
	},

	mapCursor: function(pointer) {
		map.setOptions( {draggableCursor: pointer} );
	},

	vars: {
		getImage: false,
		coords: { lat: 0, lng: 0 }
	}
};

$(function() {
	app.init();
})