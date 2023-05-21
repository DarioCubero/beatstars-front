<template>
  <v-card dark>
    <v-navigation-drawer
      dark
      v-model="drawer"
       permanent
    >

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
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
        { title: "Beats", icon: "mdi-album" },
        { title: "Pedidos", icon: "mdi-list-box" },
        { title: "Usuarios", icon: "mdi-account-group-outline" },
      ],
    };
  },
};
</script>

<style>
</style>