import { AUTHENTICATE, AUTHORIZE } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isAuthorized: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
}
