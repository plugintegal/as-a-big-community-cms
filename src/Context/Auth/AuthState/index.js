import React, { useReducer } from "react";
import authContext from "../AuthContext/";
import authReducer from "../AuthReducer/";

import {
  getCookie,
  setCookie,
  setLocalStorage,
  removeLocalStorage,
  removeCookie,
  getLocalStorage,
} from "../../../Utils/AuthHelpers/";

const AuthState = (props) => {
  const initialState = {
    user_info: null,
    isAuthenticated: null,
    loading: true,
    error: null,
    clearError: null,
    message: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  const loginUser = async (result) => {
    setLoading();
    setCookie("user", result);
    setLocalStorage("token", result.token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: result,
    });
  };

  const isAuthUser = () => {
    setLoading();
    if (window !== "undefined") {
      const cookieCheked = getCookie("user");
      const auth_user = getLocalStorage("token");
      if (cookieCheked && auth_user) {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: JSON.parse(cookieCheked),
        });
      } else {
        dispatch({
          type: "AUTH_FAIL",
        });
      }
    }
  };
  const logout = () => {
    setLoading();
    if (window !== "undefined") {
      if (getCookie("user")) {
        removeCookie("user");
      }
      if (getLocalStorage("token")) {
        removeLocalStorage("token");
      }
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        user_info: state.user_info,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        message: state.message,
        loginUser,
        setLoading,
        isAuthUser,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );

};

export default AuthState;