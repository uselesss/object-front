import axios from "axios";

const API_URL = "http://80.87.192.94:8080/api";
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type':'application/x-www-form-urlencoded'

}


const register = (username, email, password) => {
  return axios.post(API_URL + "/signin", {
    username,
    email,
    password,
  }, {headers:headers});
};

const login = (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username)
  params.append('password',password)
  return axios
    .post(API_URL + "/login", params)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
