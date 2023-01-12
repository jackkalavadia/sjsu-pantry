import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getSliderImages = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/customize/getImage`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUploadImage = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/uploadImage`,formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteImage = async (id) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/deleteImage`, {
      id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
