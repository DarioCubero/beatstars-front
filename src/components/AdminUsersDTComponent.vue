<template>
	<v-data-table
		dark
		:headers="headers"
		:items="usersCustom"
		sort-by="calories"
		class="elevation-1">
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Usuarios</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>

				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5"
							>Are you sure you want to delete
							{{
								" with ID " +
								userDelete["id"] +
								" and Name " +
								userDelete["name"]
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
			<v-icon class="me-2" @click="userDetails(item.id)"
				>mdi-eye mdi-light</v-icon
			>
			<v-icon @click="editItem(item)" class="me-2">
				mdi-pencil mdi-light
			</v-icon>
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
				{ text: "Nombre cuenta", value: "nombreCuenta" },
				{ text: "Email", value: "email" },
				{ text: "Cartera(€)", value: "cartera" },
				{ text: "Rol", value: "rol" },
				{ text: "Fecha registro", value: "dateCreated" },
				{ text: "Detalle", value: "actions", sortable: false },
			],
			users: [],
			usersCustom: [],
			userDelete: { id: "", userName: "" },
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
			$route(to, from) {
				alert(to, from);
			},
		},

		async beforeCreate() {
			this.users = await Api.getUsers();
			console.log(this.users);

			if (this.users) {
				await this.users.forEach(async (x) => {
					// DTO USER OBJECT
					let obj = {};
					obj["id"] = x.id;
					obj["nombreCuenta"] = x.nombreCuenta;
					obj["email"] = x.email;
					obj["cartera"] = x.cartera;
					obj["rol"] = x.rol;
					obj["dateCreated"] = this.dateTime(x.dateCreated);
					this.usersCustom.push(obj);
				});
			}
		},

		methods: {
			userDetails(userId) {
				this.$router.push({ name: "admin-user", params: { id: userId } });
			},

			editItem(item) {
				this.$router.push({ name: "update-user", params: { id: item.id } });
			},

			dateTime(value) {
				return moment(value).format("YYYY-MM-DD");
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
