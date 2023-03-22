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
                    counter="20"
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
                    counter="50"
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
                    counter="20"
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
                    counter="20"
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
                    >Register</v-btn
                  >
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
import auth from "@/services/auth";
import { mapActions } from "vuex";

let currentDate = new Date();

export default {
  name: "LoginForm",
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
      required: (v) => !!v || "Required.",
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
  }),

  methods: {
    ...mapActions(["vuexGetUser"]),


    async validateLogin() {
      const valid = await this.$refs.loginForm.validate();
      if (valid) {
        this.user.NombreCuenta = this.NombreAndEmail;
        this.user.Email = this.NombreAndEmail;
        let idLoggedUser = await auth.postLogin(this.user);
        console.log(idLoggedUser);
        if (idLoggedUser != -1) {
          auth.setLocalStorage("userId", idLoggedUser);
          this.vuexGetUser(idLoggedUser);
          this.$router.push({ name: "home" });
          console.log('Logeado');
        } else {
          console.info('Login incorrecto. Vuelva a intentarlo.');
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
        this.tab = 0; //lo redireccionamos al login y le enviamos una alerta type success
        this.$refs.registerForm.reset();
      }
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
