import { POST_UPLOAD } from '../actions/types';

const upload = (state = {}, action) => {
  switch (action.type) {
    case POST_UPLOAD:
      return action.payload;
    default:
      return state;
  }
};

export default upload;
