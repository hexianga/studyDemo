// 当必须在网页上重复使用相同的标记结构时，使用某种模板而不是一遍又一遍地重复相同的结构是有意义的。

// 需要了解的 api：
// element.cloneNode
// htmlTemplateElement 的 content 属性是 DocumentFragment。 
// 由于是一个 DocumentFragment，所以别的 正式 DOM 中元素也可以用



// <template> 元素来实现模板
// 此元素及其内容不会在DOM中呈现，但仍可使用 JavaScript 去引用它。
// 在自定义 shadowDom 的时候会用到 cloneNode, 参数必须是 true，这样才会深度递归。
class Myparam extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-paragraph');
    const templateContent = template.content;

    const shadow = this.attachShadow({mode: 'open'})

    shadow.appendChild(
      templateContent.cloneNode(true)
    );
  }
}
customElements.define('my-paragraph', Myparam);

const slottedSpan = document.querySelector('my-paragraph span');


// template 在真实的 DOM 中的使用？？？？
// let t = document.querySelector('#productrow'),
// td = t.content.querySelectorAll("td");
// td[0].textContent = "1235646565";
// td[1].textContent = "Stuff";
