<template>
  <v-data-table
    :headers="headers"
    :items="ordersCustom"
    item-value="id"
    class="elevation-1 mx-auto mt-10"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="orderDetail(item.id)">mdi-eye</v-icon>
    </template>
  </v-data-table>
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
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Fecha", value: "dateCreated" },
        { text: "Total(€)", value: "total" },
        { text: "Método de pago", value: "metodoPago" },
        { text: "Nº Beats", value: "numBeats" },
        { text: "Detalle", value: "actions", sortable: false },
      ],
      numBeats: [],//{IDORDER:NUMBEATS}
      beatNameFilter: "",
      orders: [],
      ordersCustom: [],
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
    async countOrderBeats(orderId) {
      console.log('countOrderBeats orderId', orderId);
      const resultado = await Api.getPedidoBeats(orderId);
      this.numBeats.push({orderId:Object.keys(resultado).length});
      console.log(this.numBeats);
    },
  },

  async beforeMount() {
    this.orders = await Api.getPedidos();
    this.orders.forEach((x) => {
      let obj = {};
      obj["id"] = x.id;
      obj["dateCreated"] = this.dateTime(x.dateCreated);
      obj["total"] = x.total;
      obj["metodoPago"] = this.metodoPago(x.metodoPago);
      this.countOrderBeats(x.id);
      obj["numBeats"] = this.numBeats[x.id];
      this.ordersCustom.push(obj);
    });

  console.log(this.numBeats);

  },
};
</script>

<style lang="scss" scoped>
</style>