<template>
	<Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
	import { Bar } from "vue-chartjs";
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
	} from "chart.js";

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	);

	import Api from "@/services/api";

	export default {
		name: "BarChart",
		components: {
			Bar,
		},
		// props: {
		// 	idUser: Number,
		// },
		data: () => ({
			dialogDelete: false,
			itemsPerPage: 5,
			numBeats: [], //{IdOrder:xxx, numBeats: xxx}
			beats: [],
			countTypeBeat: {},

			// CHART
			chartData: {
				labels: [], //irán los tipos de beat en BBDD
				datasets: [
					{
						label: "Type Beats",
						backgroundColor: "#f87979",
						data: [1,2,1,3,2,4],
					},
				],
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: "Nº de Ventas",
					},
				},
			},
		}),

		async beforeMount() {
			if (this.idUser) {
				this.pedidos = await Api.getUserPedidos(this.idUser);
			} else {
				this.pedidos = await Api.getPedidos();
			}
			if (this.pedidos) {
				await this.pedidos.forEach(async (x) => {
					const beatsPedido = await Api.getPedidoBeats(x.id);
					await beatsPedido.forEach(async (x) => {
						if (!this.chartData.labels.includes(x.tipo)) {
							//SOLO inserta los TypeBeat sin repetir
							this.chartData.labels.push(x.tipo);
							this.countTypeBeat[x.tipo] = 0; //Inicializa el typebeat key:value
						}
						this.recuentoBeats(x.tipo);
					});
				}); //END FOREACH
			}
			console.log(this.countTypeBeat);
		},

		created() {
			// ChartJS.config.data.labels = ["test1", "test2"];
			// ChartJS.config.data.datasets[0].data = [99,99];
			Bar.update(); //TODO: fix error
		},

		methods: {
			recuentoBeats(tipo) {
				if (!(tipo in this.countTypeBeat)) {
					this.countTypeBeat[tipo] = 1;
				} else {
					this.countTypeBeat[tipo] += 1;
				}
			},
		},
	};
</script>
<style scoped>
	#my-chart-id {
		max-height: 600px;
	}
</style>
