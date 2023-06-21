// Librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP
import axios from "axios"

// const API_URL = "https://beatstars.azurewebsites.net/api/auth/";
// const API_URL = "https://localhost:7209/api/auth/";
// const API_URL = "http://+:8001/api/auth/";

let API_URL = "";
if (process.env.VUE_APP_MODE == "dev") {
	API_URL = process.env.VUE_APP_API_URL_DEV;
}

if (process.env.VUE_APP_MODE == "compose") {
	API_URL = process.env.VUE_APP_API_URL_COMPOSE;
}

if (process.env.VUE_APP_MODE == "azure") {
	API_URL = process.env.VUE_APP_API_URL_AZURE;
}

// process.env.API_URL
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
