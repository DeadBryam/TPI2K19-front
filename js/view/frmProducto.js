import scissors from '../control/components/scissors.js';
import productoMD from '../model/ProductosMD.js';

new class frmProducto {
    constructor() {
        this.producto = new productoMD();
        this.init();
    }

    init() {
        document.querySelector("#autocomplete-ciudad")
            .addEventListener('set-autocomplete', ev => {
                if (ev.detail.value.trim().length === 0) {
                    ev.detail.value = "$^";
                }

                this.producto.getProductosLike(ev.detail.value).then(r => {
                    r.body.then(b => {
                        ev.target.dispatchEvent(new CustomEvent('data-autocomplete', {
                            detail: {
                                data: b
                            },
                            bubbles: true,
                            composed: true
                        }));
                    })
                })
                    .catch(e => {
                        console.error(e);
                    });
            });

        document.querySelector("#datatable-origen")
            .addEventListener('set-datatable', ev => {
                let data = this.producto.getProductosPaginated(0, ev.target.pagesize);

                data.then(r => {
                    r.body.then(b => {
                        ev.target.dispatchEvent(new CustomEvent('data-datatable', {
                            detail: {
                                data: b,
                                total: r.head.get('Total-reg')
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                });
            });

        document.querySelector("#datatable-origen")
            .addEventListener('change-paginator', ev => {
                console.log(ev.detail.value);

                let data = this.producto.getProductosPaginated((parseInt(ev.detail.value) - 1) * ev.target.pagesize, ev.target.pagesize);

                data.then(r => {
                    r.body.then(b => {
                        ev.target.dispatchEvent(new CustomEvent('data-paginator', {
                            detail: {
                                data: b,
                                total: r.head.get('Total-reg')
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                });
            });
    }

}