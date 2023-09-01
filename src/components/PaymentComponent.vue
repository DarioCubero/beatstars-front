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
			<v-row>
				<v-col cols="2"> </v-col>
				<v-col cols="8">
					<div class="headline" style="color: white !important">
						Creación del Pedido
					</div>
				</v-col>
				<v-col cols="2"> </v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="6" class="text-center">
					<v-card class="pa-2" dark outlined>
						<v-select
							v-model="order.metodoPago"
							:items="items"
							item-text="type"
							item-value="value"
							label="Método de pago"
							single-line
							:rules="[rules.required]">
						</v-select>
					</v-card>
				</v-col>
			</v-row>

			<v-row>
				<!-- user.metodoPago -->
				<v-col cols="12" md="6">
					<v-text-field
						dark
						label="Email"
						v-model="order.correoUsuario"
						outlined
						prepend-inner-icon="mdi-email-outline mdi-light"
						disabled />
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						dark
						label="Total"
						v-model="order.total"
						outlined
						prepend-inner-icon="mdi-currency-eur mdi-light"
						disabled />
				</v-col>
			</v-row>

			<!-- botones -->
			<v-row>
				<v-col cols="2"> </v-col>
				<v-col cols="8">
					<v-btn
						@click="validate"
						color="#0FC900"
						class="pa-6 ma-4 justify-center">
						<h3 class="white--text">Comprar</h3>
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-sheet>
</template>

<script>
	import auth from "@/services/auth";
	import Api from "@/services/api";
	import { mapActions } from "vuex";

	let currentDate = new Date();

	export default {
		props: {
			message: String,
			typeAlert: String,
		},
		data: () => ({
			idUserLocal: null,

			order: {
				metodoPago: "",
				total: false,
				correoUsuario: "",
				dateCreated: currentDate,
				userId: null,
			},

			user: {},
			cartBeats: [],
			valid: false,

			rules: {
				required: (value) => !!value || "Required.",
			},

			items: [
				{ type: "PayPal", value: "false" },
				{ type: "Tarjeta", value: "true" },
			],

			idBeatList: [],
			formLoading: false,
		}),

		async created() {
			this.cartBeats = this.$store.state.cart;

			if (this.cartBeats.length == 0) {
				this.$router.push({ name: "beats" });
			}

			this.idUserLocal = auth.getLocalStorage("userId");
			this.user = await Api.getUser(this.idUserLocal);
			this.order.correoUsuario = this.user.email;
			this.order.IdUser = this.user.id;

			this.countCart();
		},

		methods: {
			...mapActions(["vuexCleanCart"]),
			...mapActions(["vuexSetUser"]),
      
			validate() {
				if (this.$refs.form.validate()) {
					console.log(JSON.stringify(this.order));

					if (this.user.cartera >= this.order.total) {
						//Si tiene suficiente dinero
						setTimeout(() => {
							this.formLoading = false;
						}, 2000);

						this.order.metodoPago = this.metodoPago(this.order.metodoPago);
						Api.createOrder(this.order);

            // descontar el dinero al usuario
					console.log("Actualizando State User tras el Update.");
          this.user.cartera = this.user.cartera - this.order.total;
					this.vuexSetUser(this.user);
          Api.updateUser(this.$store.state.user.id, this.user);

						this.reset()
						this.vuexCleanCart();
						this.$router.push({ name: "pedidos" });

						// Alert........
					} else {
						alert("Recarge el monedero");
						this.$router.push({ name: "perfil" });
					}
				}
			},

			reset() {
				this.$refs.form.reset();
			},

			resetValidation() {
				this.$refs.form.resetValidation();
			},

			metodoPago(check) {
				return check == "PayPal" ? false : true; // false: Paypal
			},

			async countCart() {
				if (this.cartBeats) {
					this.order.IdBeatList = [];
					await this.cartBeats.forEach(async (x) => {
						this.order.IdBeatList.push(x.id);
						this.order.total += x.precio;
					});
				} else {
					console.log("Carrito vacío");
				}
			},

			async updateWalletUser() {
				this.user.cartera = this.user.cartera - this.order.total;
				auth.updateUser(this.$store.state.user.id, this.user);
				console.log("Actualizando State User tras el Update.");
				this.vuexGetUser(this.$store.state.user.id);
			},
		},

		computed: {
			passwordMatch() {
				return () =>
					this.user.password === this.passwordVerify || "Password must match";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.v-form {
		background-color: #222222;
	}
</style>
