<template>
	<v-row>
    <v-col>
		<v-data-table
			dark
			:headers="headers"
			:items="ordersCustom"
			item-value="id"
			class="elevation-1 mx-auto">
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon @click="orderDetail(item.id)">mdi-eye mdi-light</v-icon>
			</template>
		</v-data-table>
    </v-col>
	</v-row>
</template>

<script>
	import Api from "@/services/api";
	import auth from "@/services/auth";
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
				numBeats: [], //{IdOrder:xxx, numBeats: xxx}
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
			orderDetail(orderId) {
				this.$router.push({
					name: "pedido",
					params: { id: orderId, numBeats: this.countOrderBeats(orderId) },
				});
			},
			dateTime(value) {
				return moment(value).format("YYYY-MM-DD");
			},

			countOrderBeats(orderId) {
				//orderId: xxx, numBeats: xxx
				console.log("countOrderBeats orderId", orderId);
				let obj = this.numBeats.find((x) => x.orderId === orderId);
				return obj["numBeats"];
			},
		},

		async beforeCreate() {
			this.orders = await Api.getUserPedidos(auth.getLocalStorage("userId"));

      if (this.orders){
			await this.orders.forEach(async (x) => {
				let obj = {};
				obj["id"] = x.id;
				obj["dateCreated"] = this.dateTime(x.dateCreated);
				obj["total"] = x.total;
				obj["metodoPago"] = this.metodoPago(x.metodoPago);

				const beatsPedido = await Api.getPedidoBeats(x.id);
				obj["numBeats"] = Object.keys(beatsPedido).length;
				this.numBeats.push({
					orderId: x.id,
					numBeats: Object.keys(beatsPedido).length,
				});
        
				this.ordersCustom.push(obj);
			});
      }


		},
	};
</script>
