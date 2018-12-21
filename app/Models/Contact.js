'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Contact extends Model {
  country() {
    return this.belongsTo('App/Models/Country');
  }
  invoice() {
    return this.hasMany('App/Models/Invoice');
  }
}

module.exports = Contact;
