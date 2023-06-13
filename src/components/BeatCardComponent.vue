<template>
	<v-card class="mx-auto my-12" max-width="374">
		<v-img height="250" :src="imageUrl"></v-img>

		<template slot="progress">
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate></v-progress-linear>
		</template>
		<div style="min-width: 0">
			<v-card-title class="justify-center">{{ nombre }}</v-card-title>

			<v-divider class="mx-4"></v-divider>
			<v-row class="">
				<v-col class="pa-3" cols="12" md="6" sm="6">
					<div class="my-4 text-subtitle-1 pa-2">{{ tipo }}</div>
				</v-col>

				<v-col class="pa-3" cols="12" md="6" sm="6">
					<div
						v-bind:class="getColor(precio)"
						class="my-4 text-subtitle-1 rounded-xl pa-2" style="color: white !important">
						{{ precio }}€
					</div>
				</v-col>
			</v-row>

			<v-card-text>
				<v-row>
					<v-col class="pa-0" cols="12" md="6" sm="6">
						<div class="grey--text ms-4">{{ dateCreated }}</div>
					</v-col>

					<v-col class="pa-0" cols="12" md="6" sm="6">
						<div class="grey--text ms-4">
							{{ premium }}
							<v-icon v-if="this.premium == 'Premium'"
								>mdi-star mdi-dark</v-icon
							>
						</div>
					</v-col>
				</v-row>

				<v-row class="pt-3">
					<v-col cols="12" md="6" sm="6">
						<v-icon style="font-size: 2rem" @click="beatDetails(id)"
							>mdi-eye mdi-dark</v-icon
						>
					</v-col>

					<v-col v-if="!myBeats" cols="12" md="6" sm="6" v-show="!comprado">
						<v-btn @click="addCart(id)" color="blue" size="x-large"
							><v-icon>mdi-cart-plus mdi-light</v-icon></v-btn
						>
					</v-col>

					<v-col v-if="!myBeats" cols="12" md="6" sm="6" v-show="comprado">
						<v-btn
							@click="deleteCart(id)"
							ref="id+'delete'"
							color="#C00BD4"
							size="x-large"
							><v-icon>mdi-cart-remove mdi-light</v-icon></v-btn
						>
					</v-col>
				</v-row>
				<!-- <v-btn @click="checkComprado()" color="red" size="x-large"
					><v-icon>mdi-cart-house mdi-light</v-icon></v-btn
				> -->
			</v-card-text>
		</div>
	</v-card>
</template>

<script>
	import { mapActions } from "vuex";

	export default {
		data() {
			return {
				show: true,
			};
		},
		props: {
			id: Number,
			nombre: String,
			tipo: String,
			precio: Number,
			premium: String,
			dateCreated: String,
			imageUrl: String,
			myBeats: Boolean,
			comprado: Boolean,
		},

		methods: {
			...mapActions(["vuexAddBeatToCart"]),
			...mapActions(["vuexDeleteBeatFromCart"]),

			getColor(precio) {
				if (precio <= 10) return "pink";
				if (precio <= 20) return "green";
				if (precio <= 35) return "blue";
				if (precio < 60) return "purple";
				if (precio <= 80) return "orange";
				if (precio <= 100) return "amber accent-4";
			},

			beatDetails(beatId) {
				this.$router.push({ name: "beat", params: { id: beatId } });
			},

			created() {
				alert(this.comprado);
			},

			addCart(beatId) {
				this.vuexAddBeatToCart(beatId);
				this.show = false;
			},

			deleteCart(beatId) {
				this.show = true;
				this.vuexDeleteBeatFromCart(beatId);
			},

			checkComprado() {
				console.log(this.comprado);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.v-card__text,
	.v-card__title {
		text-overflow: ellipsis !important ;
		overflow: hidden !important ;
		white-space: nowrap !important ;
		display: inherit;

		// display: -webkit-box;
		// -webkit-line-clamp: 2; /* number of lines to show */
		// line-clamp: 2;
		// -webkit-box-orient: vertical;
		// overflow: hidden;
		// max-height: 5em;
		// line-height: 1.8em;
	}
	.hide {
		display: none !important;
	}
</style>
