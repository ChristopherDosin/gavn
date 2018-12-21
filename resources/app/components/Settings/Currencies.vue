<template>
  <div class="card-background">
    <a-row type="flex">
      <a-col :span="24">
        <a-card title="Currencies" :bordered="false">
          <a-table :columns="columns" :dataSource="data"></a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Rate",
    dataIndex: "rate"
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
  data() {
    return {
      data: [],
      columns
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
</style>
