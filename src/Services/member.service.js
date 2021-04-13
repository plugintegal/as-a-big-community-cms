import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getAllMember = () => {
  return axios.get(API_URL + "member", {
    headers: authHeader(),
  });
};

export const getMemberDetail = (member_code) => {
  return axios.get(API_URL + "member/" + member_code, {
    headers: authHeader(),
  });
};

export const postMember = (data) => {
  return axios.post(API_URL + "member", data, {});
};
