<template>
  <div>
    <a-modal
      title="Invoice Actions"
      v-model="visible"
      @ok="handleOk"
      okText="Save & Close"
      cancelText="Save & New"
      :width="600"
      :centered="true"
    >
      <a-row :gutter="16" class="invoiceFeedback">
        <a-col :span="8">
          <a-card :hoverable="true">
            <div class="invoiceFeedbackIcon">
              <a-icon type="mail" theme="twoTone"/>
            </div>
            <p>
              <strong>Send invoice</strong>
            </p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :hoverable="true">
            <div class="invoiceFeedbackIcon">
              <a-icon type="printer" theme="twoTone"/>
            </div>
            <p>
              <strong>Print invoice</strong>
            </p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :hoverable="true">
            <div class="invoiceFeedbackIcon">
              <a-icon type="bank" theme="twoTone"/>
            </div>
            <p>
              <strong>Send payment link</strong>
            </p>
          </a-card>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    returnBackToListing() {
      this.$router.push({ name: "invoices" });
    }
  }
};
</script>
<style lang="scss">
.invoiceFeedback {
  text-align: center;
  .invoiceFeedbackIcon {
    display: flex;
    justify-content: center;
    .anticon {
      font-size: 35px;
      margin-bottom: 15px;
    }
  }
  p {
    margin: 0;
  }
}
</style>
