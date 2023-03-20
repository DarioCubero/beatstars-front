<template>
  <div id="beatDetail">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container>
        <v-icon size="large" color="green-darken-2" icon="mdi-domain"></v-icon>

        <!-- @click="addToCart(id)"  -->

        <v-card class="mx-auto mb-5" max-width="400">
          <h3 class="mb-5">Detalle Beat</h3>

          <v-img height="150" src="https://random.imagecdn.app/500/150"></v-img>

          <div>
            <v-card-title class="justify-center">{{
              beatSelected.nombre
            }}</v-card-title>
            <v-card-text>
              <v-divider class="mx-4"></v-divider>

              <v-row>
                <v-col cols="12" md="6" sm="6">
                  <div class="my-4 text-subtitle-1">
                    {{ beatSelected.tipo }}
                  </div>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <div class="my-4 text-subtitle-1" color="yellow">{{ beatSelected.precio }}€</div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6" sm="6">
                  <div class="grey--text ms-4">
                    {{ this.dateTime(beatSelected.dateCreated) }}
                  </div>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <div class="grey--text ms-4">
                    {{ this.premium(beatSelected.premium) }}
                    <v-icon v-if="this.premium == 'Premium'"
                      >mdi-star mdi-dark</v-icon
                    >
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <!-- <v-col cols="12" md="6" sm="6">
                  <v-card-actions class="justify-center">
                    <v-btn color="red" class="ms-2" variant="text"
                      ><v-icon>mdi-play</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-col> -->
                <v-col cols="12" md="12" sm="12">
                  <v-card-actions class="justify-center">
                    <v-btn color="black" size="x-large"
                      ><v-icon>mdi-cart-plus</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-card>
        <vuetify-audio
          id="vuetify-audio"
          class="pa-0"
          :file="file"
          color="black"
          :ended="audioFinish"
          downloadable
        ></vuetify-audio>
        <!-- END V-CARD -->
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
import Api from "@/services/api";
import moment from "moment";

// import Api from '@/services/api';

export default {
  name: "beat-detail-view",

  components: {
    Header,
    Footer,
    VuetifyAudio: () => import("vuetify-audio"),
  },

  data() {
    let idBeatSelected = this.$route.params.id;

    return {
      idBeatSelected,
      beatSelected: {},
      compra: {
        beatList: [],
        userId: null,
      },

      rules: {
        required: (value) => !!value || "Required.",
      },

      // ----------------data audio
      musicPlaylist: [
        {
          title: "Service Bell",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
          image: "https://source.unsplash.com/crs2vlkSe98/400x400",
        },
        {
          title: "Meadowlark",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
          image: "https://source.unsplash.com/35bE_njbG9E/400x400",
        },
        {
          title: "Hyena Laughing",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          image: "https://source.unsplash.com/Esax9RaEl2I/400x400",
        },
        {
          title: "Creepy Background",
          artist: "Daniel Simion",
          url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
          image: "https://source.unsplash.com/j0g8taxHZa0/400x400",
        },
      ],
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    };
  },

  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    premium(check) {
      return check ? "Premium" : "Estándar";
    },
    audioFinish() {
      console.log("El audio ha terminado.");
    },
  },

  // typeBeats: {
  //   items: ["Rap", "Rock", "Trap", "Reggae"],
  // },
  async created() {
    // beforeMount, watch, beforeCreate
    this.beatSelected = await Api.getBeat(this.idBeatSelected);
    console.log("Beat detail", this.beatSelected);
  },
};
</script>

<style lang="scss">
.v-application .primary {
  background-color: red !important;
}

#vuetify-audio > .v-card__text {
  background-color: black !important;
}

#vuetify-audio .v-icon {
  color: black;
  // background-color: black;
}

.v-progress-linear {
  height: 30px !important;
}
</style>
