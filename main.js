
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
// 引入Common
import common from "@/libs/Common"
Vue.prototype.$common = common;

import api from "@/api/api.js"
Vue.prototype.$api = api;
//接口地址
Vue.prototype.$baseURL = "http://localhost:5000";
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif