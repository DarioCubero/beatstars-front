<template>
	<div id="home">
		<Header />

		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container class="pa-10">
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
							>mdi-account mdi-light</v-icon
						>Admin Edit User
					</h1>
				</v-row>

				<AdminProfileForm></AdminProfileForm>
			</v-container>
		</v-main>

		<Footer />
	</div>
</template>
<script>
	import AdminProfileForm from "@/components/AdminUsersFormComponent.vue";
	import Header from "@/components/HeaderComponent.vue";
	import Footer from "@/components/FooterComponent.vue";

	export default {
		name: "pedidos-view",

		components: {
			Header,
			Footer,
			AdminProfileForm,
		},
	};
</script>
<style scoped></style>
