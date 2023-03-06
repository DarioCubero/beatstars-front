<template>
    <v-app-bar fixed height="100px" dark color="black" class="pl-10" id="header">
      <router-link to="/" class="logo-home">
        <v-img class="mx-2" 
        :src="require('@/assets/images/logo.svg')"
        ></v-img>
      </router-link>

      <v-responsive class="mx-auto ml-3">
        <v-card
          color="white"
          class="rounded-card pa-2"
          flat
          width="370px"
        >
          <v-text-field
            max-height="6"
            max-width="10"
            single-line
            color="black"
            class="custom-placeholder-color custom-label-color pl-2 pr-4"
            prepend-icon="mdi-magnify"
            hide-details="auto"
            clearable
            label="¿Qué estás buscando?"
            placeholder="Type Beat - Artist..."
          >
          </v-text-field>
        </v-card>
      </v-responsive>

      <!-- <v-toolbar-title to="/"></v-toolbar-title> -->

      <v-spacer></v-spacer
      ><!-- ALIGN END -->

      <v-toolbar-items dense floating>
        <v-btn to="/">Home</v-btn>
        <v-btn to="/about">About</v-btn>
        <v-btn to="/contact">Contact</v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>


<script>
// import Toolbar from './components/xxx.vue';
export default {
  components: {
    // xxx,
  },
};
</script>

<style>
.logo-home {
  width: 60px;
}
.v-toolbar__content {
  padding: 0px !important;
}

.custom-label-color .v-label {
  color: rgb(0, 0, 0) !important;
  opacity: 0.8;
}

.custom-placeholder-color::placeholder {
  color: rgb(0, 0, 0) !important;
}

.custom-placeholder-color input::placeholder {
  color: rgb(0, 0, 0) !important;
}

.custom-placeholder-color input {
  color: rgb(0, 0, 0) !important;
}

.v-icon {
  color: rgb(0, 0, 0) !important;
}

.custom-placeholder-color input::placeholder {
  color: rgb(0, 0, 0) !important;
  opacity: 1;
}

.rounded-card {
  border-radius: 50px !important;
}
</style>