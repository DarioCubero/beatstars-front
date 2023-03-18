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
        console.log(error);
        return null;
      });
  },
  async getBeats() {
    return axios
      .get(`${BEATS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },
  async updateBeat() {
    return axios
      .post(`${BEATS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },

  //Pedido
  async getPedido(_idPedido) {
    return axios
      .get(`${PEDIDO_URL}/${_idPedido}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },
  async getPedidoBeats(_idPedido) {
    return axios
      .get(`${PEDIDO_URL}/${_idPedido}/beats`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },

  async getPedidos() {
    return axios
      .get(`${PEDIDOS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },

  //User
  async getUsers() {
    return axios
      .get(`${USERS_URL}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },
  async getUserBeats(_id) {
    return axios
      .get(`${USER_URL}${_id}/beats`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },
  async getUserPedidos(_id) {
    return axios
      .get(`${USER_URL}${_id}/pedidos`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },




};