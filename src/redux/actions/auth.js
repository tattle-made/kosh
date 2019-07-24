import { SET_CURRENT_USER, USER, IS_VALID, SET_USER, ERROR } from "./types";
import axios from "axios";

const loginUser = userData => {
  const request = axios.post("http://localhost:8080/auth/login", userData);
  return dispatch => {
    request
      .then(res => {
        const auth = res.data.auth;
        if (auth) {
          const { userId, token } = res.data;
          // storing the token in local storage
          localStorage.setItem("token", token);
          console.log("token", token);
          dispatch(isValid(true));
          dispatch({
            type: ERROR,
            payload: null
          });
          dispatch(setCurrentUser(userId));
        } else {
          dispatch({
            type: ERROR,
            payload: { message: "Invalid Username or Password" }
          });
        }
      })
      .catch(err => {
        console.log("errrrrrrrrrorrrrrrrr ", err.response);
        let message = "";
        if (err.response) {
          message = "Username and Password Cannot Be Empty";
        } else {
          message = "Server Down";
        }
        dispatch({
          type: ERROR,
          payload: { message }
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
