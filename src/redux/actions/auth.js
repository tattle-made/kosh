import {
  SET_CURRENT_USER,
  USER,
  IS_VALID,
  SET_USER,
  ERROR,
  AUTHENTICATE
} from "./types";
import axios from "axios";
import headers from "../../core-utils/headers";

const loginUser = userData => {
  const request = axios.post("http://localhost:8080/auth/login", userData);
  return dispatch => {
    request
      .then(res => {
        console.log("headers", headers);
        console.log("dispatch1 ", dispatch);
        const auth = res.data.auth;
        if (auth) {
          dispatch(toggleAuthentication(true));
          const { userId, token } = res.data;
          // storing the token in local storage

          localStorage.setItem("token", token);

          const userDataRequest = axios.get(
            `http://localhost:8080/user/${userId}`,
            {
              headers: {
                token
              }
            }
          );

          console.log("token", token);
          dispatch(isValid(true));
          dispatch({
            type: ERROR,
            payload: null
          });
          userDataRequest.then(res => {
            console.log("dispatch2 ", dispatch);
            console.log("user data", res.data);
            dispatch(setCurrentUser(userData));
          });
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
const setCurrentUser = userData => {
  return {
    type: SET_USER,
    payload: userData
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

const toggleAuthentication = bool => {
  return {
    type: AUTHENTICATE,
    payload: bool
  };
};

export { logoutUser, loginUser, setCurrentUser, isValid };
