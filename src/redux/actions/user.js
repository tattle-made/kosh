import {
  SET_USER,
  GET_USER,
  USER_DELETE,
  ERROR,
  USER_SELECT,
  USER_UPDATE,
  ALL_USERS,
  USERS
} from "./types";
import axios from "axios";
import headers from "../../core-utils/headers";
import { triggerRefresh } from "./utils";

const setUser = role => {
  return {
    type: SET_USER,
    payload: role
  };
};

const getUser = () => {
  return {
    type: GET_USER
  };
};

const createUser = userData => {
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
          type: ERROR,
          payload: err
        })
      );
  };
};

const userDelete = (id, refresh) => {
  console.log("inside delete action", refresh);
  const url = `http://localhost:8080/users/delete/${id}`;
  const request = axios.post(url, {
    headers: headers
  });
  return dispatch => {
    dispatch({
      type: USER_DELETE
    });
    dispatch(triggerRefresh(refresh));
  };
};

const selectedUser = userData => {
  return {
    type: USER_SELECT,
    payload: userData
  };
};

const updateUser = (id, userData) => {
  const url = `http://localhost:8080/users/update/${id}`;
  console.log("inside action", userData);
  const request = axios.post(url, userData, {
    headers: headers
  });
  return {
    type: USER_UPDATE
  };
};

const fetchAllUsers = () => {
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

const fetchUsers = () => {
  const url = "http://localhost:8080/users";
  const request = axios.get(url, {
    headers: headers
  });
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: USERS,
          payload: res
        });
      })
      .catch(err => console.log("fetch Users ", err));
  };
};

export {
  setUser,
  getUser,
  createUser,
  userDelete,
  selectedUser,
  updateUser,
  fetchAllUsers,
  fetchUsers
};
