import abtractMD from './AbstractMD.js';

class productosMD {
    constructor() {
        this.absMD = new abtractMD('cities');
    }

    getProductos() {
        this.absMD.getJson()
            .then(r => {
                console.log(JSON.stringify(r));
            })
            .catch(e => {
                console.log(JSON.stringify(e));
            });
    }

    postProducto() {
        this.absMD.postJson({ city: "Peru" })
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

const JC = new productosMD();


JC.postProducto(); 
JC.putProducto();
JC.deleteProducto();
JC.getProductos();
