import storage from "@/utils/storage";
import Vue from "vue";
import Vuex, { createLogger } from "vuex";

import { actions } from "./actions";
import user from "./modules/user";
import { mutations } from "./mutations";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

// 遍历模块
// const modules = {};
// const files = require.context("./modules", false, /\.js$/);
// files.keys().map((key) => {
//   modules[key.replace(/(modules|\/|\.|js)/g, "")] = {
//     ...files(key).default,
//     namespace: true,
//   };
// });

const state = () => ({
  token: storage.get("token"),
  theme: storage.get("theme") || "light",
});
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { user },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
