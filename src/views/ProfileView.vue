<template>
  <div id="home">
    <Header />

    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container class="pa-10">
        <h1 class="text-left">
          <v-icon style="font-size: 2.5rem; margin-left: 160px"
            >mdi-account mdi-light</v-icon
          >Mi Perfil
        </h1>
        <ProfileForm></ProfileForm>
      </v-container>
    </v-main>

    <Footer />
  </div>
</template>
<script>
import ProfileForm from "@/components/ProfileFormComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "pedidos-view",

  components: {
    Header,
    Footer,
    ProfileForm,
  },
};
</script>
<style scoped>
</style>
