const token = localStorage.getItem("token");
console.log("token ", token);

const headers = {
  token: token
};

export default headers;
