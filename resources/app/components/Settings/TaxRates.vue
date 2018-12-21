<template>
  <div class="card-background">
    <a-row type="flex">
      <a-col :span="24">
        <a-card title="Tax Rates" :bordered="false">
          <add-tax-rate-modal/>
          <a-table :columns="columns" :dataSource="rates">
            <template slot="test" slot-scope="rate, record, index">{{rate | percentage}}</template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import numeral from "numeral";
import AddTaxRateModal from "@/components/Settings/InvoiceSettings/AddTaxRateModal";

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Rate",
    dataIndex: "rate",
    scopedSlots: { customRender: "test" }
  },
  {
    title: "Type",
    dataIndex: "type"
  },
  {
    title: "Action",
    dataIndex: "action"
  }
];

export default {
  name: "TaxRates",
  components: {
    AddTaxRateModal
  },
  data() {
    return {
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
