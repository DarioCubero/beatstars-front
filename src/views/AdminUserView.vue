<template>
	<div id="home">
		<Header />
		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container fluid class="pa-10">
				<!-- title -->
				<v-row class="mt-1 pb-7 mb-4">
					<h1 class="text-left">
						<a @click="$router.go(-1)"
							><span span class="text-left"
								><v-icon style="font-size: 2.5rem"
									>mdi-arrow-left-thick mdi-light
								</v-icon></span
							></a
						>

						<v-icon style="font-size: 2.5rem; margin-left: 130px"
							>mdi-eye mdi-light</v-icon
						><span ref="title">Admin User - {{ this.user.nombreCuenta }}</span>
					</h1>
				</v-row>

				<v-row>
					<v-col cols="12" md="2" class="bg-red pa-0">
						<AdminTabs @selectedTab="updateView"> </AdminTabs>
					</v-col>
					<v-col cols="12" md="10" class="bg-red pa-0">
						<AdminBeats :idUser="user.id" v-if="tab === 'beats'"> </AdminBeats>
						<AdminPedidos :idUser="user.id" v-if="tab === 'pedidos'">
						</AdminPedidos>
						<AdminUsers v-if="tab === 'usuarios' && !user.id"> </AdminUsers>
						<AdminTypeBeats v-if="tab === 'typebeats' && !user.id"> </AdminTypeBeats>
						<AdminCharts :idUser="user.id" v-if="tab === 'charts'">
						</AdminCharts>
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
	import AdminBeats from "@/components/AdminBeatsDTComponent.vue";
	import AdminPedidos from "@/components/AdminOrdersDTComponent.vue";
	import AdminUsers from "@/components/AdminUsersDTComponent.vue";
	import AdminCharts from "@/components/AdminChartsComponent.vue";
	import AdminTypeBeats from "@/components/AdminTypeBeatsComponent.vue";

	import Api from "@/services/api";

	export default {
		name: "admin-user",

		components: {
			Header,
			Footer,
			AdminTabs,
			AdminBeats,
			AdminPedidos,
			AdminUsers,
			AdminCharts,
      AdminTypeBeats
		},

		data() {
			return {
				user: {},
				tab: "beats", //default item selected
			};
		},

		async created() {
			this.user = await Api.getUser(this.$route.params.id);
		},

		methods: {
			updateView(tabEmited) {
				this.tab = tabEmited;
			},
		},
	};
</script>

<style scoped></style>
