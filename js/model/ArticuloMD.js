import abstractMD from './AbstractMD.js';

class articuloMD extends abstractMD {
    constructor() {
        super('articulo');
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

}

export default articuloMD;