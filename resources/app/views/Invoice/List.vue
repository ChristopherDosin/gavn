<template>
  <div>
    <a-row type="flex">
      <a-col :span="12">
        <h1>Invoice</h1>
      </a-col>
      <a-col :span="12">
        <router-link
          class="ant-btn ant-btn-primary"
          style="float:right;"
          to="/invoices/create"
        >Create Invoice</router-link>
      </a-col>
    </a-row>
  </div>
</template>
    