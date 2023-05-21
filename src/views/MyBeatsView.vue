<template>
  <div id="myBeats">

    <Header/>
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container fluid class="pa-10">
        <h1 class="text-left"><v-icon style="font-size: 2.5rem; margin-left: 160px;">mdi-folder mdi-light</v-icon>Mis Beats</h1>

        <MyBeatListComponent/>
      </v-container>
    </v-main>
     <Footer/>

  </div>
</template>

<script>
import MyBeatListComponent from "@/components/UserBeatsListComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "mis-beats",

  components: {
    MyBeatListComponent, Header, Footer
  },
};
</script>

<style scoped>
</style>
