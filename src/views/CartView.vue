<template>
	<div id="home">
		<Header />
		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container fluid class="pa-10">
				<!-- title -->
				<v-row class="mt-1 pb-7 mb-4">
					<v-icon style="font-size: 2.5rem; margin-left: 160px"
						>mdi-cart mdi-light</v-icon
					>
					<h1>
						<div>Carrito</div>
					</h1>
				</v-row>

				<CartBeatsDT />

				<!-- botones -->
				<v-row class="justify-center">
					<v-col cols="4" class="justify-center ma-6 ">
						<v-btn
							v-on:click="buy"
							color="#0FC900"
							class="pa-6 ma-6 justify-center" >
							<h3 class="white--black">Tramitar pedido</h3>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<Footer />f
	</div>
</template>

<script>
	import Header from "@/components/HeaderComponent.vue";
	import Footer from "@/components/FooterComponent.vue";
	import CartBeatsDT from "@/components/CartBeatsDTComponent.vue";

	import Api from "@/services/api";
	import { mapActions } from "vuex";

	// let currentDate = new Date();

	export default {
		name: "cart-view",

		components: {
			Header,
			Footer,
			CartBeatsDT,
		},

		data: () => ({
			order: [],
		}),

		methods: {
			...mapActions(["vuexGetUser"]),

			buy() {
				if (this.$store.state.isLogged) {
					this.$router.push(`pagos`);
				} else {
					this.$store.commit("loginMenuChange", true); //abrimos login
				}
			},

			validate() {
				if (this.$refs.form.validate()) {
					this.formLoading = true;
					this.user.password = this.newPassword;
					console.log(JSON.stringify(this.user));

					Api.updateUser(this.$store.state.user.id, this.user);

					console.log("Actualizando State User tras el Update.");
					this.vuexGetUser(this.$store.state.user.id);

					setTimeout(() => {
						this.formLoading = false;
					}, 2000);
				}
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

<style scoped></style>
