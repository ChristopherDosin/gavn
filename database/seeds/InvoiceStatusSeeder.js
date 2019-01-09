'use strict';

/*
|--------------------------------------------------------------------------
| InvoiceStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class InvoiceStatusSeeder {
  async run() {
    const invoiceStatus = await Factory.model('App/Models/InvoiceStatus').createMany(3);
  }
}

module.exports = InvoiceStatusSeeder;
