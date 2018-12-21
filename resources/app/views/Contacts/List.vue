<template>
  <div>
    <a-row type="flex" style="padding: 10px 0 10px 0;">
      <a-col :span="12"></a-col>
      <a-col :span="12">
        <router-link
          to="/contacts/create"
          class="ant-btn ant-btn-primary"
          style="float: right; background: #57c40a; border-color: #57c40a;"
        >Add contact</router-link>
      </a-col>
    </a-row>
    <div class="card-background">
      <a-spin :spinning="loading">
        <a-table :columns="columns" :dataSource="contact">
          <template slot="contactName" slot-scope="text, record">
            <router-link
              style="color: #2baaed;"
              :to="{ name: 'contactDetail', params: { pseudoId: record.pseudo_id }}"
            >{{text}}</router-link>
            <small v-if="record.postal_address" style="color: #8296aa; display: block;">
              <span v-html="record.postal_address"></span>
            </small>
            <small v-if="!record.skype">
              skype:
              <a href="skype:SKYPENAME?call">{{record.skype}}</a>
            </small>
          </template>
        </a-table>
      </a-spin>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "Company Name",
    dataIndex: "contact_name",
    scopedSlots: { customRender: "contactName" }
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "They owe you",
    dataIndex: ""
  }
];

export default {
  name: "ContactList",
  data() {
    return {
      contact: [],
      columns,
      loading: false
    };
  },
  mounted() {
    this.getAllContacts();
  },
  methods: {
    async getAllContacts() {
      let { data } = await this.$http.get(`/contacts`);
      this.contact = data;
    }
  }
};
</script>
<style>
.ant-table-pagination.ant-pagination {
  margin-right: 20px;
}
</style>
