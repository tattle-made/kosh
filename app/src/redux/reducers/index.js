import { combineReducers } from 'redux';
import error from './error';
import loading from './loading';
import { users, loginUser, allUsers } from './user';
import selectedUser from './selectedUser';
import auth from './auth';
import posts from './posts';
import upload from './upload';
import search from './search';
import sectionStatus from './section-status'
import sectionSearchDuplicate from './section-search-duplicate'
import sectionSearchFactCheckedStories from './section-search-fact-checked-stories'
import sectionSearchTextSearch from './section-search-text-search';
import sectionSearchSemanticSearch from './section-search-semantic-search';

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
  upload,
  sectionStatus,
  sectionSearchDuplicate,
  sectionSearchFactCheckedStories,
  sectionSearchTextSearch,
  sectionSearchSemanticSearch
});
