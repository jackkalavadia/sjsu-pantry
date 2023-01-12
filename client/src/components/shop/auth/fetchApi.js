import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/user-signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, sjsuid, password, cPassword }) => {
  const data = { name, email, sjsuid, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/user-signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
