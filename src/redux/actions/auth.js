import {
  SET_CURRENT_USER,
  USER,
  IS_VALID,
  SET_USER,
  ERROR,
  AUTHENTICATE
} from "./types";
import { PURGE } from "redux-persist";
import axios from "axios";
import { fetchPosts } from "./post";
import { error } from "./utils";
const loginUser = userData => {
  const request = axios.post("http://localhost:8080/api/auth/login", userData);
  return dispatch => {
    request
      .then(res => {
        console.log("dispatch1 ", dispatch);
        const auth = res.data.auth;

        if (auth) {
          const { userId, token } = res.data;
          // storing the token in local storage

          localStorage.setItem("token", token);
          console.log("token before set itemmmmmmmmmm", token);
          const value = localStorage.getItem("token");
          console.log("token afer gettttttt itemmmmmmmmmm", value);
          // dispatch(fetchPosts(1));

          const userDataRequest = axios.get(
            `http://localhost:8080/api/user/${userId}`,
            {
              headers: {
                token
              }
            }
          );

          console.log("token", token);
          dispatch({
            type: ERROR,
            payload: null
          });
          userDataRequest.then(res => {
            console.log("dispatch2 ", dispatch);
            console.log("user data", res.data);
            dispatch(setCurrentUser(res.data));
            dispatch(toggleAuthentication(true));
          });
        } else {
          dispatch(error("Invalid Username or Password"));
        }
      })
      .catch(err => {
        console.log("errrrrrrrrrorrrrrrrr ", err);
        let message = "";
        if (err) {
          message = "Username and Password Cannot Be Empty";
        } else {
          message = "Server Down";
        }
        dispatch(toggleAuthentication(false));
        dispatch(error(message));
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

// const isValid = boolValue => {
//   return {
//     type: IS_VALID,
//     payload: boolValue
//   };
// };
// logout action
const logoutUser = () => {
  //remove token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("persist:root");
  // delete auth header token.
  // remove current user
  return dispatch => {
    dispatch({
      type: PURGE,
      key: "key",
      result: () => console.log("logged out")
    });
    dispatch(setCurrentUser({}));
    dispatch(toggleAuthentication(false));
  };
};

const toggleAuthentication = bool => {
  return {
    type: AUTHENTICATE,
    payload: bool
  };
};

export { logoutUser, loginUser, setCurrentUser, toggleAuthentication };
