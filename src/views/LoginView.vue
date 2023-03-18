<template>
  <v-main>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col class="card" cols="12" lg="3" md="6" sm="12">
          <AlertComponent
            v-if="boolAlert"
            :message="alertMessage"
            :type="typeAlert"
          />
          <LoginComponent @isValid="CheckAlert" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  data() {
    return {
      typeAlert: "Info",
      boolAlert: false, // The alert get value (false => hide. True => show).
      alertMessage: "Incorrect Username or Password!",
      show: false,
      // user: { NombreCuenta: "", Password: "" },
      // rules: {
      //   required: (value) => !!value || "Required.",
      // },
    };
  },

  methods: {
    async CheckAlert(bool) {
      this.boolAlert = !bool;
    },
  },
  components: {
    LoginComponent,
    AlertComponent,
  },
};
</script>
<style scoped>
.container {
  background: #000000;
}

/* .v-alert {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
} */
</style>