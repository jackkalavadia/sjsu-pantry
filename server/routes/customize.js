// this is to add the slider images in the home page
const express = require("express");
const router = express.Router();
const multer = require("multer");
const customize = require("../controller/customization");

//local disk storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customize");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "::" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/uploadImage", upload.single("image"), customize.uploadImage);
router.get("/getImage", customize.getImage);
router.post("/deleteImage", customize.deleteImage);

module.exports = router;
