'use strict';

class StoreContact {
  get rules() {
    return {
      contact_name: 'required',
      email: 'email|unique:contacts',
      pseudo_id: 'required|unique:contacts'
    };
  }
}

module.exports = StoreContact;
