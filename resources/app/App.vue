<template>
  <div id="app">
    <a-layout id="components-layout-demo-top" class="layout">
      <navbar/>

      <a-layout-content id="layoutContent" style="max-width: 980px; width: 100%; margin: 0 auto;">
        <div :style="{ minHeight: '280px', width: '100%' }">
          <router-view/>
        </div>
      </a-layout-content>

      <the-footer/>
    </a-layout>
  </div>
</template>

<script>
import TheFooter from "@/layout/Footer";
import Navbar from "@/layout/Header";
export default {
  components: {
    Navbar,
    TheFooter
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>

<style>
a {
  color: #2baaed;
}
.ant-card {
  font-size: 13px;
}
.ant-table-tbody > tr > td {
  color: rgb(130, 150, 170);
}
.ant-table-pagination.ant-pagination {
  margin: 18px;
}
.ant-btn {
  border: 1px solid #d0dae2;
  font-size: 13px;
  font-weight: 700;
}
.ant-btn-primary {
  border-color: #1890ff;
}
.card-background {
  background: #fff;
  border: 1px solid #b7bec5;
  border-radius: 3px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>

