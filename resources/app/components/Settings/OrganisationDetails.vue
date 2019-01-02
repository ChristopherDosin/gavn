<template>
  <div class="card-background">
    <a-row type="flex">
      <a-col :span="24">
        <a-spin :spinning="loading.form">
          <a-form id="organisationForm" :form="form" @submit="handleSubmit">
            <a-card title="Basic Information" :bordered="false">
              <a-form-item label="Display name" :labelCol="{ span: 8}" :wrapperCol="{ span: 14 }">
                <a-input
                  v-decorator="['name', {
              initialValue: data.name,
              rules: [{ required: true, message: 'Please input the name of your company!' }]
            }]"
                  placeholder="Name as it appears in Vuevoice"
                />
              </a-form-item>
              <a-form-item
                label="Legal / Trading name"
                :labelCol="{ span: 8}"
                :wrapperCol="{ span: 14 }"
              >
                <a-input
                  v-decorator="['legal_name', {
              initialValue: data.legal_name,
              rules: [{ required: true, message: 'Please input your legal name!' }]
            }]"
                  placeholder="Official name to appear on documents"
                />
              </a-form-item>
              <a-form-item label="Logo" :labelCol="{ span: 8}" :wrapperCol="{ span: 14 }">
                <a-upload
                  name="avatar"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  action="//jsonplaceholder.typicode.com/posts/"
                  :beforeUpload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar">
                  <div v-else>
                    <a-icon :type="loading.upload ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">Upload logo</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-form-item
                label="Business Registration Number"
                :labelCol="{ span: 8}"
                :wrapperCol="{ span: 14 }"
              >
                <a-input
                  v-decorator="['registration_number', {
              initialValue: data.registration_number
            }]"
                  placeholder="Official registration number to appear on your documents"
                />
              </a-form-item>
              <a-form-item
                label="Organisation description"
                :labelCol="{ span: 8}"
                :wrapperCol="{ span: 14 }"
              >
                <a-textarea
                  v-decorator="['description', {
              initialValue: data.description
            }]"
                  :rows="4"
                  :cols="20"
                  placeholder="Official registration number to appear on your documents"
                />
              </a-form-item>
            </a-card>

            <a-card title="Contact Details" style="border-top: none;" :bordered="false">
              <a-form-item label="Postal address" :labelCol="{ span: 8}" :wrapperCol="{ span: 14 }">
                <a-textarea
                  v-decorator="['postal_address', {
              initialValue: data.postal_address
            }]"
                  :rows="4"
                  :cols="20"
                  placeholder="Street address"
                />
                <a-input
                  v-decorator="['city', {
              initialValue: data.city
            }]"
                  placeholder="Town / City"
                />
                <a-row>
                  <a-col :span="17">
                    <a-input
                      v-decorator="['state', {
                initialValue: data.state
                }]"
                      placeholder="State / Region"
                    />
                  </a-col>
                  <a-col :span="7">
                    <a-input
                      v-decorator="['postalcode', {
              initialValue: data.postalcode
            }]"
                      placeholder="Postal / Zipcode"
                    />
                  </a-col>
                </a-row>
                <a-select
                  v-decorator="['country_id']"
                  :defaultValue="data.country_id"
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
              <a-form-item label="Telephone" :labelCol="{ span: 8}" :wrapperCol="{ span: 14 }">
                <a-input
                  v-decorator="['phone', {
              initialValue: data.phone
            }]"
                />
              </a-form-item>
              <a-form-item label="Email" :labelCol="{ span: 8}" :wrapperCol="{ span: 14 }">
                <a-input
                  v-decorator="['email', {
              initialValue: data.email
            }]"
                />
              </a-form-item>
              <a-form-item label="Website" :labelCol="{ span: 8}" :wrapperCol="{ span: 14 }">
                <a-input
                  v-decorator="['website', {
              initialValue: data.website
            }]"
                />
              </a-form-item>

              <div id="saveForm">
                <div id="saveFormInner">
                  <a-form-item>
                    <a-button type="default" htmlType="submit">Cancel</a-button>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" htmlType="submit">Save</a-button>
                  </a-form-item>
                </div>
              </div>
            </a-card>
          </a-form>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "SettingsIndex",
  data() {
    return {
      data: "",
      fields: {
        id: "id",
        name: "name"
      },
      form: this.$form.createForm(this),
      loading: {
        upload: false,
        form: false
      },
      imageUrl: "",
      countries: []
    };
  },
  methods: {
    async getAllCountries() {
      await this.$http.get("/countries/allCountries").then(response => {
        this.countries = response.data;
      });
    },
    async getAllSettings() {
      await this.$http.get("/settings").then(response => {
        this.data = response.data;
      });
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
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading.upload = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading.upload = false;
        });
      }
    },
    beforeUpload(file) {
      console.log(file.type);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG || !isPNG) {
        this.$message.error("You can only upload JPG or PNG files!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.getAllSettings();
    this.getAllCountries();
  }
};
</script>
<style lang="scss">
.formRow {
  margin-bottom: 18px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
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

  border-top: 1px solid #e8e8e8;
  /*
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
  */
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
