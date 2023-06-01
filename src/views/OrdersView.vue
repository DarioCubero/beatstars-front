<template>
  <div id="home">
    <Header />
    <v-main style="padding: 0px 0px 0px; !important;">
      <v-container fluid class="pa-10">
        <!-- title -->
				<v-row class="mt-1 pb-7">
          <v-icon style="font-size: 2.5rem; margin-left: 160px">mdi-list-box mdi-light</v-icon>
					<h1>
						<div ref="title">Pedidos</div>
					</h1>
				</v-row>

        <OrderList></OrderList>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import OrderList from "@/components/OrdersDataTableComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  name: "pedidos-view",

  components: {
    Header,
    Footer,
    OrderList,
  },
};
</script>

<style scoped>
</style>
