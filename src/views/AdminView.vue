<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container fluid class="pa-10">
        <h1 class="text-left"><v-icon style="font-size: 2.5rem; margin-left: 160px;">mdi-account-supervisor mdi-light</v-icon>Admin</h1>
        <CrudTable></CrudTable>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
// import CrudTable from "@/components/CrudDataTableComponent.vue";
import CrudTable from "@/components/AdminTabsComponent.vue";


export default {
  name: "admin-view",

  components: {
    Header,
    Footer,
    CrudTable
  },
};
</script>

<style scoped>
</style>
