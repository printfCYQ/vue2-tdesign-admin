import tokenApi from "@/api/token";
import { resetRouter } from "@/router";
import storage from "@/utils/storage";
import { MessagePlugin } from "tdesign-vue";
export const actions = {
  async login({ commit }, { email, password }) {
    const res = await tokenApi.create({ email, password });
    console.log(res);
    if (res.code === 200) {
      commit("SET_TOKEN", res.data.token);
      storage.set("token", res.data.token);
      resetRouter();
      MessagePlugin.success(res.message);
    }
  },

  async logout({ commit }) {
    commit("CLEAR_TOKEN");
    commit("user/CLEAR_CURRENT_USER");
    commit("permissions/CLEAR_ROUTES");
    storage.remove("token");
    storage.remove("currentUser");
    storage.remove("permissionRoutes");
    resetRouter();
  },

  async toggleTheme({ commit }, theme) {
    commit("TOGGLE_THEME", theme);
    storage.set("theme", theme);
  },
};
