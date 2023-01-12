const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//user product related mtds
router.get("/all-product", productController.allProducts);
router.post("/product-by-category", productController.getProductByCategory);
router.post("/wish-product", productController.getWishListProduct);
router.post("/cart-product", productController.getCartProduct);
router.post("/edit-qty", productController.editQty);

//admin product related mtds
router.post("/add-product", upload.any(), productController.addProduct);
router.post("/edit-product", upload.any(), productController.modifyProduct);
router.post("/delete-product", productController.deleteProduct);
router.post("/single-product", productController.getProduct);

//product reviews
router.post("/add-review", productController.addReview);
router.post("/delete-review", productController.deleteReview);


module.exports = router;
