'use strict';

const Database = use('Database');
const Invoice = use('App/Models/Invoice');
const Helpers = use('Helpers');

const _ = require('lodash');
const Fs = require('fs');
const Path = require('path');
const Util = require('util');
const Puppeteer = require('puppeteer');
const Handlebars = require('handlebars');
const ReadFile = Util.promisify(Fs.readFile);

class InvoiceController {
  async index() {
    const allInvoices = await Invoice.query()
      .with('invoiceItems')
      .with('invoiceStatus')
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

  async html(id) {
    try {
      const invoiceData = await Invoice.query()
        .where('id', id)
        .with('invoiceItems')
        .first();

      const invoicePath = Helpers.viewsPath('invoice.html');

      const templatePath = Path.resolve(invoicePath);
      const content = await ReadFile(templatePath, 'utf8');

      const template = Handlebars.compile(content);

      return template(invoiceData);
    } catch (error) {
      throw new Error('Cannot create invoice HTML template.');
    }
  }

  async pdf({ params }) {
    if (!params.id) {
      return;
    }

    const html = await this.html(params.id);

    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    return page.pdf();
  }
}

module.exports = InvoiceController;
