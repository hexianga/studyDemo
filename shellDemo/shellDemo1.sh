#!/bin/bash

# 模拟登录 linux 系统
# -n 表示不在最后自动换行
echo -n "login:"
# read 用来读取输入
read name
echo -n "password:"
read passwd
# 使用 = 判断相等
# -a 表示与运算
# -o 表示或运算
if [ $name = "cht" -a $passwd = "abc" ];
then
    echo "the host and password is right!"
else 
    echo "input is error!"
fi