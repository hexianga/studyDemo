//  compose 将多个函数组合成一个函数，让代码从右向左运行，右边函数的结果作为左边函数的输入

// 1. 输入： 多个函数
// 2. 输出： 单个函数

// redux 中使用 reduce 来实现 compose 
function compose1(...funs) {
  return funs.reduce((a, b) => (...args) => a(b(...args))) 
  // reduce 如果没有初始值， arr 中的第一个元素将作为初始值，并且不会再次遍历
  // (...args) 对最右边的函数来说就是直接输入的参数，
  // 对于非第一个函数来说就是上一个执行过的函数的结果
  // 由于这个函数只有一行代码所以不需要 return 关键字。
  // 当执行完所有的函数的时候就返回值
}

// underscore 的实现
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
      var i = start;
      var result = args[start].apply(this, arguments); 
      while (i--) result = args[i].call(this, result); // 规定函数都只返回一个值
      return result;
  };
};

function fn1 () {
  console.log('1')
}
function fn2 () {
  console.log('2')
}
function fn3 () {
  console.log('3')
}

compose1(fn1, fn2, fn3)()
compose(fn1, fn2, fn3)()






































