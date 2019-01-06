<template>
  <div class="card-background">
    <a-table :columns="columns" :dataSource="invoice">
      <template slot="dueDate" slot-scope="text, record, index">{{record.due_date | toDate}}</template>
      <template slot="invoiceDate" slot-scope="text, record, index">{{record.invoice_date | toDate}}</template>
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
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "id",
    title: "Number",
    dataIndex: "invoice_number",
    key: "invoice_number",
    width: "15%"
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
    width: "18%",
    scopedSlots: { customRender: "invoiceDate" }
  },
  {
    title: "Due date",
    dataIndex: "due_date",
    key: "due_date",
    width: "18%",
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
    title: "",
    dataIndex: "actions",
    key: "actions",
    width: "10%",
    scopedSlots: { customRender: "actions" }
  }
];

import moment from "moment";

export default {
  props: ["invoice"],
  data() {
    return {
      columns,
      status: ""
    };
  },
  filters: {
    toDate: function(date) {
      return moment(date).format("D MMM YYYY");
    }
  },
  methods: {
    getStatusColor(statusId) {
      switch (statusId) {
        case 1:
          return "#52c41a";
          break;
        case 2:
          return "#1890ff";
          break;
      }
    },
    async generatePdf(id) {
      // TODO get .pdf from backend
      return;
    }
  }
};
</script>

<style>
</style>
