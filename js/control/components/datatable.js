import { render, html } from "./lit-html/lit-html.js";

class datatable extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._actualpage = 1;
        this._pagesize = 3;
        this._columns = null;
        this._paginated = true;
    }

    connectedCallback() {
        let style;
        let table = document.createElement("table");
        let slot = document.createElement("slot");

        style = html`<style>
          table, th, td {
            border: none;
          }
          
          table {
            width: 100%;
            display: table;
            border-collapse: collapse;
            border-spacing: 0;
          }
          
          tr {
            border-bottom: 1px solid var(--lightgrey);
          }
          
          td, th {
            padding: 15px 5px;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
          }
          
          table > tbody > tr:hover {
            background-color: var(--lightgrey);
          }
            
          thead {
            color: var(--darkgrey);
          }
          
          .pagination{
            margin: 0;
          }
          
          .pagination li {
            display: inline-block;
            border-radius: 2px;
            text-align: center;
            vertical-align: top;
            height: 30px;
          }
          
          .pagination li a {
            color: var(--darkgrey);
            display: inline-block;
            font-size: 1.2rem;
            padding: 0 10px;
            line-height: 30px;
            text-decoration:none;
          }
          
          .pagination li.active a {
            color: var(--white);
          }
          
          .pagination li.active {
            background-color: var(--green);
          }
          
          ul{
              padding: 0;
          }
          </style>`;

        table.setAttribute("id", "datatable");
        table.appendChild(slot);

        window.onload = _ => {
            table
                .dispatchEvent(new CustomEvent('set-datatable', {
                    bubbles: true,
                    composed: true
                }));
        }

        render(html`
            ${style}${table}
        `, this._shadow);

        this.columns = this._shadow.querySelector("#datatable>slot").assignedElements();        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'pagesize':
                this.pagesize = newValue;
                break;
        }
    }

    static get observedAttributes() {
        return ['pagesize'];
    }

    dataDatatableEvent() {
        if (this._shadow.querySelector("#datatable>slot") === null) {
            this._shadow.querySelector("#datatable").innerHTML = "<slot></slot>";
        }
        this.columns = this._shadow.querySelector("#datatable>slot").assignedElements();

        this.dispatchEvent(new CustomEvent('data-datatable', {
            detail: {
                data: this.data,
                columns: this.columns,
                pagesize: this.pagesize,
                pages: this.pages,
                actualpage: this.actualpage
            },
            bubbles: true,
            composed: true
        }));
    }

    get data() {
        return this._data;
    }

    get columns() {
        return this._columns
    }

    get pagesize() {
        return this._pagesize;
    }

    get actualpage() {
        return this._actualpage;
    }

    get paginated(){
      return this._paginated;
    }

    set data(value) {
        this._data = value;
    }

    set columns(value) {
        this._columns = value;
    }

    set pagesize(value) {
        this._pagesize = value;
    }

    set actualpage(value) {
        this._actualpage = value;
    }

    set paginated(value){
      this._paginated = value;
    }
}

if (!(window.customElements && document.body.attachShadow)) {
    document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
    window.customElements.define('sc-datatable', datatable);
}

export default datatable;