// 变量初始化

var marker_list=new Array();
var marker_listener_list=new Array();
var is_delete_mode=false;

var marker_count=0;
var geocoder;
if(!geocoder){
	geocoder = new AMap.Geocoder({
		city: "", //城市设为北京，默认：“全国”
	});
}
if (window.XMLHttpRequest) 
	xmlhttp=new XMLHttpRequest();
else 
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

var map = new AMap.Map('container', {
	// zoom: 5,//缩放层级
	zoom: 12,//缩放层级
	// center:[108.55,34.32],//当前地图中心点
	resizeEnable: true//调整窗口大小
});

document.getElementById('adcode').innerHTML='当前城市adcode：'+map.getAdcode()+'<br>'+ '当前中心点：'+map.getCenter() 

//为地图注册click事件获取鼠标点击出的经纬度坐标
map.on('click', function(e) {
	var x=e.lnglat.getLng();
	var y=e.lnglat.getLat();

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours(); 
    var minute = date.getMinutes() + 1;
    var second = date.getSeconds() + 1;
	var time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

	marker_count = marker_count + 1;
	GetCityInfoByIpAndProcess(marker_count,x,y,time);
	document.getElementById("lnglat").value = x + ',' + y
	//addMarker(marker_count, x, y, );
});

