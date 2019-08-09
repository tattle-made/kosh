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

export { error, triggerLoading };
