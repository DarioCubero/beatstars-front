<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
/* GENERAL */

* {
  text-transform: none !important;
}

#app {
  font-size: 20px !important;
  font-family: "Poppins", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: black;
  color: white;
}

.v-navigation-drawer {
  z-index: 999999 !important;
}

// .v-main{
//   min-height: 500px;
// }

</style>
