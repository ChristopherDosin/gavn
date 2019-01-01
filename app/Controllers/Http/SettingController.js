'use strict';

const Database = use('Database');
const Settings = use('App/Models/Setting');

class SettingController {
  async index() {
    try {
      const query = await Settings.query()
        .with('country')
        .firstOrFail();
      return query;
    } catch (error) {
      return;
    }
  }

  async update({ request }) {
    const settings = Settings.query()
      .firstOrFail()
      .catch(() => {
        console.log('error');
      });

    if (settings) {
      let settings = await Settings.firstOrFail();
      settings.merge(request.all());

      await settings.save();

      return settings;
    } else {
      let settings = new Settings();
      settings.fill(request.all());

      await settings.save();

      return settings;
    }
  }

  async store({ request }) {
    console.log(request.all());
  }

  async uploadLogo({ request, response }) {
    // TODO
  }
}

module.exports = SettingController;
