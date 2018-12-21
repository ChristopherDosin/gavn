<template>
  <div class="card-background">
    <a-row type="flex">
      <a-col :span="24">
        <create-contact-form/>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CreateContactForm from "@/components/Contact/CreateContactForm";
export default {
  name: "CreateContactView",
  components: {
    CreateContactForm
  }
};
</script>

