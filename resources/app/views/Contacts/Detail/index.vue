<template>
  <div>
    <div class="content">
      <a-row style="margin-bottom: 10px;">
        <a-col :span="12">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <router-link
                  :to="{ name: 'createInvoice', params: { contactDetails: contactDetail }}"
                >
                  <a-icon type="file-add" style="margin-right: 5px;"/>Sales Invoice
                </router-link>
              </a-menu-item>
            </a-menu>
            <a-button type="primary">New
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
        <a-col :span="12" style="display: flex; justify-content: flex-end;">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="user"/>1st menu item
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="user"/>2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="user"/>3rd item
              </a-menu-item>
            </a-menu>
            <a-button>Options
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
          <a-button style="margin-left: 20px;">
            <router-link
              :to="{ name: 'createcontact', params: { contactDetails: contactDetail }}"
            >Edit</router-link>
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="17">
          <template v-if="!invoices.length">
            <empty-contact/>
          </template>
          <template v-else>
            <invoice-table :invoice="invoices"/>
          </template>
        </a-col>
        <a-col :span="7">
          <contact-details v-on:contactDetails="updateContactDetail"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import EmptyContact from "@/components/Contact/EmptyContact";
import ContactDetails from "@/components/Contact/ContactDetails";
import InvoiceTable from "@/components/Contact/InvoicesTable";
export default {
  components: {
    EmptyContact,
    ContactDetails,
    InvoiceTable
  },
  data() {
    return {
      contactDetail: "",
      invoices: [],
      loading: false
    };
  },
  methods: {
    updateContactDetail(contactDetails) {
      this.contactDetail = contactDetails;
    },
    async getContactDetails() {
      let { data } = await this.$http.get(
        `/contacts/${this.$route.params.pseudoId}`
      );
      this.invoices = data.invoice;
    }
  },
  mounted: function() {
    this.getContactDetails();
  }
};
</script>