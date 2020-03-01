<?php
$servername = "localhost";
$username = "faraway";
$password = "123";
$dbname = "test";
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 验证连接
if ($conn->connect_error) {
	die("Connection Failed : " . $conn->connect_error);
} 
$process=$_GET['process'];

if($process==1) {
	$res=array();
	$sql = "SELECT * FROM location";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		// 包装数据
		while($row = $result->fetch_assoc()) {
			$temp=array(
				"id"      => intval($row['id']),
				"x"       => floatval($row['x']),
				"y"       => floatval($row['y']),
				"time"    => $row['time'],
				"city"    => $row['city'],
				"picname" => $row['picname']
			);
			$res[]=$temp;
		}
	} else {
		echo "error";
	}
	echo json_encode($res);

} else if($process==2){
	$id   = intval($_GET['id']);
	$x    = floatval($_GET['x']);
	$y    = floatval($_GET['y']);
	$time = $_GET['time'];
	$city = $_GET['city'];
	$picname = $_GET['picname'];
	if($picname == "null")
		$picname = 'NULL';
	else 
		$picname = "'" . $picname . "'";

	$sql = "INSERT INTO location VALUES(" . $id . "," . $x . "," . $y . ",'" . $time . "','" . $city . "'," . $picname . ")";

	if ($conn->query($sql) === TRUE) 
		echo "success";
	else 
		echo "Error: " . $sql . " " . $conn->error;
} else if($process==3){
	$id = intval($_GET['id']);

	$sql = "DELETE FROM location WHERE id=" . $id;

	if ($conn->query($sql) === TRUE) 
		echo "success";
	else 
		echo "Error: " . $sql . " " . $conn->error;
}
$conn->close();
?>
