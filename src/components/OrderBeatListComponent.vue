<template>
  <v-row no-gutters>
    <v-col
      v-for="(beat, index) in pedidoBeatsList"
      :key="index"
      cols="12"
      sm="12"
      md="4"
      lg="3"
    >
      <BeatCard
        class="ml-5"
        :id="beat.id"
        :nombre="beat.nombre"
        :tipo="beat.tipo"
        :precio="beat.precio"
        :premium="premium(beat.premium)"
        :dateCreated="dateTime(beat.dateCreated)"
        imageUrl="https://random.imagecdn.app/500/150"
         :myBeats="true"
      />
    </v-col>
  </v-row>
</template>

<script>
import Api from "@/services/api";
import moment from "moment";
import BeatCard from "@/components/BeatCardComponent.vue";

export default {

  components: {
    BeatCard,
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

  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    metodoPago(check) {
      return check ? "PayPal" : "Tarjeta"; // false: Paypal
    },
    premium(check) {
      return check ? "Premium" : "Estándar";
    },
  },
};
</script>
