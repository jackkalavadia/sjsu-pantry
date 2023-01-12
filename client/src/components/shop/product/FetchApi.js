import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getSingleProduct = async (pId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/single-product`, {
      pId: pId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/add-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editQuantity = async (orderData) => {
  try {
    // alert("here");
    let res = await axios.post(`${apiURL}/api/product/edit-qty`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
