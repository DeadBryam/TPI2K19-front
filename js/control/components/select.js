import { html, render } from './lit-html/lit-html.js';

class select extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._dataoption = "";
        this._datavalue = "";
    }

    connectedCallback() {
        let container = document.createElement("div");
        let select = document.createElement("select");
        let style;

        style = html`<style>
    select {
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
        width: 100%;
    }
    
    select:focus {
        border-bottom: 2px solid var(--teal);
    }

    option{
        width: 100%;
    }
    </style>`;

        window.onload = _ => {
            container
                .dispatchEvent(new CustomEvent('set-select', {
                    bubbles: true,
                    composed: true
                }));
        }

        container.setAttribute("id", "select-container");
        container.appendChild(select);

        render(html`
      ${style}${container}
    `, this._shadow);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'dataoption':
                this.dataoption = newValue;
                break;
            case 'datavalue':
                this.datavalue = newValue;
                break;
        }
    }

    static get observedAttributes() {
        return ['dataoption', 'datavalue'];
    }

    get dataoption() {
        return this._dataoption;
    }

    set dataoption(value) {
        this._dataoption = value;
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
    window.customElements.define('sc-select', select);
}

export default select;
