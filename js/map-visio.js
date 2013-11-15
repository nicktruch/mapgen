// MAP VISIO

alert ("map-visio/Map called : " + mapCalled);


		// personnalize the marker
		var markerIcon = L.AwesomeMarkers.icon({icon: tabletopData[num].iconvisio, prefix: 'fa', markerColor: tabletopData[num].iconvisiocolor});

        // Create the marker
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
