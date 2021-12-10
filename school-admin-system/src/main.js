import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(ElementUI);

import "./assets/css/reset.min.css"
// import "./assets/css/upload.css"

/**
 * 将封装的日期格式化方法挂载到全局
 */
import timeFormat from "./filters";
Vue.prototype.$timeFormat = timeFormat;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
