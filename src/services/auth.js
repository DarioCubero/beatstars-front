// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios";

const BASE_URL = "https://localhost:7209/api/";
const USER_URL = BASE_URL + "user";
const REGISTER_URL = BASE_URL + "user/create";

export default {
  // watch: {
  //   input: function () {
  //     if (
  //       isLocalStorage() /* function to detect if localstorage is supported*/
  //     ) {
  //       localStorage.setItem("storedData", this.input);
  //     }
  //   },
  // },

  async postLogin(userForLogin) {
    return axios
      .post(`${USER_URL}/login`, userForLogin)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return -1;
      });
  },

  async getUser(_IdUser) {
    return axios
      .get(`${USER_URL}/${_IdUser}`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },

  async postRegister(userEntity) {
    return axios
      .post(REGISTER_URL, userEntity)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
  },

  setUserLocal(userEntity) {
    localStorage.setItem("user", userEntity);
  },

  getUserLocal(userEntity) {
    localStorage.getItem("user", userEntity);
  },

  closeSession() {
    localStorage.clear();
  },


};
