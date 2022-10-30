import userApi from "@/api/user";
import { routes } from "@/router";
import storage from "@/utils/storage";

const defaultUser = storage.get("currentUser") || {
  userName: "",
  email: "",
  avatar: "",
  roles: [],
  permissions: [],
};
const state = () => ({
  ...defaultUser,
});
const actions = {
  async fetchCurrentUserInfo({ dispatch, commit }) {
    const res = await userApi.me(); // data userinfo
    if (res.code === 200) {
      storage.set("currentUser", res.data);
      commit("SET_CURRENT_USER", res.data);
      await dispatch(
        "permissions/generateRoutes",
        {
          permissions: res.data.permissions,
          admin: res.data.userName === "admin",
        },
        {
          root: true,
        }
      );
    }
  },
};
const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.userName = currentUser.userName;
    state.roles = currentUser.roles;
    state.permissions =
      state.userName === "admin" ? routes : currentUser.permissions;
  },
  CLEAR_CURRENT_USER(state) {
    state.userName = "";
    state.email = "";
    state.avatar = "";
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
