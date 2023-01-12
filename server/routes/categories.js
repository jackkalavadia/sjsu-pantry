const express = require("express");
const router = express.Router();
const category = require("../controller/categories");
const multer = require("multer");
const { checkLogin } = require("../middleware/authenticate");

// Upload the images and store it in the disk
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "::" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//all category routers and API calls
router.get("/allCategory", category.fetchCat);
router.post("/addCategory", checkLogin, upload.single("cImage"), category.addCategory);
router.post("/editCategory", checkLogin, category.editCat);
router.post("/deleteCategory", checkLogin, category.deleteCat);

module.exports = router;
