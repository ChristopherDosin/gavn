<template>
  <a-card class="card-background contact-details" title="Contact Details">
    <div class="field contact" v-if="contactDetail.contact_name">
      <a-icon type="user"/>
      <label>Contact Person</label>
      <span>{{ contactDetail.contact_name }}</span>
    </div>
    <div class="field email" v-if="contactDetail.email">
      <a-icon type="mail"/>
      <span>
        <a href="mailto:">{{ contactDetail.email }}</a>
      </span>
    </div>
    <div class="field phone" v-if="contactDetail.phone">
      <a-icon type="phone"/>
      <span>{{ contactDetail.phone }}</span>
    </div>
    <div class="field fax" v-if="contactDetail.fax">
      <a-icon type="phone"/>
      <label>Fax</label>
      <span>{{ contactDetail.fax }}</span>
    </div>
    <div class="field mobile" v-if="contactDetail.mobile">
      <a-icon type="phone"/>
      <label>Mobile</label>
      <span>{{ contactDetail.mobile }}</span>
    </div>
    <div class="field directdial" v-if="contactDetail.direct_dial">
      <a-icon type="phone"/>
      <label>Direct dial</label>
      <span>{{ contactDetail.direct_dial }}</span>
    </div>
    <div class="field skype" v-if="contactDetail.skype">
      <a-icon type="skype"/>
      <label>Skype</label>
      <span>
        <a href="mailto:">{{ contactDetail.skype }}</a>
      </span>
    </div>
    <div class="field map" v-if="contactDetail.postal_address">
      <a-icon type="pushpin"/>
      <label>Postal Address</label>
      <span>
        <span v-html="contactDetail.postal_address" style="padding-left: 0;"></span>
        {{contactDetail.city}} {{contactDetail.region}} {{ contactDetail.postalcode }}
        <template v-if="contactDetail.country">
          <br>
          {{ contactDetail.country.name }}
        </template>
        <br>
        <a href>View Map</a>
      </span>
    </div>
  </a-card>
</template>
<script>
export default {
  name: "ContactDetailsCard",
  data() {
    return {
      loading: false,
      contactDetail: []
    };
  },
  methods: {
    getContactDetails() {
      this.loading = true;
      this.$http
        .get(`/contacts/${this.$route.params.pseudoId}`)
        .then(response => {
          this.contactDetail = response.data;
          this.$emit("contactDetails", response.data);
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.getContactDetails();
  }
};
</script>
<style lang="scss" scoped>
.contact-details {
  .field {
    padding: 0 0 20px;
    position: relative;
    label {
      color: #8296aa;
      display: block;
      padding-left: 25px;
    }
    .anticon {
      position: absolute;
      top: 1px;
      left: 0;
      font-size: 15px;
      color: #8296aa;
    }
    span {
      padding-left: 25px;
      line-height: 17px;
      display: block;
    }
  }
}
</style>

