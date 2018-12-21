'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InvoiceSettingsSchema extends Schema {
  up() {
    this.create('invoice_settings', table => {
      table.increments();
      table.string('invoice_number');
      table.string('prefix');
      table.timestamps();
    });
  }

  down() {
    this.drop('invoice_settings');
  }
}

module.exports = InvoiceSettingsSchema;
