import { ERROR, LOADING, POSTS } from './types';
import axios from 'axios';

const error = message => {
  return {
    type: ERROR,
    payload: message
  };
};

const triggerLoading = bool => {
  return {
    type: LOADING,
    payload: bool
  };
};

const search = url => {
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
          type: POSTS,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};

export { error, triggerLoading, search };
