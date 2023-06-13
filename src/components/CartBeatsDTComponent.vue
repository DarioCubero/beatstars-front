<template>
	<v-data-table
		dark
		:headers="headers"
		:items="beatsCustom"
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
	import Api from "@/services/api";
	import moment from "moment";

	export default {
		props: {
			idUser: Number,
		},
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
			beats: [],
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
			console.log("this.idUser...", this.idUser);
			if (this.idUser) {
				this.beats = await Api.getUserBeats(this.idUser);
			} else {
				this.beats = await Api.getBeats();
			}

			console.log(this.beats);

			if (this.beats) {
				await this.beats.forEach(async (x) => {
					// DTO BEAT OBJECT
					let obj = {};
					obj["id"] = x.id;
					obj["nombre"] = x.nombre;
					obj["tipo"] = x.tipo;
					obj["precio"] = x.precio;
					obj["dateCreated"] = this.dateTime(x.dateCreated);
					this.beatsCustom.push(obj);
				});
			}
		},

		methods: {
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
				if (precio <= 100) return "#FFA900";
			},

			deleteItem(item) {
				this.editedIndex = this.beatsCustom.indexOf(item);
				this.beatDelete = { id: item.id, name: item.nombre };
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				console.log("deleteItemConfirm");
				this.beatsCustom.splice(this.editedIndex, 1);
				Api.deleteBeat(this.beatDelete["id"]);
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
