import abstractMD from './AbstractMD.js';

class productosMD extends abstractMD {
    constructor() {
        super('articulo');
    }

    /**
     * This method return all 'Productos'.
     */
    getProductos() {
        try {
            return this.getJson();
        }
        catch (e) {
            return e;
        }
    }

    /**
     * This method return a promise with a filter.
     * @param {String} filter 
     */
    getProductosLike(filter = "$^") {
        try {
            return this.getJson(`f?filter=${filter}`);
        }
        catch (e) {
            return e;
        }
    }

    /**
     * This method return a paginated Json.
     * @param {Int} first 
     * @param {Int} size 
     */
    getProductosPaginated(first = "0", size = "2") {
        try {
            return this.getJson(`?size=${size}&first=${first}`);
        }
        catch (e) {
            return e;
        }
    }
}

export default productosMD;