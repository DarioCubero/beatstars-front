<template>
  <v-card height="107px" color="#f52626" class="py-3">
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

      <v-form ref="form" @submit.prevent="validate">
        <v-card color="white" class="rounded-card pa-2" flat width="370px">
          <v-row no-gutters>
            <v-col btn cols="12" lg="1" md="1" sm="1">
              <a type="submit">
                <v-icon class="pl-3">mdi-magnify mdi-dark</v-icon>
              </a>
            </v-col>

            <v-col cols="12" lg="11" md="11" sm="11">
              <!-- v-click-outside="onClickOutside" -->
              <v-text-field
                v-model="beatNameFilter"
                label="¿Qué estás buscando?"
                :rules="[rules.required]"
                max-height="6"
                max-width="10"
                single-line
                color="black"
                class="ml-3 custom-placeholder-color custom-label-color pl-2 pr-4"
                hide-details="auto"
                clearable
                placeholder="Nombre del Beat..."
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-form>

      <!-- spacer -->
      <v-spacer></v-spacer>

      <!-- toolbar -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          class=""
          color="black"
          v-for="item in menu"
          :key="item.icon"
          :to="item.url"
          >{{ item.title }}</v-btn
        >        
        
        
        <!-- v-if="rol"  -->
        <v-btn v-if="$store.state.user.rol === 'admin'" color="black" to="/admin"> Admin </v-btn>
        <v-btn color="black" @click="logoutClick"> Logout </v-btn>
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
// import api from "@/services/api";

export default {
  name: 'HeaderComponent',
  
  data() {
    this.created();

    return {
      beatNameFilter: "",
      checkAdmin: false,
      drawer: false,
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
          url: "/mis-beats",
        },
        {
          title: "Pedidos",
          url: "/pedidos",
        },
        {
          title: "Subir Beat",
          url: "/subir-beat",
        },
        {
          title: "Carrito",
          url: "/carrito",
        },
        {
          title: "Mi Perfil",
          url: "/perfil",
        },
        // {
        //   title: "Registrarse",
        //   url: "/registro",
        // },
        // {
        //   title: "Iniciar sesión",
        //   url: "/login",
        // },
        // {
        //   title: "Logout",
        //   url: "/logout",
        // },
      ],
      rules: {
        required: (value) => !!value,
      },
    };
  },

  methods: {
    ...mapActions(["vuexGetUser", "vuexCheckUserLogged"]), //carga el state del usuario

    created() {
      this.vuexCheckUserLogged();
      if (!this.$store.state.isLogged){
        console.info('Acceso restringido. Debes logearte primero.');
        this.$router.push({ name: "login" });
        this.$store.commit("setUser", {});
      }
      else {
        console.log('Usuario almacenado en State Vuex.');
        this.vuexGetUser(this.$store.state.user.id); //get id usuario en el state
      }
    },

    async validate() {
      if (await this.$refs.form.validate()) {
        this.$router.push({
          name: "beats",
          query: { name: this.beatNameFilter },
        });

        this.$refs.form.reset();
      } else {
        console.error("Búsqueda de Beat no válida: debes escribir un nombre.");
      }
    },

    // checkUserLogged() {
    //   console.log("checkUserLogged()...");
    //   let id = auth.getLocalStorage("userId");
    //   if (id == null) {
    //     alert("null");
    //     this.$router.push({ name: "login" });
    //     this.$store.commit("setUser", {});
    //   } else {
    //     this.vuexGetUser(id);
    //   }
    // },

    logoutClick() {
      auth.closeSession();
      this.$store.commit("setUser", {});
      this.$router.push({ name: "login" });
      this.vuexCheckUserLogged();
      console.log('Logout --> Close sesion, clean states & localStorage');
    },

    // onClickOutside() {
    //   //Limpiamos el error del required en el searchBeatByName
    //   this.$refs.form.resetValidation();
    // },

    // async created() {
    //   console.log("checkUserLogged()...");
    //   this.checkUserLogged();
    // },

  },
};
</script>

<style>
/* Intento de quitar el fondo gris cuando clicas */
/* .v-toolbar__items > a:active{
  background-color: green !important;
} */

.v-toolbar__items a.v-btn.v-btn--is-elevated:hover {
  border-radius: 50px;
  color: rgb(245, 38, 38) !important;
}

.v-btn--active {
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

.v-toolbar__items {
  padding: 27px;
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
  /* opacity: 0.3; */
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