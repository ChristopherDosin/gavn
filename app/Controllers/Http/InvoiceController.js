'use strict';

const Database = use('Database');
const Invoice = use('App/Models/Invoice');

const _ = require('lodash');

class InvoiceController {
  async index() {
    const allInvoices = await Invoice.query()
      .with('invoiceItems')
      .with('contact')
      .fetch();

    return allInvoices;
  }

  async show({ request, response }) {
    // TODO
  }

  async getLatestInvoiceId() {
    const lastInvoice = await Database.select('invoice_number')
      .from('invoices')
      .orderBy('invoice_number', 'desc')
      .first();

    return lastInvoice.invoice_number;
  }

  async store({ request }) {
    /*
     * Get all invoice items from the invoice
     */
    let invoiceItems = request.input('invoiceItems');

    /*
     * Loop through the invoice items to get the total amount of the invoice
     */
    let invoiceNet = 0;
    await _.forEach(invoiceItems, value => {
      invoiceNet += value.cost * value.quantity;
    });

    /*
     * Get the latest invoice number from the last record
     */
    let lastInvoice = await Database.select('invoice_number')
      .from('invoices')
      .orderBy('invoice_number', 'desc')
      .first();

    /*
     * Increment the latest invoice number by 1
     */
    let lastInvoiceNumber = ++lastInvoice.invoice_number;

    /*
     * Save the new invoice
     */
    const invoice = await Invoice.create({
      invoice_number: lastInvoiceNumber,
      invoice_net: invoiceNet,
      contact_id: request.input('contactId'),
      invoice_date: request.input('invoiceDate'),
      due_date: request.input('dueDate')
    });

    /*
     * Save the related invoice items
     */
    await invoice.invoiceItems().createMany(invoiceItems);

    return invoice;
  }
}

module.exports = InvoiceController;
