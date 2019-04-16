#!/bin/bash
echo "please input username:"
read username
# whoami 用于查看当前有效用户名的命令
# $() 将命令执行结果复赋值给变量
currentName=$(whoami)

if test $username = $currentName
then
	echo 'the user is right'
else
	echo 'the user is not right'
fi
