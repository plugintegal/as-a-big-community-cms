import axios from "axios";

import { API_URL } from "../../Utils/API";
import authHeader from "./auth-header";

const signIn = (username, password) => {
  return axios
    .post(API_URL + "auth/sign-in", {
      username,
      password,
    })
    .then((data) => {
      if (data.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.data.data));
        return data.data;
      }
    });
};

const signOut = () => {
  return axios.post(
    API_URL + "auth/sign-out",
    {},
    {
      headers: authHeader(),
    }
  );
};

// eslint-disable-next-line
export default { signIn, signOut };
