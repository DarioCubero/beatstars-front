<template>
  <div id="beats">

    <Header/>
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container>
        <ListadoBeats/>
      </v-container>
    </v-main>
     <Footer/>

  </div>
</template>

<script>
import ListadoBeats from "@/components/BeatListComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  components: {
    ListadoBeats, Header, Footer
  },
};
</script>

<style scoped>
</style>
