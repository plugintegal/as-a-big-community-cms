import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getAllBatch = () => {
  return axios.get(API_URL + "batch/", {
    headers: authHeader(),
  });
};

export const postBatch = (data) => {
  return axios.post(API_URL + "batch/", data, {
    headers: authHeader(),
  });
};

export const updateBatch = (data, id) => {
  return axios.put(API_URL + "batch/" + id, data, {
    headers: authHeader(),
  });
};

export const deleteBatch = (id) => {
  return axios.delete(API_URL + "batch/" + id, {
    headers: authHeader(),
  });
};
