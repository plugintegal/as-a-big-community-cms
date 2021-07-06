import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getCashDataByTheoryService = (theory_id, batch_id, squad_id) => {
  return axios.get(
    `${API_URL}money/list-member?theory_id=${theory_id}&batch_id=${batch_id}&squad_id=${squad_id}`,
    {
      headers: authHeader(),
    }
  );
};

export const storeCash = (data) => {
  return axios.post(API_URL + "cash", data, {
    headers: authHeader(),
  });
};
