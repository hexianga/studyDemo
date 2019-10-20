// 1. 借助闭包实现单例   
var SingleTon = (function() {
  var instance = null;

  function init() {
    return {
      method: function() {
        conosle.log('单例对象的方法')
      }
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init()
      }
      return instance
    },
    publicMethod() {

    }
  }
})()

// 单例一般是用在系统间各种模式的通信协调

// 借助函数属性生成一个单例
function Unique() {
  if (Unique.instance) {
    return Unique.instance
  }

  this.name = 'hexiang'
  this.age = '23'

  Unique.instance = this
  // 隐形返回 this
}




// 工厂模式 一般在创建一个比较复杂的对象的时候会用到
// 简单来说就是将一个 new 创建对象的过程封装了
var Car = (function () {
  var Car = function (model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  };
  return function (model, year, miles) {
      return new Car(model, year, miles);
  };
})();

var tom = new Car("Tom", 2009, 20000);
var dudu = new Car("Dudu", 2010, 5000);

// 装饰者模式
// 动态地给一个对象添加行为或者修改行为的方式叫做装饰者模式
// 功能：低耦合高复用

// 1. 参数是原来的对象
// 2. 对象上的方法会执行，同时自定义的行为也会执行

//需要装饰的类（函数）
function Output() {
}
Output.prototype.print = function() {
  console.log('original output')
}

function Decorator(obj) {
  this.obj = obj
}
Decorator.prototype.print = function() {
  this.obj.print()
  console.log('decorator')
}

const obj = new Output();
const newObj = new Decorator(obj)
newObj.print()














