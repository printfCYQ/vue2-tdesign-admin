import tokenApi from "@/api/token";
import { MessagePlugin } from "tdesign-vue";
export const actions = {
  async login({ commit }, { username, password }) {
    const { token, message } = await tokenApi.create({ username, password });
    if (token) {
      commit("SET_TOKEN", token);
      MessagePlugin.success(message);
    }
  },
};
