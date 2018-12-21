'use strict';

const Countries = use('App/Models/Country');

class CountryController {
  async getAllCountries() {
    const allCountries = await Countries.all();

    return allCountries;
  }
}

module.exports = CountryController;
