<template>
  <v-row no-gutters>
    <v-col
      v-for="(beat, index) in myBeats"
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
import { mapState } from "vuex";

export default {

  data() {
    return {
      myBeats: [],
    };
  },

  components: {
    BeatCard,
  },

  computed: {
    ...mapState(["user"]),
  },

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
    this.myBeats = await Api.getUserBeats(this.user.id);
  }


};
</script>
