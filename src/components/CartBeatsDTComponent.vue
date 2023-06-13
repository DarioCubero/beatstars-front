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

    <!-- DIALOG -->
		<template v-slot:top>
			<v-dialog v-model="dialogDelete" max-width="500px">
				<v-card>
					<v-card-title class="text-h5"
						>Are you sure you want to delete from Cart
						{{
							" with ID '" +
							beatDelete["id"] +
							"' and Name '" +
							beatDelete["name"] + "'"
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
			beatDelete: { id: "", beatName: "" },
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
				this.show = true;
				this.beatDelete = { id: item.id, name: item.nombre };
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				console.log("deleteItemConfirm");
				this.beatsCustom.splice(this.editedIndex, 1);
				this.vuexDeleteBeatFromCart(this.beatDelete["id"]);
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

		},
	};
</script>
