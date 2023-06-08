import Vue from "vue";
import Vuex from "vuex";
import ServicesApi from "@/services/api";
// import Auth from "@/services/auth";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    user: {},
    cart: [],
    // isLogged: false,
  },
  
  plugins: [createPersistedState()],

  mutations: {
    setUser(state, value) {
      state.user = value;
    },

    setCart(state, beat) {
      state.cart.push(beat);
    },

    // isLogged(state) {
    //   if (Object.keys(state.user).length !== 0) {
    //     state.isLogged = true;
    //     console.log('vuexCheckUserLogged... TRUE');
    //   } else {
    //     console.log('vuexCheckUserLogged... FALSE');
    //     state.isLogged = false;
    //   }
    // },

  },
  actions: {
    async vuexGetUser({ commit }, idUser) {
      console.log("VuexGetUser - State User cargado.");
      let user = await ServicesApi.getUser(idUser);
      commit("setUser", user);
    },

    async vuexAddBeatToCart({ commit }, idBeat) {
      console.log("loadCart");
      let beat = await ServicesApi.getBeat(idBeat);
      commit("setCart", beat);
    },

    // async vuexCheckUserLogged({ commit }) {
    //   commit("isLogged");
    // },

  },

  // getters: {
  //   isLoggedIn(state) {
  //     return state.isLogged;
  //   },
  // },


});
