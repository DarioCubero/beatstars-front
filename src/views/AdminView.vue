<template>
	<div id="home">
		<Header />
		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container fluid class="pa-10">
				<!-- title -->
				<v-row class="mt-1 pb-7 mb-4">
					<v-icon style="font-size: 2.5rem; margin-left: 160px"
						>mdi-cog mdi-light</v-icon
					>
					<h1>
						<div ref="title">Admin</div>
					</h1>
				</v-row>
				<v-row>
					<v-col cols="12" md="2" class="bg-red pa-0">
						<AdminTabs @selectedTab="updateView"> </AdminTabs>
					</v-col>
					<v-col cols="12" md="10" class="bg-red pa-0">
						<AdminBeats v-if="tab === 'beats'"> </AdminBeats>
						<AdminPedidos v-if="tab === 'pedidos'"> </AdminPedidos>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<Footer />
	</div>
</template>

<script>
	import Header from "@/components/HeaderComponent.vue";
	import Footer from "@/components/FooterComponent.vue";
	import AdminTabs from "@/components/AdminTabsComponent.vue";
	import AdminBeats from "@/components/AdminBeatsComponent.vue";
	import AdminPedidos from "@/components/AdminPedidosComponent.vue";

	export default {
		name: "admin-view",

		components: {
			Header,
			Footer,
			AdminTabs,
			AdminBeats,
      AdminPedidos
		},

		data() {
			return {
				tab: "beats", //default item selected
			};
		},

		methods: {
			updateView(tabEmited) {
				this.tab = tabEmited;
			},
		},
	};
</script>

<style scoped></style>
