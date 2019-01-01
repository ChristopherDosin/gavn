'use strict';

const Contact = use('App/Models/Contact');
const Mail = use('Mail');
const { validate } = use('Validator');

const moment = use('moment');

class ContactController {
  async index() {
    const allContacts = await Contact.all();

    return allContacts;
  }

  async show({ request }) {
    const result = await Contact.query()
      .where('pseudo_id', request.params.id)
      .with('country')
      .with('invoice.invoiceItems')
      .with('invoice.invoiceStatus')
      .first();

    return result;
  }

  async store({ request, response }) {
    try {
      const contact = new Contact();

      contact.fill(request.all());

      await contact.save();

      return response.json({
        status: 'success',
        data: contact
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: error
      });
    }
  }

  async update({ request, response }) {
    try {
      let contact = await Contact.query()
        .with('country')
        .where('pseudo_id', request.params.id)
        .first();

      contact.merge(request.all());

      await contact.save();

      return response.json({
        status: 'success',
        data: contact
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: error
      });
    }
  }
}

module.exports = ContactController;
