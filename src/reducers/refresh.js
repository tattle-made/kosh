import { REFRESH } from "../actions/types";

const refresh = (state = null, action) => {
  switch (action.type) {
    case REFRESH:
      return action.payload;
    default:
      return state;
  }
};

export default refresh;
