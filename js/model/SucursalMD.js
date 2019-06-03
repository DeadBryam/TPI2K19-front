import abstractMD from './AbstractMD.js';

class sucursalMD extends abstractMD {
    constructor() {
        super('sucursal');
    }

    /**
     * This method return all 'Sucursales'.
     */
    getSucursales() {
        try {
            return this.getJson();
        }
        catch (e) {
            return e;
        }
    }

    
}

export default sucursalMD;