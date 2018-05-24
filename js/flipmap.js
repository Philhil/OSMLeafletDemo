//  //map.on('moveend', onMapMove);
//function onMapMove(e) { askForPlots(); }

// set up AJAX request
/*ajaxRequest=getXmlHttpObject();

function getXmlHttpObject() {
	if (window.XMLHttpRequest) { return new XMLHttpRequest(); }
	if (window.ActiveXObject)  { return new ActiveXObject("Microsoft.XMLHTTP"); }
	return null;
}

function stateChanged() {
	// if AJAX returned a list of markers, add them to the map
	if (ajaxRequest.readyState==4) {
		//use the info here that was returned
		if (ajaxRequest.status==200) {
			plotlist=eval("(" + ajaxRequest.responseText + ")");
			removeMarkers();
			for (i=0;i<plotlist.length;i++) {
				var plotll = new L.LatLng(plotlist[i].lat,plotlist[i].lon, true);
				var plotmark = new L.Marker(plotll);
				plotmark.data=plotlist[i];
				map.addLayer(plotmark);
				plotmark.bindPopup("<h3>"+plotlist[i].name+"</h3>"+plotlist[i].details);
				plotlayers.push(plotmark);
			}
		}
	}
}*/

function removeMarkers() {
	for (i=0;i<plotlayers.length;i++) {
		map.removeLayer(plotlayers[i]);
	}
	plotlayers=[];
}

/*function askForPlots() {
	// request the marker info with AJAX for the current bounds
	var bounds=map.getBounds();
	var minll=bounds.getSouthWest();
	var maxll=bounds.getNorthEast();
	var msg='leaflet/findbybbox.cgi?format=leaflet&bbox='+minll.lng+','+minll.lat+','+maxll.lng+','+maxll.lat;
	ajaxRequest.onreadystatechange = stateChanged;
	ajaxRequest.open('GET', msg, true);
	ajaxRequest.send(null);
}*/


function addCoordGrabber(mapid) {
  // Managed Click for Location Info (get Koordinaten für neue Freifunk Nodes)
	var logo= L.control({
		    position : 'topleft'
		});
	logo.onAdd = function(mapid) {
	    this._div = L.DomUtil.create('div', 'myControl');
	    var img_log = '<div id="locationInfo"><img src=\"images/locationbar.png\"></img></div>';

	    this._div.innerHTML = img_log;
	    return this._div;

	};
	logo.addTo(map);

  $("#locationInfo").on("click", function() {
		$('.leaflet-container').css('cursor','crosshair');
		mapid.addOneTimeEventListener("click", function (e) {
			function clickhandler(e) {
				$("#modal_latitude").val(e.latlng.lat);
				$("#modal_longitude").val(e.latlng.lng);
				$("#modal_latlong").val(e.latlng.lat + "," + e.latlng.lng);
				$(".modal-geo").modal('show');
		      	mapid.off("click", clickhandler);
				$('.leaflet-container').css('cursor','');
		   };

		    var clickevent = mapid.on('click', clickhandler);
		});
	});
}
