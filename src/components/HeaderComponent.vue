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

						<!-- left form -->
						<v-form ref="form" @submit.prevent="validate">
							<v-row style="display: flex; align-items: center">
								<!-- Buscador -->
								<v-col cols="12" lg="5" md="5" sm="5" class="ml-6 mr-2">
									<v-card color="white" class="rounded-card pa-2" width="350px">
										<v-row no-gutters>
											<!-- lupa -->
											<v-col btn cols="12" lg="1" md="1" sm="1">
												<a type="submit">
													<v-icon class="pl-3">mdi-magnify mdi-dark</v-icon>
												</a>
											</v-col>
											<!-- buscador -->
											<v-col cols="12" lg="11" md="11" sm="11">
												<v-text-field
													v-model="beatNameFilter"
													label="¿Qué estás buscando?"
													:rules="[rules.required]"
													max-height="6"
													max-width="10"
													single-line
													color="black"
													class="ml-3 custom-placeholder-color custom-label-color pl-2 pr-4"
													hide-details="auto"
													clearable
													placeholder="Nombre del Beat..."></v-text-field>
											</v-col>
										</v-row>
									</v-card>
								</v-col>

								<!-- sort-->
								<v-col cols="12" lg="3" md="3" sm="3">
                  <!-- sortOrder desc -->
									<v-row>
										<div>
											<v-simple-checkbox
												v-model="sortOrder"></v-simple-checkbox>
										</div>
										<div>
											<span class="white--text"
												><v-icon>mdi-sort-descending mdi-light</v-icon>DESC
											</span>
										</div>
									</v-row>
                   <!-- sortBy -->
									<v-row style="max-height: 50px">
										<v-col cols="12" lg="12" md="12" sm="12">
											<v-select
												dark
												v-model="sortBy"
												:items="items"
												item-text="item"
												item-value="item"
												label="Filtrar por:"
												single-line>
											</v-select>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-form>

						<!-- spacer -->
						<v-spacer></v-spacer>

						<!-- right toolbar -->
						<v-toolbar-items class="hidden-sm-and-down" color="transparent">
							<v-btn
								v-for="item in menu"
								:prepend-icon="item.icon ? item.icon : null"
								:style="item.claseColor ? item.claseColor : null"
								:key="item.icon ? item.claseColor : null"
								:to="item.url">
								<v-icon left v-if="item.icon"> {{ item.icon }} </v-icon
								>{{ item.title }}
								<span v-if="item.title == 'Carrito' && cartCount !== 0">
									{{ "(" + cartCount + ")" }}
								</span>
							</v-btn>

							<v-btn
								style="color: #0fc900 !important"
								v-if="$store.state.user.rol === 'admin'"
								to="/admin">
								Admin
							</v-btn>
							<v-btn class="btnHeader" @click="logoutClick"> Logout </v-btn>
						</v-toolbar-items>

						<!-- menu hamburguesa hide/show -->
						<v-app-bar-nav-icon
							variant="text"
							class="hidden-md-and-up"
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
	// import api from "@/services/api";

	export default {
		data() {
			return {
				sortOrder: false,
				sortBy: null,
				items: [
					{ item: "Nombre" },
					{ item: "Premium" },
					{ item: "TypeBeat" },
					{ item: "Precio" },
					{ item: "Fecha" },
				],

				beatNameFilter: "",
				checkAdmin: false,
				drawer: false,
				cartCount: this.$store.state.cart.length,
				menu: [
					{
						title: "Home",
						url: "/home",
						claseColor: "none",
					},
					{
						title: "Beats",
						url: "/beats",
						claseColor: "none",
					},
					{
						title: "Mis Beats",
						url: "/mis-beats",
						claseColor: "none",
					},
					{
						title: "Pedidos",
						url: "/pedidos",
						claseColor: "none",
					},
					{
						title: "Subir Beat",
						url: "/subir-beat",
						claseColor: "none",
					},
					{
						title: "Mi Perfil",
						url: "/perfil",
						claseColor: "none",
					},
					{
						title: "Carrito",
						url: "/carrito",
						claseColor:
							"background-color: #0FC900 !important; color: black !important; font-weight: bold !important",
						icon: "mdi-cart mdi-dark",
					},
					// {
					//   title: "Registrarse",
					//   url: "/registro",
					// },
					// {
					//   title: "Iniciar sesión",
					//   url: "/login",
					// },
					// {
					//   title: "Logout",
					//   url: "/logout",
					// },
				],
				rules: {
					required: (value) => !!value,
				},
			};
		},

		methods: {
			created() {
				if (!auth.getLocalStorage("userId")) {
					console.info("Acceso restringido. Debes logearte primero.");
					this.$router.push({ name: "login" });
					// this.$store.commit("setUser", {});
				}
			},

			async validate() {
				if (await this.$refs.form.validate()) {
					console.log("sortOrder: " + this.sortOrder);
					this.$router.push({
						name: "beats",
						query: { name: this.beatNameFilter },
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
	.v-form {
		width: 100%;
	}
	.v-toolbar {
		background-color: #222222 !important;
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

	.theme--dark.v-btn.v-btn--has-bg {
		background-color: none !important;
	}

	.v-toolbar__items a.v-btn.v-btn--is-elevated:hover,
	.btnHeader:hover {
		/* hover botones menu */
		border-radius: 50px;
		color: white;
		background-color: #0f7dd1 !important;
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

	.v-toolbar__items {
		padding: 27px;
	}

	.v-toolbar__content {
		padding: 0px !important;
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
</style>
