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
