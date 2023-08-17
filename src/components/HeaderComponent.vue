<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card height="107px" color="#0FC900 !important" class="py-3">
					<!-- appbar -->
					<v-app-bar fixed app height="100px" class="pl-6" id="header">
						<!-- logo -->
						<router-link to="/home" class="logo-home">
							<v-img
								width="80"
								:src="
									require('@/assets/images/white_square_logo_DreamDrum.svg')
								"></v-img>
						</router-link>

						<!-- left search form -->
						<v-form ref="form" @submit.prevent="validate">
							<v-row
								style="
									display: flex;
									align-items: center;
									max-height: 150px !important;
								">
								<!-- Buscador -->
								<v-col
									style="
										min-width: 50px !important;
										max-width: 300px !important;
										max-height: 150px !important;
									"
									cols="12"
									lg="5"
									md="5"
									sm="5"
									class="ml-6 mr-2">
									<v-card
										color="white"
										class="rounded-card pa-2"
										min-width="200px"
										max-width="3  00px">
										<v-row no-gutters>
											<!-- lupa -->
											<v-col btn cols="12" lg="1" md="1" sm="1">
												<a v-on:click="validate">
													<v-icon class="pl-3">mdi-magnify mdi-dark</v-icon>
												</a>
											</v-col>
											<!-- buscador -->
											<v-col cols="12" lg="11" md="11" sm="11">
												<v-text-field
													@keydown.enter.prevent="validate"
													v-model="searchString"
													:label="$t('cabeceraBuscador.etiquetaBuscador')"
													max-height="6"
													max-width="10"
													single-line
													color="black"
													class="ml-3 custom-placeholder-color custom-label-color pl-2 pr-4"
													hide-details="auto"
													clearable
													:placeholder="
														$t('cabeceraBuscador.placeholderBuscador')
													">
												</v-text-field>
											</v-col>
										</v-row>
									</v-card>
								</v-col>

								<!-- sort-->
								<v-col cols="12" lg="3" md="3" sm="3">
									<!-- sortOrder desc -->
									<v-row
										style="
											min-width: 500px !important;
											max-width: 300px !important;
											max-height: 50px;
										">
										<div>
											<v-simple-checkbox
												color="green"
												@click="sortOrderCheckbox()"
												v-model="sortOrderValue"></v-simple-checkbox>
										</div>
										<div>
											<span class="white--text"
												><v-icon>mdi-sort-descending mdi-light</v-icon>DESC
											</span>
										</div>
									</v-row>

									<!-- sortBy -->
									<v-row
										style="
											min-width: 150px !important;
											max-width: 300px !important;
											max-height: 50px;
										">
										<v-col cols="12" lg="12" md="12" sm="12">
											<v-select
												dark
												color="#0F7DD1"
												v-model="sortBy"
												:items="sortByList"
												:label="$t('cabeceraBuscador.ordenarPor.ordenarPor')"
                        :item-text="$t('cabeceraBuscador.ordenarPor.precio')"
                        item-value="$t({item})"
												single-line>
												<!--  :rules="[rules.required]" -->
											</v-select>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-form>

						<!-- spacer -->
						<v-spacer></v-spacer>

						<!-- right menu toolbar -->
						<v-toolbar-items class="hidden-sm-and-down" color="transparent">
							<!-- BTN home -->
							<v-btn to="/home"> {{ $t("cabeceraNavegador.home") }} </v-btn>

							<!-- BTN menu beats -->
							<v-menu offset-y open-on-hover transition="slide-y-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										color="primary"
										dark
										v-bind="attrs"
										v-on="on"
										to="beats">
										{{ $t("cabeceraNavegador.beats.beats") }}
									</v-btn>
								</template>

								<v-list>
									<v-list-item
										v-for="(item, index) in menuBeatList"
										:key="index"
										:to="item.url">
										<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>

							<v-btn
								v-for="item in menu"
								:prepend-icon="item.icon ? item.icon : null"
								:style="item.claseColor ? item.claseColor : null"
								:key="item.icon ? item.claseColor : null"
								:to="item.url">
								<v-icon left v-if="item.icon"> {{ item.icon }} </v-icon>
								{{ $t(item.title) }}
								<span v-if="item.title == 'Carrito' && cartCount !== 0">
									{{ "(" + cartCount + ")" }}
								</span>
							</v-btn>

							<v-btn
								id="btnAdmin"
								v-if="$store.state.user.rol === 'admin'"
								to="/admin">
								{{ $t("cabeceraNavegador.admin") }}
							</v-btn>

							<v-select
								dark
								min-width="400px"
								prepend-icon="mdi-translate mdi-light"
								v-model="select"
								:items="menuMultilanguage"
								item-text="language"
								item-value="abbr"
								label="Select"
								return-object
								solo
								hide-details="true">
							</v-select>
							<!-- <v-select
								dark
								min-width="400px"
								prepend-icon="mdi-translate mdi-light"
								v-model="select"
								:items="menuMultilanguage"
								item-text="language"
								item-value="abbr"
								label="Select"
								return-object
                solo
                hide-details="true"
                >
							</v-select> -->

							<v-btn class="btnHeader" @click="logoutClick">
								{{ $t("cabeceraNavegador.desconectar") }}
							</v-btn>
						</v-toolbar-items>

						<!-- menu hamburguesa hide/show -->
						<v-app-bar-nav-icon
							variant="text"
							class="hidden-lg-and-up"
							@click.stop="drawer = !drawer"></v-app-bar-nav-icon>
					</v-app-bar>
					<!-- END appbar -->
				</v-card>
			</v-col>
		</v-row>

		<!-- Menú App Mobile -->
		<v-navigation-drawer
			src="../assets/texture/dark-wood.jpg"
			app
			v-model="drawer"
			location="bottom"
			temporary>
		</v-navigation-drawer>
	</div>
</template>

<script>
	import auth from "@/services/auth";
	import { mapActions } from "vuex";
	// import i18n from "../i18n";
	// import api from "@/services/api";

	export default {
		data() {
			return {
				sortBy: null,
				sortOrderValue: false,
				sortOrder: null,
				searchString: "",
				menuBeatList: [
					{
						title: "cabeceraNavegador.beats.misBeats",
						url: "/mis-beats",
						claseColor: "none",
					},
					{
						title: "cabeceraNavegador.beats.subirBeat",
						url: "/subir-beat",
						claseColor: "none",
					},
				],
				select: this.$i18n.locale,
				menuMultilanguage: [
					{ language: "English", abbr: "en" },
					{ language: "Español", abbr: "es" },
				],
				sortByList: [
					// { item: "Nombre" },
					// { item: "Premium" },
					// { item: "TypeBeat" },
					{ item: "cabeceraBuscador.ordenarPor.precio" },
					// { item: "Fecha" },
				],
				checkAdmin: false,
				drawer: false,
				cartCount: this.$store.state.cart.length,
				menu: [
					{
						title: "cabeceraNavegador.pedidos",
						url: "/pedidos",
						claseColor: "none",
					},
					{
						title: "cabeceraNavegador.perfil",
						url: "/perfil",
						claseColor: "none",
					},
					{
						title: "cabeceraNavegador.carrito",
						url: "/carrito",
						claseColor:
							"background-color: #0FC900 !important; color: black !important; font-weight: bold !important",
						icon: "mdi-cart mdi-dark",
					},
				],
				// rules: {
				// 	required: (value) => !!value,
				// },
			};
		},

		// async beforeCreate() {
		// 	window.addEventListener("keyup", function (ev) {
		// 		if (ev.key == "Enter") {
		// 			this.$refs.form.submit.click();
		// 		}
		// 	});
		// },
		created() {
			if (!auth.getLocalStorage("userId")) {
				console.info("Acceso restringido. Debes logearte primero.");
				this.$router.push({ name: "login" });
				// this.$store.commit("setUser", {});
			}
		},

		watch: {
			select: function (val) {
				this.$i18n.locale = val.abbr;
				console.log(this.$i18n.locale);
			},
		},

		methods: {
			...mapActions(["vuexCleanCart"]),

			sortOrderCheckbox() {
				if (this.sortOrderValue) {
					this.sortOrder = "desc";
				} else {
					this.sortOrder = null;
				}
			},

			async validate() {
				console.log("validate");
				if (await this.$refs.form.validate()) {
					// console.log("VALIDATE: " + this.$refs.form);

					this.$router.push({
						name: "beats",
						query: {
							sortBy: this.sortBy,
							sortOrder: this.sortOrder,
							searchString: this.searchString,
						},
					});
					this.$router.go().catch((error) => {
						if (error.name != "NavigationDuplicated") {
							throw error;
						}
					});

					// this.$refs.form.reset();
				} else {
					console.error(
						"Búsqueda de Beat no válida: debes escribir un nombre."
					);
				}
			},

			// checkUserLogged() {
			//   console.log("checkUserLogged()...");
			//   let id = auth.getLocalStorage("userId");
			//   if (id == null) {
			//     alert("null");
			//     this.$router.push({ name: "login" });
			//     this.$store.commit("setUser", {});
			//   } else {
			//     this.vuexGetUser(id);
			//   }
			// },

			logoutClick() {
				auth.closeSession();
				this.$store.commit("setUser", {});
				this.$router.push({ name: "login" });
				this.vuexCleanCart();
				console.log("Logout --> Close sesion, clean states & localStorage");
			},

			// onClickOutside() {
			//   //Limpiamos el error del required en el searchBeatByName
			//   this.$refs.form.resetValidation();
			// },

			// async created() {
			//   console.log("checkUserLogged()...");
			//   this.checkUserLogged();
			// },
		},
	};
</script>

<style>
	/* Intento de quitar el fondo gris cuando clicas */
	/* .v-toolbar__items > a:active{
  background-color: green !important;
} */

	.v-select {
		margin-left: 5px !important;
		min-width: 170px !important;
	}

	#btnAdmin {
		color: #0fc900 !important;
	}
	#btnAdmin:hover {
		background-color: white !important;
		color: black !important;
	}

	.v-form {
		width: 100%;
	}
	.v-toolbar {
		background-color: #222222 !important;
	}

	.theme--dark.v-btn.v-btn--has-bg {
		background-color: none !important;
	}

	.v-toolbar__items a.v-btn,
	.btnHeader {
		/* botones menu */
		border-radius: 50px;
		color: white !important;
		background-color: #222222 !important;
		border: none !important;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}

	.v-toolbar__items a.v-btn.v-btn--is-elevated:hover,
	.btnHeader:hover {
		/* hover botones menu */
		border-radius: 50px;
		color: rgb(255, 255, 255) !important;
		font-weight: bold;
		background-color: #12800a !important;
		transition: 0.3s;
	}

	.v-toolbar__items {
		padding: 27px;
	}

	.v-toolbar__content {
		padding: 0px !important;
	}

	.v-btn--active {
		/* boton menu seleccionado*/
		font-size: 17px !important;
	}

	.menu-right {
		margin-right: 200px;
	}

	.logo-home {
		max-width: 7rem !important;
	}

	.custom-label-color .v-label {
		color: rgb(0, 0, 0) !important;
		opacity: 0.8;
	}

	.custom-placeholder-color::placeholder {
		color: rgb(0, 0, 0) !important;
	}

	.custom-placeholder-color input::placeholder {
		/* opacity: 0.3; */
		color: rgb(0, 0, 0) !important;
	}

	.custom-placeholder-color input {
		color: rgb(0, 0, 0) !important;
	}

	.v-icon {
		color: rgb(0, 0, 0) !important;
	}

	.rounded-card {
		border-radius: 50px !important;
	}

	.cart-button {
		color: red !important;
		background-color: #0fc900 !important;
	}

	.v-list-item:hover {
		background-color: #98d2ff !important;
		color: white !important;
	}

	/*
	.v-list-item--active {
		background-color: #4bff3e !important;
		color: white !important;
	}

	.v-list-item--highlighted {
		background-color: #0F7DD1 !important;
		color: white !important;
	} */
</style>
