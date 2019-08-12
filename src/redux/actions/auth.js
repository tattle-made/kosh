import { SET_USER, AUTHENTICATE } from './types';

import { PURGE } from 'redux-persist';
import axios from 'axios';
import { error } from './utils';
import {get, post} from '../../service/shell-server';

const loginUser = userData => {
  

  return dispatch => {
      post('/auth/login', userData)
      .then(res => {
        const auth = res.data.auth;

        if (auth) {
          dispatch(error(''));
          const { userId, token } = res.data;
          // storing the token in local storage
          localStorage.setItem('token', token);
          get(`/user/${userId}`, token)
          .then(res => {
            dispatch(setCurrentUser(res.data));
            dispatch(toggleAuthentication(true));
          });
        } else {
          dispatch(error('Invalid Username or Password'));
        }
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(toggleAuthentication(false));
          dispatch(error('Network Error'));
        } else {
          dispatch(toggleAuthentication(false));
          dispatch(error(err.response.data));
        }
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

const logoutUser = () => {
  //remove token from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('persist:root');

  return dispatch => {
    dispatch({
      type: PURGE,
      key: 'key',
      result: () => null
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
