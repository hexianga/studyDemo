// 当必须在网页上重复使用相同的标记结构时，使用某种模板而不是一遍又一遍地重复相同的结构是有意义的。




// <template> 元素来实现模板
// 此元素及其内容不会在DOM中呈现，但仍可使用 JavaScript 去引用它。
// 在自定义 shadowDom 的时候会用到 cloneNode, 参数必须是 true，这样才会深度递归。

class Myparam extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-paragraph');
    const templateContent = template.content;

    this.attachShadow({mode: 'open'}).appendChild(
      templateContent.cloneNode(true)
    );
  }
}
customElements.define('my-paragraph', Myparam);

const slottedSpan = document.querySelector('my-paragraph span');

console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);















