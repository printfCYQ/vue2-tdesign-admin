import userApi from "@/api/user";
import storage from "@/utils/storage";

const defaultUser = storage.get("currentUser") || {
  username: "",
  nickname: "",
  roles: [],
};
const state = () => ({
  ...defaultUser,
});
const actions = {
  async fetchCurrentUserInfo({ commit }) {
    const { data } = await userApi.me();
    storage.set("currentUser", data);
    commit("SET_CURRENT_USER", data);
  },
};
const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.username = currentUser.username;
    state.nickname = currentUser.nickname;
    state.roles = currentUser.roles;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
