import facturacionMD from '../model/FacturacionMD.js';
import articuloMD from '../model/ArticuloMD.js';
import bodegaMD from '../model/BodegaMD.js';

new class frmFacturacion {
    constructor() {
        this.facturacion = new facturacionMD();
        this.articuloMD = new articuloMD();
        this.bodegaMD = new bodegaMD();
        this.articuloName = "";
        this.productos = [];
        this.init();
    }

    addNewProducto(cantidad, idArticulo) {        
        if (cantidad.trim().length > 0 || idArticulo.trim().length > 0) {
            this.productos.push({
                "cantidad": cantidad,
                "idArticulo": {
                    "idArticulo": idArticulo
                }
            });

            this.updateDatatable();
        } else {
            alert('Campos vacios');
        }
    }

    facturar() {
        this.facturacion.postJson(this.productos).then(_ => {
            alert("registro creado correctamente");
            this.productos = [];
            this.updateDatatable();
        })
            .catch(e => {
                console.error(e);
            });


    }

    updateDatatable() {
        document.querySelector('#datatable-facturacion').dispatchEvent(new CustomEvent('data-datatable', {
            detail: {
                data: this.productos.map(m => {
                    return {
                        idArticulo: m.idArticulo.idArticulo,
                        cantidad: m.cantidad
                    };
                }),
                total: this.productos.length
            },
            bubbles: true,
            composed: true
        }));
    }

    init() {
        document.querySelector("#datatable-facturacion")
            .addEventListener('set-datatable', _ => {
                this.updateDatatable();
            });

        document.querySelector("#btnArticulo")
            .addEventListener('click', _ => {  
                
                this.addNewProducto(document.querySelector('#cantidadtxt').value,
                document.querySelector("#autocomplete-bodega")
                .shadowRoot.querySelector("#txtAutocomplete").value);

                document.querySelector('#cantidadtxt').value = "";
                document.querySelector("#autocomplete-bodega")
                .shadowRoot.querySelector("#txtAutocomplete").value = "";
            });

        document.querySelector('#btnFacturar')
            .addEventListener('click', _ => {
                this.facturar();
            });

        document.querySelector("#autocomplete-bodega")
            .addEventListener('set-autocomplete', ev => {
                
                
                if (ev.detail.value.trim().length === 0) {
                    ev.detail.value = "$^";
                }

                this.bodegaMD.getAll().then(r => {
                    r.body.then(b=>{
                        ev.target.dispatchEvent(new CustomEvent('data-autocomplete', {
                            detail: {
                                data: b.map(m => {
                                    return m.bodegaPK
                                })
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                    
                })
                .catch(e => console.error(e));
            });
    }
}