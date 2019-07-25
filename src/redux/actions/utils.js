import { ERROR, CONTENT_LOADING, POSTS, REFRESH } from "./types";
import axios from "axios";
import headers from "../../core-utils/headers";

const error = message => {
  return {
    type: ERROR,
    payload: message
  };
};

const contentLoading = () => {
  return {
    type: CONTENT_LOADING
  };
};

const search = url => {
  const token = localStorage.getItem("token");
  const request = axios.get(url, {
    headers: {
      token
    }
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
