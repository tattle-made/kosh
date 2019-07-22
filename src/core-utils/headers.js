const token = localStorage.getItem("token");
console.log(token);

const headers = () => ({
  token: token
});

export default headers;
