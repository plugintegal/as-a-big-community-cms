import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getAllCategoryEventService = () => {
  return axios.get(API_URL + "category-events/", {
    headers: authHeader(),
  });
};

export const postCategoryEventService = (data) => {
  return axios.post(API_URL + "category-events/", data, {
    headers: authHeader(),
  });
};

export const updateCategoryEventService = (id, data) => {
  return axios.put(API_URL + "category-events/" + id, data, {
    headers: authHeader(),
  });
};

export const deleteCategoryEventService = (id) => {
  return axios.delete(API_URL + "category-events/" + id, {
    headers: authHeader(),
  });
};
