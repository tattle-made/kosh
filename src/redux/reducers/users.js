import { USERS } from "../actions/types";

const usersData = {
  list: [],
  count: 0
};

const users = (state = usersData, action) => {
  switch (action.type) {
    case USERS:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default users;
