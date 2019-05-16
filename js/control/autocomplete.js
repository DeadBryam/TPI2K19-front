class autocomplete extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._placeholder = "Insert text here..";
    this._data = null;
  }

  connectedCallback() {
    let div = document.createElement("div");
    let txtAutocomplete = document.createElement("input");
    let list = document.createElement("div");

    txtAutocomplete.placeholder = this.placeholder;
    txtAutocomplete.id = "txtAutocomplete";
    txtAutocomplete.style = "width:100%";

    list.id = "listAutocomplete";
    list.style = `background: #fff;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    width: 100%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`;

    div.id = "autocomplete-container";

    div.appendChild(txtAutocomplete);
    div.appendChild(list);

    txtAutocomplete.addEventListener("input", ev => {
      txtAutocomplete.dispatchEvent(new CustomEvent('update-autocomplete', {
        detail: {
          value: ev.target.value
        },
        bubbles: true,
        composed: true
      }));
    });

    txtAutocomplete.addEventListener("keyup", ev => {
      // console.log(this.data)
      txtAutocomplete.dispatchEvent(new CustomEvent('autocomplete', {
        detail: {
          value: ev.target.value,
          data: this.data
        },
        bubbles: true,
        composed: true
      }));
    });

    this._shadow.appendChild(div);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder':
        console.log(name + "  " + newValue);
        this.placeholder = newValue;
        if (this._shadow.querySelector("#txtAutocomplete") != null) {
          this._shadow.querySelector("#txtAutocomplete").placeholder = newValue;
        }
        break;
      case 'data':
        console.log(name + "  " + newValue);
        this.data = newValue;
        break;
    }
    if (name === "placeholder") {

    }
  }

  static get observedAttributes() {
    return ['placeholder', 'data'];
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

}

if (!(window.customElements && document.body.attachShadow)) {
  document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
  window.customElements.define('sc-autocomplete', autocomplete);
}

export default autocomplete;