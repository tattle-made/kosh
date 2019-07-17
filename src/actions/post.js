import { POST_DELETE, POSTS } from "./types";
import axios from "axios";

export const postDelete = id => {
  const url = `http://localhost:8080/posts/${id}`;
  const request = axios.post(url);
  return {
    type: POST_DELETE
  };
};

export const postByTime = (page,startDate, endDate) => {
  const url = `http://localhost:8080/postByTime/${page}`;
  const time = {
    startDate,
    endDate
  };
  const request = axios.post(url, time);

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
