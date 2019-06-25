class datacolumn extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._datavalue = "";
        this._datalabel = "";
    }

    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'datavalue':
                break;
        }
    }

    static get observedAttributes() {
        return ['placeholder', 'datavalue'];
    }

    get datavalue(){
        return this._datavalue;
    }

    get datalabel(){
        return this._datalabel;
    }

    set datavalue(value){
        this._datavalue = value;
    }

    set datalabel(value){
        this._datalabel = value;
    }
}

if (!(window.customElements && document.body.attachShadow)) {
    document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
    window.customElements.define('sc-datacolumn', datacolumn);
}

export default datacolumn;