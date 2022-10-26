import TDesign from "tdesign-vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/permissions";
// 引入组件库全局样式资源
import "tdesign-vue/dist/reset.css";
import "tdesign-vue/es/style/index.css";

// process.env.NODE_ENV === "development" && require("./mock/index");
require("./mock/index");

Vue.use(TDesign);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
