'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InvoiceItemsSchema extends Schema {
  up() {
    this.create('invoice_items', table => {
      table.increments();
      table.integer('invoice_id').unsigned();
      table.integer('key');
      table.string('item');
      table.text('description');
      table.decimal('cost');
      table.decimal('quantity').nullable();
      table.timestamps();

      table.foreign('invoice_id').references('invoices.id');
    });
  }

  down() {
    this.drop('invoice_items');
  }
}

module.exports = InvoiceItemsSchema;
