import { SET_CURRENT_USER, GET_USER } from "./types";

export const setUser = role => {
  return {
    type: SET_CURRENT_USER,
    payload: role
  };
};

export const getUser = () => {
  return {
    type: GET_USER
  };
};
