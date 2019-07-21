const token = localStorage.getItem("token");
console.log(token);

export const headers = {
  token: token
};
