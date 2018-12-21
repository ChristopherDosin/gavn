'use strict';

const Database = use('Database');
const Settings = use('App/Models/Setting');

class SettingController {
  async index() {
    const query = await Settings.query()
      .with('country')
      .first();
    return query;
  }

  async update({ request }) {
    const all = request.all();
    let settings = await Settings.firstOrFail();

    settings.merge(all);
    await settings.save();

    return settings;
  }

  async uploadLogo({ request, response }) {
    // TODO
  }
}

module.exports = SettingController;
