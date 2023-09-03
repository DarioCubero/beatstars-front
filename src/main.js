import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
	vuetify,
	router,
	store,
	i18n,
	watch: {
		$route(to) {
			let logged = this.$store.state.isLogged;
			if (
				!logged && to.name == "perfil" ||
				!logged && to.name == "pedidos" ||
				!logged && to.name == "mis-beats" ||
				!logged && to.name == "admin" ||
				!logged && to.name == "subir-beat" ||
        !logged && to.name == "actualizar-beat" ||
        !logged && to.name == "actualizar-usuario"
			) {
				this.$router.push({ name: "home" });
			}
		},
	},
	render: (h) => h(App),
}).$mount("#app");
