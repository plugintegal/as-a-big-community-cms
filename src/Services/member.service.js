import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getAllMember = () => {
    return axios.get(API_URL + 'member', {
        headers: authHeader(),
    });
}