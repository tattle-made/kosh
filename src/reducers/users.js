import { USERS } from "../actions/types";

const users = [];

export default function(state = users, action) {
  switch (action.type) {
    case USERS:
      return action.payload;
    default:
      return state;
  }
}
