// get the incoming var
var mapCalled = document.getElementById( "mapCaller" ).getAttribute( "mapName" );
//alert ("script.js : mapCalled:"+mapCalled);
	//appel : <script id="mapCaller" src="js/script.js" mapName="blabla"></script>

// Set view of Leaflet map based on screen size
if ($(window).width() < 626) {
	var map = new L.Map('map').setView([48,2.2],6);
} else {
	var map = new L.Map('map').setView([48,2.2],7);
}


// Information for the base tile via Cloudmade
var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/ddbfdc36749d45cebdc072a14c77c5b7/997/256/{z}/{x}/{y}.png'
var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18,attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'});
// Add to map
map.addLayer(cloudmade);

/*
// BAS

// ajouter un marqueur simple
var marker = L.marker([48,2.2], {bounceOnAdd: true}).addTo(map);

// ajouter un popup
var popup = L.popup()
    .setLatLng([48,2.2])
    .setContent("I am a standalone popup.")
    .openOn(map);

// ajouter un popup qui indique où on a cliqué
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// utiliser des icones personnalisées
var inwicast = L.AwesomeMarkers.icon({icon: 'tags', prefix: 'fa', markerColor: 'orange'});
L.marker([48,3.2],{icon: inwicast}).addTo(map);
*/

// Here's the Tabletop feed
// First we'll initialize Tabletop with our spreadsheet
var jqueryNoConflict = jQuery;
jqueryNoConflict(document).ready(function(){
	initializeTabletopObject('0Ahugi99OESIJdFFsVnI3TEJZdXNxUk5DUmdPdU16cUE');
});

// Pull data from Google spreadsheet
// And push to our startUpLeaflet function
function initializeTabletopObject(dataSpreadsheet){
	Tabletop.init({
    	key: dataSpreadsheet,
    	callback: startUpLeafet,
    	simpleSheet: true,
    	debug: false
    });
}

// This function gets our data from our spreadsheet
// Then gets it ready for Leaflet.
// It creates the marker, sets location
// And plots on it on our map
function startUpLeafet(tabletopData) {

	// Tabletop creates arrays out of our data
	// We'll loop through them and create markers for each
	for (var num = 0; num < tabletopData.length; num ++) {

		// Pull in our lat, long information
		var dataLat = tabletopData[num].latitude;
		var dataLong = tabletopData[num].longitude;

		// Add to our marker
		marker_location = new L.LatLng(dataLat, dataLong);

		switch (mapCalled) {
		case "info": 
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconsolvisio, prefix: 'fa', markerColor: tabletopData[num].iconsolvisiocolor});
			// Create the marker
	    	layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
	    	// Create the popup
	    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
	    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong></div>";
	    	popup_info += "<hr />";
	    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
	    	popup_info += "<strong>Services offerts :</strong> " + tabletopData[num].servofferts + "<br />";
	    	popup_info += "<strong>Services en test :</strong> " + tabletopData[num].servtest + "<br />";
	    	popup_info += "<strong>Services en projet :</strong> " + tabletopData[num].servproj + "<br />";
	    	//popup_info += "<hr />";
	    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">EnrVid</a> - <a href=\"#\">Stream</a> - <a href=\"#\">Sondages</a> - <a href=\"#\">Divers</a><br />";
	    	popup_info += "</div>";
		break;
		case "vp":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconvp, prefix: 'fa', markerColor: tabletopData[num].iconvpcolor});

			// Create the marker
			if (tabletopData[num].iconvpcolor) {
	    		layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
				// Create the popup
		    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
		    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Vidéoprojection</div>";
		    	popup_info += "<hr />";
		    	if (tabletopData[num].contactvp0email==0) {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
		    	} else {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactvp0email + "'>" + tabletopData[num].contactvp0nom + "</a> ("+tabletopData[num].contactvp0fction+"), "+tabletopData[num].contactvp0service+"<br />";
		    	}
		    	popup_info += "<hr />";
		    	popup_info += "<strong>CM :</strong> " + tabletopData[num].vpautonomie0cm + ", éq. fixes : " + tabletopData[num].vp0volumétrie0cm0fix + ", éq. mobiles : " + tabletopData[num].vp0volumétrie0cm0mob + "<br />";
		    	popup_info += "<strong>TD :</strong> " + tabletopData[num].vp0autonomie0td + ", éq. fixes : " + tabletopData[num].vp0volumétrie0td0fix + ", éq. mobiles : " + tabletopData[num].vp0volumétrie0td0mob + "<br />";
		    	popup_info += "<strong>Réunion :</strong> " + tabletopData[num].vp0autonomie0reu + ", éq. fixes : " + tabletopData[num].vp0volumétrie0reu0fix + ", éq. mobiles : " + tabletopData[num].vp0volumétrie0reu0mob + "<br />";
		    	popup_info += "<strong>Conseils :</strong> " + tabletopData[num].vp0autonomie0cons + ", éq. fixes : " + tabletopData[num].vp0volumétrie0cons0fix + ", éq. mobiles : " + tabletopData[num].vp0volumétrie0cons0mob + "<br />";
		    	popup_info += "<strong>Événementiel :</strong> " + + tabletopData[num].vp0autonomie0even + ", éq. fixes : " + tabletopData[num].vp0volumétrie0even0fix + ", éq. mobiles : " + tabletopData[num].vp0volumétrie0even0mob + "<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Évolution envisagée :</strong> " + tabletopData[num].vp0sol0future + "<br />";
		    	//popup_info += "<hr />";
		    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">EnrVid</a> - <a href=\"#\">Stream</a> - <a href=\"#\">Sondages</a> - <a href=\"#\">Divers</a><br />";
		    	popup_info += "</div>";
	    	}
		break;
		case "visio":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconvisio, prefix: 'fa', markerColor: tabletopData[num].iconvisiocolor});

	        // Create the marker
			if (tabletopData[num].iconvisiocolor) {
	    		layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
		    	// Create the popup
		    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
		    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Visioconférences";
		    	if (tabletopData[num].visio0sol0actuelle==0) {
		    		popup_info += " / <strong>" + tabletopData[num].visio0sol0future + "</strong></div><br />";
		    	} else {
		    		popup_info += " / <strong>" + tabletopData[num].visio0sol0actuelle + "</strong></div><br />";
		    	}
		    	popup_info += "<hr />";
		    	if (tabletopData[num].contactvisio0email==0) {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
		    	} else {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactvisio0email + "'>" + tabletopData[num].contactvisio0nom + "</a> ("+tabletopData[num].contactvisio0fction+"), "+tabletopData[num].contactvisio0service+"<br />";
		    	}
		    	popup_info += "<hr />";
		    	popup_info += "<strong>CM :</strong> " + tabletopData[num].visio0autonomie0cm + ", éq. fixes : " + tabletopData[num].visio0volumétrie0cm0fix + ", éq. mobiles : " + tabletopData[num].visio0volumétrie0cm0mob + "<br />";
		    	popup_info += "<strong>TD :</strong> " + tabletopData[num].visio0autonomie0td + ", éq. fixes : " + tabletopData[num].visio0volumétrie0td0fix + ", éq. mobiles : " + tabletopData[num].visio0volumétrie0td0mob + "<br />";
		    	popup_info += "<strong>Réunion :</strong> " + tabletopData[num].visio0autonomie0reu + ", éq. fixes : " + tabletopData[num].visio0volumétrie0reu0fix + ", éq. mobiles : " + tabletopData[num].visio0volumétrie0reu0mob + "<br />";
		    	popup_info += "<strong>Conseils :</strong> " + tabletopData[num].visio0autonomie0cons + ", éq. fixes : " + tabletopData[num].visio0volumétrie0cons0fix + ", éq. mobiles : " + tabletopData[num].visio0volumétrie0cons0mob + "<br />";
		    	popup_info += "<strong>Événementiel :</strong> " + tabletopData[num].visio0autonomie0even + ", éq. fixes : " + tabletopData[num].visio0volumétrie0even0fix + ", éq. mobiles : " + tabletopData[num].visio0volumétrie0even0mob + "<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Options :</strong> " + tabletopData[num].visio0options0other + tabletopData[num].visio0sol0future0comment + "<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Solution actuelle :</strong> " + tabletopData[num].visio0sol0actuelle + tabletopData[num].visio0sol0actuelle0comment + "<br />";
		    	popup_info += "<strong>Projet d'évolution :</strong> " + tabletopData[num].visio0evolution + "<br />";
		    	popup_info += "<strong>Solution envisagée :</strong> " + tabletopData[num].visio0sol0future + tabletopData[num].visio0sol0future0comment + "<br />";
		    	popup_info += tabletopData[num].visio0remarq + "<br />";
		    	//popup_info += "<hr />";
		    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">EnrVid</a> - <a href=\"#\">Stream</a> - <a href=\"#\">Sondages</a> - <a href=\"#\">Divers</a><br />";
		    	popup_info += "</div>";
	    	}
		break;
		case "enrvid":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconenrvid, prefix: 'fa', markerColor: tabletopData[num].iconenrvidcolor});

			// Create the marker
			if (tabletopData[num].iconenrvidcolor) {
	    		layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
		    	// Create the popup
		    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
		    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Enregistrement vidéo";
		    	if (tabletopData[num].enrvid0sol0actuelle==0) {
		    		popup_info += " / <strong>" + tabletopData[num].enrvid0sol0future + "</strong></div><br />";
		    	} else {
		    		popup_info += " / <strong>" + tabletopData[num].enrvid0sol0actuelle + "</strong></div><br />";
		    	}
		    	popup_info += "<hr />";
		    	if (tabletopData[num].contactenrvid0email==0) {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
		    	} else {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactenrvid0email + "'>" + tabletopData[num].contactenrvid0nom + "</a> ("+tabletopData[num].contactenrvid0fction+"), "+tabletopData[num].contactenrvid0service+"<br />";
		    	}
		    	popup_info += "<hr />";
		    	popup_info += "<strong>CM :</strong> " + tabletopData[num].enrvid0services0cm + ", " + tabletopData[num].enrvid0autonomie0cm + ", éq. fixes : " + tabletopData[num].enrvid0volumétrie0cm0fix + ", éq. mobiles : " + tabletopData[num].enrvid0volumétrie0cm0mob + "<br />";
		    	popup_info += "<strong>TD :</strong> " + tabletopData[num].enrvid0services0td + ", " + tabletopData[num].enrvid0autonomie0td + ", éq. fixes : " + tabletopData[num].enrvid0volumétrie0td0fix + ", éq. mobiles : " + tabletopData[num].enrvid0volumétrie0td0mob + "<br />";
		    	popup_info += "<strong>Réunion :</strong> " + tabletopData[num].enrvid0services0reu + ", " + tabletopData[num].enrvid0autonomie0reu + ", éq. fixes : " + tabletopData[num].enrvid0volumétrie0reu0fix + ", éq. mobiles : " + tabletopData[num].enrvid0volumétrie0reu0mob + "<br />";
		    	popup_info += "<strong>Conseils :</strong> " + tabletopData[num].enrvid0services0cons + ", " + tabletopData[num].enrvid0autonomie0cons + ", éq. fixes : " + tabletopData[num].enrvid0volumétrie0cons0fix + ", éq. mobiles : " + tabletopData[num].enrvid0volumétrie0cons0mob + "<br />";
		    	popup_info += "<strong>Événementiel :</strong> " + tabletopData[num].enrvid0services0even + ", " + tabletopData[num].enrvid0autonomie0even + ", éq. fixes : " + tabletopData[num].enrvid0volumétrie0even0fix + ", éq. mobiles : " + tabletopData[num].enrvid0volumétrie0even0mob + "<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Diffusion :</strong> " + tabletopData[num].enrvid0diffusion0other + "<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Solution actuelle :</strong> " + tabletopData[num].enrvid0sol0actuelle + tabletopData[num].enrvid0sol0actuelle0comment + "<br />";
		    	popup_info += "<strong>Projet d'évolution :</strong> " + tabletopData[num].enrvid0evolution + "<br />";
		    	popup_info += "<strong>Solution envisagée :</strong> " + tabletopData[num].enrvid0sol0future + tabletopData[num].enrvid0sol0future0comment + "<br />";
		    	popup_info += tabletopData[num].enrvid0remarq + "<br />";
		    	//popup_info += "<hr />";
		    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">EnrVid</a> - <a href=\"#\">Stream</a> - <a href=\"#\">Sondages</a> - <a href=\"#\">Divers</a><br />";
		    	popup_info += "</div>";
	    	}
		break;
		case "stream":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconstream, prefix: 'fa', markerColor: tabletopData[num].iconstreamcolor});

			// Create the marker
			if (tabletopData[num].iconstreamcolor) {
	    		layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
		    	// Create the popup
		    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
		    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Retransmission en direct";
		    	if (tabletopData[num].stream0sol0actuelle==0) {
		    		popup_info += " / <strong>" + tabletopData[num].stream0sol0future + "</strong></div><br />";
		    	} else {
		    		popup_info += " / <strong>" + tabletopData[num].stream0sol0actuelle + "</strong></div><br />";
		    	}
		    	popup_info += "<hr />";
		    	if (tabletopData[num].contactstream0email==0) {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
		    	} else {
			    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactstream0email + "'>" + tabletopData[num].contactstream0nom + "</a> ("+tabletopData[num].contactstream0fction+"), "+tabletopData[num].contactstream0service+"<br />";
		    	}
		    	popup_info += "<hr />";
		    	popup_info += "<strong>CM :</strong> " + tabletopData[num].stream0autonomie0cm + ", éq. fixes : " + tabletopData[num].stream0volumétrie0cm0fix + ", éq. mobiles : " + tabletopData[num].stream0volumétrie0cm0mob + "<br />";
		    	popup_info += "<strong>TD :</strong> " + tabletopData[num].stream0autonomie0td + ", éq. fixes : " + tabletopData[num].stream0volumétrie0td0fix + ", éq. mobiles : " + tabletopData[num].stream0volumétrie0td0mob + "<br />";
		    	popup_info += "<strong>Réunion :</strong> " + tabletopData[num].stream0autonomie0reu + ", éq. fixes : " + tabletopData[num].stream0volumétrie0reu0fix + ", éq. mobiles : " + tabletopData[num].stream0volumétrie0reu0mob + "<br />";
		    	popup_info += "<strong>Conseils :</strong> " + tabletopData[num].stream0autonomie0cons + ", éq. fixes : " + tabletopData[num].stream0volumétrie0cons0fix + ", éq. mobiles : " + tabletopData[num].stream0volumétrie0cons0mob + "<br />";
		    	popup_info += "<strong>Événementiel :</strong> " + tabletopData[num].stream0autonomie0even + ", éq. fixes : " + tabletopData[num].stream0volumétrie0even0fix + ", éq. mobiles : " + tabletopData[num].stream0volumétrie0even0mob + "<br />";
		    	popup_info += "<hr />";
		     	popup_info += "<strong>Solution actuelle :</strong> " + tabletopData[num].stream0sol0actuelle + tabletopData[num].stream0sol0actuelle0comment + "<br />";
		    	popup_info += "<strong>Projet d'évolution :</strong> " + tabletopData[num].stream0evolution + "<br />";
		    	popup_info += "<strong>Solution envisagée :</strong> " + tabletopData[num].stream0sol0future + tabletopData[num].stream0sol0future0comment + "<br />";
		    	popup_info += tabletopData[num].stream0remarq + "<br />";
		    	//popup_info += "<hr />";
		    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">stream</a> - <a href=\"#\">Stream</a> - <a href=\"#\">Sondages</a> - <a href=\"#\">Divers</a><br />";
		    	popup_info += "</div>";
	    	}
		break;
		case "sondag":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconsondag, prefix: 'fa', markerColor: tabletopData[num].iconsondagcolor});

			// Create the marker
			if (tabletopData[num].iconsondagcolor) {
		    	layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
		    	// Create the popup
		    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
		    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Boîtiers de sondage";
		    	if (tabletopData[num].sondag0sol0actuelle==0) {
		    		popup_info += " / <strong>" + tabletopData[num].sondag0sol0future + "</strong></div><br />";
		    	} else {
		    		popup_info += " / <strong>" + tabletopData[num].sondag0sol0actuelle + "</strong></div><br />";
		    	}
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>CM :</strong> " + tabletopData[num].sondag0autonomie0cm + ", éq. fixes : " + tabletopData[num].sondag0volumétrie0cm0fix + ", éq. mobiles : " + tabletopData[num].sondag0volumétrie0cm0mob + "<br />";
		    	popup_info += "<strong>TD :</strong> " + tabletopData[num].sondag0autonomie0td + ", éq. fixes : " + tabletopData[num].sondag0volumétrie0td0fix + ", éq. mobiles : " + tabletopData[num].sondag0volumétrie0td0mob + "<br />";
		    	popup_info += "<strong>Réunion :</strong> " + tabletopData[num].sondag0autonomie0reu + ", éq. fixes : " + tabletopData[num].sondag0volumétrie0reu0fix + ", éq. mobiles : " + tabletopData[num].sondag0volumétrie0reu0mob + "<br />";
		    	popup_info += "<strong>Conseils :</strong> " + tabletopData[num].sondag0autonomie0cons + ", éq. fixes : " + tabletopData[num].sondag0volumétrie0cons0fix + ", éq. mobiles : " + tabletopData[num].sondag0volumétrie0cons0mob + "<br />";
		    	popup_info += "<strong>Événementiel :</strong> " + tabletopData[num].sondag0autonomie0even + ", éq. fixes : " + tabletopData[num].sondag0volumétrie0even0fix + ", éq. mobiles : " + tabletopData[num].sondag0volumétrie0even0mob + "<br />";
		    	popup_info += "<hr />";
		     	popup_info += "<strong>Solution actuelle :</strong> " + tabletopData[num].sondag0sol0actuelle0produit + tabletopData[num].sondag0sol0actuelle0fab + "<br />";
		    	popup_info += "<strong>Projet d'évolution :</strong> " + tabletopData[num].sondag0evolution + "<br />";
		    	popup_info += "<strong>Solution envisagée :</strong> " + tabletopData[num].sondag0sol0future0produit + tabletopData[num].sondag0sol0future0fab + "<br />";
		    	popup_info += tabletopData[num].sondag0remarq + "<br />";
		    	//popup_info += "<hr />";
		    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">sondag</a> - <a href=\"#\">sondag</a> - <a href=\"#\">Sondages</a> - <a href=\"#\">Divers</a><br />";
		    	popup_info += "</div>";
	    	}
		break;
		case "autom":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconautom, prefix: 'fa', markerColor: tabletopData[num].iconautomcolor});

			// Create the marker
			if (tabletopData[num].iconautomcolor) {
	    		layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
		    	// Create the popup
		    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
		    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Salles automatisées";
		    	if (tabletopData[num].autom0sol0actuelle==0) {
		    		popup_info += " / <strong>" + tabletopData[num].autom0sol0future + "</strong></div><br />";
		    	} else {
		    		popup_info += " / <strong>" + tabletopData[num].autom0sol0actuelle + "</strong></div><br />";
		    	}
		    	popup_info += "<hr />";
		    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
		    	popup_info += "<hr />";
		    	popup_info += "<strong>CM :</strong> " + tabletopData[num].autom0autonomie0cm + ", éq. fixes : " + tabletopData[num].autom0volumétrie0cm0fix + ", éq. mobiles : " + tabletopData[num].autom0volumétrie0cm0mob + "<br />";
		    	popup_info += "<strong>TD :</strong> " + tabletopData[num].autom0autonomie0td + ", éq. fixes : " + tabletopData[num].autom0volumétrie0td0fix + ", éq. mobiles : " + tabletopData[num].autom0volumétrie0td0mob + "<br />";
		    	popup_info += "<strong>Réunion :</strong> " + tabletopData[num].autom0autonomie0reu + ", éq. fixes : " + tabletopData[num].autom0volumétrie0reu0fix + ", éq. mobiles : " + tabletopData[num].autom0volumétrie0reu0mob + "<br />";
		    	popup_info += "<strong>Conseils :</strong> " + tabletopData[num].autom0autonomie0cons + ", éq. fixes : " + tabletopData[num].autom0volumétrie0cons0fix + ", éq. mobiles : " + tabletopData[num].autom0volumétrie0cons0mob + "<br />";
		    	popup_info += "<strong>Événementiel :</strong> " + tabletopData[num].autom0autonomie0even + ", éq. fixes : " + tabletopData[num].autom0volumétrie0even0fix + ", éq. mobiles : " + tabletopData[num].autom0volumétrie0even0mob + "<br />";
		    	popup_info += "<hr />";
		     	popup_info += "<strong>Solution actuelle :</strong> " + tabletopData[num].autom0sol0actuelle0produit + tabletopData[num].autom0sol0actuelle0fab + "<br />";
		    	popup_info += "<strong>Projet d'évolution :</strong> " + tabletopData[num].autom0evolution + "<br />";
		    	popup_info += "<strong>Solution envisagée :</strong> " + tabletopData[num].autom0sol0future0produit + tabletopData[num].autom0sol0future0fab + "<br />";
		    	popup_info += tabletopData[num].autom0remarq + "<br />";
		    	//popup_info += "<hr />";
		    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">autom</a> - <a href=\"#\">autom</a> - <a href=\"#\">automes</a> - <a href=\"#\">Divers</a><br />";
		    	popup_info += "</div>";
	    	}
		break;
		case "autr":
			// personnalize the marker
			var markerIcon = L.AwesomeMarkers.icon({icon: 'fa-bolt', prefix: 'fa', markerColor: 'green'});
			// Create the marker
			if ( tabletopData[num].autr0idbadge.length!=0 || tabletopData[num].autr0interfaceperso.length!=0 || tabletopData[num].autr0dblevp.length!=0 ) {
		    	layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});
		    	// alert ('idbadge:'+tabletopData[num].autr0idbadge.length+' interfaceperso:'+tabletopData[num].autr0interfaceperso.length+' autr0dblevp:'+tabletopData[num].autr0dblevp.length);
	    	// Create the popup
	    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
	    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Autres services</strong></div>";
	    	popup_info += "<hr />";
	    	popup_info += "<strong>Votre contact :</strong> <a href='mailto:" + tabletopData[num].contactprinc0email + "'>" + tabletopData[num].contactprinc0nom + "</a> ("+tabletopData[num].contactprincdet0fction+"), "+tabletopData[num].contactprincdet0serv+"<br />";
	    	popup_info += "<hr />";
	    	popup_info += "<strong>Identification par badge :</strong> " + tabletopData[num].autr0idbadge + "<br />";
	    	popup_info += "<strong>Interfaces personnalisées :</strong> " + tabletopData[num].autr0interfaceperso + "<br />";
	    	popup_info += "<strong>Double Vidéoprojection :</strong> " + tabletopData[num].autr0dblevp + "<br />";
	    	popup_info += tabletopData[num].autom0remarq + "<br />";
	    	//popup_info += "<hr />";
	    	//popup_info += "<strong>Onglets :</strong> <a href=\"#\">VP</a> - <a href=\"#\">Visio</a> - <a href=\"#\">autom</a> - <a href=\"#\">autom</a> - <a href=\"#\">automes</a> - <a href=\"#\">Divers</a><br />";
	    	popup_info += "</div>";
	    	}

		break;
		default :
			alert ("Carte inexistante");
		}

    	// Add to our marker
		layer_info.bindPopup(popup_info);
	
		// Add marker to our to map
		map.addLayer(layer_info);
	}

	// add legend

	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		switch (mapCalled) {
		case "info": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is INFO legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "vp": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is VP legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "visio": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is VISIO legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "enrvid": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is ENRVID legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "stream": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is STREAM legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "sondag": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is SONDAGES legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "autom": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is AUTOM legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		case "autr": 
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = ['<img src="images/tel-purple.png">','<img src="images/tel-purple.png">','<img src="images/tel-purple.png">'],
		    labels = ['inwicast','ubicast','apple'];

		div.innerHTML += "This is AUTRES legend<br>";

		for (var i = 0; i < grades.length; i++) {
		    div.innerHTML += grades[i] + ' : ' + labels[i] + '<br>';
		}
		break;
		default :
			div.innerHTML += "This is no legend<br>";
		}
		div.innerHTML += "<a href='index.html'>Home</a> - <a href='vp.html'>VP</a> - <a href='visio.html'>Visio</a> - <a href='enrvid.html'>EnrVid</a> - <a href='stream.html'>Stream</a> - <a href='sondag.html'>Sondages</a> - <a href='autom.html'>Autom</a> - <a href='autr.html'>Autres</a>";


		return div;
	};

	legend.addTo(map);

};



// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;
// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();
// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();
$('.toggle_description').click(function() {
	if (isVisibleDescription === false) {
		$('.description_box_cover').show();
		// Add Sidebar header into our description box
		// And 'Scroll to read more...' text on wide mobile screen
		$('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
		// Add the rest of our sidebar content, credit information
		$('.description_box_text').html(sidebarContent + '<br />');
		$('#caption_box').html('Credits: ' + creditsContent);
		$('.description_box').show();
		isVisibleDescription = true;
	} else {
		$('.description_box').hide();
		$('.description_box_cover').hide();
		isVisibleDescription = false;
	}
});