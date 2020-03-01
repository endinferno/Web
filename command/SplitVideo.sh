#!/bin/bash

ffmpeg -i $1 -vcodec copy -an video_only.mp4
ffmpeg -i $1 -acodec copy -vn audio_only.m4a

