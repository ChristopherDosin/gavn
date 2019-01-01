<template>
  <a-layout-header>
    <div class="logo"/>
    <a-menu
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="['1']"
      :style="{ lineHeight: '52px' }"
    >
      <a-menu-item key="1">
        <router-link :to="{name: 'home'}">Home</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link :to="{name: 'contacts'}">Contacts</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link :to="{name: 'invoices'}">Invoices</router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link :to="{name: 'organisationSettings'}">Settings</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style lang="scss" scoped>
.ant-layout-header {
  height: 55px;
  line-height: 55px;
  background: #0078c8;
  margin-bottom: 15px;
  .ant-menu {
    &.ant-menu-dark {
      font-weight: bold;
      background: #0078c8;
      .ant-menu-item-selected {
        background: transparent;
        border-bottom: solid 3px rgba(255, 255, 255, 0.75);
      }
    }
  }
}
</style>
