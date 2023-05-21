<template>
  <v-data-table dark
    :headers="headers"
    :items="beatsCustom"
    item-value="id"
    class="elevation-1 mx-auto"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="beatDetails(item.id)">mdi-eye mdi-light</v-icon>
    </template>
  </v-data-table>
</template>

<script>
// import { mapActions } from "vuex";
import Api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Nombre", value: "nombre" },
        { text: "Tipo", value: "tipo" },
        { text: "Precio(€)", value: "precio" },
        { text: "DateCreated", value: "dateCreated" },
        { text: "Detalle", value: "actions", sortable: false },
      ],
      beats: [],
      beatsCustom: [],
    };
  },

  props: {
    // nombre: String,
  },

  methods: {
    beatDetails(beatId) {
      this.$router.push({ name: "beat", params: { id: beatId } });
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
  },

  async beforeCreate() {
    this.beats = await Api.getBeats();
    console.log(this.beats);
    await this.beats.forEach(async (x) => {
      let obj = {};
      obj["id"] = x.id;
      obj["nombre"] = x.nombre;
      obj["tipo"] = x.tipo;
      obj["precio"] = x.precio;
      obj["dateCreated"] = this.dateTime(x.dateCreated);
      this.beatsCustom.push(obj);
    });

    
  },
};
</script>

<style lang="scss" scoped>
</style>