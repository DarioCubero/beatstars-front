<template>
	<v-data-table
		dark
		:headers="headers"
		:items="usersCustom"
		sort-by="calories"
		class="elevation-1">
		<template v-slot:top>
			<v-toolbar flat style="height: 100px !important">
				<v-toolbar-title style="width: 150px !important">Usuarios</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>

				<!-- left email search form -->
				<v-form ref="formAdminUsers" @submit.prevent="validateAdminUsers" novalidate="true">
					<v-row>
						<!-- Buscador -->
						<v-col
							style="
								min-width: 50px !important;
								max-width: 300px !important;
								max-height: 150px !important;
							"
							cols="12"
							lg="5"
							md="5"
							sm="5">
							<v-card
								color="white"
								class="rounded-card pa-2"
								min-width="200px"
								max-width="3  00px">
								<v-row no-gutters>
									<!-- lupa -->
									<v-col btn cols="12" lg="1" md="1" sm="1">
										<a v-on:click="validateAdminUsers">
											<v-icon class="pl-3">mdi-magnify mdi-dark</v-icon>
										</a>
									</v-col>
									<!-- buscador -->
									<v-col cols="12" lg="11" md="11" sm="11">
										<v-text-field
											@keydown.enter.prevent="validateAdminUsers"
											v-model="searchString"
											label="Buscar por Email"
											max-height="6"
											max-width="10"
											single-line
											color="black"
											class="ml-3 custom-placeholder-color custom-label-color pl-2 pr-4"
											hide-details="auto"
											clearable
											placeholder="Email del Usuario..."></v-text-field>
									</v-col>
								</v-row>
							</v-card>
						</v-col>

						<!-- sort-->
						<v-col cols="12" lg="3" md="3" sm="3" class="ml-3">
							<!-- DESCENDENTE -->
							<v-row
								style="
									min-width: 500px !important;
									max-width: 300px !important;
									max-height: 20px;
								">
								<div>
									<v-simple-checkbox
										color="green"
										@click="sortOrderCheckbox()"
										v-model="sortOrderValue"></v-simple-checkbox>
								</div>
								<div>
									<span class="white--text"
										><v-icon>mdi-sort-descending mdi-light</v-icon>DESC
									</span>
								</div>
							</v-row>

							<!-- ORDENAR POR -->
							<v-row
								style="
									min-width: 150px !important;
									max-width: 300px !important;
									max-height: 10px;
								">
								<v-col
									cols="12"
									lg="12"
									md="12"
									sm="12"
									style="padding-left: 0px">
									<v-select
										dark
										color="#0F7DD1"
										v-model="sortBy"
										:items="items"
										item-text="item"
										item-value="item"
										label="Ordenar por:"
										single-line>
									</v-select>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-form>

				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5"
							>Are you sure you want to delete
							{{
								" with ID " +
								itemSelected["id"] +
								" and Name " +
								itemSelected["name"]
							}}?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="deleteItemConfirm()"
								>OK</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-dialog v-model="dialogReactivate" max-width="500px">
					<v-card>
						<v-card-title class="text-h5"
							>Are you sure you want to reactivate
							{{
								" with ID " +
								itemSelected["id"] +
								" and Name " +
								itemSelected["name"]
							}}?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="reactivateItemConfirm()"
								>OK</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-dialog v-model="dialogDeactivate" max-width="500px">
					<v-card>
						<v-card-title class="text-h5"
							>Are you sure you want to deactivate
							{{
								" with ID " +
								itemSelected["id"] +
								" and Name " +
								itemSelected["name"]
							}}?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="deactivateItemConfirm()"
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

			<v-icon
				v-if="item.activo && item.nombreCuenta != 'admin'"
				@click="deactivateItem(item)"
				class="me-2">
				mdi-account-cancel-outline mdi-light
			</v-icon>

			<v-icon
				v-if="!item.activo && item.nombreCuenta != 'admin'"
				@click="reactivateItem(item)"
				class="me-2">
				mdi-account-reactivate mdi-light
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
			dialogReactivate: false,
			dialogDeactivate: false,
			itemsPerPage: 5,
			// search
			sortBy: null,
			sortOrderValue: false,
			sortOrder: null,
			searchString: "",
			items: [{ item: "Email" }],
			headers: [
				{
					text: "ID",
					align: "start",
					value: "id",
				},
				{ text: "Nombre cuenta", value: "nombreCuenta" },
				{ text: "Email", value: "email" },
				{ text: "Saldo(€)", value: "cartera" },
				{ text: "Rol", value: "rol" },
				{ text: "Fecha", value: "dateCreated" },
				{ text: "Activo", value: "activo" },
				{ text: "Detalle", value: "actions", sortable: false },
			],
			users: [],
			usersCustom: [],
			itemSelected: { id: "", userName: "" },
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
				val || this.closeDialog();
			},
			$route(to, from) {
				alert(to, from);
			},
		},

		async beforeCreate() {
			this.users = await Api.getUsers();
			if (this.users) {
				this.formatCustomUsers(this.users);
			}
		},

		methods: {
			async formatCustomUsers(list) {
				this.usersCustom = [];
				await list.forEach(async (x) => {
					// DTO USER OBJECT
					let obj = {};
					obj["id"] = x.id;
					obj["nombreCuenta"] = x.nombreCuenta;
					obj["email"] = x.email;
					obj["cartera"] = x.cartera;
					obj["rol"] = x.rol;
					obj["dateCreated"] = this.dateTime(x.dateCreated);
					obj["activo"] = this.activo(x.activo);
					this.usersCustom.push(obj);
				});
			},

			sortOrderCheckbox() {
				if (this.sortOrderValue) {
					this.sortOrder = "desc";
				} else {
					this.sortOrder = null;
				}
			},

			async validateAdminUsers() {
				let sortBy = this.sortBy;
				let sortOrder = this.sortOrder;
				let searchString = this.searchString;
				if (sortBy || sortOrder || searchString) {
					console.log("sort - beats");
					console.log(
						"sortBy: " + sortBy,
						"sortOrder: " + sortOrder,
						"searchString: " + searchString
					);
					this.formatCustomUsers(
						await Api.getUsers(sortBy, sortOrder, searchString)
					);
				} else {
					console.log("full - beats");
					this.usersCustom = await Api.getUsers();
				}
			},

			userDetails(userId) {
				this.$router.push({ name: "admin-user", params: { id: userId } });
			},

			editItem(item) {
				this.$router.push({ name: "actualizar-usuario", params: { id: item.id } });
			},

			dateTime(value) {
				return moment(value).format("YYYY-MM-DD");
			},

			activo(value) {
				if(value){
          return "Si"
        }else{
          return  "No"
        }
			},

			deactivateItem(item) {
				this.editedIndex = this.usersCustom.indexOf(item);
				this.itemSelected = { id: item.id, name: item.nombreCuenta };
				this.dialogDeactivate = true;
				this.$forceUpdate();
			},

			reactivateItem(item) {
				this.editedIndex = this.usersCustom.indexOf(item);
				this.itemSelected = { id: item.id, name: item.nombreCuenta };
				this.dialogReactivate = true;
				this.$forceUpdate();
			},

			deleteItem(item) {
				this.editedIndex = this.usersCustom.indexOf(item);
				this.itemSelected = { id: item.id, name: item.nombreCuenta };
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				console.log("deleteItemConfirm");
				this.usersCustom.splice(this.editedIndex, 1);
				Api.deleteUser(this.itemSelected["id"]); //lo borra de la BBDD

				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
				this.closeDialog();
			},

			reactivateItemConfirm() {
				console.log("reactivateItemConfirm");

				let userFind = this.users.find((u) => u.id === this.itemSelected.id);
				userFind.activo = true;

				Api.updateUser(userFind.id, userFind);
				console.log(
					"Reactivado el usuario con nombre: " + userFind.nombreCuenta
				);
				window.location.reload();

				this.closeDialog();
			},

			deactivateItemConfirm() {
				console.log("deactivateItemConfirm");

				let userFind = this.users.find((u) => u.id === this.itemSelected.id);
				userFind.activo = false;

				Api.updateUser(userFind.id, userFind);
				console.log(
					"Desactivado el usuario con nombre: " + userFind.nombreCuenta
				);
				window.location.reload();
				this.closeDialog();
			},

			closeDialog() {
				this.dialogDelete = false;
				this.dialogReactivate = false;
				this.dialogDeactivate = false;
			},
		},
	};
</script>

<style>
.v-toolbar__content{
  height: 100px !important;
}
</style>


