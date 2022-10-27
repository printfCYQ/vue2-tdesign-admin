import TDesign from "tdesign-vue";
import Vue from "vue";
import App from "./App.vue";
import "./directive/permissions"; // 自定义指令集
import router from "./router";
import store from "./store";
import "./utils/permissions"; // router 守卫
// 引入组件库全局样式资源
import "tdesign-vue/dist/reset.css";
import "tdesign-vue/es/style/index.css";
import VueRouter from "vue-router";
// process.env.NODE_ENV === "development" && require("./mock/index");
require("./mock/index");

// 解决Vue路由跳转报:Error: Avoided redundant navigation to current location 错误问题
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch((err) => err);
};

Vue.use(TDesign);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
