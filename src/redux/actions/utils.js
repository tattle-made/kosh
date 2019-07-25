import { ERROR, CONTENT_LOADING, POSTS, REFRESH } from "./types";
import axios from "axios";
import headers from "../../core-utils/headers";

const error = error => {
  return {
    type: ERROR,
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

const triggerRefresh = id => {
  return {
    type: REFRESH,
    payload: id
  };
};

export { error, contentLoading, search, triggerRefresh };
