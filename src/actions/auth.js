import { SET_CURRENT_USER, USER, IS_VALID, SET_USER, ERRORS } from "./types";
import axios from "axios";

export const loginUser = userData => dispatch => {
  console.log("action received");
  const request = axios.post("http://localhost:8080/auth/login", userData);

  request
    .then(res => {
      console.log("inside then");
      console.log(res);
      console.log(userData);
      const token = res.data.token;
      // if token received
      if (token) {
        // storing the token in local storage
        localStorage.setItem("token", token);
        // setting token to auth header
        console.log("token", token);
        dispatch(isValid(true));
        dispatch(setCurrentUser(token));
      }
    })
    .catch(err => {
      console.log("inside catch err ", err.response.data.username);
      // // const error = err.hasOwnProperty("response") ? err.response.data : err;
      // console.log(
      //   "login error ",
      //   err.response.hasOwnProperty("data"),
      //   err.response
      // );
      // let error;
      // if (err.response.hasOwnProperty("data")) {
      //   error = err.response.data;
      // } else {
      //   error = err;
      // }
      dispatch({
        type: ERRORS,
        payload: err
      });
    });
};

// setting logged in user
export const setCurrentUser = decoded => {
  return {
    type: USER,
    payload: decoded
  };
};

export const isValid = boolValue => {
  return {
    type: IS_VALID,
    payload: boolValue
  };
};
// logout action
export const logoutUser = () => {
  //remove token from local storage
  localStorage.removeItem("token");
  // delete auth header token.
  // remove current user
  // TODO : this does not seems to work, need to fix it soon.
  //   return dispatch => {
  //     dispatch(setCurrentUser({}));
  //   };
};
