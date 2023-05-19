<template>

  <table
    class="table-responsive bordered highlight centered hoverable z-depth-2"
    v-show="orders.length"
  >
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">
          {{ column }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(order, index) in this.orders"
        :key="index"
      >
        <td>
          {{ order.id }}
        </td>
        <td>
          {{ dateTime(order.dateCreated) }}
        </td>
        <td>{{ order.total }}€</td>
        <td>{{ metodoPago(order.metodoPago) }}</td>
        <td>{{ numBeatsList[index] }}</td>
        <td style="width: 18%">
          <v-btn color="black" size="x-large"> </v-btn>
          <a @click="orderDetail(order.id, numBeatsList[index])"><v-icon>mdi-eye</v-icon></a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import { mapActions } from "vuex";
import Api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      numBeatsList: [],
      beatNameFilter: "",
      orders: [],
      columns: [
        "ID",
        "Fecha",
        "Precio",
        "Método de pago",
        "Nº Beats",
        "Detalle",
      ],
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
      this.$router.push({ name: "pedido", params: { id: orderId, numBeats: numBeats} });
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
  },
  computed: {
    // a computed getter
    countNumberOfBeats() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  },

  async created() {
    this.orders = await Api.getPedidos();

    // count Number of Beats
    await this.orders.forEach(async (order) => {
     const resultado = await Api.getPedidoBeats(order.id);
     this.numBeatsList.push(Object.keys(resultado).length);
    });
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