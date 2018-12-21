import Vue from 'vue';
import router from './router';
import store from './store';
import axios from 'axios';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Antd);

window.axios = axios;
axios.defaults.baseURL = 'http://127.0.0.1:3333/api/v1';

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
