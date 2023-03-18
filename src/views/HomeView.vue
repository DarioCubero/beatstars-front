<template>
  <div id="home">
    <Header/>
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container>
        <Carousel />
      </v-container>
    </v-main>
     <Footer/>
  </div>
</template>

<script>
import Carousel from "@/components/CarouselComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  components: {
    Header,
    Footer,
    Carousel,
  },
};
</script>
