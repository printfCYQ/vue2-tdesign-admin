const defaultList = [
  {
    path: "/dashboard/base",
    routeIdx: 0,
    title: "仪表盘",
    name: "DashboardBase",
    isHome: true,
  },
];
const state = () => ({
  navbarList: [
    {
      path: "/dashboard/base",
      routeIdx: 0,
      title: "仪表盘",
      name: "DashboardBase",
      isHome: true,
    },
  ],
  activeTabPath: "",
});
const actions = {
  async addNavbar({ state, commit }, navbar) {
    if (state.navbarList.every((item) => item.path !== navbar.path)) {
      commit("ADD_NAVBAR", navbar);
    }
  },
  async clearNavbar({ commit }) {
    commit("CLEAR_NAVBAR");
  },
  async setActiveTabPath({ commit }, path) {
    commit("SET_ACTIVE_TAB_NAME", path);
  },
  async removeNavbar({ state, commit }, index) {
    const navbarList = state.navbarList
      .slice(0, index)
      .concat(state.navbarList.slice(index + 1));
    commit("SET_NAVBAR", navbarList);
  },
  async closeAhead({ state, commit }, index) {
    const navbarList = state.navbarList.filter((item, ind) => ind >= index);
    commit("SET_NAVBAR", [...defaultList, ...navbarList]);
  },
  async closeBehind({ state, commit }, index) {
    const navbarList = state.navbarList.filter((item, ind) => ind <= index);
    commit("SET_NAVBAR", navbarList);
  },
  async closeOther({ state, commit }, index) {
    if (index === 0) {
      commit("SET_NAVBAR", defaultList);
    } else {
      const navbar = state.navbarList[index];
      commit("CLEAR_NAVBAR");
      commit("SET_NAVBAR", [...defaultList, navbar]);
    }
  },
};
const mutations = {
  ADD_NAVBAR(state, navbar) {
    state.navbarList.push(navbar);
  },
  SET_NAVBAR(state, navbarList) {
    state.navbarList = navbarList;
  },
  CLEAR_NAVBAR(state) {
    state.navbarList = defaultList;
    state.activeTabPath = "";
  },
  SET_ACTIVE_TAB_NAME(state, path) {
    state.activeTabPath = path;
  },
};

const getters = {
  navbarList: (state) => state.navbarList,
  activeTabPath: (state) => state.activeTabPath,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
