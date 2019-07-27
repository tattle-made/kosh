import {
  GET_USER,
  USER_DELETE,
  ERROR,
  USER_SELECT,
  USER_UPDATE,
  ALL_USERS,
  USERS
} from "./types";
import axios from "axios";
import { triggerRefresh } from "./utils";

const getUser = () => {
  return {
    type: GET_USER
  };
};

const createUser = userData => {
  console.log("create user action", userData);
  const token = localStorage.getItem("token");
  const request = axios.post(
    "http://localhost:8080/api/users/create",
    userData,
    {
      headers: {
        token
      }
    }
  );
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

const userDelete = (id, page) => {
  console.log("inside delete action and page", page);
  const url = `http://localhost:8080/api/users/delete/${id}`;
  const token = localStorage.getItem("token");
  const request = axios.delete(url, {
    headers: {
      token
    }
  });
  return dispatch => {
    request
      .then(res => {
        console.log(res);
        dispatch({
          type: USER_DELETE,
          payload: res.data
        });
        dispatch(fetchUsers(page));
      })
      .catch(err => console.log(err));

    // dispatch(triggerRefresh(refresh));
  };
};

const selectedUser = userData => {
  return {
    type: USER_SELECT,
    payload: userData
  };
};

const updateUser = (id, userData) => {
  const url = `http://localhost:8080/api/users/update/${id}`;
  const token = localStorage.getItem("token");
  console.log("inside action", userData);
  const request = axios.post(url, userData, {
    headers: {
      token
    }
  });
  return {
    type: USER_UPDATE
  };
};

const fetchAllUsers = () => {
  const url = "http://localhost:8080/api/userList";
  const token = localStorage.getItem("token");
  const request = axios.get(url, {
    headers: {
      token
    }
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
  // return {
  //   type: ALL_USERS,
  //   payload: []
  // };
};

const fetchUsers = page => {
  console.log("action fetch users page ", page);
  const url = `http://localhost:8080/api/users/${page}`;
  const token = localStorage.getItem("token");
  const request = axios.get(url, {
    headers: {
      token
    }
  });
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: USERS,
          payload: res.data
        });
      })
      .catch(err => console.log("fetch Users ", err));
  };
};

export {
  getUser,
  createUser,
  userDelete,
  selectedUser,
  updateUser,
  fetchAllUsers,
  fetchUsers
};
