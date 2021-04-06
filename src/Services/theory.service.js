import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getTheories = (id) => {
  return axios.get(API_URL + "theory/squad/" + id, {
    headers: authHeader(),
  });
};

export const getTheoryById = (id) => {
  return axios.get(API_URL + "theory/" + id, {
    headers: authHeader(),
  });
};

export const postTheory = (data, token) => {
  return axios.post(API_URL + "theory", data, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": "Bearer " + token,
    },
  });
};

export const updateTheory = (data, id, token) => {
  return axios.put(API_URL + "theory/" + id, data, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": "Bearer " + token,
    },
  });
};

export const deleteTheory = (id) => {
  return axios.delete(API_URL + "theory/" + id, {
    headers: authHeader(),
  });
};
