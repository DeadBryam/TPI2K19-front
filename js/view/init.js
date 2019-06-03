import sucursalMD from "../model/SucursalMD.js";
import cajaMD from "../model/cajaMD.js";

new class init {
    constructor() {
        this.sucursal = new sucursalMD();
        this.caja = new cajaMD();
        this.init();
        this.session = {
            sucursal: null,
            caja: null
        }
    }

    init() {
        document.querySelector("#sucursal-select")
            .addEventListener('set-select', ev => {
                let data = this.sucursal.getSucursales();

                data.then(r => {
                    r.body.then(b => {
                        ev.target.dispatchEvent(new CustomEvent('data-select', {
                            detail: {
                                data: b
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                });
            });

        document.querySelector("#btnnext")
            .addEventListener('click', ev => {
                let component = document.querySelector("sc-select");
                let selector = component.shadowRoot.querySelector("select");
                if (!this.session.sucursal) {
                    let data;

                    this.session.sucursal = selector[selector.selectedIndex].value;
                    data = this.caja.getCajas(`${this.session.sucursal}/caja`);

                    document.querySelector("p").innerHTML = 'seleccione caja';
                    
                    data.then(r => {
                        component.setAttribute('dataoption', 'caja');
                        component.setAttribute('datavalue', 'idCaja');
                        r.body.then(b => {
                            component.dispatchEvent(new CustomEvent('data-select', {
                                detail: {
                                    data: b
                                },
                                bubbles: true,
                                composed: true
                            }));
                        });
                    });

                } else if (!this.session.caja) {
                    this.session.caja = selector[selector.selectedIndex].value;
                    window.location.href = window.location.href + 'facturacion.html';
                    console.log(this.session);
                    console.log(JSON.stringify(this.session));
                    sessionStorage.setItem('session',JSON.stringify(this.session));
                }
            });
    }

}