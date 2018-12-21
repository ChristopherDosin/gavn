<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-menu mode="vertical" id="sidebarMenu" class="card-background">
          <a-menu-item key="1">
            <a-icon type="shop"/>
            <router-link to="/settings/organisation">Organisation Settings</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="calculator"/>
            <router-link to="/settings/invoice">Invoice Settings</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="global"/>
            <router-link to="/settings/taxrates">Tax Rates</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="wallet"/>
            <router-link to="/settings/currencies">Currencies</router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="bank"/>
            <router-link to="/settings/invoice">Bank Account</router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="18">
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const menuItems = [
  {
    title: "Organisation Settings",
    routeName: "",
    iconType: "shop"
  }
];
export default {
  data() {
    return {
      menuItems
    };
  }
};
</script>

<style>
#sidebarMenu .ant-menu-item > a {
  display: inline;
}
</style>
