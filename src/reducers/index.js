import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import dataReducer from "./dataReducer";
import breadcrumbs from "./breadcrumbs";
import user from "./user";
import users from "./users";
import selectedUser from "./selectedUser";
import auth from "./auth";

export default combineReducers({
  errors: errorReducer,
  fetch: dataReducer,
  breadcrumbs: breadcrumbs,
  user: user,
  users: users,
  selectedUser: selectedUser,
  auth: auth
});
