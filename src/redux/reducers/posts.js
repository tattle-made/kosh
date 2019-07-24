import { POSTS } from "../actions/types";

const initialState = [];

const posts = (state = initialState, action) => {
  switch (action.type) {
    case POSTS:
      return action.payload;
    default:
      return state;
  }
};

export default posts;
