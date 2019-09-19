// 需要了解的 api：
// element.attachShadow: 参数中的 mode 设置为 closed 的时候不能通过 js 获取到 shadowDom，video 就是。
// element.shadowRoot

// shadowDom 的特性：
// Web components的一个重要特性是封装——可以将html标签结构、css样式和行为隐藏起来，并从页面上的其他代码中分离开来，
// 这样不同的功能不会混在一起，代码看起来也会更加干净整洁。

// Shadow DOM 允许将隐藏的 DOM 树添加到常规的DOM树中——它以shadow root为起始根节点，
// 在这个根节点的下方，可以是任意元素，和普通的DOM元素一样。

// Shadow host： 一个常规 DOM节点，Shadow DOM会被添加到这个节点上。
// Shadow tree：Shadow DOM内部的DOM树。
// Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。
// Shadow root: Shadow tree的根节点。

// 自定义元素的属性怎么在 shadowDom 中获取？？？？？
// 常规获取属性的的方法: getAttribute  setAttribute


// Create a class for the element
class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('data-text');
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);
    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 3rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

// Define the new element
customElements.define('popup-info', PopUpInfo);


