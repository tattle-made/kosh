import {
  SET_USER,
  GET_USER,
  USER_DELETE,
  ERRORS,
  USER_SELECT,
  USER_UPDATE,
  ALL_USERS
} from "./types";
import axios from "axios";
import { headers } from "../utils/headers";
import { triggerRefresh } from "./fetchData";

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
  console.log("create user action", userData);
  const request = axios.post("http://localhost:8080/users/create", userData, {
    headers: headers
  });
  return dispatch => {
    request
      .then(res => {
        console.log("inside action", res);
        // dispatch({
        //   type: SET_USER,
        //   payload: res.data
        // });
      })
      .catch(err =>
        dispatch({
          type: ERRORS,
          payload: err
        })
      );
  };
};

export const userDelete = (id, refreshTrigger) => {
  console.log("inside delete action", refreshTrigger);
  const url = `http://localhost:8080/users/delete/${id}`;
  const request = axios.post(url, {
    headers: headers
  });
  return dispatch => {
    dispatch({
      type: USER_DELETE
    });
    dispatch(triggerRefresh(refreshTrigger));
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
  const request = axios.post(url, userData, {
    headers: headers
  });
  return {
    type: USER_UPDATE
  };
};

export const fetchAllUsers = () => {
  const url = "http://localhost:8080/users";
  const request = axios.get(url, {
    headers: headers
  });
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: ALL_USERS,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};
