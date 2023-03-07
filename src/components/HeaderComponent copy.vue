<template>
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

    <v-spacer></v-spacer
    ><!-- ALIGN END -->
<v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>Toolbar Mobile Menu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-for="item in menu" :key="item.icon" :to="item.link" flat>{{
            item.title
          }}</v-btn>
        </v-toolbar-items>
        <v-menu class="hidden-md-and-up">
          <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
          <v-list>
            <v-list-tile v-for="item in menu" :key="item.icon">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    

<!-- hidden-md-and-up -->
    <v-menu class="">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile v-for="item in menu" :key="item.icon">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>


<script>
// import Toolbar from './components/xxx.vue';
export default {
  data() {
    return {
      menu: [
        {
          icon: "home",
          title: "Beats",
          url: "/beats",
        },
        {
          icon: "info",
          title: "Productores",
          url: "/beats",
        },
        {
          icon: "warning",
          title: "Registrarse",
          url: "/beats",
        },
        {
          icon: "warning",
          title: "Iniciar sesión",
          url: "/beats",
        },
        {
          icon: "warning",
          title: "Carrito",
          url: "/beats",
        },
        {
          icon: "warning",
          title: "Comenzar a Vender",
          url: "/beats",
        },
      ],
    };
  },

  methods: {
    menuItems() {
      return this.menu;
    },
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