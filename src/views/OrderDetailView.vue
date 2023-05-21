<template>
  <div id="beats">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container fluid class="pa-10">

        <h1 class="text-left">
        <a @click="$router.go(-1)"><span span class="text-left"><v-icon style="font-size: 2.5rem"
              >mdi-arrow-left-thick mdi-light </v-icon></span></a>

            <v-icon style="font-size: 2.5rem; margin-left: 130px"
              >mdi-album mdi-light</v-icon
            >Detalle Pedido
        </h1>






        <h3>ID: {{ pedidoSelected.id }}</h3>
        <h3>Nº Beats: {{ this.numBeats }}</h3>
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
    console.log(this.$route.params.id);
    

    return {
       numBeats: this.$route.params.numBeats,
      idPedidoSelected,
      pedidoSelected: {},
      pedidoBeatsList: [],
    };
  },

  async created() {
    this.pedidoSelected = await Api.getPedido(this.idPedidoSelected);
    this.pedidoBeatsList = await Api.getPedidoBeats(this.idPedidoSelected);
  },
};
</script>

<style scoped>
</style>
