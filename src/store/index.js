import Vue from "vue";
import Vuex from "vuex";
import ServicesApi from "@/services/api";
import Auth from "@/services/auth";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    cart: [],
  },
  plugins: [createPersistedState()],
  
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setCart(state, beat) {
      state.cart.push(beat);
    },
  },
  actions: {
    async vuexGetUser({ commit }, idUser) {
      console.log("vuexGetUser");
      let user = await Auth.getUser(idUser);
      commit("setUser", user);
    },

    async vuexAddBeatToCart({ commit }, idBeat) {
      console.log("loadCart");
      let beat = await ServicesApi.getBeat(idBeat);
      commit("setCart", beat);
    },

  },

  modules: {},

  getters: {
    // user: state => state.user
  }
});

