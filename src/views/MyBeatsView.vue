<template>
  <div id="myBeats">

    <Header/>
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container>
        <MiListadoBeats/>
      </v-container>
    </v-main>
     <Footer/>

  </div>
</template>

<script>
import MiListadoBeats from "@/components/MyBeatListComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  components: {
    MiListadoBeats, Header, Footer
  },
};
</script>

<style scoped>
</style>
