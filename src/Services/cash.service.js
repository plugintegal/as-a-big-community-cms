import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const storeCash = (data) => {
    return axios.post(API_URL + 'cash', data, {
        headers : authHeader()
    });
}