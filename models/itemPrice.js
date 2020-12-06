var utilfull = require('../helpers/utilfull');
module.exports = class ItemPrice {
    constructor({ id, product, price, alliedEntity, showIn, lastUpdate, }) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.alliedEntity = alliedEntity;
        this.showIn = showIn;
        this.lastUpdate = lastUpdate;
    }
    name(capital) {
        return capital ? "ItemPrice" : "itemPrice"
    }
    modelObject() {
        return {
            product: this.product,
            price: parseInt(this.price),
            alliedEntity: this.alliedEntity,
            showIn: utilfull.converArray(this.showIn),
            lastUpdate: utilfull.converDate(this.lastUpdate),
        }
    }
    fieldAndTitle() {
        return {
            product: "Producto",
            price: "Precio",
            showIn: "Mostrar En",
            lastUpdate: "Ultima Actualizacion",
        }
    }
    toJSON(includeUndefined) {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b] == undefined) {
                if (includeUndefined) {
                    a[b] = this[b];
                }
            } else {
                a[b] = this[b];
            }
            return a
        }, {});
    }

}
