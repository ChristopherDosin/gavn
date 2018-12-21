<template>
  <div>
    <a-button type="primary" @click="showModal">New Collection</a-button>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
  </div>
</template>

<script>
const CollectionCreateForm = {
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='Create a new Tax rate'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Name'>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Please input the name of the tax rate!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Tax Rate'>
          <a-input
            v-decorator="[
              'rate',
              {
                rules: [{ required: true, message: 'Please input the tax rate in percentage!' }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  `
};

import numeral from "numeral";
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    async handleCreate() {
      const form = this.$refs.collectionForm.form;
      await form.validateFields((err, values) => {
        if (err) {
          return;
        }

        let taxRate = values.rate;
        if (taxRate.indexOf(",") > -1) {
          taxRate = taxRate.replace(/[,.]/g, match => {
            // m is the match found in the string
            // If `,` is matched return `.`, if `.` matched return `,`
            return match === "," ? "." : ",";
          });
        }

        try {
          let response = this.$http.post(`taxrate`, {
            name: values.name,
            rate: taxRate
          });
          form.resetFields();
          this.visible = false;
        } catch (error) {
          return error;
        }
      });
    }
  },
  components: { CollectionCreateForm }
};
</script>