import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const postTask = (data, token) => {
  return axios.post(API_URL + "task", data, {
    headers: authHeader(),
  });
};

export const getTaskById = (taskId) => {
  return axios.get(API_URL + "task/" + taskId, {
    headers: authHeader(),
  });
}