import { POST_DELETE, POSTS } from "./types";
import axios from "axios";
import headers from "../../core-utils/headers";
import { triggerRefresh, error } from "./utils";

const postDelete = (id, refresh) => {
  const url = `http://localhost:8080/posts/${id}`;
  const token = localStorage.getItem("token");
  const request = axios.post(url, {
    headers: {
      token
    }
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
  const token = localStorage.getItem("token");
  const time = {
    startDate,
    endDate
  };
  const request = axios.post(url, time, {
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

const postByTimeAndUsers = (page, users_id, startDate, endDate) => {
  console.log(users_id);
  const url = `http://localhost:8080/postByTimeAndUsers/${page}`;
  const token = localStorage.getItem("token");
  const data = {
    users_id,
    startDate,
    endDate
  };
  const request = axios.post(url, data, {
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

const fetchPosts = page => {
  const url = `http://localhost:8080/posts/${page}`;
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
      .catch(err => {
        console.log(err.response);
        dispatch(error(err.response.data));
      });
  };
};

export { postByTime, postByTimeAndUsers, postDelete, fetchPosts };
