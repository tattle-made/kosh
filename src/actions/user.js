import { SET_USER, GET_USER, USER_DELETE } from "./types";
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
