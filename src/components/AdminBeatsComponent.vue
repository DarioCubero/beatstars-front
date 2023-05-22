<template>
  <v-data-table
    dark
    :headers="headers"
    :items="beatsCustom"
    item-value="id"
    class="elevation-1 mx-auto"
  >
    <!-- COLOR PRECIO -->
    <template v-slot:[`item.precio`]="{ item }">
      <v-chip :color="getColor(item.precio)">
        {{ item.precio }}
      </v-chip>
    </template>

    <!-- ACTIONS -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" @click="beatDetails(item.id)"
        >mdi-eye mdi-light</v-icon
      >
      <v-icon class="me-2" @click="editItem(item.id)"
        >mdi-pencil mdi-light</v-icon
      >
      <v-icon class="me-2" @click="deleteItem(item.id)">
        mdi-delete mdi-light</v-icon
      >
    </template>

    <!-- DIALOG DELETE -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG NEW ITEM -->
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark class="mb-2" v-bind="props">
          New Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <!-- <v-text-field
                  v-model="editedItem.name"
                  label="Dessert name"
                ></v-text-field> -->
                <h1>NEW ITEM DIALOG</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>

    <!-- EXPANSION -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td class="background-color: blue;" :colspan="columns.length">
          More info about {{ item.name }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
// import { mapActions } from "vuex";
import Api from "@/services/api";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
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

    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    beatDetails(beatId) {
      this.$router.push({ name: "beat", params: { id: beatId } });
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },

    editItem(item) {
      console.log("editItem", item);
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("deleteItem", item);
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("deleteItemConfirm");
      // this.desserts.splice(this.editedIndex, 1)
      this.closeDelete();
    },

    close() {
      console.log("close");
      // this.dialog = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      alert("xxx");
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    getColor(precio) {
      if (precio <= 10) return "pink";
      if (precio <= 20) return "green";
      if (precio <= 35) return "blue";
      if (precio < 60) return "purple";
      if (precio <= 80) return "orange";
      if (precio <= 100) return "yellow";
    },
  }, // END METHODS

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

<style lang="scss" scoped></style>
