<template>
  <v-card height="107px"
      color="#f52626"
      class="py-3">
    <v-app-bar
      fixed
      app
      height="100px"
      dark
      color="black"
      class="pl-10"
      id="header"
    >
      <router-link to="/home" class="logo-home">
        <v-img class="mx-2" :src="require('@/assets/images/logo.svg')"></v-img>
      </router-link>

      <v-card color="white" class="rounded-card pa-2" flat width="370px">
        <v-text-field
          max-height="6"
          max-width="10"
          single-line
          color="black"
          class="custom-placeholder-color custom-label-color pl-2 pr-4"
          prepend-icon="mdi-magnify mdi-dark"
          hide-details="auto"
          clearable
          label="¿Que Type Beat buscas?"
          placeholder="Rap, Trap, Rock, Reggae..."
        >
        </v-text-field>
      </v-card>

      <!-- spacer -->
      <v-spacer></v-spacer>

      <!-- toolbar -->  
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn class="" color="black" v-for="item in menu" :key="item.icon" :to="item.url">{{
          item.title
        }}</v-btn>
         <!-- v-if="rol"  -->
        <v-btn v-if="$store.state.user.rol === 'admin'" color="black" @click="logoutClick"> Admin </v-btn>
        <v-btn  color="black" @click="logoutClick"> Logout </v-btn>
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
import { mapActions } from "vuex";
import auth from "@/services/auth";

export default {
  data() {
    return {
      checkAdmin: false,
      drawer: false,
      group: null,
      menu: [
        {
          title: "Home",
          url: "/home",
        },
        {
          title: "Beats",
          url: "/beats",
        },
        {
          title: "Mis Beats",
          url: "/mybeats",
        },
        {
          title: "Pedidos",
          url: "/mispedidos",
        },
        {
          title: "Subir Beat",
          url: "/vender",
        },
        {
          title: "Carrito",
          url: "/carrito",
        },
        {
          title: "Mi Perfil",
          url: "/perfil",
        },
        {
          title: "Registrarse",
          url: "/registro",
        },
        {
          title: "Iniciar sesión",
          url: "/login",
        },
        // {
        //   title: "Logout",
        //   url: "/logout",
        // },
      ],
    };
  },

  methods: {
    ...mapActions(["vuexGetUser"]),

    //  checkUserAdmin(){
    //   console.log("rol ", this.$store.state.user.rol);
    //   // this.checkAdmin = this.$store.state.user.rol == "admin" ? true : false;
    //   return this.$store.state.user.rol == "admin" ? true : false;
    // },

    checkUserLogged() {
      console.log('checkUserLogged');
      let id = auth.getLocalStorage("userId");
      if (id == null) {
        alert("null");
        this.$router.push({ name: "login" });
        this.$store.commit("setUser", {});
      } else {
        this.vuexGetUser(id);
      }
    },

    logoutClick() {
      auth.closeSession();
      this.$store.commit("setUser", {});
      this.$router.push({ name: "login" });
    },
  },

  // beforeMount() {
  // },
  // watch:{
  //   $route (to, from){
  //   }
  // }

  async created() {
    this.checkUserLogged();
  },

  // async beforeMount() {
  //    this.checkUserAdmin();
  // },
  
};
</script>

<style>
.v-btn--active  {
  font-size: 18px !important;
}

a.v-btn--active.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--router.theme--dark.v-size--default.black {
    border-radius: 50px;
    color: black !important;
    background-color: rgb(255, 255, 255) !important;
    padding-top: 10p;
}

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

.rounded-card {
  border-radius: 50px !important;
}
</style>