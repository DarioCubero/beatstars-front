<template>
	<div id="home">
		<Header />

		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container class="pa-10">
				<!-- title -->
				<v-row class="mt-1 pb-7">
					<v-icon style="font-size: 2.5rem; margin-left: 100px"
						>mdi-account mdi-light</v-icon
					>
					<h1>
						<div ref="title">{{ this.FormBeatTitle }}</div>
					</h1>
				</v-row>

				<!-- Subir/Editar Beat -->
				<BeatForm :id="parseInt(id)"></BeatForm>
			</v-container>
		</v-main>

		<Footer />
	</div>
</template>

<script>
	import Header from "@/components/HeaderComponent.vue";
	import Footer from "@/components/FooterComponent.vue";
	import BeatForm from "@/components/BeatUploadFormComponent.vue";
	// import moment from "moment";

	export default {
		name: "upload-beat-view",

		data() {
			return {
				FormBeatTitle: "",
				id: this.$route.params.id,
				cleanForm: false,
			};
		},

		created() {
			this.titleForm();

			this.$watch(
				() => this.$route.params,
				(toParams, previousParams) => {
					console.log("Reused component " + previousParams);
					this.$refs.title.innerText = "Subir Beat";
					this.titleForm();
				}
			);
		},


		methods: {
			titleForm() {
				if (this.id) {
					this.FormBeatTitle = "Editar Beat";
				} else {
					this.FormBeatTitle = "Subir Beat";
				}
			},
		},

		components: {
			Header,
			Footer,
			BeatForm,
		},
	};
</script>

<style scoped></style>
