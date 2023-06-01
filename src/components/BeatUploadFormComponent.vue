<template>
	<v-sheet max-width="800" class="mx-auto mt-6">
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			dark
			class="elevation-5 px-5 py-7">
			<v-row style="height: 10px; margin-bottom: 10px">
				<v-progress-linear
					style="opacity: 0 !important"
					:active="formLoading"
					indeterminate
					color="blue"></v-progress-linear>
			</v-row>
			<v-row class="">
				<v-col cols="2"> </v-col>
				<v-col cols="8">
					<div class="headline ma-3" style="color: white !important">Datos</div>
				</v-col>
			</v-row>

			<v-row class="justify-center">
				<!-- NOMBRE BEAT -->
				<v-col cols="12" md="6" class="mb-0">
					<v-text-field
						hide-details
						dark
						label="Nombre del Beat"
						v-model="beat.nombre"
						outlined
						prepend-inner-icon="mdi-account-arrow-right-outline mdi-light"
						:rules="[rules.required]" />
				</v-col>
			</v-row>

			<v-row class="justify-center">
				<!-- TYPEBEAT -->
				<v-col cols="12" md="6">
					<v-text-field
						hide-details
						dark
						outlined
						label="TypeBeat"
						v-model="beat.tipo"
						prepend-inner-icon="mdi-format-list-bulleted-square mdi-light"
						:rules="[rules.required]" />
				</v-col>
			</v-row>

			<!-- PREMIUM -->
			<v-row class="justify-center mt-5" no-gutters>
				<v-col cols="12" md="6">
					<v-card dark outlined>
						<v-switch
							outlined
							v-model="beat.premium"
							label="Premium"
							color="#FFD700"
							@change="switchPremium($event)"></v-switch>
					</v-card>
				</v-col>
			</v-row>

			<!-- PRECIO -->
			<v-row class="justify-center" no-gutters>
				<v-col cols="12" md="6">
					<v-card dark outlined>
						<v-row class="mt-5" justify="center">
							<v-col class="text-center">
								<span class="font-weight-bold"
									><v-icon>mdi-credit-card-outline </v-icon>Precio:
								</span>
							</v-col>
							<v-col class="text-left mb-5">
								<span
									class="text-h2 font-weight-light"
									v-text="beat.precio"></span>
								<span class="subheading font-weight-light me-1">€</span>
							</v-col>
						</v-row>

						<v-slider
							v-model="beat.precio"
							:color="color"
							track-color="grey"
							:min="minValue"
							:max="maxValue"
							:step="5">
						</v-slider>
					</v-card>
				</v-col>
			</v-row>

			<!-- botones -->
			<v-row class="justify-center">
				<v-col cols="4">
					<!-- deshabilitar boton en caso de no ser valido -->
					<!--  v-if="0" -->
					<v-btn color="#0F7DD1" class="pa-6 ma-4" @click="validate"
						><v-icon style="font-size: 2rem">mdi-upload</v-icon>Subir</v-btn
					>
				</v-col>
			</v-row>
		</v-form>
	</v-sheet>
</template>

<script>
	import auth from "@/services/auth";
	import Api from "@/services/api";
	let currentDate = new Date();

	export default {
		name: "perfil-view",
		props: {
			id: {
				type: Number,
				default: null,
			},
    // cleanForm: Boolean
		},

		beforeMount() {
			if (this.id) {
				console.log("beforeMount();");
				this.infoBeat();
			}
		},

		watch: {
			selected() {
				this.search = "";
			},
		},

		data: () => ({
			idUserLocal: auth.getLocalStorage("userId"),
			minValue: 5,
			maxValue: 35,
			colorSwitch: "red",
			beat: {
				nombre: "",
				premium: false,
				tipo: "",
				dateCreated: currentDate,
				precio: 20,
			},
			valid: false,
			formLoading: false,
			rules: {
				precio: (v) => !isNaN(parseFloat(v)) || "isNaN.",
				nombre: [(v) => v.length < 15 || "Max 15 characters"],
				userNameMaxChar: (v) => v.length < 20 || "Max 20 characters",
				required: (v) => !!v || "Required.",
				// poner rango hasta 100 decimal
				premiumTrue: (v) => v.length < 20 || "Max 20 characters",
			},

			alert: false,
			confirm: false,
			prompt: false,
			address: "",

			beforeShow: "No event captured yet",
			show: "No event captured yet",
			beforeHide: "No event captured yet",
			hide: "No event captured yet",

			model: true,
			// TYPEBEATS CHIP ITEMS/
			items: [
				{
					text: "Rap",
					icon: "mdi-nature",
				},
				{
					text: "Rock",
					icon: "mdi-glass-wine",
				},
				{
					text: "Reggae",
					icon: "mdi-calendar-range",
				},
				{
					text: "Dark",
					icon: "mdi-map-marker",
				},
				{
					text: "Chill",
					icon: "mdi-bike",
				},
				{
					text: "Agresive",
					icon: "mdi-bike",
				},
			],
		}),

		computed: {
			color() {
				if (this.beat.precio <= 10) return "pink";
				if (this.beat.precio <= 20) return "green";
				if (this.beat.precio <= 35) return "blue";
				if (this.beat.precio < 60) return "purple";
				if (this.beat.precio < 80) return "orange";
				if (this.beat.precio <= 100) return "yellow";
				return "red";
			},

			allSelected() {
				return this.selected.length === this.items.length;
			},

			categories() {
				const search = this.search.toLowerCase();

				if (!search) return this.items;

				return this.items.filter((item) => {
					const text = item.text.toLowerCase();

					return text.indexOf(search) > -1;
				});
			},

			selections() {
				const selections = [];

				for (const selection of this.selected) {
					selections.push(selection);
				}

				return selections;
			},
		},

		methods: {
			async infoBeat() {
				console.log("infoBeat()");
				this.beatSelected = await Api.getBeat(this.id);
				console.log(this.beatSelected);
				this.beat.nombre = this.beatSelected.nombre;
				this.beat.tipo = this.beatSelected.tipo;
				this.switchPremium(this.beatSelected.premium);
				this.beat.premium = this.beatSelected.premium;
				this.beat.precio = this.beatSelected.precio;
			},

			toggle() {
				this.isPlaying = !this.isPlaying;
			},

			switchPremium(status) {
				if (!status) {
					this.beat.precio = 20;
					this.minValue = 5;
					this.maxValue = 35;
					this.colorSwitch = "red";
				} else {
					this.beat.precio = 70;
					this.minValue = 40;
					this.maxValue = 100;
					this.colorSwitch = "FFD700";
				}
			},

			validate() {
				if (this.$refs.form.validate()) {
					this.formLoading = true;
					// console.log(this.user); //cada usuario se asignará a la creación del beat
					// console.log(this.beat);
					// this.beat.id=5;
					// this.beat.dateCreated = "20/05/2020";
					Api.createBeat(this.beat);
					setTimeout(() => {
						this.formLoading = false;
					}, 2000);
				}
			},

			reset() {
				this.$refs.form.reset();
			},

			resetValidation() {
				this.$refs.form.resetValidation();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.v-form {
		background-color: #222222;
	}

	.v-card {
		padding: 0px;
		padding: 0px 30px 0px 30px;
	}

	.v-slider--horizontal .v-slider__track-container {
		height: 5px !important;
	}

	.v-slider__track-container {
		height: 10px !important;
	}
</style>
