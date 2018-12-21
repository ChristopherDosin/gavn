<template>
  <div>
    <a-form-item label="Display name" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
      <a-input v-decorator="['name']" placeholder="Name as it appears in Vuevoice"/>
    </a-form-item>
    <a-form-item label="Legal / Trading name" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
      <a-input v-decorator="['legal_name']" placeholder="Official name to appear on documents"/>
    </a-form-item>
    <a-form-item label="Logo" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
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
          <a-icon :type="loading ? 'loading' : 'plus'"/>
          <div class="ant-upload-text">Upload logo</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item
      label="Business Registration Number"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
    >
      <a-input
        v-decorator="['registration_number']"
        placeholder="Official registration number to appear on your documents"
      />
    </a-form-item>
    <a-form-item
      label="Organisation description"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 12 }"
    >
      <a-textarea
        v-decorator="['description']"
        :rows="4"
        :cols="20"
        placeholder="Official registration number to appear on your documents"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      imageUrl: ""
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
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
  }
};
</script>