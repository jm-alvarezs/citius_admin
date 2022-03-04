import { navigate } from "@reach/router";
import axios from "axios";
import { BASE_URL } from "../utils";
import AuthService from "./AuthService";

const api = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        AuthService.signOut();
        navigate("/");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
