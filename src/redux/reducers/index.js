import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import dataReducer from "./dataReducer";
import { users, loginUser, allUsers } from "./user";
import selectedUser from "./selectedUser";
import auth from "./auth";
import isValid from "./isValid";
import refresh from "./refresh";
import posts from "./posts";
export default combineReducers({
  error: errorReducer,
  fetch: dataReducer,
  loginUser,
  allUsers,
  users,
  selectedUser,
  posts: posts,
  auth,
  isValid,
  refresh
});
