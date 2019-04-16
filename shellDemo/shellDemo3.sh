#!/bin/bash
echo "please input filename:"
read filename
# -e 判断文件是否存在
# -e 是文件测试运算符之一
if test -e /$filename
then	
	echo "file exist！"
else
	echo "file not exist！"
fi
