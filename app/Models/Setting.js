'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Setting extends Model {
  country() {
    return this.belongsTo('App/Models/Country');
  }
  currencies() {
    return this.hasMany('App/Models/Curency');
  }
}

module.exports = Setting;
