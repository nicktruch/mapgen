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
		// Our table columns
		// Change 'brewery', 'address', etc.
		// To match table column names in your table
		/*
		var dataOne = tabletopData[num].ContactPrincEtabl;
		var dataTwo = tabletopData[num].date;
		var dataThree = tabletopData[num].ville;
		var dataFour= tabletopData[num].phone;
		var dataFive = tabletopData[num].website;
		*/

		// Pull in our lat, long information
		var dataLat = tabletopData[num].latitude;
		var dataLong = tabletopData[num].longitude;

		// Add to our marker
		marker_location = new L.LatLng(dataLat, dataLong);
		// Create the marker

		// personnalize the marker
		var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconvisio, prefix: 'fa', markerColor: tabletopData[num].iconvisiocolor});

		/*
    	// icon depuis image
    	var solIcon = L.Icon.extend({
		    options: {
		        iconSize:     [50, 50],
		        iconAnchor:   [0, 0],
		        popupAnchor:  [-3, -76]
		    }
		});
		var inwicast = new solIcon({iconUrl: 'inwicast.png'}),
		    ubicast = new solIcon({iconUrl: 'ubicast.png'}),
		    orange = new solIcon({iconUrl: 'leaf-orange.png'});
		*/

    	layer_info = new L.Marker(marker_location,{icon: markerIcon, bounceOnAdd: true});


		    	// Create the popup
    	var popup_info = "<div class=popup_box" + "id=" + num + ">";
    	popup_info += "<div class='popup_box_header'><strong>" + tabletopData[num].contactprinc0etabl + "</strong><br /> Enregistrement vidéo";
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


    	// Add to our marker
		layer_info.bindPopup(popup_info);
	
		// Add marker to our to map
		map.addLayer(layer_info);
	}
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