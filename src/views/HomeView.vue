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
              <v-col class="card" cols="12" lg="8" md="8" sm="8">
                <h1 class="text-uppercase">
                  Release Your Music To All Major Digital Music Platforms
                </h1>
                <div class="text-h5">
                  Keep
                  <span style="color:#C00BD4 " class="text-h4 font-weight-bold"
                    >100% of the earnings</span
                  >
                  we collect for you!
                </div>
              </v-col>
              <v-col class="card" cols="12" lg="12" md="12" sm="12">
                <v-btn class="black--text" size="x-large" color="gray" to="/beats">
                Explorar Beats
              </v-btn>
              </v-col>
   
            </v-row>
          </v-col>
        </v-row>
        <!-- end row -->
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
  name: "home-view",

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
#marketing1 {
  padding: 100px;
}

.v-btn {
  height: 80px !important;
  width: 250px !important;
}
</style>
