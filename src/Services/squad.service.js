import axios from "axios";

import { API_URL } from "../Utils/API";
import authHeader from "./auth-header";

const getSquad = () => {
  return axios.get(API_URL + "squad", {
    headers: authHeader(),
  });
};

const postSquad = (squads_name, description) => {
  return axios.post(
    API_URL + "squad",
    {
      squads_name,
      description,
    },
    {
      headers: authHeader(),
    }
  );
};

const updateSquad = (id, body) => {
  return axios.put(API_URL + "squad/" + id, body, {
    headers: authHeader(),
  });
};

const deleteSquad = (id) => {
  return axios.delete(API_URL + "squad/" + id, {
    headers: authHeader(),
  });
};
// eslint-disable-next-line
export default { getSquad, postSquad, updateSquad, deleteSquad };
