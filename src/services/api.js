// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios";

const BASE_URL = "https://localhost:7209/api/";

// Single
const USER_URL = BASE_URL + "user";
const ORDER_URL = BASE_URL + "pedido";
const BEAT_URL = BASE_URL + "beat";

// List
// const USER_URL = BASE_URL + "users";
// const BEAT_URL = BASE_URL + "beats";
// const ORDER_URL = BASE_URL + "pedidos";

// const GET_USER_PEDIDOS = BASE_URL + "users";

export default {
	// Beat
	async getBeat(_idBeat) {
		return axios
			.get(`${BEAT_URL}/${_idBeat}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
				return null;
			});
	},

	async getBeats() {
		console.log(`getBeats ${BEAT_URL}`);
		return axios
			.get(`${BEAT_URL}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
				return null;
			});
	},

	async deleteBeat(_idBeat) {
    console.log(`deleteBeat ${BEAT_URL}/${_idBeat}`);
		return axios
			.delete(`${BEAT_URL}/${_idBeat}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
				return null;
			});
	},

	async createBeat(beatEntity) {
		console.log(beatEntity);
		console.log(`createBeat ${BEAT_URL}`);
		return axios
			.post(`${BEAT_URL}`, beatEntity)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},

	async updateBeat(_idBeat, beatEntity) {
    console.log(`updateBeat ${BEAT_URL}/${_idBeat}`);
		return axios
			.put(`${BEAT_URL}/${_idBeat}`, beatEntity)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
				return null;
			});
	},


	//TODO: Pending filtrado por QUERY PARAM
	// async getBeatsByName(beatName){//pending hacer el filtrado por query param
	//   return axiosa
	//     .get(`${BASE_URL}/beatsFilter`, {params: {'beatName':beatName}})
	//     .then((response) => response.data)
	//     .catch(function (error) {
	//       console.log("Error response: ", error.response.data); // ***
	//       return null;
	//     });
	// },

	//Pedido
	async getPedido(_idPedido) {
		return axios
			.get(`${ORDER_URL}/${_idPedido}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},
	async getPedidoBeats(_idPedido) {
		return axios
			.get(`${ORDER_URL}/${_idPedido}/beats`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},

	async getPedidos() {
		return axios
			.get(`${ORDER_URL}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},

	async deletePedido(_idPedido) {
    console.log(`deletePedido ${ORDER_URL}/${_idPedido}`);
		return axios
			.delete(`${ORDER_URL}/${_idPedido}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
				return null;
			});
	},

	async deleteOrder(_idPedido) {
    console.log(`deleteOrder ${ORDER_URL}/${_idPedido}`);
		return axios
			.delete(`${ORDER_URL}/${_idPedido}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
				return null;
			});
	},


	//User
  async getUser(_IdUser) {
    return axios
      .get(`${USER_URL}/${_IdUser}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  async updateUser(_idUser, userEntity) {
    console.log(`updateUser ${USER_URL}/${_idUser}`);
    return axios
      .put(`${USER_URL}/${_idUser}`, userEntity)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

	async getUsers() {
		return axios
			.get(`${USER_URL}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},

	async getUserBeats(_id) {
		console.log(`getUserBeats ${USER_URL}/${_id}/beats`);

		return axios
			.get(`${USER_URL}/${_id}/beats`)
			.then((response) => response.data)
			.catch(function (err) {
				console.log("Error response: ", err.response.data); // ***
				// console.error(err.response.status);  // *** 404
				return null;
			});
	},

	async getUserPedidos(_id) {
		return axios
			.get(`${USER_URL}/${_id}/pedidos`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},

	async deleteUser(_idUser) {
		console.log(`deleteUser ${USER_URL}/${_idUser}`);
		return axios
			.delete(`${USER_URL}/${_idUser}`)
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data); // ***
				return null;
			});
	},
};
