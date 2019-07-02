import { BREADCRUMBS } from "../actions/types";

const initialState = [];
export default function(state = initialState, action) {
  switch (action.type) {
    case BREADCRUMBS:
      if (!state.includes(action.payload)) {
        return [...state, action.payload];
      } else {
        const newList = state;
        newList.splice(newList.indexOf(action.payload), 1);
        return newList;
      }
    default:
      return state;
  }
}
