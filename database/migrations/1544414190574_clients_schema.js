'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClientsSchema extends Schema {
  up() {
    this.create('clients', table => {
      table.increments();
      table.string('company_name').notNullable();
      table.string('first_name').nullable();
      table.string('last_name').nullable();
      table.string('street').notNullable();
      table.string('postalcode').notNullable();
      table.string('city').notNullable();
      table.string('vat_id', 15).nullable();
      table.string('tax_number').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('clients');
  }
}

module.exports = ClientsSchema;
