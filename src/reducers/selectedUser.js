import { USER_SELECT } from "../actions/types";

const selectedUser = {
  id: "",
  username: "",
  email: "",
  role: "",
  team: ""
};

export default function(state = selectedUser, action) {
  switch (action.type) {
    case USER_SELECT:
      return action.payload;
    default:
      return state;
  }
}
