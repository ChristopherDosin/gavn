'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContactSchema extends Schema {
  up() {
    this.create('contacts', table => {
      table.increments();
      table.integer('country_id').unsigned();
      table.string('pseudo_id');
      table.string('contact_name');
      table.string('account_number');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('phone');
      table.string('fax');
      table.string('mobile');
      table.string('direct_dial');
      table.string('skype');
      table.string('website');
      table.text('postal_address');
      table.string('city');
      table.string('postalcode');
      table.string('region');
      table.timestamps();
      table.foreign('country_id').references('countries.id');
    });
  }

  down() {
    this.drop('contacts');
  }
}

module.exports = ContactSchema;
