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
    border: 1px solid #0FC900 !important;
    background-color: transparent !important;
  }

  .v-btn--active {
    color: #0FC900 !important;
    border: 1px solid rgb(255, 255, 255) !important;
    background-color: #0FC900 !important;
  }
  .v-icon{
    color: white !important;
  }

    .v-icon:hover{
    color: #0FC900 !important;
  }
}


</style>