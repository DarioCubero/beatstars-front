<template>
  <div id="beats">
    <Header />

    <v-main style="padding: 0px 0px 0px; !important">
      <v-container>
        <h1 class="my-5 text-decoration-underline">
          {{ $t(beatSelected.Nombre) }}
        </h1>
        <v-sheet width="300" class="mx-auto">
          <v-form ref="form" @submit.prevent="validate">
            <v-select
              :items="this.typeBeats"
              :rules="[rules.required]"
              label="Calidad"
            >
            </v-select>
            <div
              class="text-caption-3"
              style="text-align: left; padding-bottom: 2px"
            >
              Cantidad: {{ compra.cantidad }}
            </div>
            <v-slider
              v-model="compra.cantidad"
              :min="1"
              :max="50"
              :step="1"
              thumb-label
            ></v-slider>
            <div
              class="text-caption-3"
              style="text-align: left; padding-bottom: 5px"
            >
              Color
            </div>
            <v-select
              :items="colors"
              item-text="name"
              item-value="id"
              :rules="[rules.required]"
              label="Color"
              v-model="compra.producto.color.id"
            >
            </v-select>
            <v-btn type="submit" block class="mt-4" color="success"
              >Añadir al carrito</v-btn
            >
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
// import Api from '@/services/api';

export default {
  components: {
    Header,
    Footer,
  },

  typeBeats: {
    items: ["Rap", "Rock", "Trap", "Reggae"],
  },

  data() {
    // const idBeatSelected = this.$route.params.id;
    // const selected = beats.filter((beat) => {
    //   return beat.id == idBeatSelected;
    // });

    // return {
    //   id: idBeatSelected,
    //   compra: {
    //     beatList: [],
    //     userId,
    //   },
    //   rules: {
    //     required: (value) => !!value || "Required.",
    //   },
    // };
  },
};
</script>

<style scoped>
</style>
