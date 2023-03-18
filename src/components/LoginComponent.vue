<template>
  <v-card color="black" max-width="800px" min-width="600px">
    <v-card-title class="text-center justify-center">
      <v-img
        width="400"
        :src="require('@/assets/images/logo_full.svg')"
      ></v-img>
    </v-card-title>
    <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
      <v-tabs-slider
        :class="tab === highlightTab ? 'slider-login' : 'slider-register'"
      ></v-tabs-slider>
      <v-tab
        :class="tab === highlightTab ? 'tab-login' : 'tab-register'"
        v-for="(item, i) in tabs"
        :key="i"
      >
        <v-icon large>{{ item.icon }}</v-icon>
        <div class="caption py-1">{{ item.name }}</div>
      </v-tab>

      <!-- LOGIN -->
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-form ref="loginForm" v-model="validLogin" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="NombreAndEmail"
                    :rules="[rules.required]"
                    label=" Nombre de Cuenta / Email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.Password"
                    :append-icon="
                      showBoolPasswordLogin ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[rules.required, rules.min6Char]"
                    :type="showBoolPasswordLogin ? 'text' : 'password'"
                    name="loginPassword"
                    label="Password"
                    hint="Al menos 6 carácteres"
                    counter
                    @click:append="
                      showBoolPasswordLogin = !showBoolPasswordLogin
                    "
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                  <v-btn
                    class="white--text"
                    color="#f52626"
                    x-large
                    block
                    :disabled="!validLogin"
                    @click="validateLogin"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- REGISTER -->
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-form ref="registerForm" v-model="validRegister" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="user.NombreCuenta"
                    :rules="[
                      rules.required,
                      rules.min6Char,
                      rules.userNameMaxChar,
                    ]"
                    label="Nombre de Usuario"
                    minLenght="6"
                    maxlength="20"
                    hint="At least 6 characters"
                    required
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="firstName"
                    :rules="[rules.required]"
                    label="First Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="lastName"
                    :rules="[rules.required]"
                    label="Last Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col> -->
                <v-col cols="12">
                  <v-text-field
                    v-model="user.Email"
                    :rules="rules.emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.Password"
                    :append-icon="
                      showBoolPasswordRegister ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[
                      rules.required,
                      rules.min6Char,
                      rules.passwordMaxChar,
                    ]"
                    :type="showBoolPasswordRegister ? 'text' : 'password'"
                    name="RegisterPassword"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="
                      showBoolPasswordRegister = !showBoolPasswordRegister
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    block
                    v-model="registerPasswordVerify"
                    :append-icon="
                      showBoolPasswordRegister ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[rules.required, passwordMatch]"
                    :type="showBoolPasswordRegister ? 'text' : 'password'"
                    name="registerPasswordVerifyName"
                    label="Confirm Password"
                    counter
                    @click:append="
                      showBoolPasswordRegister = !showBoolPasswordRegister
                    "
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                  <v-btn
                    class="white--text"
                    x-large
                    block
                    color="black"
                    :disabled="!validRegister"
                    @click="validateRegister"
                    >Register</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import auth from "@/services/auth";

let currentDate = new Date();

export default {
  name: "LoginForm",
  watch: {},
  data: () => ({
    tab: null,
    highlightTab: 0,
    validLogin: true,
    validRegister: true,
    registerPasswordVerify: "",

    showBoolPasswordLogin: "",
    showBoolPasswordRegister: "",
    // tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-plus-outline" },
    ],
    NombreAndEmail: "",
    user: {
      NombreCuenta: "",
      Email: "",
      Password: "",
      Cartera: 0,
      DateCreated: currentDate,
      Rol: "estandar",
      Activo: true,
    },
    alertObject: {
      status: false,
      message: "",
      type: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min6Char: (v) => v.length >= 6 || "Min 6 characters",
      userNameMaxChar: (v) => v.length < 20 || "Max 20 characters",
      emailMaxChar: (v) => v.length < 20 || "Max 20 characters",
      passwordMaxChar: (v) => v.length < 15 || "Max 15 characters",
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) => v.length >= 6 || "Min 6 characters",
        (v) => v.length < 30 || "Max 30 characters",
      ],
    },
  }),

  methods: {
    ...mapActions(["getUser"]),

    async validateLogin() {
      const valid = await this.$refs.loginForm.validate();
      if (valid) {
        alert("validateLogin");
        this.user.NombreCuenta = this.NombreAndEmail;
        this.user.Email = this.NombreAndEmail;
        let id = await auth.postLogin(this.user);
        if (id == 1) {
          auth.setUserLocal(id);
          this.getUser(id);
          this.$router.push({ name: "home" });
        } else {
          this.alertObject.status = false;
          this.alertObject.type = "error";
          this.alertObject.message = "Incorrect Username or Password!";
          this.$emit("sendAlert", this.alertObject);
        }
      }
    },
    async validateRegister() {
      const valid = await this.$refs.registerForm.validate();
      if (valid) {
        alert("validateRegister");
        const registerInfo = auth.postRegister(this.user);
        console.log(registerInfo);
        // this.$router.push({ name: "login" });
        this.tab = 0; //lo redireccionamos al login
      }
    },

    reset() {
      this.$refs.form.reset();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },

  computed: {
    passwordMatch() {
      // console.log( this.user.Password === this.registerPasswordVerify);
      return () =>
        this.user.Password === this.registerPasswordVerify ||
        "Password must match";
    },
  },
};
</script>
<style lang="scss">
.v-tabs-slider-wrapper {
  height: 5px !important;
}

.tab-login {
  background-color: black !important;
}
.tab-register {
  background-color: #f52626 !important;
}

.slider-register {
  background-color: black !important;
}

.slider-login {
  background-color: #f52626 !important;
}

.v-card {
  padding: 30px;
}
</style>
