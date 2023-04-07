export default customElements.define('custom-keypad', class CustomKeypad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  get keys() {
    return [1,2,3,4,5,6,7,8,9,'DEL',0, 'ENT']
  }
  
  connectedCallback() {
    for (const key of this.keys) {
      const el = document.createElement('button')
      el.innerHTML = key
      el.classList.add('key')
    this.appendChild(el)
    }
    this.addEventListener('click', (e) => {
      const key = e.composedPath()[0].innerHTML;
      console.log(key);
      if (key === 'DEL') {
        if (this._current && this._current.length > 0) this._current.slice(this._current.length - 1)
      } else if (key === 'ENT') {
        this.dispatchEvent(new CustomEvent('message', {detail: Number(this._current)}))
        delete this._current
      } else {
        if (this._current && this._current.length) this._current = `${this._current}${key}`
        else this._current = key
      }
    })
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        width: 320px;
        height: 320px;
        border: 1px solid #eee;
        border-radius: 24px;
        align-items: space-around;
        justify-content: space-around;
        padding: 24px 44px;
        box-sizing: border-box;
      }
      ::slotted(.key) {
        width: 58px;
        text-align: center;
        justify-content: center;
        align-items: center;
        height: 58px;
        display: inline-flex;
        background: transparent;
        border-radius: 50%;
        user-select: none;
        outline: none;
        margin: 6px
      }
    </style>
    <slot></slot>
    `
  }
});