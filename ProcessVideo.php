<?php
$start_time_hour = $_POST["start_time_hour"];
$start_time_min = $_POST["start_time_min"];
$start_time_sec = $_POST["start_time_sec"];
$stop_time_hour = $_POST["stop_time_hour"];
$stop_time_min = $_POST["stop_time_min"];
$stop_time_sec = $_POST["stop_time_sec"];
$cmd = "/usr/bin/python /var/www/html/command/Process.py" . " " . "/var/www/html/video_resource/video.mp4" . " " . $start_time_hour . " " . $start_time_min . " " . $start_time_sec . " " . $stop_time_hour . " " . $stop_time_min . " " . $stop_time_sec;
exec($cmd, $output ,$returnValue);
echo $returnValue;
echo $cmd;
?>
