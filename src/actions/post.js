import { POST_DELETE } from "./types";
import axios from "axios";

export const postDelete = id => {
  const url = `http://localhost:8080/posts/${id}`;
  const request = axios.post(url);
  return {
    type: POST_DELETE
  };
};
