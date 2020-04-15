import { USER_SELECT } from "../actions/types";

const selectedUserData = {
  id: "",
  username: "",
  email: "",
  role: "",
  team: ""
};

const selectedUser = (state = selectedUserData, action) => {
  switch (action.type) {
    case USER_SELECT:
      return action.payload;
    default:
      return state;
  }
};

export default selectedUser;
