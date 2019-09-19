
// customElements 是 window 上一个自带的对象 
// 第一个参数表示自定义元素的名字  自定义元素的名字一定要有中划线
// 第二个参数表示自定义元素行为的类
// 第三个参数表示继承自哪个内置元素
class WordCount extends HTMLParagraphElement {
  constructor(props) {
    super();
    console.log(props)
  }

  connectedCallback() {
    console.log('custom element 被插入文档了！')  
  }

  disconnectedCallback() {
    console.log('custom element 从文档中移除了!')
  }

  attributeChangedCallback() {
    console.log('custom element 属性那个变化时被调用')
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });








