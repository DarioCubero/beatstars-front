<template>
	<v-data-table
		dark
		:headers="headers"
		:items="this.beatsCustom"
		sort-by="calories"
		class="elevation-1">
		<!-- COLOR PRECIO -->
		<template v-slot:[`item.precio`]="{ item }">
			<v-chip :color="getColor(item.precio)">
				{{ item.precio }}
			</v-chip>
		</template>

		<!-- ACTIONS -->
		<template v-slot:[`item.actions`]="{ item }">
			<v-icon @click="deleteItem(item)" class="me-2">
				mdi-delete mdi-light
			</v-icon>
		</template>
	</v-data-table>
</template>

<script>
	import moment from "moment";
	import { mapActions } from "vuex";

	export default {
		data: () => ({
			dialog: false,
			dialogDelete: false,
			itemsPerPage: 5,
			headers: [
				{
					text: "ID",
					align: "start",
					value: "id",
				},
				{ text: "Nombre", value: "nombre" },
				{ text: "Tipo", value: "tipo" },
				{ text: "Precio(€)", value: "precio" },
				{ text: "DateCreated", value: "dateCreated" },
				{ text: "Detalle", value: "actions", sortable: false },
			],
			cartBeats: [],
			beatsCustom: [],
			editedIndex: -1,
		}),

		computed: {
			formTitle() {
				return this.editedIndex === -1 ? "New Item" : "Edit Item";
			},
		},

		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},

		async created() {
			this.cartBeats = this.$store.state.cart;
			if (this.cartBeats) {
				await this.cartBeats.forEach(async (x) => {
					// DTO BEAT OBJECT
					let obj = {};
					obj["id"] = x.id;
					obj["nombre"] = x.nombre;
					obj["tipo"] = x.tipo;
					obj["precio"] = x.precio;
					obj["dateCreated"] = this.dateTime(x.dateCreated);
					this.beatsCustom.push(obj);
				});
			} else {
				console.log("Carrito vacío");
			}
		},

		methods: {
			...mapActions(["vuexDeleteBeatFromCart"]),

			beatDetails(beatId) {
				this.$router.push({ name: "beat", params: { id: beatId } });
			},

			editItem(item) {
				this.$router.push({ name: "update-beat", params: { id: item.id } });
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
				this.editedIndex = this.beatsCustom.indexOf(item);
				this.beatsCustom.splice(this.editedIndex, 1);
				this.vuexDeleteBeatFromCart(item.id);
			},

		},
	};
</script>
