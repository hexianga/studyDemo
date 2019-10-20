// 为什么要使用懒函数
// 函数有些初始化工作要做，并且仅需执行一次，可以使用这种模式，显著提升程序性能

// 1. 函数的一些初始化只需要执行一次

// 事件监听器函数
function addEvent () {
  if (window.addEventListenr) {
    addEvent = function(el, type, handleFn) {
      el.addEventListener(type, handleFn) 
    }
  } else if (window.attachEvent) {
    // attachEvent 在 IE9 以下的版本中受到支持
    addEvent = function() {
      el.attachEvent('on' + type, handleFn)
    }
  }
}

addEvent() // 重写 addEvent 函数


// 所以很多的处理浏览器差异性的代码就可以写在这样的一个惰性函数里。避免了每次都去判断
// 获取页面向上滚动的距离等等。

// 一个需求
// 一个函数，里面使用到了一个变量。然后第一次调用之后，以后每次调用的时候希望都返回这个变量。

// 方式一：闭包
const fn = (function () {
  var time;
  return function() {
    if (time) {
      return time
    } else {
      return new Date()
    }
  }
})()

// 方式二：函数对象  函数是一个对象，上面可以挂载属性
function fn2() {
  if (fn.time) return fn.time
  fn.time = new Date()
  return fn.time
}

// 方式三：惰性函数
function fn3() {
  const time = new Date();
  // 本质上还是闭包  始终引用着上层上下文中的变量
  fn3 = function () {
    return time
  }
  return fn3()
}































