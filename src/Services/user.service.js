import axios from "axios";

import { API_URL } from "../Utils/API";
import authHeader from "./auth-header";

const getAllUser = (token) => {
  return axios.get(API_URL + "user", {
    headers: authHeader(),
  });
};


export default { getAllUser};
