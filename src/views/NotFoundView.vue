<template>
<v-main>
    <v-container fluid id="cont">
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <h1>404</h1>
        </v-col>
        <v-col cols="12" md="12">
          <h5>Page not found</h5>
        </v-col>
      </v-row>
      <v-row no-gutters>

      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'NotFoundView',

data() {
  return{
    items: [

    ]
  };
}

}
</script>

<style>

#cont{
    background-image: "../assets/gifs/pug.gif";
    background-size: cover;
    
    height: 100vh;
    padding:0;
    margin:0;
}
</style>