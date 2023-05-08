<template>
  <div id="beats">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container fluid class="pa-10">
        <h1 class="text-left">
          <v-icon style="font-size: 2.5rem; margin-left: 160px"
            >mdi-album mdi-light mdi-light</v-icon
          >Detalle Pedido
        </h1>
        <h3>ID: {{ pedidoSelected.id }}</h3>
        <OrderBeatListComponent /> <!-- :message="alertObject.message" -->
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import OrderBeatListComponent from "@/components/OrderBeatListComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
import Api from "@/services/api";

export default {
  name: "beats-view",

  components: {
    OrderBeatListComponent,
    Header,
    Footer,
  },

  data() {
    let idPedidoSelected = this.$route.params.id;

    return {
      idPedidoSelected,
      pedidoSelected: {},
      pedidoBeatsList: [],
    };
  },

  async created() {
    this.pedidoSelected = await Api.getPedido(this.idPedidoSelected);
    this.pedidoBeatsList = await Api.getPedidoBeats(this.idPedidoSelected);
    console.log("Pedido detail", this.pedidoSelected);
    console.log("pedidoBeatsList ", this.pedidoBeatsList);
  },
};
</script>

<style scoped>
</style>
