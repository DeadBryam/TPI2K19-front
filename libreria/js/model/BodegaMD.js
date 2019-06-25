import abstractMD from './AbstractMD.js';

class bodegaMD extends abstractMD {
    constructor() {
        const session = JSON.parse(sessionStorage.getItem('session'));
        super(`sucursal/${session.sucursal}/bodega`);
    }

    /**
     * This method return a promise with a filter.
     * @param {String} filter 
     */
    filter(filter = "$^") {
        try {
            return this.getJson(`?filter=${filter}`);
        }
        catch (e) {
            return e;
        }
    }

    getAll() {
        try {
            return this.getJson();
        }
        catch (e) {
            return e;
        }
    }

}

export default bodegaMD;