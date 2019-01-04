<template>
  <div class="card-background">
    <template v-if="loading">
      <a-spin tip="Loading...">
        <a-skeleton :paragraph="{rows: 10}"/>
      </a-spin>
    </template>
    <template v-else>
      <a-table :columns="columns" :dataSource="invoices">
        <template slot="dueDate" slot-scope="text, record, index">{{record.due_date | toDate}}</template>
        <template
          slot="invoiceDate"
          slot-scope="text, record, index"
        >{{record.invoice_date | toDate}}</template>
        <template slot="invoiceStatus" slot-scope="text, record, index">
          <a-badge
            :count="text"
            :numberStyle="{backgroundColor: getStatusColor(record.invoice_status_id)} "
          />
        </template>
        <template slot="actions" slot-scope="text, record, index">
          <a-popconfirm
            title="Do you want to print the invoice?"
            @confirm="generatePdf(record.id)"
            okText="Print"
            cancelText="Cancel"
          >
            <a-icon type="printer"/>
          </a-popconfirm>
          <a-icon type="edit"/>
        </template>
      </a-table>
    </template>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "id",
    title: "Number",
    dataIndex: "invoice_number",
    key: "invoice_number",
    width: "10%"
  },
  {
    dataIndex: "contact.contact_name",
    title: "Contact Name",
    dataIndex: "contact.contact_name",
    key: "contact.contact_name",
    width: "26%"
  },
  {
    title: "Amount",
    dataIndex: "invoice_net",
    key: "invoice_net",
    width: "15%"
  },
  {
    title: "Invoice date",
    dataIndex: "invoice_date",
    key: "invoice_date",
    width: "15%",
    scopedSlots: { customRender: "invoiceDate" }
  },
  {
    title: "Due date",
    dataIndex: "due_date",
    key: "due_date",
    width: "15%",
    scopedSlots: { customRender: "dueDate" }
  },
  {
    title: "Status",
    dataIndex: "invoiceStatus.name",
    key: "invoiceStatus.id",
    width: "10%",
    scopedSlots: { customRender: "invoiceStatus" }
  },
  {
    title: "Actions",
    width: "15%",
    scopedSlots: { customRender: "actions" }
  }
];

import moment from "moment";

export default {
  name: "InvoiceList",
  data() {
    return {
      columns: columns,
      invoices: [],
      status: "",
      loading: false
    };
  },
  filters: {
    toDate: function(date) {
      return moment(date).format("D MMM YYYY");
    }
  },
  methods: {
    async getAllInvoices() {
      this.loading = true;
      let { data } = await this.$http(`/invoices`).takeAtLeast(500);

      this.invoices = data;
      this.loading = false;
    },
    async generatePdf(id) {
      const { data } = await this.$http.get(`/invoices/generatepdf/${id}`);
      return data;
    },
    getStatusColor(statusId) {
      switch (statusId) {
        case 1:
          return "#52c41a";
          break;
        case 2:
          return "#1890ff";
          break;
      }
    }
  },
  mounted() {
    this.getAllInvoices();
  }
};
</script>

<style lang="scss" scoped>
.ant-skeleton {
  margin: 30px;
}
</style>

