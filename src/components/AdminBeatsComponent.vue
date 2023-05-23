<template>
	<v-data-table
		dark
		:headers="headers"
		:items="beatsCustom"
		item-value="id"
		class="elevation-1 mx-auto">

		<!-- COLOR PRECIO -->
		<template v-slot:[`item.precio`]="{ item }">
			<v-chip :color="getColor(item.precio)">
				{{ item.precio }}
			</v-chip>
		</template>

		<!-- ACTIONS -->
		<template v-slot:[`item.actions`]="{ item }">
			<v-icon class="me-2" @click="beatDetails(item.id)"
				>mdi-eye mdi-light</v-icon
			>
			<v-icon class="me-2" @click="editItem(item.id)"
				>mdi-pencil mdi-light</v-icon
			>
			<v-icon class="me-2" @click="deleteItem(item.id)">
				mdi-delete mdi-light</v-icon
			>
		</template>

		<!-- DIALOG DELETE -->
		<v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
				<v-card-title class="text-h5"
					>Are you sure you want to delete this item?</v-card-title
				>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
					<v-btn color="blue darken-1" text @click="deleteItemConfirm"
						>OK</v-btn
					>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</v-data-table>
</template>

<script>
	// import { mapActions } from "vuex";
	import Api from "@/services/api";
	import moment from "moment";

	export default {
		data: () => ({
			dialogDelete: false,
			itemsPerPage: 5,
			headers: [
				{
					text: "ID",
					align: "start",
					sortable: false,
					value: "id",
				},
				{ text: "Nombre", value: "nombre" },
				{ text: "Tipo", value: "tipo" },
				{ text: "Precio(€)", value: "precio" },
				{ text: "DateCreated", value: "dateCreated" },
				{ text: "Detalle", value: "actions", sortable: false },
			],
			beats: [],
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

		methods: {
			beatDetails(beatId) {
				this.$router.push({ name: "beat", params: { id: beatId } });
			},

			dateTime(value) {
				return moment(value).format("YYYY-MM-DD");
			},

			editItem(idBeat) {
				console.log(idBeat);
				this.dialog = true;
				// this.editedIndex = this.desserts.indexOf(item);
				// this.editedItem = Object.assign({}, item);
			},

			deleteItem(idBeat) {
				console.log(idBeat);
				this.dialogDelete = true;
				// this.editedIndex = this.beatsCustom.indexOf(item);
				// this.editedItem = Object.assign({}, item);
			},

			deleteItemConfirm() {
				console.log("deleteItemConfirm");
				this.closeDelete();
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			save() {
				alert("xxx");
				if (this.editedIndex > -1) {
					Object.assign(this.desserts[this.editedIndex], this.editedItem);
				} else {
					this.desserts.push(this.editedItem);
				}
				this.close();
			},

			getColor(precio) {
				if (precio <= 10) return "pink";
				if (precio <= 20) return "green";
				if (precio <= 35) return "blue";
				if (precio < 60) return "purple";
				if (precio <= 80) return "orange";
				if (precio <= 100) return "yellow";
			},
		}, // END METHODS

		async beforeCreate() {
			this.beats = await Api.getBeats();
			console.log(this.beats);
			await this.beats.forEach(async (x) => {
				let obj = {};
				obj["id"] = x.id;
				obj["nombre"] = x.nombre;
				obj["tipo"] = x.tipo;
				obj["precio"] = x.precio;
				obj["dateCreated"] = this.dateTime(x.dateCreated);
				this.beatsCustom.push(obj);
			});
		},
	};
</script>

<style lang="scss" scoped></style>
