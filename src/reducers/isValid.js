import { IS_VALID } from "../actions/types";

export default function(state = false, action) {
  switch (action.type) {
    case IS_VALID:
      return action.payload;
    default:
      return state;
  }
}
