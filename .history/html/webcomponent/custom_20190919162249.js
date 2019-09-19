
// customElements 是 window 上一个自带的对象 
// 第一个参数表示自定义元素的名字
// 
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });








