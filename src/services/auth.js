// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios";

const BASE_URL = "https://localhost:7209/api/auth/";
const USER_LOGIN = BASE_URL + "login";
const REGISTER_URL = BASE_URL + "register";

export default {

  async postLogin(userForLogin) {
    return axios
      .post(`${USER_LOGIN}`, userForLogin)
      .then((response) => response.data)
      .catch(function (error) {
        console.log("Error response: ", error.response.data); // ***
        return -1;
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
