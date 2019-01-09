'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/Setting', async faker => {
  return {
    name: faker.name(),
    legal_name: faker.company(),
    postal_address: faker.address(),
    city: faker.city(),
    postalcode: faker.zip(),
    state: faker.state(),
    phone: faker.phone(),
    email: faker.email(),
    website: faker.url()
  };
});

Factory.blueprint('App/Models/InvoiceStatus', async (faker, i, data) => {
  return {
    name: ['approved', 'pending', 'cancled'][i]
  };
});
