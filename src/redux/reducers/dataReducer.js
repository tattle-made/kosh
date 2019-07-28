import { SEARCH, POSTS, CONTENT_LOADING } from "../actions/types";
const initialState = {
  loading: false
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_LOADING:
      return { ...state, loading: true };
    case SEARCH:
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
