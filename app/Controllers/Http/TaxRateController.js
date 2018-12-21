'use strict';

const { validate } = use('Validator');
const TaxRate = use('App/Models/TaxRate');

const numeral = require('numeral');

class TaxRateController {
  async index() {
    let allRates = await TaxRate.all();
    return allRates;
  }

  async store({ request, response }) {
    const rules = {
      name: 'required'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      response.status(500).send(validation.messages());
    }

    const rate = new TaxRate();
    rate.fill(request.all());
    await rate.save();

    return rate;
  }
}

module.exports = TaxRateController;
