'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InvoiceSchema extends Schema {
  up() {
    this.create('invoices', table => {
      table.increments();
      table.integer('contact_id').unsigned();
      table.integer('invoice_status_id').unsigned();

      table.string('invoice_number').notNullable();
      table.decimal('invoice_net').nullable();
      table.date('invoice_date').nullable();
      table.date('due_date').nullable();
      table.timestamps();

      table.foreign('contact_id').references('contacts.id');
      table.foreign('invoice_status_id').references('invoice_statuses.id');
    });
  }

  down() {
    this.drop('invoices');
  }
}

module.exports = InvoiceSchema;
