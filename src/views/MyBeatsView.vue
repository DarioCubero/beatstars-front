<template>
  <div id="myBeats">
    <Header/>
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container fluid class="pa-10">
         <!-- title -->
				<v-row class="mt-1">
          <v-icon style="font-size: 2.5rem; margin-left: 160px">mdi-folder mdi-light</v-icon>
					<h1>
						<div ref="title">Mis Beats</div>
					</h1>
				</v-row>

        <UserBeatsListComponent/>
      </v-container>
    </v-main>
     <Footer/>

  </div>
</template>

<script>
import UserBeatsListComponent from "@/components/UserBeatsListComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "mis-beats",

  components: {
    UserBeatsListComponent, Header, Footer
  },
};
</script>

<style scoped>
</style>
