import {
  SET_USER,
  GET_USER,
  USER_DELETE,
  ERRORS,
  USER_SELECT,
  USER_UPDATE
} from "./types";
import axios from "axios";

export const setUser = role => {
  return {
    type: SET_USER,
    payload: role
  };
};

export const getUser = () => {
  return {
    type: GET_USER
  };
};

export const createUser = userData => {
  const request = axios.post("http://localhost:8080/users/create", userData);
  return dispatch => {
    request
      .then(res => {
        console.log("inside action", res);
        dispatch({
          type: SET_USER,
          payload: res.data
        });
        // const token = res.data.token;
        // // if token received
        // if (token) {
        //   // storing the token in local storage
        //   localStorage.setItem("jwtToken", token);
        //   // setting token to auth header
        //   console.log("local");
        //   setAuthHeaderToken(token);
        //   // decoding token to get user data
        //   console.log("auth");
        //   console.log(typeof token);
        //   // const decodedToken = jwtDecode(token);
        //   // // setting current user
        //   // console.log("decode");
        //   dispatch(setCurrentUser(token));
        // }
      })
      .catch(err =>
        dispatch({
          type: ERRORS,
          payload: err
        })
      );
  };
};

export const userDelete = id => {
  const url = `http://localhost:8080/users/delete/${id}`;
  const request = axios.post(url);
  // return dispatch => {
  //   request
  //     .then(res => {
  //       dispatch({
  //         type: USER_DELETE,
  //         payload: res
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };
  return {
    type: USER_DELETE
  };
};

export const selectedUser = userData => {
  return {
    type: USER_SELECT,
    payload: userData
  };
};

export const updateUser = (id, userData) => {
  const url = `http://localhost:8080/users/update/${id}`;
  console.log("inside action", userData);
  const request = axios.post(url, userData);
  return {
    type: USER_UPDATE
  };
};
