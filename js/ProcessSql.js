function GetMarkerFromDatabaseAndProcess(func) {
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			func(JSON.parse(xmlhttp.responseText));
		}
	}
	var url="../sqlprocess.php?"
		+ "process=" + 1;
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function InsertDataToDatabase(id,x,y,time,city,picname) {
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			console.log(xmlhttp.responseText);
		}
	}
	var url="../sqlprocess.php?"
		+ "process=" + 2
		+ "&id="     + id
		+ "&x="      + x 
		+ "&y="      + y 
		+ "&time="   + time
		+ "&city="   + city
	    + "&picname="+ picname;
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function DeleteDataFromDatabase(id) {
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			console.log(xmlhttp.responseText);
		}
	}
	var url="../sqlprocess.php?"
		+ "process=" + 3
		+ "&id="     + id
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
