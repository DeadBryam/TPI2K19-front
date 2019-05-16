class container extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._container;
    }

    connectedCallback() {
        let div = document.createElement("div");
        div.id = "container";
        div.innerHTML = '<slot></slot>';
        this._shadow.appendChild(div);

        this.container = this._shadow.querySelector("#container");
        this.container.addEventListener("autocomplete", ev => {
            if (ev.detail.data != null) {
                ev.detail.data.then(r => {
                    if (Array.isArray(r)) {
                        ev.target._shadow.querySelector("div#listAutocomplete").innerHTML = r.map(a => {
                            return `<div style="height:25px;">${a}</div>`;
                        }).join('');
                    } else {
                        ev.target._shadow.querySelector("div#listAutocomplete").innerHTML = "";
                    }

                });
            }
        });

    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }

}

if (!(window.customElements && document.body.attachShadow)) {
    document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
    window.customElements.define('sc-container', container);
}

export default container;