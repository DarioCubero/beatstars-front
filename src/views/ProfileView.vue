<template>
  <div id="home">
    <Header />

    <v-main style="padding: 0px 0px 0px; !important;">
      <v-progress-linear
        :active="formLoading"
        indeterminate
        top
        absolute
        color="dark accent-4"
      ></v-progress-linear>
      <v-container fluid class="pa-10">
        <h1 class="text-left">
          <v-icon style="font-size: 2.5rem; margin-left: 160px"
            >mdi-account mdi-light mdi-light</v-icon
          >Mi Perfil
        </h1>

        <v-sheet max-width="800" class="mx-auto mt-10">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            dark
            class="elevation-5 rounded-lg px-5 py-7"
          >
            <v-row class="">
              <v-col cols="2"> </v-col>
              <v-col cols="8">
                <div class="headline">Información del Usuario</div>
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
                  label="Nombre de Usuario"
                  v-model="user.nombreCuenta"
                  outlined
                  prepend-inner-icon="mdi-account-arrow-right-outline mdi-light"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Email"
                  v-model="user.email"
                  outlined
                  prepend-inner-icon="mdi-email-outline mdi-light"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Password"
                  v-model="user.password"
                  outlined
                  prepend-inner-icon="mdi-account-arrow-left-outline"
                  hint="At least 6 characters"
                  counter="20"
                  @click:append="showBoolPassword = !showBoolPassword"
                  :append-icon="
                    showBoolPassword
                      ? 'mdi-eye mdi-light'
                      : 'mdi-eye-off mdi-light'
                  "
                  :type="showBoolPassword ? 'text' : 'password'"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Password Verify"
                  v-model="passwordVerify"
                  outlined
                  prepend-inner-icon="mdi-cellphone"
                  hint="At least 6 characters"
                  counter="20"
                  @click:append="showBoolPassword = !showBoolPassword"
                  :append-icon="
                    showBoolPassword
                      ? 'mdi-eye mdi-light'
                      : 'mdi-eye-off mdi-light'
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
                <v-btn color="" outlined  @click="validate"> Actualizar </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn color="red" @click="deleteUser">
                  <v-icon>mdi-delete mdi-light</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-container>




    </v-main>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
import auth from "@/services/auth";
import api from "@/services/api";
import { mapActions } from "vuex";

export default {
  // theme: {
  //   themes: {
  //     dark: {
  //       primary: "#82b19f",
  //       secondary: "#f4bf1c",
  //       accent: "#47333c",
  //       error: "#dc6276",
  //       background: "#0000",
  //       formBackground: "#23272b",
  //     },
  //   },
  // },
  name: "perfil-view",
  components: {
    Header,
    Footer,
  },
  props: {
    message: String,
    typeAlert: String,
  },
  data: () => ({
    idUserLocal: auth.getLocalStorage("userId"),
    passwordVerify: "",
    showBoolPassword: "",
    user: {
    },
    valid: false,
    formLoading: false,

    formData: {},

    requiredRules: [(v) => !!v || "Please fill out this field!"],
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

        auth.updateUser(this.idUserLocal, this.user);
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
    this.$vuetify.theme.dark = "dark";
    this.user = await auth.getUser(this.idUserLocal);
    console.log("getUser: ", this.user);
  },

  
};
</script>

<style scoped>
</style>
