'use strict';

/*
|--------------------------------------------------------------------------
| SettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

class SettingSeeder {
  async run() {
    const setting = await Factory.model('App/Models/Setting').create();
  }
}

module.exports = SettingSeeder;
