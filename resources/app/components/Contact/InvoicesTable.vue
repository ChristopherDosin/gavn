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
    width: "20%"
  },
  {
    title: "Amount",
    dataIndex: "invoice_net",
    key: "invoice_net",
    width: "20%"
  },
  {
    title: "Invoice date",
    dataIndex: "invoice_date",
    key: "invoice_date",
    width: "30%",
    scopedSlots: { customRender: "invoiceDate" }
  },
  {
    title: "Due date",
    dataIndex: "due_date",
    key: "due_date",
    width: "30%",
    scopedSlots: { customRender: "dueDate" }
  },
  {
    title: "Status",
    dataIndex: "invoiceStatus.name",
    key: "invoiceStatus.id",
    width: "20%",
    scopedSlots: { customRender: "invoiceStatus" }
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
    }
  }
};
</script>

<style>
</style>
