import { GET_USER, SET_USER } from "../actions/types";

const user = {
  id: "asdf-asdf-2343-asdf",
  role: "SUBSCRIBER",
  team: "fact check team delhi"
};

export default function(state = user, action) {
  switch (action.type) {
    case GET_USER:
      return state;
    case SET_USER:
      return { ...state, role: action.payload };
    default:
      return state;
  }
}
