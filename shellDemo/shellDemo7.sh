#!/bin/bash
# 判断文件夹是否存在，不存在则新建
echo "环境变量 $USER"
echo "内置命令：$(date)"

while :
do
	echo "please input files's name:"
	read filename
	if [ -e /$filename ]
	then
		echo "文件存在"
	else 
		mkdir $filename
		echo "文件创建成功！"
		break
	fi
done
