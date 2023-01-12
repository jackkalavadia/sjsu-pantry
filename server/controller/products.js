const prodModel = require("../models/products");
const fs = require("fs");
const path = require("path");

class Product {

  static deleteProductImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "/public/uploads/products/";
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = "";
      if (mode == "file") {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async allProducts(req, res) {
    try {
      let prod = await prodModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (prod) {
        return res.json({ prod });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(req, res) {
    let { pName, pDescription,pQuantity, pCategory,pStatus } = req.body;
    let images = req.files;
    if (!pName || !pDescription || !pQuantity || !pCategory || !pStatus) {
      Product.deleteProductImages(images, "file");
      return res.json({ error: "Please enter all the required fields." });
    }
    else if (pName.length > 255 || pDescription.length > 3000) {
      Product.deleteProductImages(images, "file");
      return res.json({
        error: "Name should have lesser than 255 characters and description should have lesser than 3000 characters",
      });
    }
    // ensure 2 images are added
    else if (images.length !== 2) {
      Product.deleteProductImages(images, "file");
      return res.json({ error: "Please add 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let product = new prodModel({
          pImages: allImages,
          pName,
          pDescription,
          pQuantity,
          pCategory,
          pStatus,
        });
        let save = await product.save();
        if (save) {
          return res.json({ success: "Product created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async modifyProduct(req, res) {
    let {
      pId,
      pName,
      pDescription,
      pQuantity,
      pCategory,
      pStatus,
      pImages,
    } = req.body;
    let editImages = req.files;

    if ( !pId || !pName || !pDescription || !pQuantity || !pCategory || !pStatus ) {
      return res.json({ error: "Please enter all the required fields" });
    }
    else if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({
        error: "Name should have lesser than 255 characters and description should have lesser than 3000 characters",
      });
    }
    else if (editImages && editImages.length == 1) {
      Product.deleteProductImages(editImages, "file");
      return res.json({ error: "Please add 2 images" });
    } else {
      let editData = {
        pName,
        pDescription,
        pQuantity,
        pCategory,
        pStatus,
      };
      if (editImages.length == 2) {
        let allEditImages = [];
        for (const img of editImages) {
          allEditImages.push(img.filename);
        }
        editData = { ...editData, pImages: allEditImages };
        Product.deleteProductImages(pImages.split(","), "string");
      }
      try {
        let editProduct = prodModel.findByIdAndUpdate(pId, editData);
        editProduct.exec((err) => {
          if (err) console.log(err);
          return res.json({ success: "Product has been edited successfully" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async deleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "Please enter all the required fields" });
    } else {
      try {
        let deleteProductObj = await prodModel.findById(pId);
        let deleteProduct = await prodModel.findByIdAndDelete(pId);
        if (deleteProduct) {
          // Delete Image from uploads -> products folder
          Product.deleteProductImages(deleteProductObj.pImages, "string");
          return res.json({ success: "Product has been deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "Please enter all the required fields" });
    } else {
      try {
        let singleProduct = await prodModel
          .findById(pId)
          .populate("pCategory", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleProduct) {
          return res.json({ Product: singleProduct });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "Please enter all the required fields" });
    } else {
      try {
        let products = await prodModel
          .find({ pCategory: catId })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Error while searching category" });
      }
    }
  }



  async getWishListProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "Please enter all the required fields" });
    } else {
      try {
        let wishProducts = await prodModel.find({
          _id: { $in: productArray },
        });
        if (wishProducts) {
          return res.json({ Products: wishProducts });
        }
      } catch (err) {
        return res.json({ error: "wrong filter to the product" });
      }
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "Please enter all the required fields" });
    } else {
      try {
        let cartProducts = await prodModel.find({
          _id: { $in: productArray },
        });
        if (cartProducts) {
          return res.json({ Products: cartProducts });
        }
      } catch (err) {
        return res.json({ error: "Error in cart products" });
      }
    }
  }

  async addReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "Please enter all the required fields" });
    } else {
      let checkReviewRatingExists = await prodModel.findOne({ _id: pId });
      if (checkReviewRatingExists.pRatingsReviews.length > 0) {
        checkReviewRatingExists.pRatingsReviews.map((item) => {
          if (item.user === uId) {
            return res.json({ error: "You have already reviewed the product. You can review the product once" });
          } else {
            try {
              let newRatingReview = prodModel.findByIdAndUpdate(pId, {
                $push: {
                  pRatingsReviews: {
                    review: review,
                    user: uId,
                    rating: rating,
                  },
                },
              });
              newRatingReview.exec((err, result) => {
                if (err) {
                  console.log(err);
                }
                return res.json({ success: "Thank you for your review" });
              });
            } catch (err) {
              return res.json({ error: "Error in cart product." });
            }
          }
        });
      } else {
        try {
          let newRatingReview = prodModel.findByIdAndUpdate(pId, {
            $push: {
              pRatingsReviews: { review: review, user: uId, rating: rating },
            },
          });
          newRatingReview.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Thank you for your review." });
          });
        } catch (err) {
          return res.json({ error: "Error in cart product." });
        }
      }
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId) {
      return res.json({ message: "Please enter all the required fields." });
    } else {
      try {
        let reviewDelete = prodModel.findByIdAndUpdate(pId, {
          $pull: { pRatingsReviews: { _id: rId } },
        });
        reviewDelete.exec((err, result) => {
          if (err) {
            console.log(err);
          }
          return res.json({ success: "Review has been deleted successfully." });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async editQty(req, res) {
    let { allProduct } = req.body;
    console.log("checking the type of allproducts :", typeof allProduct);
    try {
      for (var i = 0; i < allProduct.length; i++) {
        console.log(allProduct[i].id+" "+allProduct[i].quantitiy);
        let cartProducts = prodModel.update({'_id': allProduct[i].id},
            {'$inc': {'pQuantity': -allProduct[i].quantitiy}});
        cartProducts.exec((err) => {
          if (err)
            console.log(err);
        });
        console.log("the res after update: ",cartProducts);
      }
      return res.json({ success: "Product quantity updated successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}



const productController = new Product();
module.exports = productController;
