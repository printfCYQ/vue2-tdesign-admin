import storage from "@/utils/storage";
import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import { menuRootName } from "../router";

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
  };
});

const getters = {
  menuRoutes: (state) => {
    return state.permissions.routes.length
      ? state.permissions.routes.find((item) => item.name === menuRootName)
          .children
      : [];
  },
  // 扁平化routes
  permissionRoutesNameList: (state) => {
    return state.permissions.routes
      ? buildPermissionRoutesNameList(state.permissions.routes)
      : [];
  },
  userPermissions: (state) => state.user.permissions,
};

const buildPermissionRoutesNameList = (routes) => {
  const nameList = [];
  routes.map((item) => {
    if (item.children) {
      nameList.push(...buildPermissionRoutesNameList(item.children));
    }
    nameList.push(item.name);
  });
  return nameList;
};

const state = () => ({
  token: storage.get("token"),
  theme: storage.get("theme") || "light",
});
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
