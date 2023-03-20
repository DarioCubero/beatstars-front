<template>
  <div id="beatDetailPlaylist">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important">
      <v-container>
        <v-icon size="large" color="green-darken-2" icon="mdi-domain"></v-icon>

        <!-- @click="addToCart(id)"  -->
        <h1 class="mt-8">Beat Detail</h1>
        <v-card class="mx-auto my-12" max-width="400">
          <v-img height="250" src="https://random.imagecdn.app/500/150"></v-img>
          <div style="min-width: 0">
            <v-card-title class="justify-center">{{
              beatSelected.nombre
            }}</v-card-title>

            <v-divider class="mx-4"></v-divider>

            <div class="my-4 text-subtitle-1">{{ beatSelected.tipo }}</div>

            <p color="yellow">{{ beatSelected.precio }}€</p>

            <v-card-text>
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
                <v-col cols="12" md="6" sm="6">
                  <v-card-actions class="justify-center">
                    <v-btn color="red" class="ms-2" variant="text"
                      ><v-icon>mdi-play</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-col>
                <v-col cols="12" md="6" sm="6">
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
        <!-- END V-CARD -->

        <!-- TEST AUDIO PLAYER -->
        <main class="audioPlayer" id="app">
          <a
            class="nav-icon"
            v-on:click="isPlaylistActive = !isPlaylistActive"
            :class="{ isActive: isPlaylistActive }"
            title="Music List"
          >
            <span></span>
            <span></span>
            <span></span>
          </a>
          <div class="audioPlayerList" :class="{ isActive: isPlaylistActive }">
            <!-- <li v-for="item in links_apps" :key="item.name">
              <a target="_blank" v-bind:href="item.href">
                <img v-bind:src="item.src" width="170" alt="" />
              </a>
            </li> -->

            <div
              class="item"
              v-for="(item, index) in musicPlaylist"
              :key="index"
              v-bind:class="{ isActive: isCurrentSong(index) }"
              v-on:click="
                changeSong(index), (isPlaylistActive = !isPlaylistActive)
              "
            >
              <p class="title">{{ item.title }}</p>
              <p class="artist">{{ item.artist }}</p>
            </div>
            <p class="debugToggle" v-on:click="toggleDebug()">
              debug: {{ debug }}
            </p>
          </div>
          <div class="audioPlayerUI" :class="{ isDisabled: isPlaylistActive }">
            <div class="albumImage">
              <transition
                name="ballmove"
                enter-active-class="animated zoomIn"
                leave-active-class="animated fadeOutDown"
                mode="out-in"
              >
                <!-- <transition name="slide-fade" mode="out-in"> -->
                <img
                  @load="onImageLoaded()"
                  :src="musicPlaylist[currentSong].image"
                  :key="currentSong"
                  ondragstart="return false;"
                  id="playerAlbumArt"
                />
                <!-- </transition> -->
              </transition>
              <div class="loader" :key="currentSong">Loading...</div>
            </div>
            <div class="albumDetails">
              <transition name="slide-fade" mode="out-in">
                <p class="title" :key="currentSong">
                  {{ musicPlaylist[currentSong].title }}
                </p>
              </transition>
              <transition name="slide-fade" mode="out-in">
                <p class="artist" :key="currentSong">
                  {{ musicPlaylist[currentSong].artist }}
                </p>
              </transition>
            </div>

            <div class="playerButtons">
              <a
                class="button"
                :class="{ isDisabled: currentSong == 0 }"
                v-on:click="prevSong()"
                title="Previous Song"
                ><i class="zmdi zmdi-skip-previous"></i
              ></a>
              <a
                class="button play"
                v-on:click="playAudio()"
                title="Play/Pause Song"
              >
                <transition name="slide-fade" mode="out-in">
                  <i
                    class="zmdi"
                    :class="[
                      currentlyStopped
                        ? 'zmdi-stop'
                        : currentlyPlaying
                        ? 'zmdi-pause-circle'
                        : 'zmdi-play-circle',
                    ]"
                    :key="1"
                  ></i>
                </transition>
              </a>
              <a
                class="button"
                :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
                v-on:click="nextSong()"
                title="Next Song"
                ><i class="zmdi zmdi-skip-next"></i
              ></a>
            </div>

            <div class="currentTimeContainer" style="text-align: center">
              <span class="currentTime">{{
                currentTime | fancyTimeFormat
              }}</span>
              <span class="totalTime">
                {{ trackDuration | fancyTimeFormat }}</span
              >
              <span style="color: black"
                >({{ currentSong + 1 }}/{{ musicPlaylist.length }})</span
              >
            </div>

            <div class="currentProgressBar">
              <div
                class="currentProgress"
                :style="{ width: currentProgressBar + '%' }"
              ></div>
            </div>
          </div>
        </main>
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
  name: "beat-detail-playlist-view",

  components: {
    Header,
    Footer,
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
      audio: "",
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: 0,
      checkingCurrentPositionInTrack: "",
      trackDuration: 0,
      currentProgressBar: 0,
      isPlaylistActive: false,
      currentSong: 0,
      debug: false,
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
      audioFile: "",
    };
  },

  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    premium(check) {
      return check ? "Premium" : "Estándar";
    },

    // audio methods --------------
    togglePlaylist: function () {
      this.isPlaylistActive = !this.isPlaylistActive;
    },
    nextSong: function () {
      if (this.currentSong < this.musicPlaylist.length - 1)
        this.changeSong(this.currentSong + 1);
    },
    prevSong: function () {
      if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
    },
    changeSong: function (index) {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;
      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }
      this.audioFile = this.musicPlaylist[this.currentSong].url;
      this.audio = new Audio(this.audioFile);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying) {
        this.playAudio();
      }
    },
    isCurrentSong: function (index) {
      if (this.currentSong == index) {
        return true;
      }
      return false;
    },
    getCurrentSong: function (currentSong) {
      return this.musicPlaylist[currentSong].url;
    },
    playAudio: function () {
      if (
        this.currentlyStopped == true &&
        this.currentSong + 1 == this.musicPlaylist.length
      ) {
        this.currentSong = 0;
        this.changeSong();
      }
      if (!this.currentlyPlaying) {
        this.getCurrentTimeEverySecond(true);
        this.currentlyPlaying = true;
        this.audio.play();
      } else {
        this.stopAudio();
      }
      this.currentlyStopped = false;
    },
    stopAudio: function () {
      this.audio.pause();
      this.currentlyPlaying = false;
      this.pausedMusic();
    },
    handleEnded: function () {
      if (this.currentSong + 1 == this.musicPlaylist.length) {
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
      } else {
        this.currentlyPlaying = false;
        this.currentSong++;
        this.changeSong();
        this.playAudio();
      }
    },
    onImageLoaded: function () {
      this.imgLoaded = true;
    },
    getCurrentTimeEverySecond: function () {
      let localThis = this;
      this.checkingCurrentPositionInTrack = setTimeout(
        function () {
          localThis.currentTime = localThis.audio.currentTime;
          localThis.currentProgressBar =
            (localThis.audio.currentTime / localThis.trackDuration) * 100;
          localThis.getCurrentTimeEverySecond(true);
        }.bind(this),
        1000
      );
    },
    pausedMusic: function () {
      clearTimeout(this.checkingCurrentPositionInTrack);
    },
    toggleDebug: function () {
      this.debug = !this.debug;
      document.body.classList.toggle("debug");
    },
  },
  // typeBeats: {
  //   items: ["Rap", "Rock", "Trap", "Reggae"],
  // },
  mounted: function () {
    this.changeSong();
    this.audio.loop = false;
  },
  filters: {
    fancyTimeFormat: function (s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    },
  },
  watch: {
    currentTime: function () {
      this.currentTime = Math.round(this.currentTime);
    },
  },
  beforeDestroy: function () {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("loadedmetadata", this.handleEnded);

    clearTimeout(this.checkingCurrentPositionInTrack);
  },

  async created() {
    // beforeMount, watch, beforeCreate
    this.beatSelected = await Api.getBeat(this.idBeatSelected);
    console.log("Beat detail", this.beatSelected);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Inconsolata:400,700");
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

$primary_color: white;
$player_width: 20rem;
$player_padding: 1.5rem;
$player_border_radius: 0.5rem;

$button_size: 2rem;

$anim_duration: 0.5s;

/* Debugging */
.debug {
  main * {
    outline: solid 0.25rem white;
  }
}

* {
  box-sizing: border-box;
}
.animated {
  animation-duration: $anim_duration;
}
.audioPlayer {
  position: relative;
  background-color: #eceff1;

  min-height: 25rem;
  width: $player_width;

  overflow: hidden;

  padding: $player_padding;
  margin: 0 auto;

  border-radius: $player_border_radius;
  box-shadow: 0 19px 38px white, 0 15px 12px white;

  user-select: none;

  .nav-icon {
    width: 15px;
    height: 12px;

    position: absolute;
    top: ($player_padding)-($player_padding/4);
    left: $player_padding;

    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    cursor: pointer;

    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: $primary_color;
      border-radius: 6px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.5s ease-in-out;
    }
    span:nth-child(1) {
      top: 0px;
    }

    span:nth-child(2) {
      top: 5px;
    }

    span:nth-child(3) {
      top: 10px;
    }

    &.isActive span:nth-child(1) {
      top: 5px;
      transform: rotate(135deg);
    }

    &.isActive span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }

    &.isActive span:nth-child(3) {
      top: 5px;
      transform: rotate(-135deg);
    }
  }
  .audioPlayerList {
    color: $primary_color;
    width: ($player_width)-(2 * $player_padding);
    transition: $anim_duration;
    transform: translateX(-200%);
    position: absolute;
    margin-top: $player_padding;
    overflow: auto;
    z-index: 10;
    will-change: transform;

    &.isActive {
      transform: translateX(0);
    }
    .item {
      margin-bottom: 1.5rem;
      border-left: 0.1rem solid transparent;
      transition: 0.2s;

      &:hover {
        padding-left: 0.5rem;
        cursor: pointer;
      }
      .title {
        color: white;
        font-size: 1rem;
        margin-bottom: 0.75rem;
      }
      .artist {
        color: white;
        font-size: 0.8rem;
      }
      &.isActive {
        border-left-color: white;
        padding-left: 1rem;
      }
    }
    .debugToggle {
      cursor: pointer;
      color: rgb(255, 0, 0);
    }
  }
  .audioPlayerUI {
    margin-top: $player_padding;
    will-change: transform, filter;
    transition: $anim_duration;
    &.isDisabled {
      transform: scale(0.75) translateX(100%);
      filter: blur(5px) grayscale(100%);
    }
    .albumDetails {
      text-align: center;
      margin: 2rem 0;

      p {
        margin: 0px;
        &.title {
          font-size: 1rem;
          color: white;
        }
        &.artist {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          font-weight: none;
          color: $primary_color;
          transition-delay: 100ms;
        }
      }
    }
    .albumImage {
      width: ($player_width)-($player_padding * 2);
      height: ($player_width)-($player_padding * 2);
      overflow: hidden;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        z-index: 10;
        object-fit: cover;
        object-position: 50% 50%;
        border-radius: $player_border_radius;
      }
    }
    .playerButtons {
      position: relative;
      margin: 0 auto;
      margin-bottom: 1.5rem;
      text-align: center;

      .button {
        font-size: $button_size;
        display: inline-block;
        vertical-align: middle;
        padding: 0.5rem;
        margin: 0 0.25rem;
        color: white;
        border-radius: 50%;
        background-color: white;

        outline: 0;
        text-decoration: none;
        cursor: pointer;
        transition: $anim_duration;

        &.play {
          font-size: 2 * $button_size;
          margin: 0 1.5rem;
        }
        &:active {
          opacity: 0.75;
          transform: scale(0.75);
        }
        &.isDisabled {
          color: white;
          cursor: initial;
        }
        &.isDisabled:active {
          transform: none;
        }
      }
    }
    .currentTimeContainer {
      width: 100%;
      height: 1rem;

      display: flex;
      justify-content: space-between;

      .currentTime,
      .totalTime {
        font-size: 0.5rem;
        font-family: monospace;
        color: $primary_color;
      }
    }

    .currentProgressBar {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 0.75rem 0;
      .currentProgress {
        background-color: $primary_color;
        width: 0px;
        height: 1px;
        transition: 100ms;
      }
    }
  }
}

.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
}

/* data change transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $anim_duration;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.heading {
  text-align: center;
  margin: 0;
  margin: 2rem 0;
  font-family: Inconsolata, monospace;

  h1 {
    color: #eceff1;
    margin: 0;
    margin-bottom: 1rem;
    font-size: 1.75rem;
  }
  p {
    margin: 0;
    font-size: 0.85rem;
  }
  a {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.3s;
    text-decoration-style: dotted;
    &:hover {
      color: rgba(255, 255, 255, 1) !important;
    }
    &:visited {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
