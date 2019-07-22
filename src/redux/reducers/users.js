import { USERS } from "../actions/types";

const usersData = [];

const users = (state = usersData, action) => {
  switch (action.type) {
    case USERS:
      return action.payload;
    default:
      return state;
  }
};

export default users;
