<template>
  <v-main>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <Carousel />
        </v-col>
        <v-col cols="12" md="12">
          <Cards />
        </v-col>
      </v-row>
      <v-row no-gutters> </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Carousel from "../components/CarouselComponent.vue";
import Cards from "../components/ListadoBeatsComponent.vue";

export default {
  components: {
    Carousel,
    Cards,
  },
};
</script>
