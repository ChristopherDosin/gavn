'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class InvoiceItem extends Model {
  invoice() {
    return this.belongsTo('App/Models/Invoice');
  }

  static get computed() {
    return ['totalNet', 'totalGross', 'totalVat'];
  }

  getTotalNet({ cost, quantity }) {
    return cost * quantity;
  }

  getTotalGross({ cost, quantity }) {
    const totalNet = cost * quantity;
    const totalGross = totalNet * 1.19;
    return totalGross;
  }

  getTotalVat({ cost, quantity }) {
    const totalNet = cost * quantity;
    const totalVat = totalNet * 0.19;
    return totalVat;
  }
}

module.exports = InvoiceItem;
