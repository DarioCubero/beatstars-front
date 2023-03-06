<template>
  <v-container fluid id="footer">
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-footer dark bottom color="black">
          <v-row no-gutters>
            <v-col cols="4" md="4">
              <h3>Take Beats on the GO!</h3>
              <img src="../assets/icons/appstore.png" width="170" alt="" />
              <img src="../assets/icons/googleplay.png" width="170" alt="" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4" md="4">
              <h3>BeatStars</h3>
              <v-card class="mx-auto" max-width="300">
                <v-list :items="items"></v-list>
              </v-card>

              <ul class="list-unstyled links">
                <li><a href="#">About us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4" md="4">
              <h3>Support</h3>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4" md="4">
              <h3>Social Media</h3>
            </v-col>
          </v-row>

          <v-card-text>
            <v-btn
              v-for="icon in socialicons"
              :key="icon"
              class="mx-4 white--text"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    socialicons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-linkedin",
      "mdi-instagram",
    ],
    items: [
      {
        title: "Item #1",
        value: 1,
        props: {
          prependIcon: "mdi-home",
        },
      },
      {
        title: "Item #2",
        value: 2,
        props: {
          appendIcon: "mdi-close",
        },
      },
      {
        title: "Item #3",
        value: 3,
        props: {
          color: "primary",
        },
      },
    ],
  }),
};
</script>

<style>
.v-data-footer {
  padding: 0px !important;
}
</style>