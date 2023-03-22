<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container>
              <h3 class="mt-4">404 (Página no encontrada)</h3>
              <h5 class="mt-4">pero... si éste precioso Pug</h5>
              <v-card-title class="justify-center" color="black" >
                <v-img  max-width="500px"
                :width-on-screen="20"
                :width-on-screen-tablet="45"
                :width-on-screen-smartphone="100"
                src="../assets/gifs/pug.gif"
              ></v-img>
              </v-card-title>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "not-found-view",

  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.v-btn {
  height: 200% !important;
}

.body {
  background-image: "../assets/gifs/pug.gif";
  background-size: cover;

  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>

