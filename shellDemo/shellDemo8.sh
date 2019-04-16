#!/bin/bash

# awk: 强大的文本分析工具，取名自三位创始人的首字母   
# 原理：逐行读取文本，使用分隔符进行分片，然后在进行逐片处理

# 行匹配语句用单引号 每一行按照空格或者 tab 分割输出第三和第四项
# awk '{print $1 $4}' awkTest.txt


# 格式化输出使用 printf 其中使用 %-10s 中的 - 表示将文本从前往后排列
# awk '{printf "%-10s %-20s \n", $1, $4}' awkTest.txt

# 指定分隔符分割文本 指令 -F

# awk -F, '{printf "%-40s %-20s \n", $1, $2}' awkTest.txt

# 读取用户输入的 yes 和 no

# case 语句 其中 类似于 break
echo "please enter [yes/no]: "
read input
case $input in 
	y|Y|yes|YES)
		echo 'you input '$input
	;;
	n|N|no|NO)
		echo 'you input '$input
	;;
	*)
		echo 'error'
	;;
esac





