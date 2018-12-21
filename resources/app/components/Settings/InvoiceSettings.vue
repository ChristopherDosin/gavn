<template>
  <div class="card-background">
    <a-row type="flex">
      <a-col :span="24">
        <a-spin :spinning="loading.form">
          <a-form id="invoiceForm" :form="form" @submit="handleSubmit">
            <a-card title="Invoice Settings" :bordered="false">
              <check-vat/>
              <a-form-item
                label="Next invoice number"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
              >
                <a-input v-model="latestInvoiceNumber" type="number" placeholder="1000"/>
              </a-form-item>
              <a-form-item
                label="Numbers"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
              >
                <a-input type="number" placeholder="6" value="6"/>
              </a-form-item>
              <a-form-item label="Due date" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <div id="selectDuDate">
                  <a-input type="number" placeholder="7"/>
                  <a-select defaultValue="lucy">
                    <a-select-option value="jack">off the follwing month</a-select-option>
                    <a-select-option value="lucy">day(s) after the invoice date</a-select-option>
                    <a-select-option value="disabled">day(s) after the invoice month</a-select-option>
                    <a-select-option value="Yiminghe">off the current month</a-select-option>
                  </a-select>
                </div>
              </a-form-item>
            </a-card>
          </a-form>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CheckVat from "@/components/Settings/CheckVat";
export default {
  name: "SettingsIndex",
  components: {
    CheckVat
  },
  data() {
    return {
      loading: {
        form: false
      },
      data: "",
      latestInvoiceNumber: "",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    async getLatestInvoiceId() {
      let { data } = await this.$http.get(`/invoice/getLatestInvoiceId`);
      this.latestInvoiceNumber = data;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.loading.form = true;
      await this.form.validateFields((err, values) => {
        if (!err) {
          this.$http.put("/settings", values).then(response => {
            setTimeout(() => {
              this.$notification["success"]({
                message: "Success",
                description: `Settings saved succesfully`
              });
              this.loading.form = false;
            }, 1000);
          });
        } else {
          this.loading.form = false;
        }
      });
    }
  },
  mounted() {
    this.getLatestInvoiceId();
  }
};
</script>
<style lang="scss">
#selectDuDate {
  display: flex;
  .ant-select-selection {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    flex: 1;
  }
  .ant-input {
    width: 15%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
}
</style>
