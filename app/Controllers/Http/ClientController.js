'use strict';

const Client = use('App/Models/Client');

class ClientController {
  async index() {
    const allClients = await Client.all();
    return allClients;
  }

  async show({ request }) {
    const Client = use('App/Models/Client');
    return await Client.findOrFail(request.params.id);
  }

  async store({ request, response }) {
    try {
      const client = new Client();

      client.company_name = request.input('company_name');
      client.first_name = request.input('first_name');
      client.last_name = request.input('last_name');
      client.postalcode = request.input('postalcode');
      client.street = request.input('street');
      client.city = request.input('city');

      await client.save();

      return response.json({
        status: 'success',
        data: client
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: error
      });
    }
  }
}

module.exports = ClientController;
