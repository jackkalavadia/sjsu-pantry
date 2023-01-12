const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

exports.checkLogin = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "Please signup before you login.",
    });
  }
};

exports.auth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (!loggedInUserId || !req.userDetails._id || loggedInUserId != req.userDetails._id) {
    res.status(403).json({ error: "Authenticate properly" });
  }
  next();
};

exports.adminCheck = async (req, res, next) => {
  try {
    let reqUser = await userModel.findById(req.body.loggedInUserId);
    if (reqUser.userRole == 0) {
      res.status(403).json({ error: "Non  Admin" });
    }
    next();
  } catch {
    res.status(404);
  }
};