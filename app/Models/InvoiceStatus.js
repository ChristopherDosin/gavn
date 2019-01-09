'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class InvoiceStatus extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  invoice() {
    return this.hasMany('App/Models/Invoice');
  }
}

module.exports = InvoiceStatus;
