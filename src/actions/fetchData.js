import { ERRORS, SEARCH, CONTENT_LOADING, POSTS } from "./types";
import axios from "axios";

export const error = error => {
  return {
    type: ERRORS,
    payload: error
  };
};

export const contentLoading = () => {
  return {
    type: CONTENT_LOADING
  };
};

export const search = url => {
  const request = axios.get(url);
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

export const fetchPosts = url => {
  const request = axios.get(url);
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
