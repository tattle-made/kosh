import { POST_UPLOAD } from '../actions/types';

const initialState = {
  success: false,
  url: ''
};
const upload = (state = initialState, action) => {
  switch (action.type) {
    case POST_UPLOAD:
      return action.payload;
    default:
      return state;
  }
};

export default upload;
