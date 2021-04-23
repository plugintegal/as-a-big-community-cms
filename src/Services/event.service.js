import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader, FormData } from "./auth-header";

export const getAllEventService = () => {
    return axios.get(API_URL + 'events');
}

export const postEventService = (data) => {
    return axios.post(API_URL + 'events', data, {
        headers: FormData()
    });
}