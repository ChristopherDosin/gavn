<template>
  <div class="card-background">
    <a-row type="flex">
      <a-col :span="24">
        <a-card title="Tax Rates" :bordered="false" :bodyStyle="bodyStyle">
          <add-tax-rate-modal slot="extra"/>
          <a-table :columns="columns" :dataSource="rates">
            <template slot="rate" slot-scope="rate, record, index">{{rate | percentage}}</template>
            <template slot="actions" slot-scope="text, record, index">
              <a-icon type="delete"/>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import numeral from "numeral";
import AddTaxRateModal from "@/components/Settings/InvoiceSettings/AddTaxRateModal";

const bodyStyle = {
  padding: 0
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "45%"
  },
  {
    title: "Rate",
    dataIndex: "rate",
    width: "40%",
    scopedSlots: { customRender: "rate" }
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "15%",
    scopedSlots: { customRender: "actions" }
  }
];

export default {
  name: "TaxRates",
  components: {
    AddTaxRateModal
  },
  data() {
    return {
      bodyStyle,
      rates: [],
      columns
    };
  },
  filters: {
    percentage: function(rate) {
      let taxRate = numeral(rate).format("0.00");
      return `${taxRate}%`;
    }
  },
  methods: {
    async getAllTaxRates() {
      let { data } = await this.$http.get(`/taxrate`);
      this.rates = data;
    }
  },
  mounted() {
    this.getAllTaxRates();
  }
};
</script>
