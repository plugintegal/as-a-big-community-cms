import axios from "axios";

import { API_URL } from "../Utils/API";
import authHeader from "./auth-header";

const getTheories = (id) => {
  return axios.get(API_URL + "theory/squad/" + id, {
    headers: authHeader(),
  });
};

const postTheory = (data, token) => {
  return axios.post(API_URL + "theory", data, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": "Bearer " + token,
    },
  });
};

export default { getTheories, postTheory };
