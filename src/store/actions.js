import tokenApi from "@/api/token";
import { resetRouter } from "@/router";
import storage from "@/utils/storage";
import { MessagePlugin } from "tdesign-vue";
export const actions = {
  async login({ commit }, { username, password }) {
    const { token, message } = await tokenApi.create({ username, password });
    if (token) {
      commit("SET_TOKEN", token);
      storage.set("token", token);
      resetRouter();
      MessagePlugin.success(message);
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
