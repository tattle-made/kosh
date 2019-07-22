import {
  ERRORS,
  SEARCH,
  CONTENT_LOADING,
  POSTS,
  USERS,
  REFRESH
} from "./types";
import axios from "axios";
import headers from "../utils/headers";

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
  // return {
  //   type: SEARCH,
  //   payload: [
  //     {
  //       id: "asdfadf-asdfaf-asdfadf",
  //       type: "image",
  //       url: "https://www.stockvault.net/data/2012/08/03/133422/thumb16.jpg",
  //       tags: ["sky", "blue", "image", "pollution"]
  //     },
  //     {
  //       id: "234234-adadf-asdfadf",
  //       type: "video",
  //       url: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
  //       tags: ["animation", "video", "bird", "nature"]
  //     },
  //     {
  //       id: "56-234234-xdcvxcv",
  //       type: "text",
  //       data:
  //         "भारत की लुंगी को अमेरिका में किस तरह बेचा जा रहा है... ज़रा देखिये..😳",
  //       tags: ["india", "news", "lungi", "joke"]
  //     }
  //   ]
  // };
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

  // request
  //   .then(res => {
  //     return {
  //       type: POSTS,
  //       payload: [
  //         {
  //           id: "asdfadf-asdfaf-asdfadf",
  //           type: "image",
  //           url:
  //             "https://www.stockvault.net/data/2012/08/03/133422/thumb16.jpg",
  //           tags: ["sky", "blue", "image", "pollution"]
  //         },
  //         {
  //           id: "234234-adadf-asdfadf",
  //           type: "video",
  //           url: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
  //           tags: ["animation", "video", "bird", "nature"]
  //         },
  //         {
  //           id: "56-234234-xdcvxcv",
  //           type: "text",
  //           data:
  //             "भारत की लुंगी को अमेरिका में किस तरह बेचा जा रहा है... ज़रा देखिये..😳",
  //           tags: ["india", "news", "lungi", "joke"]
  //         }
  //       ]
  //     };
  //   })
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
          payload: res.data
        });
      })
      .catch(err => console.log(err));
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

export {
  error,
  contentLoading,
  search,
  fetchPosts,
  fetchUsers,
  triggerRefresh
};
