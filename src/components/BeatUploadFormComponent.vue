<template>
  <v-sheet max-width="800" class="mx-auto mt-10">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      dark
      class="elevation-5 px-5 py-7"
    >
      <v-row style="height: 10px">
        <v-progress-linear
          :active="formLoading"
          indeterminate
          color="blue"
        ></v-progress-linear>
      </v-row>
      <v-row class="">
        <v-col cols="2"> </v-col>
        <v-col cols="8">
          <div class="headline" style="color: white !important">Datos</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="mb-0">
          <v-text-field
            dark
            label="Nombre"
            v-model="beat.nombreCuenta"
            outlined
            prepend-inner-icon="mdi-account-arrow-right-outline mdi-light"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dark
            outlined
            label="TypeBeat"
            v-model="beat.typeBeat"
            prepend-inner-icon="mdi-format-list-bulleted-square mdi-light"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <!--  :label="`isEnabled: ${beat.premium.toString()}`"  -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card dark outlined>
            <v-switch
              outlined
              v-model="beat.premium"
              false-value="Nay!"
              true-value="Yay!"
              label="Premium"
              color="#FFD700"
              value="red"
            ></v-switch>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            dark
            outlined
            label="Precio"
            v-model="beat.precio"
            prepend-inner-icon="mdi-currency-eur mdi-light"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <!-- botones -->
      <v-row>
        <v-col cols="2"> </v-col>
        <v-col cols="8">
          <v-btn color="white" outlined @click="validate"> Actualizar </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="red" @click="deleteUser">
            <v-icon>mdi-delete mdi-light</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>


<script>
import auth from "@/services/auth";
import api from "@/services/api";
import { mapActions } from "vuex";
let currentDate = new Date();

export default {
  name: "perfil-view",
  props: {
    message: String,
    typeAlert: String,
  },

  data: () => ({
    idUserLocal: auth.getLocalStorage("userId"),
    beat: {
      nombre: "",
      premium: false,
      typeBeat: "",
      dateCreated: currentDate,
      precio: null,
    },
    valid: false,
    formLoading: false,
    emailRules: [
      (v) => !!v || "Please fill out the field!",
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    rules: {
      precio: (v) =>
        !(
          !isNaN(parseFloat(v)) &&
          this.beat.precio >= 0 &&
          this.beat.precio <= 99
        ) || "Debe ser un número entre el 0 y el 100",
      nombre: [(v) => v.length < 15 || "Max 15 characters"],
      userNameMaxChar: (v) => v.length < 20 || "Max 20 characters",
      required: (v) => !!v || "Required.",

      // poner rango hasta 100 decimal
      premiumTrue: (v) => v.length < 20 || "Max 20 characters",
    },

    alert: false,
    confirm: false,
    prompt: false,

    address: "",

    beforeShow: "No event captured yet",
    show: "No event captured yet",
    beforeHide: "No event captured yet",
    hide: "No event captured yet",

    model: true,

    items: [
      {
        text: "Rap",
        icon: "mdi-nature",
      },
      {
        text: "Rock",
        icon: "mdi-glass-wine",
      },
      {
        text: "Reggae",
        icon: "mdi-calendar-range",
      },
      {
        text: "Dark",
        icon: "mdi-map-marker",
      },
      {
        text: "Chill",
        icon: "mdi-bike",
      },
      {
        text: "Agresive",
        icon: "mdi-bike",
      },
    ],
  }),

  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter((item) => {
        const text = item.text.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(selection);
      }

      return selections;
    },
  },

  watch: {
    selected() {
      this.search = "";
    },
  },

  methods: {
    ...mapActions(["vuexGetUser"]),

    validate() {
      if (this.$refs.form.validate()) {
        this.formLoading = true;
        console.log(JSON.stringify(this.user));

        auth.updateUser(this.$store.state.beat.id, this.user);

        console.log("Actualizando State User tras el Update.");
        this.vuexGetUser(this.$store.state.beat.id);

        setTimeout(() => {
          this.formLoading = false;
        }, 2000);

        // Alert........
      }
    },
    deleteUser() {
      this.formLoading = true;
      api.deleteUser(this.idUserLocal);
      console.log("Ha sido borrado el usuario con ID: " + this.idUserLocal);
      auth.closeSession();
      this.$store.commit("setUser", {});

      setTimeout(() => {
        this.$router.push({ name: "login" });
        this.formLoading = false;
      }, 2000);

      // Alert........
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    // darkMode() {
    //   this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    // },
  },

  async created() {
    // beforeMount, watch, beforeCreate
    // this.$vuetify.theme.dark = "dark";
    this.user = await auth.getUser(this.idUserLocal);
    console.log("getUser: ", this.user);
  },
};
</script>

<style lang="scss" scoped>
.v-form {
  background-color: #222222;
}

.v-card {
  padding: 0px;
  padding-left: 10px;
}
</style>