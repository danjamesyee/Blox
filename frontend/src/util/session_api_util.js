//axios allows us to set a common header for requests which is needed upon
//login or when the user refreshes the page
import axios from "axios";

//either set or delete common header depending on whether token is passed into
//our method
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

//take user data and return promise
export const signup = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => {
  return axios.post("/api/users/login", userData);
};