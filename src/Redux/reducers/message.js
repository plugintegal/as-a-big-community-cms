import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {
  message : ""
};

// eslint-disable-next-line
export default (state = initialState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: "" };

    default:
      return state;
  }
};
