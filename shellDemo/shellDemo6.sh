#!/bin/bash

# 打印文件的大小
for filename in $(ls)
do
	# 延时一秒
	sleep 1
	# 可以使用 test 指令替换
	# 中括号的前后必须要有空格
	if [ -f $filename ]
	then
		# 将指令的结果赋值
		size=$(ls -l $filename | awk '{print $5}') 
		if [ $size -gt 0 ]
		then 
			printf "%-40s is not a null file size: %20s \n" $filename $size
		fi
	fi
done
# 输入输出重定向
# n>&m 将 n 和 m 的输出重定向到一个文件。一般对于数字 0:标准输入 1: 标准输出 2: 错误输出 



