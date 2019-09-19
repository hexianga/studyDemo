
// customElements 是 window 上一个自带的对象 
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });








