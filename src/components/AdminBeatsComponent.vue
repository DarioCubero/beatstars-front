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

		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>· Beats ·</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
							<v-icon class="me-2" @click="beatDetails(item.id)"
								>mdi-plus-circle mdi-light</v-icon
							>
							New Type Beat
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">{{ formTitle }}</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<v-text-field label="Type Beat"></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
							<v-btn color="blue darken-1" text @click="save"> Save </v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5"
							>Are you sure you want to delete
							{{
								" with ID " +
								beatDelete["id"] +
								" and Name " +
								beatDelete["name"]
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
			<v-icon class="me-2" @click="beatDetails(item.id)"
				>mdi-eye mdi-light</v-icon
			>
			<v-icon @click="editItem(item)" class="me-2">
				mdi-pencil mdi-light
			</v-icon>
			<v-icon @click="deleteItem(item)" class="me-2">
				mdi-delete mdi-light
			</v-icon>
		</template>

		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize"> Reset </v-btn>
		</template>
	</v-data-table>
</template>

<script>
	import Api from "@/services/api";
	import moment from "moment";
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

		created() {
			this.initialize();
		},

		async beforeCreate() {
			this.beats = await Api.getBeats();
			console.log(this.beats);
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

			initialize() {},

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
