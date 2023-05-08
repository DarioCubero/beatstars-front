<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container fluid class="pa-10">
        <h1 class="text-left">
          <v-icon style="font-size: 2.5rem; margin-left: 160px"
            >mdi-list-box mdi-light mdi-light</v-icon
          >Pedidos
        </h1>
        <OrderList></OrderList>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import OrderList from "@/components/OrdersDataTableComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "pedidos-view",

  components: {
    Header,
    Footer,
    OrderList,
  },
};
</script>

<style scoped>
</style>
