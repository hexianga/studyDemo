// 词法作用域和动态作用域

var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();

// 结果是 ？？？

// 两段代码，输出结果一样，但是写法不一样，执行的时候有什么不一样呢？？
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();

// 执行的时候的创建的执行上下文栈不一样




















