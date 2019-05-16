import abtractMD from './AbstractMD.js';

class productosMD {
    constructor() {
        this.absMD = new abtractMD('origen');
    }

    getProductos(action = "") {
        return this.absMD.getJson(action)
            .then(r => {
                //console.log(JSON.stringify(r));
                return r;
            })
            .catch(e => {
                //console.log(JSON.stringify(e));
                return e;
            });
    }

    postProducto() {
        this.absMD.postJson({
            "idVenta": null,
            "idCaja": {
                "idCaja": 1 
            },
            "estadoVenta": true,
            "fecha": "2019-05-12T06:00:00Z[UTC]",
            "idSucursal": "APA1508"
            })
            .then(r => {
                console.log(JSON.stringify(r));
            })
            .catch(e => {
                console.log(JSON.stringify(e));
            });
    }

    putProducto() {
        this.absMD.putJson({ id: 4, city: "Francia" }, 1)
            .then(r => {
                console.log(JSON.stringify(r));
            })
            .catch(e => {
                console.log(JSON.stringify(e));
            });
    }

    deleteProducto() {
        this.absMD.deleteJson(5)
            .then(r => {
                console.log(JSON.stringify(r));
            })
            .catch(e => {
                console.log(JSON.stringify(e));
            });
    }
}


export default productosMD;
//const JC = new productosMD();
//JC.postProducto(); 
//JC.putProducto();
//JC.deleteProducto();
//JC.getProductos();
