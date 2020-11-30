export const state = () => ({
  token: ""
});

export const getters = {
  token: state => {
    return state.token;
  }
};

export const mutations = {
  login(state, payload) {
    state.token = payload;
  },
  logout(state) {
    state.token = "";
  }
};

export const actions = {
  login({ commit }, token) {
    commit("login", token);
  },
  logout({ commit }) {
    commit("logout");
  }
};
