import { html, render} from './lit-html/lit-html.js';

class autocomplete extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._placeholder = "Insert text here..";
    this._datavalue = "";
  }

  connectedCallback() {
    let container = document.createElement("div");
    let txtAutocomplete = document.createElement("input");
    let list = document.createElement("datalist");
    let style;

    style = html`<style>
      input{
      color: var(--lightblack);
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      background: var(--white);
      border: 0;
      border-bottom: 1px solid var(--grey);
      outline: var(--white);
      height: 30px;
      }
      
    input:focus{
      border-bottom: 2px solid var(--teal);
     }
    
    input::-webkit-calendar-picker-indicator {
      display: none;
    }
    </style>`;

    txtAutocomplete.setAttribute("placeholder", this.placeholder);
    txtAutocomplete.setAttribute("id", "txtAutocomplete");
    txtAutocomplete.setAttribute("list", "listAutocomplete");

    list.setAttribute("id", "listAutocomplete");

    container.setAttribute("id", "autocomplete-container");

    container.appendChild(txtAutocomplete);
    container.appendChild(list);

    txtAutocomplete.addEventListener("input", ev => {
      txtAutocomplete.dispatchEvent(new CustomEvent('set-autocomplete', {
        detail: {
          value: ev.target.value
        },
        bubbles: true,
        composed: true
      }));
    });

    render(html`
      ${style}${container}
    `, this._shadow);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
        if (newValue.trim().length > 0) {
          this.placeholder = newValue;
          if (this._shadow.querySelector("#txtAutocomplete") != null) {
            this._shadow.querySelector("#txtAutocomplete").placeholder = newValue;
          }
        }
        break;
      case 'datavalue':
        this.datavalue = newValue;
        break;
    }
  }

  static get observedAttributes() {
    return ['placeholder', 'datavalue'];
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value;
  }

  get datavalue() {
    return this._datavalue;
  }

  set datavalue(value) {
    this._datavalue = value;
  }

}

if (!(window.customElements && document.body.attachShadow)) {
  document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
  window.customElements.define('sc-autocomplete', autocomplete);
}

export default autocomplete;