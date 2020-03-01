function AddMarkerList(JsonList) {
	for(i=0;i<JsonList.length;++i) {
		var data=JsonList[i];
		if(marker_count < data.id)
			marker_count = data.id;
		addMarker(data.id, data.x, data.y, data.time, data.city, data.picname);
	}
}

function addMarker(id, x, y, time, city, picname) {
	var marker = new AMap.Marker({
		map       : map,
		position  : [x, y],
		animation : "AMAP_ANIMATION_DROP",
		extData   : {
			Marker_id   : id,
			Marker_city : city,
			Marker_time : time,
			Marker_pic  : picname
		}
	});
	map.add(marker);
	marker_list.push(marker);
	//鼠标点击marker弹出自定义的信息窗体
	var eventlistener=AMap.event.addListener(marker, 'click', function () {

		var infoWindow = new AMap.InfoWindow({
			isCustom : true,  //使用自定义窗体
			content  : createInfoWindow(this),
			offset   : new AMap.Pixel(16, -45),
			autoMove : true
		});

		infoWindow.open(map, marker.getPosition());
	});
	marker_listener_list.push(eventlistener);
}

function GetCityInfoByIpAndProcess(id,x, y, time) {
	//实例化城市查询类
	//自动获取用户IP，返回当前城市
	var lnglatXY = [x,y];
	var city;
	geocoder.getAddress(lnglatXY, function(status, result) {
		if (status === 'complete' && result.info === 'OK') {
			//获得了有效的地址信息:
			city = result.regeocode.formattedAddress;
			InsertDataToDatabase(id,x,y,time,city, null);
			addMarker(id,x,y,time,city, null);
		}else{
			city = 'Fail to Get Address';
		}
	});
}

function createInfoWindow(obj) {
	//实例化信息窗体
	
	var extData = obj.getExtData();
	var title =  extData.Marker_city + '<br/><span style="font-size:11px;color:#F00;">' + extData.Marker_time.substr(0,10) + '</span>'
	var content = [];

	//content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134' width='100%' height='100%' >");
	if(extData.Marker_pic == null)
		var url = '../resource/location_pic/default.jpeg';
	else
		var url = '../resource/location_pic/' + extData.Marker_pic;
	content.push("<img src=\"" + url +"\" width=\"100%\" height=\"100%\" style=\"CURSOR:hand\" onclick=\"location='https://www.baidu.com'\" )\">");

	var info = document.createElement("div");
	info.className = "custom-info input-card content-window-card";

	//可以通过下面的方式修改自定义窗体的宽高

	info.style.width = extData.Marker_city.length * 19 + "px";
	//info.style.height = "40px";
	
	// 定义顶部标题
	var top = document.createElement("div");
	var titleD = document.createElement("div");
	var closeX = document.createElement("img");
	top.className = "info-top";
	titleD.innerHTML = title;
	closeX.src = "../resource/close.gif";
	closeX.onclick = closeInfoWindow;

	top.appendChild(titleD);
	top.appendChild(closeX);
	info.appendChild(top);

	// 定义中部内容
	var middle = document.createElement("div");
	middle.className = "info-middle";
	middle.style.backgroundColor = 'white';
	middle.innerHTML = content;
	info.appendChild(middle);

	// 定义底部内容
	var bottom = document.createElement("div");
	bottom.className = "info-bottom";
	bottom.style.position = 'relative';
	bottom.style.top = '0px';
	bottom.style.margin = '0 auto';
	var sharp = document.createElement("img");
	sharp.src = "../resource/sharp.png";
	bottom.appendChild(sharp);
	info.appendChild(bottom);
	return info;
}


//构建自定义信息窗体
//function createInfoWindow(title, content) {
//var info = document.createElement("div");
//info.className = "custom-info input-card content-window-card";

//可以通过下面的方式修改自定义窗体的宽高
////info.style.width = "40px";
////info.style.height = "40px";
// 定义顶部标题
//var top = document.createElement("div");
//var titleD = document.createElement("div");
//var closeX = document.createElement("img");
//top.className = "info-top";
//var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>'
//titleD.innerHTML = title;
//closeX.src = "../resource/close.gif";
//closeX.onclick = closeInfoWindow;

//top.appendChild(titleD);
//top.appendChild(closeX);
//info.appendChild(top);

// 定义中部内容
//var middle = document.createElement("div");
//middle.className = "info-middle";
//middle.style.backgroundColor = 'white';
//middle.innerHTML = content;
//info.appendChild(middle);

// 定义底部内容
//var bottom = document.createElement("div");
//bottom.className = "info-bottom";
//bottom.style.position = 'relative';
//bottom.style.top = '0px';
//bottom.style.margin = '0 auto';
//var sharp = document.createElement("img");
//sharp.src = "../resource/sharp.png";
//bottom.appendChild(sharp);
//info.appendChild(bottom);
//return info;
//}

//关闭信息窗体
function closeInfoWindow() {
	map.clearInfoWindow();
	//infoWindow.close();
}

function ChangeMarkerStatus(obj) {
	if(is_delete_mode == true) {
		obj.innerHTML="删除标记";
		for(i=0;i<marker_list.length;i++) {
			marker_list[i].setIcon("");
		}
		for(i=0;i<marker_listener_list.length;++i) {
			AMap.event.removeListener(marker_listener_list[i]);
		}
		marker_listener_list.length=0;
		var i;
		for(i=0;i<marker_list.length;++i) {
			var eventlistener=AMap.event.addListener(marker_list[i], 'click', function () {
				var marker_object=this;
				var infoWindow = new AMap.InfoWindow({
					isCustom : true,  //使用自定义窗体
					content  : createInfoWindow(this),
					offset   : new AMap.Pixel(16, -45),
					autoMove : true
					//offset: new AMap.Pixel(1, -4)
				});

				infoWindow.open(map, marker_object.getPosition());
			});
			marker_listener_list.push(eventlistener);
		}
		is_delete_mode=false;
	} else {
		obj.innerHTML="退出删除";
		var i;
		var marker_delete_icon = new AMap.Icon({
			size: new AMap.Size(25, 34),
			image: '../resource/marker_delete_mode.png',
			imageSize: new AMap.Size(135, 40),
			imageOffset: new AMap.Pixel(-99, -3)
		});
		for(i=0;i<marker_list.length;i++) {
			marker_list[i].setIcon(marker_delete_icon);
		}
		for(i=0;i<marker_listener_list.length;++i) {
			AMap.event.removeListener(marker_listener_list[i]);
		}
		marker_listener_list.length=0;
		for(i=0;i<marker_list.length;++i) {
			var eventlistener=AMap.event.addListener(marker_list[i], 'click', function () {
				var marker_object = this;
				map.remove(marker_object);
				var index = marker_list.indexOf(marker_object);
				if (index > -1) {
					marker_list.splice(index, 1);
				}
				var Marker_id = marker_object.getExtData().Marker_id;
				DeleteDataFromDatabase(Marker_id);
			});
			marker_listener_list.push(eventlistener);
		}
		is_delete_mode=true;
	}
}
