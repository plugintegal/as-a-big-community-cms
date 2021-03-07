export default (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      };

    case "REGISTER_FAIL":
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        message: "success",
        isAuthenticated: true,
        user_info: action.payload,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
        isAuthenticated: null,
        user_info: null,
      };

    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user_info: action.payload,
      };

    case "AUTH_FAIL":
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        user_info: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
