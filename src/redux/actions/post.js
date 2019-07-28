import { POST_DELETE, POSTS } from "./types";
import axios from "axios";
import { error } from "./utils";
import { toggleAuthentication } from "./auth";

const postDelete = (id, page) => {
  const url = `http://localhost:8080/api/posts/delete/${id}`;
  const token = localStorage.getItem("token");
  console.log("token delete post and url", token, url);
  const request = axios.delete(url, {
    headers: {
      token
    }
  });

  return dispatch => {
    request
      .then(res => {
        console.log("res ", res);
        dispatch({
          type: POST_DELETE,
          payload: res.data
        });
        dispatch(fetchPosts(page));
      })
      .catch(err => {
        console.log("err", err);
        if (err.response === undefined) {
          dispatch(error("Network Error"));
        } else {
          dispatch(error(err.response.data));
        }
      });

    // dispatch(triggerRefresh(refresh));
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
      .catch(err => {
        console.log("err", err);
        if (err.response === undefined) {
          dispatch(error("Network Error"));
        } else {
          dispatch(error(err.response.data));
        }
      });
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
      .catch(err => {
        console.log("err", err);
        if (err.response === undefined) {
          dispatch(error("Network Error"));
        } else {
          dispatch(error(err.response.data));
        }
      });
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
        dispatch(toggleAuthentication(false));
        console.log("err", err);
        if (err.response === undefined) {
          dispatch(error("Network Error"));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
  // return {
  //   type: POSTS,
  //   payload: []
  // };
};

export { postByTime, postByTimeAndUsers, postDelete, fetchPosts };
