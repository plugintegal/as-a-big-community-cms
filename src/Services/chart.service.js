import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const chartIncomeService = () => {
  return axios.get(API_URL + "chart/income", {
    headers: authHeader(),
  });
};

export const chartOutcomeService = () => {
  return axios.get(API_URL + "chart/outcome", {
    headers: authHeader(),
  });
};
