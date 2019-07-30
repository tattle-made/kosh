import { ERROR, LOADING, POSTS, REFRESH } from './types';
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

const triggerRefresh = id => {
  return {
    type: REFRESH,
    payload: id
  };
};

export { error, triggerLoading, search, triggerRefresh };
