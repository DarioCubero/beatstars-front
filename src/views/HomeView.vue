<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <Carousel />
      <v-container fluid class="text-left pa-10">
        <!-- MARKETING -->
        <v-row class="mt-5 py-15" id="marketing1">
          <v-col cols="12" lg="12" md="12" sm="12">
            <v-row>
              <!-- content -->
              <v-col class="card" cols="12" lg="7" md="7" sm="7">
                <h1 class="text-uppercase">
                  Release Your Music To All Major Digital Music Platforms
                </h1>
                <div class="text-h5">
                  Keep
                  <span class="text-h4 yellow--text font-weight-bold"
                    >100% of the earnings</span
                  >
                  we collect for you!
                </div>
              </v-col>
              <!-- button -->
              <v-col class="card" cols="12" lg="6" md="6" sm="6">
                <v-btn size="small" color="secondary" to="/beats">
                  Explorar Beats
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>  <!-- end row -->
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Carousel from "@/components/CarouselComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  components: {
    Header,
    Footer,
    Carousel,
  },
};
</script>

<style scoped>
#marketing1 * :not(:first-child) {
  margin-top: 55px !important;
}

.v-btn {
  height: 200% !important;
}
</style>
