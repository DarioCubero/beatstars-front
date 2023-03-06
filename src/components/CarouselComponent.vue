<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "CarouselComponent",

  data: () => ({
    items: [
      {
        src: require("../assets/images/resources/iphones.png"),
      },
      {
        src: require("../assets/images/resources/bg.jpg"), 
      },
    ],
  }),
};
</script>
