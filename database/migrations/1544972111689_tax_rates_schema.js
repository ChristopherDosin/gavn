'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TaxRatesSchema extends Schema {
  up() {
    this.create('tax_rates', table => {
      table.increments();
      table.string('name');
      table.decimal('rate');
    });
  }

  down() {
    this.drop('tax_rates');
  }
}

module.exports = TaxRatesSchema;
