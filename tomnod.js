var app = {
	init: function() {
		google.maps.event.addListener(map, 'click', function(ev) {
			if (app.vars.getStatus) {
				app.vars.getStatus = false;
				app.getCoords(ev);
			}
			else
				return;
		});

		$('#satPic').hide()
		$('#getImage').click(app.startRetrieve);
		$('#satPic .remove').click(app.clearMainImage);
		$('.imageHistory .remove').click(app.clearHistoryImage);
	},

	startRetrieve: function() {
		app.vars.getStatus = true;

		app.clearMainImage();
		app.mapCursor('default');
	},

	getCoords: function(ev) {
		var lat = ev.latLng.lat(),
			lng = ev.latLng.lng();

		app.setImage( {lat: lat, lng: lng} );
	},

	createImage: function(coords) {
		return $('<img class="sat" src="http://dev1.tomnod.com/chip_api/chip/lat/' + coords.lat + '/lng/' + coords.lng + '"></img>');
	},

	setImage: function(coords) {
		var $satPic = $('#satPic');

		app.mapCursor('progress');

		$satPic.append(app.createImage(coords));

		$('#satPic img').load(function() { 
			$satPic.show('scale');
			app.mapCursor('-webkit-grab');
		});

		app.saveImage(coords);
	},

	clearMainImage: function() {
		$('#satPic').hide('scale', function() { $('#satPic .sat').remove(); });
	},

	clearHistoryImage: function(ev) {
		$(ev.target).closest('div').remove();
	},

	saveImage: function(coords) {
		var $imageHistory = $('.imageHistory');

		if ($imageHistory.length == 3)
			$imageHistory.first().remove()

		$(app.vars.historyTemplate)
			.append(app.createImage(coords))
			.appendTo($('#navbar'));

		$('.imageHistory:last-child img.sat').load(function() { $(this).closest('div').show('scale') });
	},

	mapCursor: function(pointer) {
		map.setOptions( {draggableCursor: pointer} );
	},

	vars: {
		getStatus: false,
		historyTemplate: '<div class="imageHistory"><span class="remove"><img src="./Icons/remove.png"></img></span><span class="view"><img src="./Icons/view.png"></img></span></div>'
	}
};

$(function() {
	app.init();
})