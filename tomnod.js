var app = {
	init: function() {
		google.maps.event.addListener(map, 'dblclick', function(ev) {
			if (app.vars.getImage)
				app.getCoords(ev);
			else
				return;

		});
	},

	getCoords: function(ev) {
		console.log('lat: ' + ev.latLng.lat() + 'lng: ' + ev.latLng.lng() );
	},

	vars: {
		getImage: false
	}
};

$(function() {
	app.init();
})