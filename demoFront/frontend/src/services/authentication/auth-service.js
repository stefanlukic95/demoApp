import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  async login(username, password) {
    return axios
      .post(API_URL + "token/generate-token", {
        username,
        password
      })
      .then(response => {      
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getAuthHeader() {
    return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
 }
}

export default new AuthService();