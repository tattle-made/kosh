import { combineReducers } from 'redux';
import error from './error';
import loading from './loading';
import { users, loginUser, allUsers } from './user';
import selectedUser from './selectedUser';
import auth from './auth';
import posts from './posts';
import upload from './upload';
import search from './search';

export default combineReducers({
  error,
  loading,
  loginUser,
  allUsers,
  users,
  selectedUser,
  posts,
  search,
  auth,
  upload
});
