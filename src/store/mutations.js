export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  CLEAR_TOKEN(state) {
    state.token = "";
  },
  TOGGLE_THEME(state, theme) {
    state.theme = theme;
  },
};
