// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios";

const BASE_URL = "https://localhost:7209/api/";

// Single
const USER_URL = BASE_URL + "user";
const PEDIDO_URL = BASE_URL + "pedido";
const BEAT_URL = BASE_URL + "beat";

// List
const USERS_URL = BASE_URL + "users";
const BEATS_URL = BASE_URL + "beats";
const PEDIDOS_URL = BASE_URL + "pedidos";

// const GET_USER_PEDIDOS = BASE_URL + "users";

export default {
  // Beat
  async getBeat(_idBeat) {
    return axios
      .get(`${BEAT_URL}/${_idBeat}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  async getBeats() {
    console.log(`getBeats ${BEATS_URL}`);
    return axios
      .get(`${BEATS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
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

  async updateBeat(_idBeat) {
    console.log(`updateBeat ${BEAT_URL}/${_idBeat}/update`);
    return axios
      .post(`${BEAT_URL}/${_idBeat}/update`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  //Pedido
  async getPedido(_idPedido) {
    return axios
      .get(`${PEDIDO_URL}/${_idPedido}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },
  async getPedidoBeats(_idPedido) {
    return axios
      .get(`${PEDIDO_URL}/${_idPedido}/beats`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  async getPedidos() {
    return axios
      .get(`${PEDIDOS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  //User
  async getUsers() {
    return axios
      .get(`${USERS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  async createBeat(beatEntity) {
    console.log(beatEntity);
    console.log(`createBeat ${BEAT_URL}/create`);
    return axios
      .post(`${BEAT_URL}/create`, beatEntity)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  async setBeat(_idBeat, beatEntity) {
    console.log(`updateBeat ${BEAT_URL}/${_idBeat}/update`);
    return axios
      .put(`${BEAT_URL}/${_idBeat}/update`, beatEntity)
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
    console.log(`deleteUser ${USER_URL}/${_idUser}/delete`);
    return axios
      .delete(`${USER_URL}/${_idUser}/delete`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },
};
