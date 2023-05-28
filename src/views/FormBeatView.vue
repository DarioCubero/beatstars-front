<template>
	<div id="home">
		<Header />

		<v-main style="padding: 0px 0px 0px; !important;">
			<v-container class="pa-10">
				<h1 ref="title" class="text-left">
					<v-icon style="font-size: 2.5rem; margin-left: 160px"
						>mdi-account mdi-light</v-icon
					>
					{{ this.FormBeatTitle }}
					<!-- Subir Beat -->
				</h1>
				<BeatForm></BeatForm>
			</v-container>
		</v-main>

		<Footer />
	</div>
</template>

<script>
	import Header from "@/components/HeaderComponent.vue";
	import Footer from "@/components/FooterComponent.vue";
	import BeatForm from "@/components/BeatUploadFormComponent.vue";
	import Api from "@/services/api";
	// import moment from "moment";

	export default {
		name: "upload-beat-view",

		data() {
			return {
				beatSelected: null,
				FormBeatTitle: "",
				idBeat: this.$route.params.id,
			};
		},

		// async beforeMount() {
		//   this.titleForm() ;
		// 	console.log("Beat detail", this.beatSelected);
		// },

		//  this.titleForm();

		created() {
			this.titleForm();

			this.$watch(
				() => this.$route.params,
				(toParams, previousParams) => {
					console.log(previousParams);
          this.$refs.title.innerText = "Subir Beat";
					this.titleForm();
				}
			);
		},

		methods: {
			async infoBeat() {
				this.beatSelected = await Api.getBeat(this.idBeat);
			},

			titleForm() {
				if (this.idBeat) {
					this.FormBeatTitle = "Editar Beat";
          this.infoBeat();
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
