<template>
    <v-sheet max-width="800" class="mx-auto mt-10">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        dark
        class="elevation-5 px-5 py-7"
      >
        <v-row style="height: 10px;">
          <v-progress-linear style="opacity: 0.0 !important;"
            :active="formLoading"
            indeterminate
            color="blue"
          ></v-progress-linear>
        </v-row>
        <v-row class="">
          <v-col cols="2"> </v-col>
          <v-col cols="8">
            <div class="headline" style="color: white !important;">Información del Usuario</div>
          </v-col> 
          <v-col cols="2">
            <!-- <v-switch
                  inset
                  prepend-icon="mdi-account-arrow-right-outline mdi-light"
                  @click="darkMode"
                /> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="mb-0">
            <v-text-field
              dark
              label="Nombre de Usuario"
              v-model="user.nombreCuenta"
              outlined
              prepend-inner-icon="mdi-account-arrow-right-outline mdi-light"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              dark
              label="Email"
              v-model="user.email"
              outlined
              prepend-inner-icon="mdi-email-outline mdi-light"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              dark
              label="Password"
              v-model="user.password"
              outlined
              prepend-inner-icon="mdi-account-arrow-left-outline"
              hint="At least 6 characters"
              counter="20"
              @click:append="showBoolPassword = !showBoolPassword"
              :append-icon="
                showBoolPassword ? 'mdi-eye mdi-light' : 'mdi-eye-off mdi-light'
              "
              :type="showBoolPassword ? 'text' : 'password'"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              dark
              label="Password Verify"
              v-model="passwordVerify"
              outlined
              prepend-inner-icon="mdi-cellphone"
              hint="At least 6 characters"
              counter="20"
              @click:append="showBoolPassword = !showBoolPassword"
              :append-icon="
                showBoolPassword ? 'mdi-eye mdi-light' : 'mdi-eye-off mdi-light'
              "
              :type="showBoolPassword ? 'text' : 'password'"
              :rules="[rules.required, passwordMatch]"
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
            <v-btn color="#0FC900" @click="deleteUser">
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

export default {
  props: {
    message: String,
    typeAlert: String,
  },
  data: () => ({
    idUserLocal: auth.getLocalStorage("userId"),
    passwordVerify: "",
    showBoolPassword: "",
    user: {},
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
      required: (value) => !!value || "Required.",
      min6Char: (v) => v.length >= 6 || "Min 6 characters",
      userNameMaxChar: (v) => v.length < 20 || "Max 20 characters",
      emailMaxChar: (v) => v.length < 50 || "Max 50 characters",
      passwordMaxChar: (v) => v.length < 15 || "Max 15 characters",
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) => v.length >= 6 || "Min 6 characters",
        (v) => v.length < 50 || "Max 50 characters",
      ],
    },

    alert: false,
    confirm: false,
    prompt: false,

    address: "",

    beforeShow: "No event captured yet",
    show: "No event captured yet",
    beforeHide: "No event captured yet",
    hide: "No event captured yet",
  }),

  methods: {
    ...mapActions(["vuexGetUser"]),

    validate() {
      if (this.$refs.form.validate()) {
        this.formLoading = true;
        console.log(JSON.stringify(this.user));

        auth.updateUser(this.$store.state.user.id, this.user);

        console.log("Actualizando State User tras el Update.");
        this.vuexGetUser(this.$store.state.user.id);

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
  computed: {
    passwordMatch() {
      return () =>
        this.user.password === this.passwordVerify || "Password must match";
    },
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
</style>