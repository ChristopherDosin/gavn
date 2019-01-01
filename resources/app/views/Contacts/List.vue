<template>
  <div>
    <a-row type="flex">
      <a-col :span="12">
        <h1>Contact List</h1>
      </a-col>
      <a-col :span="12">
        <router-link
          :to="{name: 'createcontact'}"
          class="ant-btn ant-btn-primary"
          style="float: right; background: #57c40a; border-color: #57c40a;"
        >Add contact</router-link>
      </a-col>
    </a-row>
    <div class="card-background">
      <template v-if="loading">
        <a-spin tip="Loading...">
          <a-skeleton :paragraph="{rows: 10}"/>
        </a-spin>
      </template>
      <template v-else>
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
      </template>
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
      this.loading = true;
      let { data } = await this.$http.get(`/contacts`).takeAtLeast(500);

      this.contact = data;
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.ant-skeleton {
  margin: 30px;
}
.ant-table-pagination {
  &.ant-pagination {
    margin-right: 20px;
  }
}
</style>
