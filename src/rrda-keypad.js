import define from './../node_modules/backed/src/utils/define.js';
import RenderMixin from './../node_modules/custom-renderer-mixin/src/render-mixin.js';
import './custom-keypad.js';

export default define(class RrdaKeypad extends RenderMixin(HTMLElement) {
  static get observedAttributes() {
    return ['type', 'name', 'index', 'uid']
  }

  get properties() {
    return {
      name: 'gate',
      type: 'keypad'
    }
  }

  set uid(value) {
    this._uid = value;
    this.setAttribute('uid', value)
  }

  get uid() {
    return this._uid || this.getAttribute('uid');
  }

  set name(value) {
    this.properties.name = value;
  }

  set type(value) {
    this.properties.type = value;
  }

  set value(value) {
    if (this.input && this.input.value !== value) this.input.value = value;
    this.properties.value = value;
  }

  get name() {
    return this.properties.name;
  }

  get value() {
    return this.properties.value;
  }

  get type() {
    return this.properties.type;
  }
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._onmessage = this._onmessage.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.shadowRoot.querySelector('custom-keypad').addEventListener('message', this._onmessage);
  }

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue !== value)  {
      this[name] = value;

      this.render();
    }
  }

  _onmessage({detail}) {
    // if (this.hasAttribute('toggled')) {
      ref.child(`${this.uid}/message`).set(detail);
      ref.child(`${this.uid}/message`).set(0);
    // }
  }

  get template() {
    return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        width: 320px;
        /* height: 320px; */
        align-items: center;
        box-sizing: border-box;
      }
      custom-svg-icon {
        height: 32px;
        width: 32px;
        cursor: pointer;
        pointer-events: auto;
      }
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
      }
    </style>
    <custom-keypad></custom-keypad>
    `;
  }

})
