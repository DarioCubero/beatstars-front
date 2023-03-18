<template>
  <v-main>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <ListadoBeats />
        </v-col>
      </v-row>
      <v-row no-gutters> </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ListadoBeats from "../components/BeatListComponent.vue";

export default {
  components: {
    ListadoBeats,
  },
};
</script>
