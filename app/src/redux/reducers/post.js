import { POST } from "../actions/types";

const initialState = [];

const post = (state = initialState, action) => {
  switch (action.type) {
    case POST:
      return action.payload;
    default:
      return state;
  }
};

export default post;
