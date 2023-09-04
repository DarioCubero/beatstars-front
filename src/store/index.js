import Vue from "vue";
import Vuex from "vuex";
import ServicesApi from "@/services/api";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {},
		cart: [],
		actions: { loginMenu: false },
		appLanguage: "es" || process.env.VUE_APP_I18N_LOCALE || "es",
		isLogged: false,
	},

	plugins: [createPersistedState()],

	mutations: {
		setUser(state, value) {
			console.log("vuex-SetUser");
			this.state.user = value;
		},

		pushCart(state, beat) {
			state.cart.push(beat);
		},

		setCart(state, value) {
			state.cart = value;
		},

		setAppLanguage(state, language) {
			state.appLanguage = language;
		},

		setIsLogged(state, value) {
			console.log("mutation setIsLogged..." + value);
			state.isLogged = value;
		},

    loginMenuChange (state, value) {
      state.actions.loginMenu = value;
    }

	},

	actions: {
		async vuexGetUser({ commit }, idUser) {
			console.log("vuex-setUser - State User cargado.");
			const user = await ServicesApi.getUser(idUser);
			commit("setUser", user);
		},

		async vuexSetUser({ commit }, user) {
			console.log("vuex-setUser - State User cargado.");
			commit("setUser", user);
		},

		async vuexAddBeatToCart({ commit }, idBeat) {
			let beat = await ServicesApi.getBeat(idBeat);
			if (!this.state.cart.some((x) => x.id === idBeat)) {
				console.log(
					"vuex-addBeatToCart- Beat '" + beat.nombre + "' añadido a la cesta"
				);
				commit("pushCart", beat);
			} else {
				console.log("El Beat '" + beat.nombre + "' ya fue añadido a la cesta.");
			}
		},

		async vuexDeleteBeatFromCart({ commit }, idBeat) {
			for (let i = 0; i < this.state.cart.length; i++) {
				if (this.state.cart[i].id === idBeat) {
					console.log(
						"vuex-deleteBeatFromCart - Borrado de '" +
							this.state.cart[i].nombre +
							"'"
					);
					this.state.cart.splice(i, 1);
				}
			}
			commit("setCart", this.state.cart);
		},

		async vuexCleanCart({ commit }) {
			console.log("vuex-cleanCart - Carrito vaciado");
			this.state.cart = [];
			commit("setCart", this.state.cart);
		},

		async vuexSetLanguage({ commit }, language) {
			console.log("vuex-setLanguage - Lenguaje cambiado: " + language);
			localStorage.setItem("appLanguage", language); // Whenever we change the appLanguage we save it to the localStorage
			commit("setAppLanguage", language);
		},
	},
});
