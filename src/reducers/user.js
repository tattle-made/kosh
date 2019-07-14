import { GET_USER, SET_USER, USER_SELECT } from "../actions/types";

const user = {
  id: "",
  username: "",
  email: "",
  role: "ADMIN",
  team: "fact check team delhi"
};

export default function(state = user, action) {
  switch (action.type) {
    case GET_USER:
      return state;
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
