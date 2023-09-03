<template>
	<v-data-table
		dark
		:headers="headers"
		:items="ordersCustom"
		sort-by="calories"
		class="elevation-1">
		<!-- COLOR PRECIO -->
		<template v-slot:top>
			<v-toolbar flat style="height: 100px !important">
				<v-toolbar-title style="width: 150px !important">Pedidos</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>

				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5"
							>Are you sure you want to delete
							{{
								" with ID " +
								orderDelete["id"] +
								" and Name " +
								orderDelete["name"]
							}}?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDelete"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="deleteItemConfirm()"
								>OK</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>

		<!-- ACTIONS -->
		<template v-slot:[`item.actions`]="{ item }">
			<v-icon class="me-2" @click="orderDetail(item.id)"
				>mdi-eye mdi-light</v-icon
			>
			<!-- <v-icon @click="editItem(item)" class="me-2">
				mdi-pencil mdi-light
			</v-icon> -->
			<v-icon @click="deleteItem(item)" class="me-2">
				mdi-delete mdi-light
			</v-icon>
		</template>
	</v-data-table>
</template>

<script>
	import Api from "@/services/api";
	import moment from "moment";
	export default {
		props: {
			idUser: Number,
		},
		data: () => ({
			dialogDelete: false,
			itemsPerPage: 5,
			numBeats: [], //{IdOrder:xxx, numBeats: xxx}
			headers: [
				{
					text: "Pedido",
					align: "start",
					value: "id",
				},
				{ text: "Fecha", value: "dateCreated" },
				{ text: "Total(€)", value: "total" },
				{ text: "Método de pago", value: "metodoPago" },
				{ text: "Usuario", value: "correoUsuario" },
				{ text: "Nº Beats", value: "numBeats" },
				{ text: "Detalle", value: "actions", sortable: false },
			],
			beats: [],
			ordersCustom: [],
			orderDelete: { id: "", beatName: "" },
			editedIndex: -1,
		}),

		computed: {
			formTitle() {
				return this.editedIndex === -1 ? "New Item" : "Edit Item";
			},
		},

		watch: {
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},

		async created() {
			if (this.idUser) {
				this.pedidos = await Api.getUserPedidos(this.idUser);
			} else {
				this.pedidos = await Api.getPedidos();
			}

			console.log(this.pedidos);

			if (this.pedidos) {
				await this.pedidos.forEach(async (x) => {
					// DTO BEAT OBJECT
					let obj = {};
					obj["id"] = x.id;
					obj["dateCreated"] = this.dateTime(x.dateCreated);
					obj["total"] = x.total;
					obj["metodoPago"] = this.metodoPago(x.metodoPago);
					obj["correoUsuario"] = x.correoUsuario;

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

		methods: {
			orderDetail(orderId) {
				this.$router.push({
					name: "pedido",
					params: { id: orderId, numBeats: this.countOrderBeats(orderId) },
				});
			},

			countOrderBeats(orderId) {
				//orderId: xxx, numBeats: xxx
				console.log("countOrderBeats orderId", orderId);
				let obj = this.numBeats.find((x) => x.orderId === orderId);
				return obj["numBeats"];
			},

			metodoPago(check) {
				return check ? "PayPal" : "Tarjeta"; // false: Paypal
			},

			editItem(item) {
				this.$router.push({ name: "actualizar-beat", params: { id: item.id } });
			},

			dateTime(value) {
				return moment(value).format("YYYY-MM-DD");
			},

			getColor(precio) {
				if (precio <= 10) return "pink";
				if (precio <= 20) return "green";
				if (precio <= 35) return "blue";
				if (precio < 60) return "purple";
				if (precio <= 80) return "orange";
				if (precio <= 100) return "amber accent-4";
			},

			deleteItem(item) {
				this.editedIndex = this.ordersCustom.indexOf(item);
				this.orderDelete = { id: item.id, name: item.nombre };
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				console.log("deleteItemConfirm");
				this.ordersCustom.splice(this.editedIndex, 1);
				Api.deleteOrder(this.orderDelete["id"]);
				this.closeDelete();
			},

			close() {
				this.dialog = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			save() {
				console.log("save");
				// if (this.editedIndex > -1) {
				//   Object.assign(this.desserts[this.editedIndex], this.editedItem)
				// } else {
				//   this.desserts.push(this.editedItem)
				// }
				this.close();
			},
		},
	};
</script>
