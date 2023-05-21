<template>
  <div id="home">
    <Header />

    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container fluid class="pa-10">
        <h1 class="text-left">
          <v-icon style="font-size: 2.5rem; margin-left: 160px"
            >mdi-account mdi-light</v-icon
          >Subir Beat
        </h1>
         <BeatForm></BeatForm>
      </v-container>
    </v-main>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
import BeatForm from "@/components/BeatUploadFormComponent.vue";


export default {
  name: "upload-beat-view",

  components: {
    Header,
    Footer,
    BeatForm
  },
};
</script>

<style scoped>
</style>
