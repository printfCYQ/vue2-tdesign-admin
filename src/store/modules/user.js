import userApi from "@/api/user";
import storage from "@/utils/storage";

const defaultUser = storage.get("currentUser") || {
  username: "",
  nickname: "",
  roles: [],
  permissions: [],
};
const state = () => ({
  ...defaultUser,
});
const actions = {
  async fetchCurrentUserInfo({ dispatch, commit }) {
    const { data } = await userApi.me(); // data userinfo
    console.log(data);
    storage.set("currentUser", data);
    commit("SET_CURRENT_USER", data);
    dispatch("permissions/generateRoutes", data.permissions, {
      root: true,
    });
  },
};
const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.username = currentUser.username;
    state.nickname = currentUser.nickname;
    state.roles = currentUser.roles;
    state.permissions = currentUser.permissions;
  },
  CLEAR_CURRENT_USER(state) {
    state.username = "";
    state.nickname = "";
    state.roles = [];
    state.permissions = [];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
