#!/bin/bash

# 比较两个数的大小
echo "please enter two number"
read a
read b
# test 用来判断条件是否成立
if test $a -eq $b
	then echo "NO.1 = NO.2"
elif test $a -gt $b
	then echo "NO.1 > NO.2"
else 
	echo "NO.1 < NO.2" 
fi