<template>
<v-app>
  <v-card dark>
    <v-navigation-drawer
      dark
      v-model="drawer"
       permanent
    >

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.path" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>

  
  <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  props: {
    message: String,
    typeAlert: String,
  },

  data() {
    return {
      drawer: true,
      items: [
        { title: "Beats", icon: "mdi-album", path: '/beats' },
        { title: "Pedidos", icon: "mdi-list-box", path: '/pedidos' },
        { title: "Usuarios", icon: "mdi-account-group-outline", path: '/perfil' },
      ],
    };
  },
};
</script>

<style>
</style>