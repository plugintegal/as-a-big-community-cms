import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader, FormData } from "./auth-header";

export const getTheories = (batch_id, squad_id) => {
  return axios.get(`${API_URL}theory/batch?batch_id=${batch_id}&squad_id=${squad_id}`, {
    headers: authHeader(),
  });
};

export const getTheoryById = (id) => {
  return axios.get(API_URL + "theory/" + id, {
    headers: authHeader(),
  });
};

export const postTheory = (data) => {
  return axios.post(API_URL + "theory", data, {
    headers: FormData(),
  });
};

export const updateTheoryActive = (data, id) => {
  return axios.put(API_URL + "theory/status/" + id, data, {
    headers: authHeader(),
  });
};

export const updateTheory = (data, id) => {
  return axios.put(API_URL + "theory/" + id, data, {
    headers: FormData(),
  });
};

export const deleteTheory = (id) => {
  return axios.delete(API_URL + "theory/" + id, {
    headers: authHeader(),
  });
};
