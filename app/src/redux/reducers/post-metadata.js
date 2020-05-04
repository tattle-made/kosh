import { POST_METADATA } from "../actions/types";

const initialState = [];

const postMetadata = (state = initialState, action) => {
  switch (action.type) {
    case POST_METADATA:
      return action.payload;
    default:
      return state;
  }
};

export default postMetadata;
