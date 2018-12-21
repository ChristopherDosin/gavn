'use strict';

class UpdateContact {
  get rules() {
    return {
      contact_name: 'required'
    };
  }
}

module.exports = UpdateContact;
