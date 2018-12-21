'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SettingsSchema extends Schema {
  up() {
    this.create('settings', table => {
      table.increments();
      table.integer('country_id').unsigned();
      table.string('name');
      table.string('legal_name');
      table.string('logo');
      table.string('registration_number');
      table.text('description');
      table.string('postal_address');
      table.string('city');
      table.string('postalcode');
      table.string('state');
      table.string('phone');
      table.string('email');
      table.string('website');
      table.string('vat_id');
      table.string('number_range');
      table.timestamps();
      table.foreign('country_id').references('countries.id');
    });
  }

  down() {
    this.drop('settings');
  }
}

module.exports = SettingsSchema;
