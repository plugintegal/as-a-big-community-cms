import axios from "axios";

import { API_URL } from "../Utils/API";

export const changeStatusParticipantService = (participantId) => {
  return axios.post(API_URL + "participant/status/" + participantId);
};

export const sendCertificateToParticipantEventService = (eventId) => {
  return axios.post(API_URL + "participant/send-certificate?event_id=" +eventId);
}