'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Country extends Model {
  setting() {
    return this.belongsToMany('App/Models/Setting');
  }
  contact() {
    return this.belongsToMany('App/Models/Contact');
  }
}

module.exports = Country;
