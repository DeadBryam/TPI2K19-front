import { html, render, Template } from './lit-html/lit-html.js';

class container extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._container;
    }

    connectedCallback() {
        let div = document.createElement("div");
        let slot = document.createElement("slot");

        div.id = "container";
        div.appendChild(slot);

        render(div, this._shadow);

        document.addEventListener("data-autocomplete", ev => {          
            if (ev.detail.data != null && Array.isArray(ev.detail.data)) {
                const datalist = html`
                    ${ev.detail.data.map(r => html`<option value=${r[ev.target.getAttribute('datavalue')]}>`)}
                `;
                render(datalist, ev.target._shadow.querySelector("datalist"));
            }
        });

        document.addEventListener("data-datatable", ev => {
            let table = ev.target._shadow.querySelector("table");
            let pages = Array.from(
                { length: Math.ceil(ev.detail.total / ev.target.pagesize) }, (v, i) => i + 1);

            const thead = html`<thead>
                <tr>
                    ${ev.target.columns.map(mcol => html`<th>
                        ${mcol.getAttribute('datalabel')}
                    </th>`)}
                </tr>
            </thead>`;

            const tbody = html`<tbody>
                ${ev.detail.data.map(mbody => html`<tr>
                    ${ev.target.columns.map(mcol => html`<td>
                        ${mbody[mcol.getAttribute('datavalue')]}
                    </td>`)}
                </tr>`)}
            </tbody>`;
            
            // const li = document.createElement('li');
            const tfoot = ev.target.paginated == true ? html`<tfoot>
                <tr>
                    <td colspan=${ev.target.columns.length}>
                        <ul class=pagination>
                            ${pages.map(mpag => html`<li id=pg${mpag}>
                                <a>${mpag}</a>
                            </li>`)}
                        </ul>
                    </td>
                </tr>
            </tfoot>`: '';

            render(html`
            ${thead}${tbody}${tfoot}
            `, table);

            if (ev.target.paginated == true) {
                table.querySelectorAll('li').forEach(e => {
                    e.addEventListener('click', eve => {
                        ev.target.actualpage = eve.target.text;
                        e.dispatchEvent(new CustomEvent('change-paginator', {
                            detail: {
                                value: eve.target.text
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                });

                table.querySelector('tfoot')
                    .querySelector('ul').querySelector('#pg1')
                    .setAttribute('class', 'active');
            }

        });

        document.addEventListener('data-paginator', ev => {
            ev.target._shadow.querySelector('tfoot')
                .querySelectorAll('li').forEach(pg => {
                    pg.removeAttribute("class");
                    if (pg.id.includes(ev.target.actualpage))
                        pg.setAttribute('class', 'active');
                });

            const tbody = html`
                ${ev.detail.data.map(mbody => html`<tr>
                    ${ev.target.columns.map(mcol => html`<td>
                        ${mbody[mcol.getAttribute('datavalue')]}
                    </td>`)}
                </tr>`)}`;

            render(tbody, ev.target._shadow.querySelector('tbody'));
        });

        document.addEventListener('data-select', ev => {
            const options = html`
                ${ev.detail.data.map(m => html`
                    <option value="${m[ev.target.getAttribute("datavalue")]}">
                        ${m[ev.target.getAttribute("dataoption")]}
                    </option>`
            )}
            `;

            render(options, ev.target._shadow.querySelector('select'));
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