import { ERROR, LOADING } from './types';

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
