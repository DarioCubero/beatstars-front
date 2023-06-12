<template>
  <div id="home">
    <Header />

    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container class="pa-10">
        <!-- title -->
				<v-row class="mt-1 pb-7 mb-4">
          <v-icon style="font-size: 2.5rem; margin-left: 100px">mdi-account mdi-light</v-icon>
					<h1>
						<div ref="title">Admin User</div>
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
<style scoped>
</style>
