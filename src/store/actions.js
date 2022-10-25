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
    resetRouter();
    storage.set("token", "");
  },

  async toggleTheme({ commit }, theme) {
    commit("TOGGLE_THEME", theme);
    storage.set("theme", theme);
  },
};
