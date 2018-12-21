'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Currency extends Model {
  setting() {
    return this.belongsTo('App/Models/Setting');
  }
}

module.exports = Currency;
