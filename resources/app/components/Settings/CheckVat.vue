<template>
  <div id="checkVat">
    <a-form-item label="European VAT ID" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
      <a-input v-model="vatId" type="text"/>
      <a-button type="primary" :loading="loading" v-on:click="checkVatId">check</a-button>
    </a-form-item>
  </div>
</template>

<script>
import jsvat from "jsvat";

export default {
  data() {
    return {
      loading: false,
      error: null,
      vatId: null
    };
  },
  methods: {
    checkVatId() {
      this.loading = true;
      setTimeout(() => {
        let vat = jsvat.checkVAT(this.vatId);
        if (!vat.isValid) {
          this.$notification["error"]({
            message: "Error",
            description: `The VAT ID is wrong or not valid`
          });
          this.loading = false;
        } else {
          this.$notification["success"]({
            message: "Success",
            description: `VAT ID is valid`
          });
          this.loading = false;
        }
      }, 500);
      console.log(vat);
    }
  }
};
</script>

<style lang="scss">
#checkVat .ant-form-item-children {
  display: flex;
  .ant-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .ant-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
