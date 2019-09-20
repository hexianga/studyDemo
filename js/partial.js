// In computer science, partial application (or partial function application) refers to the process 
// of fixing a number of arguments to a function, producing another function of smaller arity. 


// 和 curring 相关，但是确实不同的概念
// 偏应用：将部分参数固定下来，然后将函数处理成一个接收更少参数的函数。

// 核心思想: 参数复用。本质上是降低通用性，提高适用性。

// 需求：
// 1. 接收一个函数, 同时接收了部分餐参数，存在占位符！！！
// 2. 返回一个函数, 参数作为两部分，一部分填充占位符，一部分作为后续参数

// 规定 'placeholder' 表示占位符
function partial (fn) {
  const args = [].slice.call(arguments, 1)
  return function() {
    let newArgs = []
    let position = 0
    for(let i = 0; i < args.length; i++) {
      if (args[i] === 'placeholder') {
        newArgs.push(arguments[position++])
      } else {
        newArgs.push(args[i])
      }
    }

    if (position < arguments.length) {
      newArgs = newArgs.concat([].slice.call(arguments, position))
    }

    fn.apply(this, newArgs)
  }
}

const subtract = function(a, b) { return b - a; };
subFrom20 = partial(subtract, 'placeholder', 20);
subFrom20(5)

// 编写过程中出现的问题：
// 1. arguments 转数组忘了写 call
// 2. apply 第二个参数传数组并不是说整个数组作为函数的参数，而是数组中的每一项作为函数的参数







