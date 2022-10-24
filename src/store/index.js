import Vue from "vue";
import Vuex, { createLogger } from "vuex";

import { actions } from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

// 遍历模块
const modules = {};
const files = require.context("./modules", false, /\.js$/);
files.keys().map((key) => {
  modules[key.replace(/(modules|\/|\.|js)/g, "")] = {
    ...files(key).default,
    namespace: true,
  };
});

const state = () => ({
  token: "",
});
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
