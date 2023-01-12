import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export const createOrder = async (orderData) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/orderCreate`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
