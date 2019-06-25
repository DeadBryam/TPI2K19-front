import bodegaMD from "../model/BodegaMD.js";
import { html, render } from "../control/components/lit-html/lit-html.js";

new class frmBodega {
    constructor() {
        this.bodegaMD = new bodegaMD();
        this.init();
    }

    init() {
        document.querySelector('#filtro-bodega')
            .addEventListener('input', _ => {
                let value = document.querySelector('#filtro-bodega').value;
                let data = this.bodegaMD.filter(value.trim().length === 0 ? "$^" : value);
                data.then(r => {
                    r.body.then(b => {
                        let li = html`${b.map(m =>
                            html`<li>
                                    <p>
                                        &emsp;Id Articulo:&emsp;&emsp;&emsp;${m[0].idArticulo}
                                    </p>
                                    <p>
                                        &emsp;Articulo:&emsp;&emsp;&emsp;&emsp;${m[0].articulo}
                                    </p>
                                    <p>
                                        &emsp;Stock:&emsp;&emsp;&emsp;&emsp;&emsp;${m[1].stock}
                                    </p>
                                    <p>
                                        &emsp;Precio:&emsp;&emsp;&emsp;&emsp;&ensp;$${m[1].precio}
                                    </p>
                                </li>`
                        )}`;
                        render(li,document.querySelector('#lista-bodega'))
                    })

                });
            });
    }
}