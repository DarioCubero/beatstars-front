<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
     <Footer/>
  </v-app>
</template>

<script>
import Header from "./components/HeaderComponent.vue";
import Footer from "./components/FooterComponent.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
/* GENERAL */

*{
  text-transform: none !important;
}

#app {
  font-size: 20px;
   font-family: "Poppins", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: black;
} 

</style>
