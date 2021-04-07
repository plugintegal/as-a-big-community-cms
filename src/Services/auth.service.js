import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const signInServices = (username, password) => {
  return axios
    .post(API_URL + "auth/admin/sign-in", {
      username,
      password,
    })
    .then((data) => {
      if (data.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.data.data));
        return data.data;
      }
    });
};

export const signUpServices = (data) => {
  return axios.post(API_URL + "auth/sign-up", data);
};

export const signOutServices = () => {
  return axios
    .post(
      API_URL + "auth/sign-out",
      {},
      {
        headers: authHeader(),
      }
    )
    .then((data) => {
      if (data.status === 200) {
        localStorage.removeItem("user");
        return data.data;
      }
    });
};
