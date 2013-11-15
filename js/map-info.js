// MAP INFO

alert ("map-info/Map called : " + mapCalled);

		// personnalize the marker
		var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconsolvisio, prefix: 'fa', markerColor: tabletopData[num].iconsolvisiocolor});

		// Create the marker
    	layer_info = new L.Marker(marker_location,{icon: markerIcon},{bounceOnAdd: true});

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
