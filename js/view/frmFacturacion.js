import facturacionMD from '../model/FacturacionMD.js';

new class frmFacturacion {
    constructor() {
        this.facturacion = new facturacionMD();
        this.productos = [];
        this.addNewProducto();
        console.log(this.productos);
        
    }

    addNewProducto() {
        this.productos.push({
            "cantidad": 1,
            "idArticulo": {
                "idArticulo": "BOBC0841"
            }
        });
    }
}