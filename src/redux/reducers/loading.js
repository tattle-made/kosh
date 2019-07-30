import { LOADING } from '../actions/types';

const loading = (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loading;
