<template>
  <v-alert class="alert" closable :type="typeAlert" variant="outlined"
    >{{ messageAlert }}</v-alert
  >
  <!-- <v-alert type="success"> I'm a success alert. </v-alert> -->
  <!-- <v-alert type="info"> I'm an info alert. </v-alert>
    <v-alert type="warning"> I'm a warning alert. </v-alert>
    <v-alert type="error"> I'm an error alert. </v-alert> -->
</template>

<script>
export default {
  props: {
    messageAlert: String,
    typeAlert: String,
  },
};
</script>

<style>
</style>