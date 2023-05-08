<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container fluid class="pa-10">
        <h1 class="text-left">
          <v-icon style="font-size: 2.5rem; margin-left: 160px"
            >mdi-cart mdi-light mdi-light</v-icon
          >Carrito
        </h1>

        <!-- en construccion -->
        <div class="d-flex justify-center pt-10">
            <v-img
              contain
              max-height="600"
              src="@/assets/images/resources/buildpage.jpg"
            ></v-img>
        </div>

      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "cart-view",

  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
</style>
