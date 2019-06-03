import { render, html } from "./lit-html/lit-html.js";

class sidenav extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        let style;
        let sidenav = document.createElement("div");
        let opensidenav = document.createElement("button");
        let closesidenav = document.createElement("button");
        let slot = document.createElement('slot');

        style = html`<style>
        .sidenav{
            height:100%;
            width: 0;
            background-color: var(--black);
            position:fixed!important;
            z-index:1;
            overflow:auto;
            transition: 0.5s;
          }
          
          .open-sidenav{
            height: 100%;
            background: var(--green);
            border: 0;
            width: 50px;
            color: var(--white);
            outline: none;
          }

          .sidenav>.close-sidenav{
            width: 100%;
            color: var(--white);
            border: 0;
            background: none;
            height: 40px;
            outline: none;
            font-style: normal;
            font-family: inherit;
            font-size: 1.3em;
            color: var(--darkgrey);
          }

          ::slotted(a){
            display: block;
            height: 40px;
            text-align: center;
            text-decoration: none;
            font-style: normal;
            font-family: inherit;
            line-height: 40px;
            font-size: 1.3em;
            color: var(--darkgrey);
          }

          ::slotted(a:hover){
            background: var(--green);
            color: var(--white);
          }

          .sidenav>.close-sidenav:hover{
            background: var(--green);
            color: var(--white);
          }

          </style>`;

        opensidenav.innerText = "☰";
        opensidenav.setAttribute('class', 'open-sidenav');

        closesidenav.innerText = "CLOSE";
        closesidenav.setAttribute('class', 'close-sidenav');

        sidenav.setAttribute('class', 'sidenav');
        sidenav.appendChild(closesidenav);
        sidenav.appendChild(slot);

        opensidenav.addEventListener('click', ev => {
            if(document.body.offsetWidth > 1000)
            sidenav.style.width = '20vw';
            else if(document.body.offsetWidth > 600)
            sidenav.style.width = '40vw';
            else
            sidenav.style.width = '100vw';
        });

        closesidenav.addEventListener('click', ev => {
            sidenav.style.width = '0';
        });

        render(html`${style}${opensidenav}${sidenav}`, this._shadow);
    }
}

if (!(window.customElements && document.body.attachShadow)) {
    document.innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements.</b>";
} else {
    window.customElements.define('sc-sidenav', sidenav);
}

export default sidenav;