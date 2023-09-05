// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios";

let API_URL = "";
if (process.env.VUE_APP_MODE.toUpperCase() == "DEV") {
	API_URL = process.env.VUE_APP_API_URL_DEV;
}else if (process.env.VUE_APP_MODE.toUpperCase() == "COMPOSE") {
	API_URL = process.env.VUE_APP_API_URL_COMPOSE;
}else if(process.env.VUE_APP_MODE.toUpperCase() == "AZURE") {
	API_URL = process.env.VUE_APP_API_URL_AZURE;
}else{
  API_URL = process.env.VUE_APP_API_URL_DEV;
}

const USER_URL = API_URL + "/api/user";
const ORDER_URL = API_URL + "/api/pedido";
const BEAT_URL = API_URL + "/api/beat";

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

	async getBeats(sortBy, filterBy, sortOrder, searchString) {
		console.log(`getBeats ${BEAT_URL}`);
		return axios
			.get(`${BEAT_URL}`, {
				params: {
					sortBy: sortBy,
					filterBy: filterBy,
					sortOrder: sortOrder,
					searchString: searchString,
				},
			})
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

	async createOrder(data) {
		console.log(`createOrder ${ORDER_URL}`);
		return (
			axios
				// .post(`${ORDER_URL}`, { params: { _IdBeatList: idBeatList, _IdUser : idUser }}, orderEntity) //_IdBeatList ?? _IdUser ??
				.post(`${ORDER_URL}`, data)
				.then((response) => response.data)
				.catch(function (error) {
					console.log("Error response: ", error.response.data); // ***
					return null;
				})
		);
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

	//getUsers
	async getUsers(sortBy, sortOrder, searchString) {
		console.log(`getUsers ${USER_URL}`);
		return axios
			.get(`${USER_URL}`, {
				params: {
					sortBy: sortBy,
					sortOrder: sortOrder,
					searchString: searchString,
				},
			})
			.then((response) => response.data)
			.catch(function (error) {
				console.log("Error response: ", error.response.data);
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
