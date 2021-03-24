import axios from "axios";

import { API_URL } from "../../Utils/API";
import authHeader from "./auth-header";

const getSquad = () => {
    return axios
    .get(API_URL + 'squad', {
        headers: authHeader()
    });
}

export default {getSquad};