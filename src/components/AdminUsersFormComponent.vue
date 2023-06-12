<template>
	<v-sheet max-width="800" class="mx-auto">
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			dark
			class="elevation-5 px-5 py-7">
			<v-row style="height: 10px">
				<v-progress-linear
					style="opacity: 0 !important"
					:active="formLoading"
					indeterminate
					color="blue"></v-progress-linear>
			</v-row>
			<v-row class="">
				<v-col cols="2"> </v-col>
				<v-col cols="8">
					<div class="headline" style="color: white !important">
						Información del Usuario
					</div>
				</v-col>
				<v-col cols="2">
					<!-- <v-switch
                  inset
                  prepend-icon="mdi-account-arrow-right-outline mdi-light"
                  @click="darkMode"
                /> -->
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="6" class="mb-0">
					<v-text-field
						dark
						label="Nombre de Usuario"
						v-model="user.nombreCuenta"
						outlined
						prepend-inner-icon="mdi-account-arrow-right-outline mdi-light" />
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						dark
						label="Email"
						v-model="user.email"
						outlined
						prepend-inner-icon="mdi-email-outline mdi-light" />
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						dark
						readonly
						label="Password"
						v-model="user.password"
						outlined
						prepend-inner-icon="mdi-key"
						@click:append="showBoolPassword = !showBoolPassword"
						:append-icon="
							showBoolPassword ? 'mdi-eye mdi-light' : 'mdi-eye-off mdi-light'
						"
						:type="showBoolPassword ? 'text' : 'password'" />
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						dark
						label="New Password"
						v-model="newPassword"
						outlined
						prepend-inner-icon="mdi-key-arrow-right"
						hint="At least 6 characters"
						counter="20"
						@click:append="showBoolPassword = !showBoolPassword"
						:append-icon="
							showBoolPassword ? 'mdi-eye mdi-light' : 'mdi-eye-off mdi-light'
						"
						:type="showBoolPassword ? 'text' : 'password'"
						:rules="[rules.required]" />
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="6" class="mb-0">
					<v-text-field
						dark
						label="Rol"
						v-model="user.rol"
						outlined
						prepend-inner-icon="mdi-triangle mdi-light" />
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						dark
						label="Cartera"
						v-model="user.cartera"
						outlined
						prepend-inner-icon="mdi-cash-multiple mdi-light" />
				</v-col>

				<v-col cols="12" md="6">
					<v-card dark outlined>
						<v-menu
							v-model="menu"
							dark
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
							min-width="auto">
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									dark
									v-model="dateUserFormat"
									label="Fecha"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"></v-text-field>
							</template>
							<v-date-picker
								disabled
								dark
								v-model="dateUserFormat"
								@input="menu2 = false"></v-date-picker>
						</v-menu>
					</v-card>
				</v-col>
				<v-col cols="12" md="6">
					<v-card dark outlined>
						<v-switch
							outlined
							v-model="user.activo"
							label="Activo"
							color="#FFD700"
							></v-switch>
					</v-card>
				</v-col>
			</v-row>

			<!-- botones -->
			<v-row>
				<v-col cols="2"> </v-col>
				<v-col cols="8">
					<v-btn color="white" outlined @click="validate"> Actualizar </v-btn>
				</v-col>
				<v-col cols="2">
					<v-btn color="#0F7DD1" @click="deleteUser">
						<v-icon>mdi-delete mdi-light</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-sheet>
</template>

<script>
	import auth from "@/services/auth";
	import api from "@/services/api";
	import { mapActions } from "vuex";

	import moment from "moment";

	export default {
		props: {
			message: String,
			typeAlert: String,
		},
		data: () => ({
			idUserLocal: auth.getLocalStorage("userId"),
			newPassword: "",
			showBoolPassword: "",
			user: {},
			valid: false,
			formLoading: false,
			dateUserFormat: null,
			emailRules: [
				(v) => !!v || "Please fill out the field!",
				(v) =>
					!v ||
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"E-mail must be valid",
			],
			rules: {
				required: (value) => !!value || "Required.",
				min6Char: (v) => v.length >= 6 || "Min 6 characters",
				userNameMaxChar: (v) => v.length < 20 || "Max 20 characters",
				emailMaxChar: (v) => v.length < 50 || "Max 50 characters",
				passwordMaxChar: (v) => v.length < 15 || "Max 15 characters",
				emailRules: [
					(v) => !!v || "Required",
					(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
					(v) => v.length >= 6 || "Min 6 characters",
					(v) => v.length < 50 || "Max 50 characters",
				],
			},

			alert: false,
			confirm: false,
			prompt: false,

			address: "",

			beforeShow: "No event captured yet",
			show: "No event captured yet",
			beforeHide: "No event captured yet",
			hide: "No event captured yet",
			menu: false,
			modal: false,
			menu2: false,
		}),

		async created() {
			this.user = await api.getUser(this.$route.params.id);
      this.newPassword = this.user.password;
			this.dateUserFormat = this.dateTime(this.user.dateCreated);
		},

		methods: {
			...mapActions(["vuexGetUser"]),

			dateTime(value) {
				return moment(value).format("YYYY-MM-DD");
			},

			validate() {
				if (this.$refs.form.validate()) {
					this.formLoading = true;
          this.user.password = this.newPassword;
					console.log(JSON.stringify(this.user));
          
					api.updateUser(this.$store.state.user.id, this.user);

					console.log("Actualizando State User tras el Update.");
					this.vuexGetUser(this.$store.state.user.id);

					setTimeout(() => {
						this.formLoading = false;
					}, 2000);

				}
			},

			deleteUser() {
				this.formLoading = true;
				api.deleteUser(this.idUserLocal);
				console.log("Ha sido borrado el usuario con ID: " + this.idUserLocal);
				auth.closeSession();
				this.$store.commit("setUser", {});

				setTimeout(() => {
					this.$router.push({ name: "login" });
					this.formLoading = false;
				}, 2000);
			},

			reset() {
				this.$refs.form.reset();
			},
			resetValidation() {
				this.$refs.form.resetValidation();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.v-card {
		padding: 0px 10px 0px 10px !important;
	}
	.v-form {
		background-color: #222222;
	}
</style>
