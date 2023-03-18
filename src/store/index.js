import Vue from "vue";
import Vuex from "vuex";
import ServicesApi from "@/services/api";
import Auth from "@/services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    beats: [],
    userBeats: [],
    userPedidos: [],
    cart: [],
  },
  getters: {},
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setBeats(state, bs) {
      state.beats = bs;
    },
    setUserBeats(state, ub) {
      state.userBeats = ub;
    },
    setUserPedidos(state, up) {
      state.userPedidos = up;
    },
    setCart(state, beat) {
      state.cart.push(beat);
    },
  },
  actions: {
    async getUser({ commit }, id) {
      let user = await Auth.getUser(id);
      commit("setUser", user);
    },
    async getBeats({ commit }) {
      let beats = await ServicesApi.getBeats();
      commit("setBeats", beats);
    },
    async getUserBeats({ commit }) {
      let userBeats = await ServicesApi.getBeats();
      commit("setUserBeats", userBeats);
    },
    async getUserPedidos({ commit }) {
      let userPedidos = await ServicesApi.getUserPedidos();
      commit("setUserPedidos", userPedidos);
    },
  },
  modules: {},
});
