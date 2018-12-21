'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CountrySchema extends Schema {
  up() {
    this.create('countries', table => {
      table.increments();
      table.string('name');
      table.string('alpha_2', 2);
      table.string('alpha_3', 3);
    });
  }

  down() {
    this.drop('countries');
  }
}

module.exports = CountrySchema;
