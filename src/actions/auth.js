import { SET_CURRENT_USER, ERRORS } from "./types";
import axios from "axios";
import setAuthHeaderToken from "../auth/setAuthHeaderToken";
import jwtDecode from "jwt-decode";

export const loginUser = userData => {
  console.log("action received");
  const request = axios.post("http://13.233.110.23:8080/auth/login", userData);
  return dispatch => {
    request
      .then(res => {
        console.log("inside then");
        console.log(res);
        console.log(userData);
        const token = res.data.token;
        // if token received
        if (token) {
          // storing the token in local storage
          localStorage.setItem("jwtToken", token);
          // setting token to auth header
          console.log("local");
          setAuthHeaderToken(token);
          // decoding token to get user data
          console.log("auth");
          console.log(typeof token);
          const decodedToken = jwtDecode(token);
          // setting current user
          console.log("decode");
          dispatch(setCurrentUser(decodedToken));
        }
      })
      .catch(err =>
        dispatch({
          type: ERRORS,
          payload: err
        })
      );
  };
};

// setting logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// logout action
export const logoutUser = () => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  // delete auth header token.
  setAuthHeaderToken(false);
  // remove current user
  // TODO : this does not seems to work, need to fix it soon.
  //   return dispatch => {
  //     dispatch(setCurrentUser({}));
  //   };
};
