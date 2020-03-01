import subprocess
import sys
import os

output_file = '/var/www/html/video_resource/output.mp4'


def ProcessVideo(file_name, start_time, stop_time):
    md = '/usr/bin/ffmpeg -ss ' + start_time + ' -t ' + stop_time + ' -i ' + \
        file_name + ' -vcodec copy -acodec copy ' + output_file
    subprocess.call(md, shell=True)


if __name__ == '__main__':
    if len(sys.argv) != 8:
        sys.exit(1)
    file_name = sys.argv[1]
    time_list = sys.argv[2:]
    start_time_hour = time_list[0]
    start_time_min = time_list[1]
    start_time_sec = time_list[2]
    stop_time_hour = time_list[3]
    stop_time_min = time_list[4]
    stop_time_sec = time_list[5]
    start_time = start_time_hour + ':' + start_time_min + ':' + start_time_sec
    stop_time = stop_time_hour + ':' + stop_time_min + ':' + stop_time_sec
    if os.path.exists(output_file) == True:
        os.remove(output_file)
    try:
        ProcessVideo(file_name, start_time, stop_time)
        print('True')
    except:
        print('False')
