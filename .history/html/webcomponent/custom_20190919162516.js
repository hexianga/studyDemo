
// customElements 是 window 上一个自带的对象 
// 第一个参数表示自定义元素的名字
// 第二个参数表示自定义元素行为的类
// 第三个参数表示继承自哪个内置元素
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });








