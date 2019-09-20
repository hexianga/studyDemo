// 定义：函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。

// 特点：以空间换时间

// 键名不能使用第一个参数，需要自己通过函数自定义。
function memorize(fn, paramFn) {
  let cache = {}

  function generatekey() {
    const args = [].slice.call(arguments)
    return JSON.stringify(args)
  }

  return function() {
    const lastFn = paramFn || generatekey
    const key = lastFn.apply(this, [].slice.call(arguments))
    if (key in cache) {
      return cache[key]
    } else {
      fn.apply(this, [].slice.call(arguments))
    }
  }
}

// 当在计算比较简单地数据的时候 memorize 体现不出大优势。
// 在计算复杂的数据的时候会有较大的作用 比如 Fibonacci 的计算。























