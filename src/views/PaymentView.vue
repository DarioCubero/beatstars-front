<template>
	<div id="home">
		<Header />
		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container fluid class="pa-10">
				<!-- title -->
				<v-row class="mt-1 pb-7 mb-4">
					<h1 class="text-left" style="color: #0fc900 !important">
						<a @click="$router.go(-1)"
							><span span class="text-left"
								><v-icon style="font-size: 2.5rem; color: #0fc900 !important"
									>mdi-arrow-left-thick
								</v-icon></span
							></a
						>

						<v-icon
							style="
								color: #0fc900 !important;
								font-size: 2.5rem;
								margin-left: 130px;
							"
							>mdi-cash-multiple </v-icon
						>Payment
					</h1>
				</v-row>

				<PaymentComponent />
			</v-container>
		</v-main>
		<Footer />
	</div>
</template>

<script>
	import Header from "@/components/HeaderComponent.vue";
	import Footer from "@/components/FooterComponent.vue";
	import PaymentComponent from "@/components/PaymentComponent.vue";

	export default {
		name: "cart-view",

		components: {
			Header,
			Footer,
			PaymentComponent,
		},
	};
</script>

<style scoped></style>
