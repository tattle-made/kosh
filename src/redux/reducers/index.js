import { combineReducers } from 'redux';
import error from './error';
import loading from './loading';
import { users, loginUser, allUsers } from './user';
import selectedUser from './selectedUser';
import auth from './auth';
// import isValid from "./isValid";
import posts from './posts';

export default combineReducers({
  error,
  loading,
  loginUser,
  allUsers,
  users,
  selectedUser,
  posts,
  auth
});
