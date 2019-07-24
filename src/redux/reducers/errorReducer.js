import { ERROR } from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
