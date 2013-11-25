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

		$('#satPic')
			.hide()
			.on('click', '.remove', app.clearMainImage);
		$('#navbar')
			.delegate('.remove', 'click', app.clearHistoryImage)
			.delegate('.view', 'click', app.loadImage);
		$('#getImage').click(app.startRetrieve);
	},

	startRetrieve: function() {
		app.vars.getStatus = true;

		app.clearMainImage();
		app.mapCursor('default');
	},

	getCoords: function(ev) {
		var position = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
		app.vars.coords.lat = position.lat;
		app.vars.coords.lng = position.lng;

		app.setImage(position, { preventSave: false });
	},

	createImage: function(coords) {
		return $('<img class="sat" src="http://dev1.tomnod.com/chip_api/chip/lat/' + coords.lat + '/lng/' + coords.lng + '"></img>');
	},

	setImage: function(coords, options) {
		var $satPic = $('#satPic');

		app.vars.marker = new google.maps.Marker({
    		position: coords,
    		map: map,
    		title:"Latitude: " + coords.lat + "\nLongitude: " + coords.lng
		});

		app.mapCursor('progress');

		$satPic.append(app.createImage(coords));

		$('#satPic img').load(function() { 
			$satPic.show('scale');
			app.mapCursor('-webkit-grab');
		});

		if (!options.preventSave)
			app.saveImage(coords);
	},

	saveImage: function(coords) {
		var $imageHistory = $('.imageHistory');

		if ($imageHistory.length == 3)
			$imageHistory.first().remove()

		$(app.vars.historyTemplate)
			.append(app.createImage(coords))
			.attr('data-coords', JSON.stringify(coords))
			.appendTo($('#navbar'));

		$('.imageHistory:last-child img.sat').load(function() { $(this).closest('div').show('scale') });
	},

	loadImage: function(ev) {
		var coords = JSON.parse($(ev.target)
						.closest('.imageHistory')
						.attr('data-coords'));

		setTimeout(function() { app.setImage(coords, { preventSave: true }); }, 700); //give app.clearMainImage time to finish
		app.clearMainImage();
	},

	clearMainImage: function() {
		$('#satPic').hide('scale', function() { $('#satPic .sat').remove(); });

		if(!app.vars.marker.hasOwnProperty('empty')) {
			app.vars.marker.setMap(null);
			app.vars.marker = null;
		};
	},

	clearHistoryImage: function(ev) {
		$(ev.target).closest('div').remove();
	},

	mapCursor: function(pointer) {
		map.setOptions( {draggableCursor: pointer} );
	},

	vars: {
		getStatus: false,
		marker: { empty: true },
		coords: { lat: '', lng: '' },
		historyTemplate: '<div class="imageHistory"><span class="remove"><img src="./Icons/remove.png"></img></span><span class="view"><img src="./Icons/view.png"></img></span></div>'
	}
};

$(function() {
	app.init();
})