import {
  ERRORS,
  SEARCH,
  CONTENT_LOADING,
  POSTS,
  USERS,
  REFRESH
} from "./types";
import axios from "axios";
import headers from "../../core-utils/headers";

const error = error => {
  return {
    type: ERRORS,
    payload: error
  };
};

const contentLoading = () => {
  return {
    type: CONTENT_LOADING
  };
};

const search = url => {
  const request = axios.get(url, {
    headers: headers
  });
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: POSTS,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};
const fetchUsers = () => {
  const url = "http://localhost:8080/users";
  const request = axios.get(url, {
    headers: headers
  });
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: USERS,
          payload: res
        });
      })
      .catch(err => console.log("fetch Users ", err));
  };
};

const triggerRefresh = id => {
  return dispatch => {
    dispatch({
      type: REFRESH,
      payload: id
    });
  };
};

export { error, contentLoading, search, fetchUsers, triggerRefresh };
