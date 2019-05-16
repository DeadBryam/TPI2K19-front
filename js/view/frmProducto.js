import scissors from '../control/scissors.js';
import productoMD from '../model/ProductosMD.js';

class frmProducto {
    constructor() {
        this.producto = new productoMD();
        this.init();
    }

    init() {
        document.addEventListener("update-autocomplete", ev => {
            if(ev.detail.value === ""){
                ev.detail.value = "$^";
            }
            ev.target.data = this.obtenerOrigen(`?departamento_like=${ev.detail.value}`);
        });
    }

    obtenerOrigen(action = "") {
        try {
            const r = this.producto.getProductos(action);
            return r.then(re => {
                return re.map(m => {
                    return m.departamento;
                });
            });
        }
        catch (e) {
            return e;
        }
    }
}

let producto = new frmProducto();
//producto.obtenerCiudad();