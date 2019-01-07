<template>
  <div>
    <h1>Create an Invoice</h1>
    <a-form :form="form" @submit="handleSubmit">
      <a-row type="flex" justify="center">
        <a-col :span="24" class="paper" style="padding: 30px;">
          <a-row style="margin-bottom: 30px;">
            <a-col :span="17">
              <a-select
                v-if="showSelectContact"
                showSearch
                placeholder="Select a contact"
                optionFilterProp="children"
                style="width: 200px; margin-bottom: 20px;"
                @focus="handleFocus"
                @change="handleChange"
              >
                <a-select-option
                  v-for="contact in contacts"
                  :key="contact.pseudo_id"
                  :value="contact.pseudo_id"
                >{{contact.contact_name}}</a-select-option>
              </a-select>
              <p v-if="companyDetails">
                <small>{{companyDetails.legal_name}} - {{companyDetails.postal_address}} - {{companyDetails.postalcode}} {{companyDetails.city}}</small>
              </p>
              <p v-if="selectedContact">
                <strong>{{selectedContact.contact_name}}</strong>
                <br>
                {{selectedContact.first_name}} {{selectedContact.last_name}}
                <br>
                <span v-html="selectedContact.postal_address"></span>
                <br>
                {{selectedContact.postalcode}} {{selectedContact.region}} {{selectedContact.city}}
                <br>
                <span v-if="selectedContact.country">{{selectedContact.country.name}}</span>
                <a-form-item>
                  <a-input
                    v-decorator="['contact_id', {
                    initialValue: selectedContact.id
                  }]"
                    type="hidden"
                  />
                </a-form-item>
              </p>
            </a-col>
            <a-col :span="7">
              <ul class="metaList">
                <li v-if="companyDetails.vat_id">
                  <div>VAT ID</div>
                  <span>{{companyDetails.vat_id}}</span>
                </li>
                <li>
                  <div>Date</div>
                  <a-date-picker v-model="invoiceDate"/>
                </li>
                <li>
                  <div>Due Date</div>
                  <a-date-picker v-model="dueDate"/>
                </li>
                <li>
                  <div>Invoice</div>
                  <span>{{nextInvoiceNumber}}</span>
                </li>
              </ul>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <div class="contentHeader">
                Invoice {{nextInvoiceNumber}}
                <div class="serviceDate">
                  <template>
                    <span>The invoice date corresponds to the service date.</span>
                  </template>
                  <small>
                    <a href="#" title="Change invoice date">change</a>
                  </small>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-row class="priceHeader" :gutter="16">
              <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
                <template slot="name" slot-scope="text, record, index">
                  <input v-model="dataSource[index].item" class="ant-input" type="text">
                </template>
                <template slot="description" slot-scope="text, record, index">
                  <input v-model="dataSource[index].description" class="ant-input" type="text">
                </template>
                <template slot="quantity" slot-scope="text, record, index">
                  <input v-model="dataSource[index].quantity" class="ant-input" type="text">
                </template>
                <template slot="unitCost" slot-scope="text, record, index">
                  <input v-model="dataSource[index].cost" class="ant-input" type="text">
                </template>
                <template
                  slot="total"
                  slot-scope="text, record, index"
                >{{ getItemTotal(dataSource[index].cost, dataSource[index].quantity)}}</template>
              </a-table>
              <a-button id="editable-add-btn" type="primary" @click="handleAdd">Add new item</a-button>
            </a-row>
            <a-row class="invoiceTotal">
              <a-col :span="17"></a-col>
              <a-col :span="7">
                <div class="sum">
                  <a-row type="flex" style="width: 100%;">
                    <a-col :span="12">
                      <strong>Sub Total :
                        <br>
                        Tax ({{taxRate * 100}}%):
                        <br>Total :
                        <br>
                      </strong>
                    </a-col>
                    <a-col :span="12">
                      {{subTotal}}
                      <br>
                      {{getTax()}}
                      <br>
                      {{total}}
                    </a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>
          </a-row>
        </a-col>
      </a-row>

      <div id="saveForm">
        <div id="saveFormInner">
          <a-row type="flex" justify="space-between" style="width: 100%;">
            <a-col :span="12">
              <a-button type="dashed" htmlType="submit" size="large" @click="$router.go(-1)">Cancel</a-button>
            </a-col>
            <a-col :span="12">
              <div style="display: flex; justify-content: flex-end;">
                <a-form-item style="margin-right: 20px;">
                  <a-button type="danger" htmlType="submit" size="large">Save as draft</a-button>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" htmlType="submit" size="large">Save the invoice</a-button>
                </a-form-item>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-form>

    <invoice-feedback/>
  </div>
</template>
<script>
import moment from "moment";
import numeral from "numeral";

import InvoiceFeedback from "@/components/Invoice/InvoiceFeedback";

export default {
  name: "CreateInvoice",
  components: {
    InvoiceFeedback
  },
  data() {
    return {
      showSelectContact: false,
      dateFormat: "YYYY/MM/DD",
      contacts: [],
      selectedContact: null,
      loading: true,
      invoiceDate: moment(),
      dueDate: moment().add(10, "days"),
      invoice: {
        dateFormat: "YYYY/MM/DD",
        monthFormat: "YYYY/MM"
      },
      taxRate: 0.19,
      taxRates: [],
      nextInvoiceNumber: "",
      form: this.$form.createForm(this),
      companyDetails: [],
      dataSource: [
        {
          key: "0",
          item: "",
          description: "",
          quantity: "",
          cost: ""
        }
      ],
      count: 1,
      columns: [
        {
          title: "Item",
          dataIndex: "name",
          width: "13%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Description",
          width: "45%",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          scopedSlots: { customRender: "quantity" }
        },
        {
          title: "Unit Cost",
          dataIndex: "unit_cost",
          scopedSlots: { customRender: "unitCost" }
        },
        {
          title: "Total Net",
          dataIndex: "total",
          width: "15%",
          scopedSlots: { customRender: "total" }
        }
      ]
    };
  },
  computed: {
    subTotal: function() {
      let subTotal = this.getSubTotal();
      let result = numeral(subTotal).format("$ 0,00.00");
      return result;
    },
    total: function() {
      let total = this.getTotal();
      let result = numeral(total).format("$ 0,00.00");
      return result;
    }
  },
  methods: {
    moment,
    getItemTotal(cost, quantity) {
      return numeral(cost * quantity).format("$ 0,00.00");
    },
    getSubTotal() {
      let subTotal = 0;
      for (let i = this.dataSource.length - 1; i >= 0; i--) {
        subTotal += this.dataSource[i].cost * this.dataSource[i].quantity;
      }
      return subTotal;
    },
    getTotal() {
      let total = this.getSubTotal() + this.getSubTotal() * this.taxRate;
      return total;
    },
    getTax() {
      let tax = this.getTotal() - this.getSubTotal();
      let result = numeral(tax).format("$ 0,00.00");
      return result;
    },
    async getTaxRates() {
      const { data } = await this.$http.get(`taxrate`);
      this.taxRates = data;
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        item: "",
        description: "",
        cost: "",
        quantity: ""
      };
      this.dataSource.push(newData);
      this.count = count + 1;
    },
    async handleSubmit(e) {
      e.preventDefault();
      try {
        let response = await this.$http
          .post(`/invoice`, {
            invoiceItems: this.dataSource,
            contactId: this.selectedContact.id,
            invoiceDate: this.invoiceDate,
            dueDate: this.dueDate
          })
          .takeAtLeast(500);

        this.$notification["success"]({
          message: "Success",
          description: `Invoice created succesfully`
        });
        this.$router.push({ name: "invoices" });
      } catch (error) {
        this.$notification["error"]({
          message: "Error",
          description: error.message
        });
      }
    },
    async getAllSettings() {
      let { data } = await this.$http.get(`/settings`);
      this.companyDetails = data;
    },
    async handleChange(pseudoId) {
      let { data } = await this.$http.get(`/contacts/${pseudoId}`);
      this.selectedContact = data;
    },
    async handleFocus() {
      let { data } = await this.$http.get(`/contacts`);
      this.contacts = data;
    },
    async getNextInvoiceNumber() {
      let { data } = await this.$http.get(`/invoice/getLatestInvoiceId`);
      this.nextInvoiceNumber = ++data;
    },
    async findOrFailContact() {
      const { contactDetails } = this.$route.params;
      if (contactDetails) {
        this.showSelectContact = false;
        this.selectedContact = contactDetails;
      } else {
        this.showSelectContact = true;
      }
    }
  },
  mounted: function() {
    this.findOrFailContact();
    this.getAllSettings();
    this.getNextInvoiceNumber();
    this.handleFocus();
    this.getTaxRates();
  }
};
</script>

<style lang="scss" scoped>
#editable-add-btn {
  margin: 20px;
}
.taxRateContainer {
  background-color: #f9edbe;
  border: 1px solid #f0c36d;
  padding: 30px;
  margin-right: 30px;
}
.contentHeader {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 10px;
  border-bottom: 3px solid #bbb;
  padding-top: 20px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.serviceDate {
  font-size: 1rem;
  font-weight: normal;
  display: flex;
  align-items: baseline;
}
.serviceDate a {
  text-decoration: underline;
  margin-left: 5px;
}
.invoiceTotal {
  padding: 30px 0;
  border-top: 3px solid #bbbbbb;
}
.invoiceTotal span,
.sumValue {
  font-weight: bold;
}
.sum {
  padding-top: 5px;
  border-top: 1px solid #000;
  display: flex;
  justify-content: space-between;
}
.paper {
  background: #fff;
  box-shadow:
    /* The top layer shadow */ 0 -1px 1px rgba(0, 0, 0, 0.15),
    /* The second layer */ 0 -10px 0 -5px #eee,
    /* The second layer shadow */ 0 -10px 1px -4px rgba(0, 0, 0, 0.15),
    /* The third layer */ 0 -20px 0 -10px #eee,
    /* The third layer shadow */ 0 -20px 1px -9px rgba(0, 0, 0, 0.15);
  padding: 30px;
}

.priceHeader {
  font-weight: bold;
}
.companyInformation {
  margin-bottom: 10px;
}
.metaList {
  padding: 0;
  margin: 0;
  width: 100%;
  float: right;
}
.metaList li {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}
.metaList li span {
  flex: 1;
}
.metaList li > div {
  width: 30%;
  margin-right: 5%;
  font-weight: bold;
}
#saveForm {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.08);
  background: #fff;
  border-top: 1px solid #e2e3e4;
  padding: 10px 0 10px 0;
  height: auto;
  display: flex;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 16, 0.05) 0,
      hsla(0, 0%, 100%, 0)
    );
    transform: translateY(0);
    height: 15px;
    width: 100%;
    transition: opacity 0.2s ease-in-out;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  #saveFormInner {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
