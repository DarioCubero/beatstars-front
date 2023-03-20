<template>
 <!-- show-arrows-on-hover -->
  <v-carousel
    class="my-carousel"
    interval="5000"
    cycle
    reverse-transition="fade-transition"
    transition="fade-transition"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      height="400"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "CarouselComponent",

  data: () => ({
    items: [
      {
        src: require("../assets/images/resources/bg.jpg"),
      },
      {
        src: require("../assets/images/resources/iphones.png"),
      },
    ],
  }),
};
</script>

<style lang="scss">
.my-carousel {
  .v-btn {
    color: transparent !important;
    border: 1px solid rgb(255, 255, 255) !important;
    background-color: transparent !important;
  }

  .v-btn:hover {
    color: transparent !important;
    border: 1px solid red !important;
    background-color: transparent !important;
  }

  .v-btn--active {
    color: red !important;
    border: 1px solid rgb(255, 255, 255) !important;
    background-color: red !important;
  }
  .v-icon{
    color: white !important;
  }

    .v-icon:hover{
    color: red !important;
  }
}


</style>