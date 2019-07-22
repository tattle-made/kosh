import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import dataReducer from "./dataReducer";
import user from "./user";
import users from "./users";
import selectedUser from "./selectedUser";
import auth from "./auth";
import isValid from "./isValid";
import refresh from "./refresh";

export default combineReducers({
  errors: errorReducer,
  fetch: dataReducer,
  user: user,
  users: users,
  selectedUser: selectedUser,
  auth,
  isValid,
  refresh
});
