import axios from "axios";

const state = {
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const reponse = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const { token, user } = reponse.data;
      localStorage.setItem("token", token);
      commit("SET_USER", user);
      commit("SET_TOKEN", token);
    } catch (error) {
      commit("SET_ERROR", error || "Đăng nhập thất bại");
    }
  },
  logout({ commit }) {
    localStorage.removeItem("token");
    commit("SET_TOKEN", null);
    commit("SET_USER", null);
  },
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

export default {
  namespaced    : true,
  state,
  getters,
  actions,
  mutations,
};
