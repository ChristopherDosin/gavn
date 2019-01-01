'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const moment = require('moment');
const numeral = require('numeral');

class Invoice extends Model {
  invoiceItems() {
    return this.hasMany('App/Models/InvoiceItem');
  }
  contact() {
    return this.belongsTo('App/Models/Contact');
  }
  invoiceStatus() {
    return this.belongsTo('App/Models/InvoiceStatus');
  }

  static get computed() {
    return ['dateDifference'];
  }

  static castDates(field, value) {
    return moment(value).format('D MMM YYYY');
  }

  getInvoiceNet(amount) {
    return numeral(amount).format('$ 0,0.00');
  }

  setInvoiceDate(date) {
    return moment(date).toDate();
  }

  setDueDate(date) {
    return moment(date).toDate();
  }

  getDateDifference({ invoice_date, due_date }) {
    let invoiceDate = moment(invoice_date);
    let dueDate = moment(due_date);
    let total = moment(invoiceDate);

    return total.diff(dueDate, 'days');
  }
}

module.exports = Invoice;
