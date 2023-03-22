// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios";

const BASE_URL = "https://localhost:7209/api/";
const USER_URL = BASE_URL + "user";
const REGISTER_URL = BASE_URL + "user/create";

export default {

  async postLogin(userForLogin) {
    return axios
      .post(`${USER_URL}/login`, userForLogin)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return -1;
      });
  },

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
    console.log(`updateUser ${USER_URL}/${_idUser}/update`);
    return axios
      .put(`${USER_URL}/${_idUser}/update`, userEntity)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return null;
      });
  },

  async postRegister(userEntity) {
    return axios
      .post(REGISTER_URL, userEntity)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
      });
  },

  setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },

  getLocalStorage(key) {
    return localStorage.getItem(key);
  },

  closeSession() {
    localStorage.clear();
  },


};
