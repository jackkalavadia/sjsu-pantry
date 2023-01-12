const fs = require("fs");
const customizeModel = require("../models/customize");
const userModel = require("../models/users");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");

class Customize {

    //sending the slider images
  async getImage(req, res) {
    try {
      let Images = await customizeModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

    //upload the slider images
  async uploadImage(req, res) {
    let image = req.file.filename;
    if (!image) {
      return res.json({ error: "Please upload image/images." });
    }
    try {
      let newCust = new customizeModel({
        slideImage: image,
      });
      let save = await newCust.save();
      if (save) {
        return res.json({ success: "The image uploaded successfully." });
      }
    } catch (err) {
      console.log(err);
    }
  }

    //delete the images from disk
  async deleteImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "Please upload image/images." });
    } else {
      try {
        let deletedImage = await customizeModel.findById(id);
        const filePath = `../server/public/uploads/customize/${deletedImage.slideImage}`;
        let image = await customizeModel.findByIdAndDelete(id);
        if (image) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Image deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

module.exports = new Customize();
