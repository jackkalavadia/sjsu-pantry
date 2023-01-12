/* This all of are helper function */
const userModel = require("../models/users");

exports.removeCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.emailValid = function (mail) {
  if (/^\w+([\.-]?\w+)*@@sjsu.edu/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

exports.checkEmailInDB = async function (email) {
  let user = await userModel.findOne({ email: email });
  user.exec((err, data) => {
    if (!data) {
      return false;
    } else {
      return true;
    }
  });
};

