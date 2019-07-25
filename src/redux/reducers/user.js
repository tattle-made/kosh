import { SET_USER, USERS, ALL_USERS } from "../actions/types";

const loginUserInitialState = {
  id: "",
  username: "",
  email: "",
  role: "ADMIN",
  team: ""
};

const allUsersInitialState = {};

const usersInitialState = {};

const loginUser = (state = loginUserInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const allUsers = (state = allUsersInitialState, action) => {
  switch (action.type) {
    case ALL_USERS:
      return action.payload;
    default:
      return state;
  }
};

const users = (state = usersInitialState, action) => {
  switch (action.type) {
    case USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { loginUser, users, allUsers };
