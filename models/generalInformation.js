var utilfull = require('../helpers/utilfull');
module.exports = class GeneralInformation {
  constructor({ id, product, price, lastUpdate, }) {
    this.id = id;
    this.product = product;
    this.price = price;
    this.lastUpdate = lastUpdate;
  }
  name(capital) {
    return capital ? "GeneralInformation" : "generalInformation"
  }
  modelObject() {
    return {
      product: this.product,
      price: parseInt(this.price),
      lastUpdate: utilfull.converDate(this.lastUpdate),
    }
  }
  fieldAndTitle() {
    return {
      product: "Producto",
      price: "Precio",
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
