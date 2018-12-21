'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InvoiceStatusSchema extends Schema {
  up() {
    this.create('invoice_statuses', table => {
      table.increments();
      table.string('name');
    });
  }

  down() {
    this.drop('invoice_statuses');
  }
}

module.exports = InvoiceStatusSchema;
