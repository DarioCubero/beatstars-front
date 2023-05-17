<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    item-value="id"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
// import { mapActions } from "vuex";
import Api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Fecha", align: "end", key: "dateCreated" },
        { title: "Total(€)", align: "end", key: "total" },
        { title: "Método de pago", align: "end", key: "metodoPago" },
       /*  { title: "Nº Beats", align: "end", key: "numBeats" }, */
        { title: "Detalle" },
      ],
      numBeatsList: [],
      beatNameFilter: "",
      orders: [],
    };
  },

  props: {
    // nombre: String,
  },

  methods: {
    metodoPago(check) {
      return check ? "PayPal" : "Tarjeta"; // false: Paypal
    },
    orderDetail(orderId, numBeats) {
      this.$router.push({
        name: "pedido",
        params: { id: orderId, numBeats: numBeats },
      });
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
  },
  computed: {
    // a computed getter
    countNumberOfBeats() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? "Yes" : "No";
    },
  },

  async beforeCreate() {
    this.orders = await Api.getPedidos();
    // count Number of Beats
    await this.orders.forEach(async (order) => {
      const resultado = await Api.getPedidoBeats(order.id);
      this.numBeatsList.push(Object.keys(resultado).length);
    });
    console.log("getPedidos ", this.orders);
  },

};
</script>

<style lang="scss" scoped>
// .v-card__text,
// .v-card__title {
//   text-overflow: ellipsis !important ;
//   overflow: hidden !important ;
//   white-space: nowrap !important ;
//   display: inherit;

// display: -webkit-box;
// -webkit-line-clamp: 2; /* number of lines to show */
// line-clamp: 2;
// -webkit-box-orient: vertical;
// overflow: hidden;
// max-height: 5em;
// line-height: 1.8em;
// }
</style>