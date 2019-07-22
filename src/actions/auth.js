import { SET_CURRENT_USER, USER, IS_VALID, SET_USER, ERRORS } from "./types";
import axios from "axios";

const loginUser = userData => {
  const request = axios.post("http://localhost:8080/auth/login", userData);
  return dispatch => {
    request
      .then(res => {
        const token = res.data.token;
        // if token received
        if (token) {
          // storing the token in local storage
          localStorage.setItem("token", token);
          console.log("token", token);
          dispatch(isValid(true));
          dispatch(setCurrentUser(token));
        }
      })
      .catch(err => {
        // // const error = err.hasOwnProperty("response") ? err.response.data : err;
        // console.log(
        //   "login error ",
        //   err.response.hasOwnProperty("data"),
        //   err.response
        // );
        let error;
        if (err.response.hasOwnProperty("data")) {
          error = err.response.data;
        } else {
          error = err;
        }
        dispatch({
          type: ERRORS,
          payload: error
        });
      });
  };
};

// setting logged in user
const setCurrentUser = decoded => {
  return {
    type: USER,
    payload: decoded
  };
};

const isValid = boolValue => {
  return {
    type: IS_VALID,
    payload: boolValue
  };
};
// logout action
const logoutUser = () => {
  //remove token from local storage
  localStorage.removeItem("token");
  // delete auth header token.
  // remove current user
  // TODO : this does not seems to work, need to fix it soon.
  //   return dispatch => {
  //     dispatch(setCurrentUser({}));
  //   };
};

export { logoutUser, loginUser, setCurrentUser, isValid };
