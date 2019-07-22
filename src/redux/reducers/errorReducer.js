import { ERRORS } from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
