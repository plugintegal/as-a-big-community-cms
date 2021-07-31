import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const postGradeService = (data) => {
  return axios.post(API_URL + "grade", data, {
    headers: authHeader(),
  });
};
