import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getMoneyService = () => {
  return axios.get(API_URL + "money", {
    headers: authHeader(),
  });
};

export const getMoneyByIdService = (id) => {
  return axios.get(API_URL + "money/" + id, {
    headers: authHeader(),
  });
};

export const storeMoneyService = (token, data) => {
  return axios.post(API_URL + "money", data, {
    headers: authHeader(),
  });
};

export const updateMoneyService = (data, id) => {
  return axios.put(API_URL + "money/" + id, data, {
    headers: authHeader(),
  });
};
