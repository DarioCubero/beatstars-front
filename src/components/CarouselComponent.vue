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
        src: require("../assets/images/adobestock/AdobeStock_333713370.jpeg"),
      },
      {
        src: require("../assets/images/adobestock/AdobeStock_245375465.jpeg"),
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
    border: 1px solid #0F7DD1 !important;
    background-color: transparent !important;
  }

  .v-btn--active {
    color: #0F7DD1 !important;
    border: 1px solid rgb(255, 255, 255) !important;
    background-color: #0F7DD1 !important;
  }
  .v-icon{
    color: white !important;
  }

    .v-icon:hover{
    color: #0F7DD1 !important;
  }
}


</style>