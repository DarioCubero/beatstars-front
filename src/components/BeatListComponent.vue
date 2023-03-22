<template>
  <v-row no-gutters>
    <v-col
      v-for="(beat, index) in beats"
      :key="index"
      cols="12"
      sm="12"
      md="4"
      lg="3"
    >
      <BeatCard
        class="ml-5"
        :id="beat.id"
        :nombre="beat.nombre"
        :tipo="beat.tipo"
        :precio="beat.precio"
        :premium="premium(beat.premium)"
        :dateCreated="dateTime(beat.dateCreated)"
        imageUrl="https://random.imagecdn.app/500/150"
      />
    </v-col>
  </v-row>
</template>

<script>
import BeatCard from "@/components/BeatCardComponent.vue";
import Api from "@/services/api";
import moment from "moment";

export default {
  name: "BeatListComponent",

  data() {
    return {
      beatNameFilter: "",
      beats: [],
    };
  },

  components: {
    BeatCard,
  },

  computed: {},

  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    premium(check) {
      return check ? "Premium" : "Estándar";
    },
  },

  async created() {
    // beforeMount, watch, beforeCreate
    //TODO: Pending filtrado por QUERY PARAM
    let nameParam = this.$route.query.name;
    if (nameParam) {
      console.log("getBeatsByName...  " + nameParam);
      this.beats = await Api.getBeats(nameParam);
      console.log(this.beats);
    // allBeats.filter(o =>
    //     Object.keys(o).some(k => o[Type].toLowerCase().includes(nameParam.toLowerCase())));

    } else {
      this.beats = await Api.getBeats();
      console.info("getBeats...");
    }
  },

  // watch(){
  //   console.log('created b: '+ this.$route.query.name);
  // },

  // beforeRouteUpdate(to, from, next) {
  //   // Call the API query method when the URL changes
  //   console.log(to);
  //   console.log(from);
  //   console.log(next);
  //   this.getContent(to.params.uid);
  //   next();
  // },
};
</script>
