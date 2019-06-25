import abstractMD from './AbstractMD.js';

class cajaMD extends abstractMD {
    constructor() {
        super('sucursal');
    }

    /**
     * This method return all 'Cajas'.
     */
    getCajas(value) {
        try {
            return this.getJson(value);
        }
        catch (e) {
            return e;
        }
    }

    
}

export default cajaMD;