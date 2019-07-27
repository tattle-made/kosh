import { POST_DELETE, POSTS } from "./types";
import axios from "axios";
import { triggerRefresh, error } from "./utils";

const postDelete = (id, refresh) => {
  const url = `http://localhost:8080/api/posts/${id}`;
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
  const url = `http://localhost:8080/api/postByTime/${page}`;
  console.log("action postybytime ", url);
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

  console.log("request posy by time", request);
  return dispatch => {
    request
      .then(res => {
        console.log("posybytime res", res.data);
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
  const url = `http://localhost:8080/api/postByTimeAndUsers/${page}`;
  console.log("action user and time url", url);
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
  console.log(request);
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
  console.log("action posts page ", page);
  if (page === undefined) {
    page = 1;
  }
  console.log("fetchposts page ", page);
  const url = `http://localhost:8080/api/posts/${page}`;
  const token = localStorage.getItem("token");
  console.log("tokennnnnnnnnnnnnnnnnnnnnn fetch postttttttt", token);
  console.log("url action posts", url);
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
  // return {
  //   type: POSTS,
  //   payload: []
  // };
};

export { postByTime, postByTimeAndUsers, postDelete, fetchPosts };
