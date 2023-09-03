<template>
	<v-footer dark bottom color="black" id="footer">
		<v-container fluid>
			<v-row>
				<v-col cols="12" lg="12" md="12" sm="12">
					<v-row>
						<!-- links apps -->
						<v-col class="card" cols="12" lg="3" md="6" sm="12">
							<h3>
								<v-icon color="white">mdi-apps-box</v-icon>&nbsp;Take Beats on
								the GO!
							</h3>
							<v-card-text class="mx-auto">
								<li v-for="item in links_apps" :key="item.name">
									<a target="_blank" v-bind:href="item.href">
										<img v-bind:src="item.src" width="170" alt="" />
									</a>
								</li>
							</v-card-text>
						</v-col>

						<!-- links_beatstars -->
						<v-col class="card" cols="12" lg="3" md="6" sm="12">
							<h3><v-icon color="white">mdi-home</v-icon>&nbsp;BeatStars</h3>
							<v-card-text class="mx-auto">
								<li v-for="(item, i) in links_beatstars" :key="i">
									<a v-bind:href="'#' + item.href">{{ item.title }}</a>
								</li>
							</v-card-text>
						</v-col>

						<!-- links support -->
						<v-col class="card" cols="12" lg="3" md="6" sm="12">
							<h3><v-icon color="white">mdi-chat</v-icon>&nbsp;Support</h3>
							<v-card-text class="mx-auto">
								<li>
									<a :href="'mailto:' +
						this.emailTo +'?subject='+this.emailSub +'&body=' +this.emailBody"
										>Help or improvements
                    </a>
								</li>
								<li v-for="item in links_support" :key="item.name">
									<a v-bind:href="'#' + item.href">{{ item.title }}</a>
								</li>
							</v-card-text>
						</v-col>
						<!-- links social_media -->
						<v-col class="card" cols="12" lg="3" md="6" sm="12">
							<h3>
								<v-icon color="white">mdi-share-variant</v-icon>&nbsp;Social
								Media
							</h3>

							<v-col cols="12" md="12">
								<li v-for="item in links_social_media" :key="item.title">
									<a target="_blank" v-bind:href="item.href">
										<v-icon size="24px">
											{{ item.icon }}
										</v-icon>
										&nbsp;{{ item.title }}
									</a>
								</li>
							</v-col>
						</v-col>
						<!-- END slinks social_mediaa -->
					</v-row>
				</v-col>
			</v-row>
			<v-row class="text-center mb-10">
				<v-col cols="12" md="12">
					<h6 style="color:  #b1b1b1; !important">
						© {{ currentYear }} DreamDrums, Inc. • Version: 1.00.0
					</h6>
				</v-col>
			</v-row>
		</v-container>
		<!-- end container -->
	</v-footer>
</template>

<script>
	export default {
		data: () => ({
			emailTo: "support@dreamdrums.com",
			emailSub: "Ayuda o mejoras | DreamDrums",
			emailBody:
				"Estimado equipo de DreamDrums, les agradeceríamos" +
				"\r\n" +
				"[Contenido de la ayuda o la mejora]" +
				"\r\n" +
				"¡Gracias!",
			links_apps: [
				{
					name: "Apple",
					src: require(`@/assets/icons/appstore.png`),
					href: "https://apps.apple.com/",
				},
				{
					name: "Google Play",
					src: require(`@/assets/icons/googleplay.png`),
					href: "https://play.google.com/store/apps",
				},
			],
			links_beatstars: [
				{
					title: "About us",
					href: "/about-us",
				},
				{
					title: "Careers",
					href: "/careers",
				},
				{
					title: "Contact us",
					href: "/contact-us",
				},
			],
			links_support: [
				{
					title: "Terms & Conditions",
					href: "/terms-and-conditions",
				},
				{
					title: "Privacy Policy",
					href: "/privacy-policy",
				},
			],
			links_social_media: [
				{
					title: "Youtube",
					icon: "mdi-light mdi-youtube",
					href: "https://www.youtube.com/user/OfficialDreamDrums",
				},
				{
					title: "Instagram",
					icon: "mdi-light mdi-instagram",
					href: "https://www.instagram.com/OfficialDreamDrums/",
				},
				{
					title: "Facebook",
					icon: "mdi-light mdi-facebook",
					href: "https://www.facebook.com/OfficialDreamDrums/",
				},
				{
					title: "Twitter",
					icon: "mdi-light mdi-twitter",
					href: "https://twitter.com/OfficialDreamDrums",
				},
				{
					title: "Souncloud",
					icon: "mdi-light mdi-soundcloud",
					href: "https://soundcloud.com/OfficialDreamDrums",
				},
			],
			currentYear: new Date().getFullYear(),
		}),

		methods: {
			helpOrImprovementsEmail() {
				window.location.href(
					"mailto:" +
						this.emailTo +
						"?subject=" +
						this.emailSub +
						"&body=" +
						this.emailBody
				);
			},
		},
	};
</script>

<style>
	#footer {
	}

	#footer {
		margin-top: 50px !important;
	}
	#footer .card {
		padding-left: 100px !important;
	}

	#footer .card li {
		font-size: 15px !important;
	}

	#footer a {
		color: #b1b1b1;
		text-decoration: none !important;
	}
	li,
	#footer h3 {
		text-align: left !important;
		list-style-type: none !important;
		padding-bottom: 15px !important;
	}

	i.v-icon.v-icon {
		color: white !important;
	}

	.v-data-footer {
		padding: 0px !important;
	}
</style>
