<template>
  <div class="empty-contact">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12">
        <div class="empty-container">
          <h4>Track your cashflow with this contact</h4>
          <p>See how much you spend and receive with this contact on a monthly basis.</p>
          <p>Add an invoice to get started.</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: "EmptyContact"
};
</script>
<style lang="scss" scoped>
.empty-contact {
  background-color: #fafcfd;
  border: 1px solid #d0dae2;
  border-radius: 3px;
  margin-bottom: 20px;
}
.empty-container {
  padding: 25px;
}
</style>
