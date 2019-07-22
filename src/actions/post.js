import { POST_DELETE, POSTS } from "./types";
import axios from "axios";
import headers from "../utils/headers";
import { triggerRefresh } from "./fetchData";

const postDelete = (id, refresh) => {
  const url = `http://localhost:8080/posts/${id}`;
  const request = axios.post(url, {
    headers: headers
  });
  return dispatch => {
    dispatch({
      type: POST_DELETE
    });
    dispatch(triggerRefresh(refresh));
  };
};

const postByTime = (page, startDate, endDate) => {
  const url = `http://localhost:8080/postByTime/${page}`;
  const time = {
    startDate,
    endDate
  };
  const request = axios.post(url, time, {
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

const postByTimeAndUsers = (page, users_id, startDate, endDate) => {
  console.log(users_id);
  const url = `http://localhost:8080/postByTimeAndUsers/${page}`;
  const data = {
    users_id,
    startDate,
    endDate
  };
  const request = axios.post(url, data, {
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

const fetchPosts = page => {
  const url = `http://localhost:8080/posts/${page}`;
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

export { postByTime, postByTimeAndUsers, postDelete, fetchPosts };
