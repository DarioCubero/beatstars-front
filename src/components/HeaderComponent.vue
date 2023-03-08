<template>
  <v-card>
    <v-app-bar
      fixed
      app
      height="100px"
      dark
      color="black"
      class="pl-10"
      id="header"
    >
      <router-link to="/" class="logo-home">
        <v-img class="mx-2" :src="require('@/assets/images/logo.svg')"></v-img>
      </router-link>

      <v-card color="white" class="rounded-card pa-2" flat width="370px">
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

      <!-- spacer -->
      <v-spacer></v-spacer>

      <!-- toolbar -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in menu" :key="item.icon" :to="item.url">{{
          item.title
        }}</v-btn>
      </v-toolbar-items>

      <!-- menu hamburguesa hide/show -->
      <v-app-bar-nav-icon
        variant="text"
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- END appbar -->

    <v-navigation-drawer
      src="../assets/texture/dark-wood.jpg"
      app
      v-model="drawer"
      location="bottom"
      temporary
    >
    </v-navigation-drawer>
  </v-card>
</template>


<script>
// import Toolbar from './components/xxx.vue';
export default {
  data() {
    return {
      drawer: false,
      group: null,
      menu: [
        {
          icon: "home",
          title: "Home",
          url: "/",
        },
        {
          icon: "info",
          title: "Productores",
          url: "/producers",
        },
        {
          icon: "warning1",
          title: "Registrarse",
          url: "/beats",
        },
        {
          icon: "warning2",
          title: "Iniciar sesión",
          url: "/login",
        },
        {
          icon: "warning4",
          title: "Comenzar a Vender",
          url: "/sell",
        },
        {
          icon: "warning3",
          title: "Carrito",
          url: "/shoppingcart",
        }
      ],
    };
  },

  components: {
    // xxx,
  },
};
</script>

<style>
.menu-right {
  margin-right: 200px;
}

.logo-home {
  min-width: 60px;
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