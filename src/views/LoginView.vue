<template>
  <v-main>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col class="card" cols="12" lg="3" md="6" sm="12">
          <AlertComponent
            v-if="alertObject.status"
            :message="alertObject.message"
            :type="alertObject.type"
          />
          <LoginComponent @sendAlert="getAlert" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "login-view",

  data() {
    return {
      alertObject: {
        status: false, // The alert get value (false => hide. True => show).
        message: "",
        type: "",
      },
      alertMessage: "Incorrect Username or Password!",
      show: false,
      // user: { NombreCuenta: "", Password: "" },
      // rules: {
      //   required: (value) => !!value || "Required.",
      // },
    };
  },

  methods: {
    
    async getAlert(alertReceive) {
      this.alertObject.status = alertReceive.status;
      this.alertObject.type = alertReceive.type;
      this.alertObject.message = alertReceive.message;
    },
  },
  components: {
    LoginComponent,
    AlertComponent,
  },
};
</script>
<style scoped>
/* .v-alert {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
} */
</style>
