const { removeCase } = require("../config/helper_functions");
const catModel = require("../models/categories");
const fs = require("fs");

class Category {
    //add the entered category to DB and add the images to disk
  async addCategory(req, res) {
    let { catName, catDesc, catStat } = req.body;
    let catFileName = req.file.filename;
    const filePath = `../server/public/uploads/categories/${catName}`;
    if (!catFileName || !catName || !catDesc || !cStatus) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ error: "Please fill all the fields to add a category." });
      });
    } else {
    //store it in lowercase, easy to compare
      cName = removeCase(catFileName);
      try {
        let checkIfExists = await catModel.findOne({ catName: catFileName });
        if (checkIfExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ error: "This category already exists. Please verify and add again." });
          });
        } else {
          let newCat = new catModel({
            catName,
            catDesc,
            catStat,
            catFileName,
          });
          await newCat.save((err) => {
            if (!err) {
              return res.json({ success: "The entered category created successfully." });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

    // fetch the requested category
    async fetchCat(req, res) {
      try {
        let categories = await catModel.find({}).sort({ _id: -1 });
        if (categories) {
          return res.json({ categories });
        }
      } catch (err) {
        console.log(err);
      }
    }

    //edit the category by changed any required fields. Update the same in DB along with the timestamp
  async editCat(req, res) {
    let { catId, catDesc, catStat } = req.body;
    if (!catId || !catDesc || !catStat) {
      return res.json({ error: "Please fill all the fields to edit the category." });
    }
    try {
      let editCat = catModel.findByIdAndUpdate(cId, {
        catDesc,
        catStat,
        updatedAt: Date.now(),
      });
      let edit = await editCat.exec();
      if (edit) {
        return res.json({ success: "Category edit successfully." });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //delete the categofy from DB and remove the images from the disk
  async deleteCat(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "Please fill all the fields." });
    } else {
      try {
        let deletedCatFile = await catModel.findById(catId);
        const filePath = `../server/public/uploads/categories/${deletedCatFile.catName}`;

        let deleteCat = await catModel.findByIdAndDelete(cId);
        if (deleteCat) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Category deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = new Category();
