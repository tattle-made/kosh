import { REFRESH } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case REFRESH:
      return action.payload;
    default:
      return state;
  }
}
