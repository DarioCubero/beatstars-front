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

		pushCart(state, beat) {
			state.cart.push(beat);
		},

		setCart(state, value) {
			state.cart = value;
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
			const user = await ServicesApi.getUser(idUser);
			commit("setUser", user);
		},

		async vuexSetUser({ commit }, user) {
			console.log("vuexSetUser - State User cargado.");
			commit("setUser", user);
		},

		async vuexAddBeatToCart({ commit }, idBeat) {
			let beat = await ServicesApi.getBeat(idBeat);
			if (!this.state.cart.some((x) => x.id === idBeat)) {
				console.log("vuexAddBeatToCart- Beat '" + beat.nombre + "' añadido a la cesta");
				commit("pushCart", beat);
			} else {
				console.log("El Beat '" + beat.nombre + "' ya fue añadido a la cesta.");
			}
		},

		async vuexDeleteBeatFromCart({ commit }, idBeat) {
			for (let  i = 0; i < this.state.cart.length; i++) {
				if (this.state.cart[i].id === idBeat) {
					console.log("vuexDeleteBeatFromCart - Borrado de '" + this.state.cart[i].nombre + "'");
					this.state.cart.splice(i, 1);
				}
			}
			commit("setCart", this.state.cart);
		},

		async vuexCleanCart({ commit }) {
      console.log("vuexCleanCart - Carrito vaciado");
			this.state.cart = [];
			commit("setCart", this.state.cart);
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
