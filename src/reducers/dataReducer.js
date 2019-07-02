import { SEARCH, POSTS, CONTENT_LOADING } from "../actions/types";
const initialState = {
  data: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTENT_LOADING:
      return { ...state, loading: true };
    case SEARCH:
      return { ...state, loading: false, data: action.payload };
    case POSTS:
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
}
