<?php
$fileArr = $_FILES['mf'];
//设置预览目录,上传成功的路径
$previewPath = "./video_resource/";
$ext = pathinfo($fileArr['name'], PATHINFO_EXTENSION);//获取当前上传文件扩展名
$arrExt = array('3gp','rmvb','flv','wmv','avi','mkv','mp4','mp3','wav',);
if(!in_array($ext, $arrExt)) {
	exit(json_encode(-1,JSON_UNESCAPED_UNICODE));//视/音频或采用了不合适的扩展名！
} else {
	// 文件上传到预览目录
	// $previewName = 'pre_'.md5(mt_rand(1000,9999)).time().'.'.$ext; //文件重命名
	$previewName = 'video.mp4';
	$previewSrc = $previewPath.$previewName;
	if(move_uploaded_file($fileArr['tmp_name'],$previewSrc)){//上传文件操作，上传失败的操作
		exit($previewName);
	} else {
		//上传成功的失败的操作
		exit(json_encode(0,JSON_UNESCAPED_UNICODE));
	}
}
?>
