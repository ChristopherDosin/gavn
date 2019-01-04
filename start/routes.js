'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.resource('contacts', 'ContactController').validator(new Map([[['contacts.store'], ['StoreContact']], [['contacts.update'], ['UpdateContact']]]));

  Route.get('/invoices', 'InvoiceController.index');
  Route.get('/invoice/getLatestInvoiceId', 'InvoiceController.getLatestInvoiceId');
  Route.post('/invoice', 'InvoiceController.store');

  Route.get('/invoices/generatepdf/:id', 'InvoiceController.pdf');

  Route.get('/taxrate', 'TaxRateController.index');
  Route.post('/taxrate', 'TaxRateController.store');

  Route.get('/settings', 'SettingController.index');
  Route.put('/settings', 'SettingController.update');
  Route.post('/settings/logo', 'SettingsController.uploadLogo');

  Route.post('/register', 'UserController.register');
  Route.post('/login', 'UserController.login');

  Route.get('/countries/allCountries', 'CountryController.getAllCountries');
}).prefix('api/v1');

Route.any('*', ({ view }) => view.render('app'));
