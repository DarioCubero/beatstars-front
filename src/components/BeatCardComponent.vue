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
					<div class="my-4 text-subtitle-1">{{ tipo }}</div>
				</v-col>

				<v-col class="pa-3" cols="12" md="6" sm="6">
					<div class="my-4 text-subtitle-1">{{ precio }}€</div>
				</v-col>
			</v-row>

			<v-card-text>
				<v-row class="">
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

				<v-row>
					<v-col cols="12" md="6" sm="6">
						<v-icon style="font-size: 2rem" @click="beatDetails(id)"
							>mdi-eye mdi-dark</v-icon
						>
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<a @click="like(id)">
							<v-icon style="font-size: 2rem"
								>mdi-heart-outline mdi-dark
							</v-icon>
						</a>
					</v-col>
				</v-row>
			</v-card-text>
		</div>
	</v-card>
</template>

<script>
	// import { mapActions } from "vuex";

	export default {
		data() {
			return {};
		},
		props: {
			id: Number,
			nombre: String,
			tipo: String,
			precio: Number,
			premium: String,
			dateCreated: String,
			imageUrl: String,
		},

		created() {
		},

		methods: {
			beatDetails(beatId) {
				this.$router.push({ name: "beat", params: { id: beatId } });
			},
			like(beatId) {
				alert(beatId);
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

</style>
