<template>
  <div id="beats">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container fluid class="pa-10">
        <!-- title -->
				<v-row class="mt-1">
          <v-icon style="font-size: 2.5rem; margin-left: 160px">mdi-album mdi-light</v-icon>
					<h1>
						<div ref="title">Carrito</div>
					</h1>
				</v-row>
        <CartBeatsDT />
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import CartBeatsDT from "@/components/CartBeatsDTComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "chart-beats-view",

  components: {
    CartBeatsDT,
    Header,
    Footer,
  },
};
</script>

<style scoped>
</style>
