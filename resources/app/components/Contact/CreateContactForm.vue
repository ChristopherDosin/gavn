<template>
  <a-spin :spinning="loading">
    <a-form :form="form" @submit="handleSubmit">
      <a-card title="Contact Information" :bordered="false">
        <a-form-item>
          <a-input
            v-decorator="['pseudo_id', {
                  initialValue: generatePseudoId
                }]"
            type="hidden"
          />
        </a-form-item>
        <a-form-item label="Contact Name" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['contact_name', {
                    initialValue: this.contact.contact_name,
                    rules: [{ required: true, message: 'Contact Name cannot be empty.' }]
                  }]"
            placeholder="Company name"
          />
        </a-form-item>
        <a-form-item label="Primary Person" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-row>
            <a-col :span="12">
              <a-input
                style="border-top-right-radius:0; border-bottom-right-radius:0;"
                v-decorator="['first_name', {
                        initialValue: this.contact.first_name
                      }]"
                placeholder="First"
              />
            </a-col>
            <a-col :span="12">
              <a-input
                style="border-left-color:transparent; border-top-left-radius:0; border-bottom-left-radius:0;"
                v-decorator="['last_name', {
                        initialValue: this.contact.first_last_namename
                      }]"
                placeholder="Last"
              />
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="Email" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['email', {
                  initialValue: this.contact.email
                }]"
            placeholder="name@email.com"
          />
        </a-form-item>
        <a-form-item label="Phone" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['phone', {
                        initialValue: this.contact.phone
                      }]"
            placeholder="Number"
          />
        </a-form-item>
        <a-form-item label="Fax" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['fax', {
                        initialValue: this.contact.fax
                      }]"
            placeholder="Number"
          />
        </a-form-item>
        <a-form-item label="Mobile" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['mobile', {
                        initialValue: this.contact.mobil
                      }]"
            placeholder="Number"
          />
        </a-form-item>
        <a-form-item label="Direct dial" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['direct_dial', {
                        initialValue: this.contact.direct_dial
                      }]"
            placeholder="Number"
          />
        </a-form-item>
        <a-form-item label="Skype" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['skype', {
                        initialValue: this.contact.skype
                      }]"
            placeholder="Skype Name / Number"
          />
        </a-form-item>
        <a-form-item label="Website" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['website', {
                        initialValue: this.contact.website
                      }]"
            placeholder="http://"
          />
        </a-form-item>

        <a-form-item label="Postal Address" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input
            v-decorator="['postal_address', {
                        initialValue: this.contact.postal_address
                      }]"
            placeholder
          />
          <a-row>
            <a-col :span="17">
              <a-input
                v-decorator="['city', {
                        initialValue: this.contact.city
                      }]"
                placeholder="City / Town"
                style="border-top-right-radius:0; border-bottom-right-radius:0;"
              />
            </a-col>
            <a-col :span="7">
              <a-input
                v-decorator="['postalcode', {
                        initialValue: this.contact.postalcode
                      }]"
                placeholder="Postal/Zip Code"
                style="border-left-color:transparent; border-top-left-radius:0; border-bottom-left-radius:0;"
              />
            </a-col>
          </a-row>
          <a-input
            v-decorator="['region', {
                        initialValue: this.contact.region
                      }]"
            placeholder="State / Region"
          />
          <a-select
            v-decorator="['country_id', {
                        initialValue: this.contact.country_id
                      }]"
            showSearch
            placeholder="Select a country"
            style="width: 71%"
          >
            <a-select-option
              v-for="(country, index) in countries"
              :key="index"
              :value="country.id"
            >{{country.name}}</a-select-option>
          </a-select>
        </a-form-item>

        <div id="saveForm">
          <div id="saveFormInner">
            <a class="ant-btn ant-btn-default" @click="$router.go(-1)">Cancel</a>
            <a-form-item>
              <a-button type="primary" htmlType="submit">Save</a-button>
            </a-form-item>
          </div>
        </div>
      </a-card>
    </a-form>
  </a-spin>
</template>
<script>
export default {
  name: "CreateContact",
  data() {
    return {
      data: "",
      form: this.$form.createForm(this),
      loading: false,
      contact: "",
      countries: []
    };
  },
  computed: {
    generatePseudoId() {
      if (!this.contact) {
        return (
          Date.now().toString(36) +
          Math.random()
            .toString(36)
            .substr(2, 15)
        );
      } else {
        return this.$route.params.contactDetails.pseudo_id;
      }
    }
  },
  methods: {
    getUrlParams() {
      if (this.$route.params.contactDetails) {
        this.contact = this.$route.params.contactDetails;
      }
    },
    async getAllCountries() {
      let { data } = await this.$http.get(`/countries/allCountries`);
      this.countries = data;
    },
    async handleSubmit(e) {
      e.preventDefault();
      if (!this.contact) {
        await this.createContact();
      } else {
        await this.updateContact();
      }
    },
    async updateContact() {
      await this.form.validateFields((err, values) => {
        this.loading = true;
        if (!err) {
          this.$http
            .put(`/contacts/${values.pseudo_id}`, values)
            .then(response => {
              setTimeout(() => {
                this.$notification["success"]({
                  message: "Success",
                  description: `Contact updated succesfully`
                });
                this.loading = false;
                this.$router.push({ name: "contacts" });
              }, 1000);
            })
            .catch(error => {
              this.loading = false;
              this.$notification["error"]({
                message: "Error",
                description: error.message
              });
            });
        } else {
          this.loading = false;
        }
      });
    },
    async createContact() {
      await this.form.validateFields((err, values) => {
        this.loading = true;
        if (!err) {
          this.$http
            .post("/contacts", values)
            .then(response => {
              console.log(response);
              setTimeout(() => {
                this.$notification["success"]({
                  message: "Success",
                  description: `Contact saved succesfully`
                });
                this.loading = false;
                this.$router.push({ name: "contacts" });
              }, 1000);
            })
            .catch(error => {
              this.loading = false;
              this.$notification["error"]({
                message: "Error",
                description: error.message
              });
            });
        } else {
          this.loading = false;
        }
      });
    }
  },
  created() {
    this.getAllCountries();
    this.getUrlParams();
  }
};
</script>
<style lang="scss" scoped>
.ant-input {
  border-radius: 3px;
  padding: 5px;
  border-color: #d0dae2;
  font-size: 13px;
}
.ant-form-explain {
  font-size: 11px;
}
.ant-form label {
  font-size: 10px !important;
}
#saveForm {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  height: 55px;
  display: flex;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 16, 0.05) 0,
      hsla(0, 0%, 100%, 0)
    );
    transform: translateY(0);
    height: 15px;
    width: 100%;
    transition: opacity 0.2s ease-in-out;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  #saveFormInner {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>