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

						<!-- searchform -->
						<v-form ref="searchForm" @submit.prevent="validateSearch">
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
												<a v-on:click="validateSearch">
													<v-icon class="pl-3">mdi-magnify mdi-dark</v-icon>
												</a>
											</v-col>
											<!-- buscador -->
											<v-col cols="12" lg="11" md="11" sm="11">
												<v-text-field
													@keydown.enter.prevent="validateSearch"
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
										<!--         :item-text="$t('cabeceraBuscador.ordenarPor.precio')"
                        :item-value="$t({item})" -->
										<v-col cols="12" lg="12" md="12" sm="12">
											<v-select
												dark
												color="#0F7DD1"
												v-model="sortBy"
												:items="sortByList"
												:label="$t('cabeceraBuscador.ordenarPor.ordenarPor')"
												item-value="name"
												item-text="name"
												single-line>
												<template v-slot:item="{ item }">
													{{ getText(item.name) }}
												</template>
												<template v-slot:selection="{ item }">
													{{ getText(item.name) }}
												</template>
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

								<v-list v-if="this.$store.state.isLogged">
									<v-list-item
										v-for="(item, index) in menuBeatList"
										:key="index"
										:to="item.url">
										<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>

							<v-btn v-if="this.$store.state.isLogged" to="/pedidos">
								{{ $t("cabeceraNavegador.pedidos") }}
							</v-btn>

							<v-btn v-if="this.$store.state.isLogged" to="/perfil">
								{{ $t("cabeceraNavegador.perfil") }}
							</v-btn>

							<v-btn
								style="
									background-color: #0fc900 !important;
									color: black !important;
									font-weight: bold !important;
								"
								to="/carrito">
								<v-icon left> mdi-cart mdi-dark </v-icon>
								{{ $t("cabeceraNavegador.carrito") }}
								<span v-if="this.$store.state.cart.length !== 0">
									{{ "(" + this.$store.state.cart.length + ")" }}
								</span>
							</v-btn>

							<v-btn
								id="btnAdmin"
								v-if="$store.state.user.rol === 'admin'"
								to="/admin">
								{{ $t("cabeceraNavegador.admin") }}
							</v-btn>
							<div>
								<v-select
									dark
									min-width="400px"
									append-icon="mdi-translate mdi-light"
									ref="selectedLang"
									v-model="selectedLang"
									:items="menuMultilanguage"
									item-text="name"
									item-value="abbr"
									label=""
									return-object
									solo
									hide-details="true">
									<template v-slot:selection="{ item }">
										<img width="20" :src="item.image" /> &nbsp;
										{{ item.abbr.toUpperCase() }}
									</template>

									<template v-slot:item="{ item }">
										<img width="20" :src="item.image" /><span class="ml-1">{{
											item.name
										}}</span>
									</template>
								</v-select>
							</div>
							<v-btn
								class="btnHeader"
								click="dialogLogin"
								v-if="!this.$store.state.isLogged"
								@click="loginMenuCommit(true)">
								<v-icon class="pr-1">mdi-login mdi-light</v-icon>
								{{ $t("cabeceraNavegador.conectar") }}
							</v-btn>

							<v-btn
								class="btnHeader"
								@click="logoutClick"
								v-if="this.$store.state.isLogged">
								<v-icon class="pr-1">mdi-reply-outline mdi-light</v-icon>
								{{ $t("cabeceraNavegador.desconectar") }}
							</v-btn>
						</v-toolbar-items>

						<!-- menu hamburguesa hide/show -->
						<v-app-bar-nav-icon
							variant="text"
							class="hidden-lg-and-up pr-9"
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

		<!-- Dialog login -->
		<v-dialog
			v-model="dialog"
			max-width="600px"
			overlay-opacity="0.7"
			class="rounded-pill block">
			<v-card
				color="black"
				max-width="600px"
				min-width="450px"
				class="dialog-card">
				<v-card-title class="text-center justify-center">
					<v-img
						class="mb-5"
						max-width="400px"
						:src="require('@/assets/images/Recurso 6.svg')"></v-img>
				</v-card-title>
				<v-tabs v-model="tab" show-arrows icons-and-text dark grow>
					<v-tabs-slider
						:class="
							tab === highlightTab ? 'slider-login' : 'slider-register'
						"></v-tabs-slider>
					<v-tab
						:class="tab === highlightTab ? 'tab-login' : 'tab-register'"
						v-for="(item, i) in tabs"
						:key="i">
						<v-icon large>{{ item.icon }}</v-icon>
						<div class="caption py-1" style="font-size: 20px !important">
							{{ item.name }}
						</div>
					</v-tab>

					<!-- loginform -->
					<v-tab-item>
						<v-card>
							<v-card-text>
								<v-form ref="loginForm" v-model="validLogin" lazy-validation>
									<v-row>
										<v-col cols="12">
											<v-text-field
												v-model="nameAndEmail"
												:rules="[rulesLogin.required]"
												label=" Nombre de Cuenta / Email"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-text-field
												v-model="userLogin.Password"
												:append-icon="
													showBoolPasswordLogin ? 'mdi-eye' : 'mdi-eye-off'
												"
												:rules="[rulesLogin.required, rulesLogin.min6Char]"
												:type="showBoolPasswordLogin ? 'text' : 'password'"
												name="loginPassword"
												label="Password"
												hint="Al menos 6 carácteres"
												counter
												@click:append="
													showBoolPasswordLogin = !showBoolPasswordLogin
												"></v-text-field>
										</v-col>
										<v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
										<v-spacer></v-spacer>
										<v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
											<v-btn
												class="white--text"
												color="#0FC900"
												x-large
												block
												:disabled="!validLogin"
												@click="validateLogin">
												Login
											</v-btn>
										</v-col>
									</v-row>
								</v-form>
							</v-card-text>
						</v-card>
					</v-tab-item>

					<!-- registerform -->
					<v-tab-item>
						<v-card>
							<v-card-text>
								<v-form
									ref="registerForm"
									v-model="validRegister"
									lazy-validation>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="userRegister.NombreCuenta"
												:rules="[
													rulesRegister.required,
													rulesRegister.userNameMin6,
													rulesRegister.userNameMaxChar,
												]"
												label="Nombre de Usuario"
												hint="At least 6 characters"
												counter="20"
												required></v-text-field>
										</v-col>
										<!-- <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="firstName"
                    :rules="[rules.required]"
                    label="First Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="lastName"
                    :rules="[rules.required]"
                    label="Last Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col> -->
										<v-col cols="12">
											<v-text-field
												v-model="userRegister.Email"
												:rules="[
													rulesRegister.required,
													rulesRegister.emailMin6,
													rulesRegister.emailMax35,
													rulesRegister.emailValid,
												]"
												label="Email"
												counter="35"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-text-field
												v-model="userRegister.Password"
												:append-icon="
													showBoolPasswordRegister ? 'mdi-eye' : 'mdi-eye-off'
												"
												:rules="[
													rulesRegister.required,
													rulesRegister.passwordMin6,
													rulesRegister.passwordMax15,
												]"
												:type="showBoolPasswordRegister ? 'text' : 'password'"
												name="registerPassword"
												label="Password"
												hint="At least 6 characters"
												counter="20"
												@click:append="
													showBoolPasswordRegister = !showBoolPasswordRegister
												"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-text-field
												block
												v-model="registerPasswordVerify"
												:append-icon="
													showBoolPasswordRegister2 ? 'mdi-eye' : 'mdi-eye-off'
												"
												:rules="[rulesRegister.required, passwordMatch]"
												:type="showBoolPasswordRegister2 ? 'text' : 'password'"
												name="registerPasswordVerifyName"
												label="Confirm Password"
												counter="20"
												@click:append="
													showBoolPasswordRegister2 = !showBoolPasswordRegister2
												"></v-text-field>
										</v-col>
										<v-spacer></v-spacer>
										<v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
										<v-spacer></v-spacer>
										<v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
											<v-btn
												class="white--text"
												x-large
												block
												color="black"
												:disabled="!validRegister"
												@click="validateRegister"
												>Register</v-btn
											>
										</v-col>
									</v-row>
								</v-form>
							</v-card-text>
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-card>
		</v-dialog>
		<!--END  Dialog login -->
	</div>
</template>

<script>
	import auth from "@/services/auth";
	import { mapActions } from "vuex";
	// import i18n from "../i18n";
	// import Api from "@/services/api";

	let currentDate = new Date();

	export default {
		data() {
			return {
				//login
				dialog: false,
				tab: null,
				highlightTab: 0,
				validLogin: true,
				validRegister: true,
				registerPasswordVerify: "",

				showBoolPasswordLogin: "",
				showBoolPasswordRegister: "",
				showBoolPasswordRegister2: "",
				// tab: 0,
				tabs: [
					{ name: "Login", icon: "mdi-account" },
					{ name: "Register", icon: "mdi-account-plus-outline" },
				],
				nameAndEmail: "",
				userLogin: {
					NombreCuenta: "",
					Email: "",
					Password: "",
					Saldo: 0,
					DateCreated: currentDate,
					Rol: "estandar",
					Activo: true,
				},
				userRegister: {
					NombreCuenta: "",
					Email: "",
					Password: "",
					Saldo: 0,
					DateCreated: currentDate,
					Rol: "estandar",
					Activo: true,
				},
				alertObject: {
					status: false,
					message: "",
					type: "",
				},
				rulesLogin: {
					required: (v) => !!v || "Required.",
					min6Char: (v) =>
						(v && v.length >= 6) || "Name must be more than 6 characters",
				},
				rulesRegister: {
					required: (v) => !!v || "Required.",
					userNameMin6: (v) =>
						(v && v.length >= 6) || "Username must be more than 6 characters",
					userNameMaxChar: (v) =>
						(v && v.length < 20) || "Username must be less than 6 characters",
					emailValid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
					emailMin6: (v) =>
						(v && v.length >= 6) || "Email Min must be more than 6 characters",
					emailMax35: (v) =>
						(v && v.length < 35) || "Email must be less than 35 characters",
					passwordMin6: (v) =>
						(v && v.length >= 6) || "Password must be more than 6 characters",
					passwordMax15: (v) =>
						(v && v.length < 15) || "Password must be less than 15 characters",
				},

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
				selectedLang: this.$i18n.locale,
				menuMultilanguage: [
					{
						name: "English",
						abbr: "en",
						image: require("../assets/images/flags/en.svg"),
					},
					{
						name: "Español",
						abbr: "es",
						image: require("../assets/images/flags/es.svg"),
					},
				],

				sortByList: [
					{ id: 1, name: "cabeceraBuscador.ordenarPor.precio" },
					// { id: 2, name: this.$t("cabeceraBuscador.ordenarPor.nombre") },
					// "Fecha",
				],
				checkAdmin: false,
				drawer: false,
				// rules: {
				// 	required: (value) => !!value,
				// },
			};
		},

		methods: {
			...mapActions(["vuexGetUser"]),
			...mapActions(["vuexCleanCart"]),
			...mapActions(["vuexIsLogged"]),

			loginMenuCommit(value) {
				this.$store.commit("loginMenuChange", value);
			},

			getText(item) {
				return this.$t(item);
			},

			sortOrderCheckbox() {
				if (this.sortOrderValue) {
					this.sortOrder = "desc";
				} else {
					this.sortOrder = null;
				}
			},

			async validateSearch() {
				console.log("validateSearch");
				if (await this.$refs.searchForm.validate()) {
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

			logoutClick() {
				auth.closeSession();
				this.$store.commit("setUser", {});
				this.vuexCleanCart();
				localStorage.removeItem("userId");
				console.log("Logout --> Close sesion, clean states & localStorage");
				this.$store.commit("setIsLogged", false);
				if (this.$route.name !== "home") this.$router.push({ name: "home" });
			},

			// onClickOutside() {
			//   //Limpiamos el error del required en el searchBeatByName
			//   this.$refs.form.resetValidation();
			// },

			async validateLogin() {
				console.log("validateLogin");
				if (this.$refs.loginForm.validate()) {
					this.userLogin.NombreCuenta = this.nameAndEmail;
					this.userLogin.Email = this.nameAndEmail;
					let idLoggedUser = await auth.postLogin(this.userLogin);
					console.log(idLoggedUser);
					if (idLoggedUser != -1) {
						console.log("LocalStorage de ID response API recogido");
						auth.setLocalStorage("userId", idLoggedUser);
						console.log("vuexGetUser State de Usuario cargado");
						this.vuexGetUser(idLoggedUser);
						console.log("Logeado!");

						// this.$emit("loginDialog", this.alertObject);
						//Props (parent -> child) || $emit (child -> parent)
						this.alertObject.status = true;
						this.alertObject.type = "error";
						this.alertObject.message = "Incorrect Username or Password!";

						this.loginMenuCommit(false);
						this.$store.commit("setIsLogged", true);
						this.vuexCleanCart();
						this.$refs.loginForm.reset();
						if (this.currentRouteName == "beats") { //fix refresh icon beats ya comprados seleccionados
							window.location.reload(); //forzar refrescar
						}
					} else {
						console.info("Login incorrecto. Vuelva a intentarlo.");
						this.alertObject.status = false;
						this.alertObject.type = "error";
						this.alertObject.message = "Incorrect Username or Password!";
					}
				}
			},

			async validateRegister() {
				console.log("validateRegister");
				if (this.$refs.registerForm.validate()) {
					alert("Registro realizado correctamente.");
					let registerInfo = await auth.postRegister(this.userRegister);
					console.log(registerInfo);
					this.tab = 0; //lo redireccionamos al login y le enviamos una alerta type success
					this.$refs.registerForm.reset(); //CLEAN
				} else {
					console.log("Error en la validación del formulario de registro");
				}
			},
		},

		// mounted() {
		// 	window.addEventListener("keyup", function (ev) {
		// 		if (ev.key == "Enter") {
		// 			this.$refs.searchForm.submit.click();
		// 		}
		// 	});
		// },

		async beforeCreate() {
			this.$store.commit("loginMenuChange", false);
		},

		computed: {
			currentRouteName() {
				return this.$route.name;
			},
			loginMenuComputed() {
				return this.$store.state.actions.loginMenu;
			},

			passwordMatch() {
				return () =>
					this.userRegister.Password === this.registerPasswordVerify ||
					"Password must match";
			},
		},

		watch: {
			dialog: function (value) {
				if (!value) {
					this.$store.commit("loginMenuChange", value);
				}
			},

			selectedLang: function (val) {
				this.$store.commit("setAppLanguage", val.abbr);
				this.$i18n.locale = val.abbr;
				console.log("i18n locale: " + this.$i18n.locale);
			},

			loginMenuComputed() {
				this.dialog = this.$store.state.actions.loginMenu;
			},

			// "this.$store.state.actions": {
			// 	handler: function () {
			//     alert('WORK');
			// 	},
			// 	immediate: true, // provides initial (not changed yet) state
			// },
		},
	};
</script>

<style>
	/* Intento de quitar el fondo gris cuando clicas */
	/* .v-toolbar__items > a:active{
  background-color: green !important;
} */
	.v-list-item {
		font-size: 17px !important;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.v-select {
		margin-left: 5px !important;
		min-width: 110px;
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

	/* login */

	@keyframes animatedgradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	/* ------------------------------- */
	.v-dialog {
		/* border: 5px solid #0dc900c7; */
		border-radius: 30px;
		padding: 5px;
		content: "";
		top: calc(-1 * var(--borderWidth));
		left: calc(-1 * var(--borderWidth));
		width: calc(100% + var(--borderWidth) * 2);
		background: linear-gradient(
			60deg,
			#0dc9008a,
			#0dc9008a,
			#0dc90021,
			#0dc90021,
			#0dc9008a,
			#0dc90021,
			#0dc90021,
			#0dc9008a
		);
		z-index: 1;
		animation: animatedgradient 5s ease inf1te;
		background-size: 300% 300%;
		pointer-events: auto !important;
		transition: 0.3s;
	}

	.v-dialog:hover {
		background: linear-gradient(
			60deg,
			#0fc900,
			#0fc900,
			#0dc9005d,
			#0dc9005d,
			#0fc900,
			#0dc9005d,
			#0dc9005d,
			#0fc900
		);
		/* border: 5px solid #0dc900c7; */
		border-radius: 30px;
		padding: 5px;
		content: "";
		top: calc(-1 * var(--borderWidth));
		left: calc(-1 * var(--borderWidth));
		width: calc(100% + var(--borderWidth) * 2);
		z-index: 1;
		animation: animatedgradient 5s ease infinite;
		background-size: 300% 300%;
		pointer-events: auto !important;
	}

	.dialog-card {
		border-radius: 30px !important;
	}

	.v-tabs-slider-wrapper {
		height: 5px !important;
	}

	.tab-login {
		background-color: black !important;
	}
	.tab-register {
		background-color: #0fc900 !important;
	}

	.slider-register {
		background-color: black !important;
	}

	.slider-login {
		background-color: #0fc900 !important;
	}

	.v-card {
		padding: 30px;
	}
</style>
