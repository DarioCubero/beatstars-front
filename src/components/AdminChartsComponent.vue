<template>
	<v-container fluid class="text-left pa-10">
		<!-- MARKETING -->
		<v-row class="mt-5 py-15" id="marketing1">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-row>
					<!-- content -->
					<v-col class="card" cols="12" lg="8" md="8" sm="8">
						<h1 class="text-uppercase">
							Release Your Music To All Major Digital Music Platforms
						</h1>
						<div class="text-h5">
							Keep
							<span style="color: #6633ff" class="text-h4 font-weight-bold"
								>100% of the earnings</span
							>
							we collect for you!
						</div>
					</v-col>
					<v-col class="card" cols="12" lg="12" md="12" sm="12">
						<v-btn
							class="black--text"
							size="x-large"
							color="#6633FF"
							to="/beats">
							<span class="white--text">Explorar Beats</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<!-- end row -->
	</v-container>
</template>

<script>
	import Api from "@/services/api";
	export default {
		props: {
			idUser: Number,
		},
		data: () => ({
			dialogDelete: false,
			itemsPerPage: 5,
			numBeats: [], //{IdOrder:xxx, numBeats: xxx}
			beats: [],
			ordersCustom: [],
			orderDelete: { id: "", beatName: "" },
		}),

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
					obj["dateCreated"] =   x.dateCreated
          // this.dateTime(x.dateCreated);
					obj["total"] = x.total;
					obj["metodoPago"] = x.metodoPago;
          // this.metodoPago(x.metodoPago);
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
			countOrderBeats(orderId) {
				//orderId: xxx, numBeats: xxx
				console.log("countOrderBeats orderId", orderId);
				let obj = this.numBeats.find((x) => x.orderId === orderId);
				return obj["numBeats"];
			},
		},
	};
</script>
