// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios"

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

const USER_LOGIN = API_URL + "/api/auth/login";
const REGISTER_URL = API_URL + "/api/auth/register";

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
