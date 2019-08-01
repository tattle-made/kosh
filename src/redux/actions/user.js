import {
  USER_DELETE,
  USER_SELECT,
  USER_UPDATE,
  ALL_USERS,
  USERS
} from './types';

import axios from 'axios';
import { error } from './utils';

const createUser = userData => {
  const token = localStorage.getItem('token');
  const request = axios.post(
    'http://localhost:8080/api/users/create',
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
        dispatch(fetchUsers(1));
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const userDelete = (id, page) => {
  const url = `http://localhost:8080/api/users/delete/${id}`;
  const token = localStorage.getItem('token');
  const request = axios.delete(url, {
    headers: {
      token
    }
  });
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: USER_DELETE,
          payload: res.data
        });
        dispatch(fetchUsers(1));
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
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
  const token = localStorage.getItem('token');

  const request = axios.post(url, userData, {
    headers: {
      token
    }
  });

  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: USER_UPDATE
        });
        dispatch(fetchUsers(1));
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const fetchAllUsers = () => {
  const url = 'http://localhost:8080/api/userList';
  const token = localStorage.getItem('token');
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
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
  // return {
  //   type: ALL_USERS,
  //   payload: []
  // };
};

const fetchUsers = page => {
  const url = `http://localhost:8080/api/users/${page}`;
  const token = localStorage.getItem('token');
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
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

export {
  createUser,
  userDelete,
  selectedUser,
  updateUser,
  fetchAllUsers,
  fetchUsers
};
