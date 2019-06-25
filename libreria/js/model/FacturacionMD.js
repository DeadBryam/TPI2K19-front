import abstractMD from "./AbstractMD.js";

class facturacionMD extends abstractMD {
    constructor() {
        const session = JSON.parse(sessionStorage.getItem('session'));
        super(`sucursal/${session.sucursal}/caja/${session.caja }`);
    }
}

export default facturacionMD;