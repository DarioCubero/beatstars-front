<template>
  <v-content>
    <v-toolbar height="100px" dark density="compact" flat color="black">
      <v-img
        class="mx-2"
        src="../assets/images/logo.svg"
        max-height="40"
        max-width="40"
        contain
        to="/"
      ></v-img>

      <v-responsive class="mx-auto" max-width="350" color="white">
        <v-card
          color="red"
          class="pa-2 text-black custom-placeholer-color"
          flat
          width="350px"
        >
          <v-text-field
            color="black"
            class="text-black custom-placeholer-color"
            single-line
            max-height="6"
            max-width="10"
            hide-details="auto"
            prepend-icon="mdi-magnify"
            label="¿Qué estás buscando?"
            placeholder="Ejemplo: Type Beat Rap Rock - Drake..."
            type="email"
            clearable
          ></v-text-field>
        </v-card>
      </v-responsive>

      <!-- <v-toolbar-title to="/"></v-toolbar-title> -->

      <v-spacer></v-spacer
      ><!-- ALIGN END -->

      <v-toolbar-items  dense
      floating>
        <v-btn to="/">Home</v-btn>
        <v-btn to="/about">About</v-btn>
        <v-btn to="/contact">Contact</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-content>
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
.text-black input {
  color: rgb(0, 0, 0) !important;
}

.custom-placeholer-color::placeholder {
  color: rgb(0, 0, 0) !important;
}

.custom-placeholer-color input::placeholder {
  color: rgb(0, 0, 0) !important;
}

.custom-placeholer-color input {
  color: rgb(0, 0, 0) !important;
}

input-placeholder {
color: pink
}

</style>