window.onload = function() {
	LoadToolbar();
	LoadMarker();
}

function LoadMarker() {
	map.clearMap();
	GetMarkerFromDatabaseAndProcess(AddMarkerList);
}

function LoadToolbar() {
	addToolBar();
}

