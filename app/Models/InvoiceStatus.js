'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class InvoiceStatus extends Model {
  invoice() {
    return this.hasMany('App/Models/Invoice');
  }
}

module.exports = InvoiceStatus;
