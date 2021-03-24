import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import authServices from "../services/auth.service";

export const signIn = (username, password) => (dispatch) => {
  return authServices.signIn(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.error ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const signOut = () => (dispatch) => {
  authServices.signOut();

  dispatch({ type: LOGOUT });
};
