export const state = () => ({
  token: ""
});

export const mutations = {
  login(state, payload) {
    state.token = payload;
  }
};

export const actions = {
  login({ commit }, token) {
    commit("login", token);
  }
};
