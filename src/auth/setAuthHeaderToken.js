import axios from "axios";

const setAuthHeaderToken = token => {
  if (token) {
    // setting auth header token
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // deleting auth header token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthHeaderToken;
