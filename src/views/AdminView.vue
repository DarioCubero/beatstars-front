<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container fluid class="pa-10">
        <h1 class="text-left"><v-icon style="font-size: 2.5rem; margin-left: 160px;">mdi-cog mdi-light</v-icon>Admin</h1>


        <!-- v-if="value1" -->
        <v-row class="pt-10">
          <v-col cols="12" md="2" class="bg-red pa-0">
          <CrudTable>
          </CrudTable>
          </v-col>
          <v-col cols="12" md="10" class="bg-red pa-0">
          <AdminBeats>
          </AdminBeats>
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
import AdminBeats from "@/components/AdminBeatsComponent.vue";
import CrudTable from "@/components/AdminTabsComponent.vue";


export default {
  name: "admin-view",

  components: {
    Header,
    Footer,
    CrudTable,AdminBeats
  },
};
</script>

<style scoped>
</style>
