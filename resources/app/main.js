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
axios.defaults.baseURL = `/api/v1`;

// Creates a new promise that automatically resolves after some timeout:
Promise.delay = function(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

// Throttle this promise to resolve no faster than the specified time:
Promise.prototype.takeAtLeast = function(time) {
  return new Promise((resolve, reject) => {
    Promise.all([this, Promise.delay(time)]).then(([result]) => {
      resolve(result);
    }, reject);
  });
};

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
