var app = {
	init: function() {
		google.maps.event.addListener(map, 'click', function(ev) {
			if (app.vars.getImage)
				app.getCoords(ev);
			else
				return;

		});

		$('#satPic').hide();
		$('#getImage').click(app.activateRetrieve);
		$('#satPic .remove').click(app.clearImage);
		$('.imageHistory .remove').click(app.clearImage);
	},

	activateRetrieve: function() {
		app.vars.getImage = true;

		app.mapCursor('default');
	},

	getCoords: function(ev) {
		var lat = ev.latLng.lat(),
			lng = ev.latLng.lng();

		app.setImage( {lat: lat, lng: lng} );
	},

	setImage: function(coords) {
		var $satPic = $('#satPic');

		app.mapCursor('progress');
		$satPic.append('<img src="http://dev1.tomnod.com/chip_api/chip/lat/' + coords.lat + '/lng/' + coords.lng + '"></img>');

		$('#satPic img').on('load', function() { 
			$satPic.show('scale');
			app.mapCursor('-webkit-grab');
		});

		app.vars.getImage = false;
	},

	clearImage: function(ev) {
		var $parent = $(ev.target).closest('div');

		if ($parent.hasClass('imageHistory'))
			$parent.remove();
		else
			$parent.hide('scale', function() { $('#satPic img').remove() });
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