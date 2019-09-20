// In mathematics and computer science, currying is the technique of translating 
// the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, 
// each with a single argument. 

// 概念：将一个多参数函数转化为一系列单参数函数的过程

// 核心思想: 参数复用。本质上是降低通用性，提高适用性。
// 使用：例如请求中，固定下请求方法封装为 $.get $.post 等

// 函数的 length 属性: 表示当前函数的形参个数
// name: 函数实例的名字

// curring 的辅助函数
function subCurring(fn) {
  const args = [].slice.call(arguments, 1);
  return function () {
    const newArgs = args.concat([].slice.call(arguments, 0))
    fn.apply(this, newArgs)
  }
}

// curring 中肯定会使用到递归，因为可能函数有多个参数
function curry (fn) {
  const argLength = lenght || fn.length
  const slice = Array.prototype.slice;
  return function () {
    if (arguments.length < argLength) {
      let combined = [fn].concat(slice.call(arguments));

      // 很重要的一环就是拼接参数
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  }
}

// 测试
var fn = curry(function(a, b, c) {
  return [a, b, c];
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

























