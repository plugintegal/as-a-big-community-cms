import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getAllUser = (token) => {
  return axios.get(API_URL + "user", {
    headers: authHeader(),
  });
};


